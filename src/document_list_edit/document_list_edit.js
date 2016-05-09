/**
 * @file Document list edit control
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Improve samples in sampler app
 * - Add add/remove/hover animations
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipDocumentListEdit", 
        ['ui.event', 'angularFileUpload', 'pipCore', 'pipFocused', 'pipRest', 'pipDocuments.Templates']);

    thisModule.config(function(pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            'DOCUMENT_LIST_EDIT_TEXT':'Click here to add a document',
            'ERROR_TRANSACTION_IN_PROGRESS': 'Transaction is in progress. Please, wait until it\'s finished or abort'
        });
        pipTranslateProvider.translations('ru', {
            'DOCUMENT_LIST_EDIT_TEXT': 'Нажмите сюда, чтобы добавить документ',
            'ERROR_TRANSACTION_IN_PROGRESS': 'Транзакция еще не завершена. Подождите окончания или прервите её'
        });
    });

    thisModule.directive('pipDocumentListEdit',
        function() {
            return {
                restrict: 'EA',
                scope: {
                    pipDocuments: '=',
                    pipAddedDocument: '=',
                    ngDisabled: '&',
                    pipCreated: '&',
                    pipChanged: '&'
                },
                templateUrl: 'document_list_edit/document_list_edit.html', 
                controller: 'pipDocumentListEditController'
            };
        }
    );

    thisModule.controller('pipDocumentListEditController',
        function($scope, $rootScope, $element, $attrs, $parse, $http, $upload, $timeout, pipRest, pipUtils) {
            var
                $control = $element.children('.pip-picture-drop');

            $scope.documentList = {};
            $scope.documentList.text = $attrs.pipDefaultText || 'DOCUMENT_LIST_EDIT_TEXT';
            $scope.documentList.icon = $attrs.pipDefaultIcon || 'document';
            $scope.documentList.iconError = 'warn-circle';
            $scope.documentStartState = pipUtils.toBoolean($scope.pipAddedDocument) ? 'copied' : 'original';
            $scope.cancelDrag = pipUtils.toBoolean($attrs.pipCanselDrag) === true;

            var itemPin = 0;

            $scope.control = {
                uploading: 0,
                items: getItems(),
                reset: resetDocument,
                save: saveDocument,
                abort: onAbort
            };

            $scope.filterItem = filterItem;
            $scope.onDelete = onDelete;
            $scope.onKeyDown = onKeyDown;
            $scope.onChange = onChange;
            $scope.onSelect = onSelect;

            // Add class
            $element.addClass('pip-document-list-edit');

            // Initialize control
            $scope.control.reset();

            executeCallback();

            // Watch for changes
            $scope.$watchCollection(
                function () {
                    // Todo: Optimize change tracking
                    return $scope.pipDocuments;
                },
                function(newValue) {
                    if (!_.isEqual(newValue, $scope.pipDocuments)) {
                        $scope.control.reset();
                    }
                }
            );

            return ;

            function getItems() {
                var
                    documents = $scope.pipDocuments,
                    items = [];

                if (documents == null || documents.length == 0)
                    return items;

                for (var i = 0; i < documents.length; i++) {
                    items.push({
                        pin: itemPin++,
                        id: documents[i].file_id,
                        name: documents[i].file_name,
                        uploading: false,
                        uploaded: false,
                        progress: 0,
                        file: null,
                        state: $scope.documentStartState //'original'
                    });
                }

                return items;
            };

            function setItems() {
                // Clean the array
                if ($scope.pipDocuments && $scope.pipDocuments.length > 0)
                    $scope.pipDocuments.splice(0, $scope.pipDocuments.length);

                for (var i = 0; i < $scope.control.items.length; i++) {
                    var item = $scope.control.items[i];
                    if (item.id) {
                        $scope.pipDocuments.push({
                            file_id: item.id,
                            file_name: item.name
                        });
                    }
                }
            };

            function resetDocument() {
                $scope.control.uploading = 0;
                $scope.control.items = getItems();
            };

            function getItemIdUrl(item) {
                var
                    serverUrl = pipRest.serverUrl(),
                    partyId = $rootScope.$party ? $rootScope.$party.id : pipRest.userId();

                return serverUrl + '/api/parties/' + partyId + '/files/' + item.id;
            };

            function addItemUrl(item) {
                var 
                    serverUrl = pipRest.serverUrl(),
                    partyId = $rootScope.$party ? $rootScope.$party.id : pipRest.userId();

                return serverUrl + '/api/parties/' + partyId + '/files?name=' + item.file.name
            };

            function addItem(item, callback) {
                var 
                    control = $scope.control,
                    file = item.file;

                // Avoid double transactions
                if (item.uploading || item.file == null || item.state != 'added') 
                    return;

                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    if (item.uploading) return;

                    item.uploading = true;

                    item.upload = $upload.http({
                        url: addItemUrl(item),
                        headers: { 'Content-Type': file.type },
                        data: e.target.result
                    })
                    .then(
                        function (response) {
                            item.id = response.data.id;
                            item.name = response.data.filename || item.name;
                            item.uploaded = true;
                            item.uploading = false;
                            item.progress = 0;
                            item.upload = null;
                            item.file = null;
                            item.state = 'original';
                            callback();
                        },
                        function (error) {
                            item.uploaded = false;
                            item.uploading = false;
                            item.progress = 0;
                            item.upload = null;
                            item.state = 'error';
                            callback();
                        },
                        function (e) {
                            // Math.min is to fix IE which reports 200% sometimes
                            item.progress = Math.min(100, parseInt(100.0 * e.loaded / e.total));
                        }
                    );
                };

                fileReader.readAsArrayBuffer(file);  
            };

            function deleteItem(item, callback) {
                var control = $scope.control;

                // Avoid double transactions
                if (item.upload) {
                    item.upload.abort();
                    item.upload = null;
                }

                if (item.state != 'deleted') 
                    return;

                $http['delete'](getItemIdUrl(item))
                .success(function (data) {
                    _.remove(control.items, {pin: item.pin});
                    callback();
                })
                .error(function (data, status) {
                    // Todo: perform a better processing
                    if (data == null) {
                        _.remove(control.items, {pin: item.pin});
                    } else {
                        item.uploaded = false;
                        item.uploading = false;
                        item.progress = 0;
                        item.upload = null;
                    }

                    callback(data);
                });
            };

            function saveDocument(successCallback, errorCallback) {
                var control = $scope.control;

                if (control.uploading) {
                    if (errorCallback) errorCallback('ERROR_TRANSACTION_IN_PROGRESS');
                    return;
                }

                control.error = null;
                control.uploading = 0;

                var onItemCallback = function(error) {
                    // Storing only the first error 
                    if (error && !control.error) {
                        control.error = error;
                    }

                    control.uploading--;

                    // Finished uploading
                    if (control.uploading == 0) {
                        if (control.error) {
                            if (errorCallback) errorCallback(control.error);
                            else console.error(control.error);
                        } else {
                            setItems();
                            if (successCallback) successCallback();
                        }
                    }
                }

                for (var i = 0; i < control.items.length; i++) {
                    var item = control.items[i];

                    if (item.state == 'added') {
                        control.uploading++;
                        addItem(item, onItemCallback);
                    } else if (item.state == 'deleted') {
                        control.uploading++;
                        deleteItem(item, onItemCallback);
                    }
                }

                // Nothing was uploaded
                if (control.uploading == 0) {
                    if (successCallback) successCallback();
                }
            };

            function onAbort() {
                var control = $scope.control;

                for (var i = 0; i < control.items.length; i++) {
                    var item = control.items[i];

                    if (item.uploading) {
                        if (item.upload) item.upload.abort();

                        item.uploaded = false;
                        item.uploading = false;
                        item.progress = 0;
                        item.upload = null;
                    }
                }

                // Abort transaction
                control.uploading = 0;
            };

            // Visualization functions

            function filterItem(item) {
                return item.state != 'deleted';  
            };

            // Process user actions
            function onSelect($files) {
                $control.focus();

                if ($files == null || $files.length == 0)
                    return;

                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];

                    $scope.control.items.push({
                        pin: itemPin++,
                        id: null,
                        name: file.name,
                        uploading: false,
                        uploaded: false,
                        progress: 0,
                        file: file,
                        state: 'added'
                    });
                }

                $scope.onChange();
            };

            function onDelete(item) {
                if (item.state == 'added' || item.state == 'copied' ) {
                    _.remove($scope.control.items, {pin: item.pin});
                } else {
                    item.state = 'deleted';
                }

                $scope.onChange();
            };

            function onKeyDown($event, item) {
                if (item) {
                    if ($event.keyCode == 46 || $event.keyCode == 8) {
                        if (item.state == 'added') {
                            _.remove($scope.control.items, {pin: item.pin});
                        } else {
                            item.state = 'deleted';
                        }

                        $scope.onChange();
                    }                        
                } else {
                    if ($event.keyCode == 13 || $event.keyCode == 32) {
                        // !! Avoid clash with $apply()
                        setTimeout(function() {
                            $control.trigger('click');
                        }, 0);
                    } 
                }
            };

            // On change event
            function onChange() {
                if ($scope.pipChanged) {
                    $scope.pipChanged({
                        $event: { sender: $scope.control },
                        $control: $scope.control
                    });
                }
            };

            function executeCallback() {
                // Execute callback
                if ($scope.pipCreated) {
                    $scope.pipCreated({
                        $event: { sender: $scope.control },
                        $control: $scope.control
                    });
                }
            };

        }
    );

})();

