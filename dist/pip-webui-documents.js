/**
 * @file Registration of WebUI documents controls
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    angular.module('pipDocuments', [
        'pipDocumentList',
        'pipDocumentListEdit'
    ]);

})(window.angular);

(function(module) {
try {
  module = angular.module('pipDocuments.Templates');
} catch (e) {
  module = angular.module('pipDocuments.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('document_list/document_list.html',
    '<!--\n' +
    '@file Document list control content\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<md-button class="pip-documents-name"\n' +
    '           ng-class="{\'lp24-flex rp16\': pipDocumentIcon}"\n' +
    '           ng-click="onTitleClick($event); onResize()"\n' +
    '           aria-label="RESIZE">\n' +
    '\n' +
    '    <div class="layout-align-start-center layout-row w-stretch">\n' +
    '        <md-icon md-svg-icon="icons:document" ng-class="{\'pip-icon\': pipDocumentIcon}" ng-if="pipDocumentIcon"></md-icon>\n' +
    '        <span class="pip-documents-text">\n' +
    '            {{documents.length}} {{::\'DOCUMENTS_ATTACHED\' | translate}}\n' +
    '        </span>\n' +
    '\n' +
    '        <md-icon class="icon-up" md-svg-icon="icons:triangle-up"></md-icon>\n' +
    '        <md-icon class="icon-down" md-svg-icon="icons:triangle-down"></md-icon>\n' +
    '    </div>\n' +
    '</md-button>\n' +
    '<div pip-focused class="pip-documents-container bm8"  ng-class="{\'lp24-flex rp24-flex\': pipDocumentIcon}">\n' +
    '    <md-button class="pip-document-download md-primary"\n' +
    '               ng-class="{\'pip-focusable\' : !ngDisabled()}"\n' +
    '               href="{{::documentUrl(document)}}"\n' +
    '               target="_blank"\n' +
    '               ng-disabled="ngDisabled() || document.error"\n' +
    '               ng-repeat="document in documents track by document.file_id"\n' +
    '               aria-label="DOCUMENT">\n' +
    '\n' +
    '        <div class="pip-default-icon">\n' +
    '            <md-icon md-svg-icon="icons:{{::documentList.icon}}"></md-icon>\n' +
    '        </div>\n' +
    '        <div class="pip-document-title">\n' +
    '            {{::document.file_name}}\n' +
    '        </div>\n' +
    '    </md-button>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipDocuments.Templates');
} catch (e) {
  module = angular.module('pipDocuments.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('document_list/document_list_collapse.html',
    '<!--\n' +
    '@file Document list control content (collapsable version)\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '\n' +
    '<div class="pip-documents-name" ng-click="onTitleClick($event); onResize()">\n' +
    '    <span class="pip-documents-text">\n' +
    '        {{documents.length}} {{::\'DOCUMENTS_ATTACHED\' | translate}}\n' +
    '    </span>\n' +
    '\n' +
    '    <md-icon class="icon-up" md-svg-icon="icons:triangle-up"></md-icon>\n' +
    '    <md-icon class="icon-down" md-svg-icon="icons:triangle-down"></md-icon>\n' +
    '</div>\n' +
    '<div pip-focused class="pip-documents-container bm8">\n' +
    '    <md-button class="pip-document-download pip-focusable md-primary"\n' +
    '               href="{{::document.url}}"\n' +
    '               target="_blank"\n' +
    '               ng-repeat="document in documents track by document.file_id"\n' +
    '               aria-label="DOCUMENT">\n' +
    '        <div class="pip-default-icon">\n' +
    '            <md-icon md-svg-icon="icons:{{::icon}}"></md-icon>\n' +
    '        </div>\n' +
    '        <div class="pip-document-title">\n' +
    '            {{::document.file_name}}\n' +
    '        </div>\n' +
    '    </md-button>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('pipDocuments.Templates');
} catch (e) {
  module = angular.module('pipDocuments.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('document_list_edit/document_list_edit.html',
    '<!--\n' +
    '@file Document list edit control content\n' +
    '@copyright Digital Living Software Corp. 2014-2016\n' +
    '-->\n' +
    '<div pip-focusable>\n' +
    '	<div class="pip-document-upload pointer md-primary "\n' +
    '		 ng-class="{\'pip-focusable\' : !ngDisabled(), \'pip-item-error\' : item.state == \'error\'}"\n' +
    '		 ng-keydown="onKeyDown($event, item)"\n' +
    '		 tabindex="{{ ngDisabled() ? -1 : 0 }}"\n' +
    '		 ng-repeat="item in control.items | filter: filterItem">\n' +
    '\n' +
    '		<div class="pip-default-icon"\n' +
    '			 ng-class="{ \'pip-document-new\': item.id == null }">\n' +
    '			<md-icon pip-cancel-drag="true" class="md-primary" ng-if="item.state == \'original\' || item.state == \'added\'"\n' +
    '					 md-svg-icon="icons:{{::documentList.icon}}">\n' +
    '			</md-icon>\n' +
    '			<md-icon pip-cancel-drag="true" class="md-warn" ng-if="item.state == \'error\'"\n' +
    '					 md-svg-icon="icons:{{::documentList.iconError}}">\n' +
    '			</md-icon>\n' +
    '		</div>\n' +
    '\n' +
    '		<div class="pip-document-title" pip-cancel-drag="true">\n' +
    '			{{::item.name}}\n' +
    '		</div>\n' +
    '		<md-button ng-click="onDelete(item)"\n' +
    '				   ng-disabled="ngDisabled() || control.uploading"\n' +
    '				   tabindex="-1"\n' +
    '				   ng-hide="ngDisabled()"\n' +
    '				   class="md-icon-button" aria-label="DELETE">\n' +
    '\n' +
    '			<md-icon md-svg-icon="icons:cross" pip-cancel-drag="true"></md-icon>\n' +
    '		</md-button>\n' +
    '		<md-progress-linear ng-show="item.uploading" ng-value="item.progress"></md-progress-linear>\n' +
    '	</div>\n' +
    '	\n' +
    '	<button class="pip-document-upload pip-document-drop "\n' +
    '			ng-class="{\'pip-focusable\' : !ngDisabled()}"\n' +
    '			ng-keydown="onKeyDown($event)" tabindex="0"\n' +
    '			ng-file-drop ng-file-select ng-file-change="onSelect($files)"\n' +
    '			ng-multiple="true"\n' +
    '			ng-disabled="ngDisabled() || control.uploading"\n' +
    '			aria-label="UPLOAD">\n' +
    '\n' +
    '		<div class="pip-default-icon">\n' +
    '			<md-icon pip-cancel-drag="true" md-svg-icon="icons:{{::documentList.icon}}"></md-icon>\n' +
    '		</div>\n' +
    '		<div class="pip-default-text">\n' +
    '			<span>\n' +
    '				{{documentList.text | translate}}\n' +
    '			</span>\n' +
    '		</div>\n' +
    '	</button>\n' +
    '	<div class="clearfix"></div>\n' +
    '</div>\n' +
    '');
}]);
})();

/**
 * @file Document list control
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Improve samples in sampler app
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipDocumentList', ['pipCore', 'pipDataDocument', 'pipFocused', 'pipDocuments.Templates']);

    thisModule.config(['pipTranslateProvider', function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            DOCUMENTS_ATTACHED: 'document(s) attached',
            ERROR_DOCUMENTS_LOADED: 'Error: <%= error_number %> document(s) are not loaded'
        });
        pipTranslateProvider.translations('ru', {
            DOCUMENTS_ATTACHED: 'документов добавлено',
            ERROR_DOCUMENTS_LOADED: 'Ошибка: <%= error_number %> документ(ов) не загружено'
        });
    }]);

    thisModule.directive('pipDocumentList',
        ['$parse', '$rootScope', 'pipUtils', 'pipDataDocument', 'pipToasts', 'pipTranslate', function ($parse, $rootScope, pipUtils, pipDataDocument, pipToasts, pipTranslate) {  // eslint-disable-line no-unused-vars
            return {
                restrict: 'EA',
                scope: true,
                templateUrl: 'document_list/document_list.html',
                link: function ($scope, $element, $attrs) {
                    var documentsGetter = $parse($attrs.pipDocuments),
                        $documentsContainer = $element.children('.pip-documents-container'),
                        $up = $element.find('.icon-up'),
                        $down = $element.find('.icon-down'),
                        collapsable = pipUtils.toBoolean($attrs.pipCollapse);

                    $scope.documentList = {};
                    $scope.documentList.icon = 'document';
                    $scope.documents = documentsGetter($scope);

                    if ($attrs.pipDocumentIcon) {
                        $scope.pipDocumentIcon = true;
                    }

                    $scope.showDocuments = collapsable;

                    if (!collapsable) {
                        $up.hide();
                        $documentsContainer.hide();
                    } else {
                        $down.hide();
                    }

                    if ($attrs.disabled) {
                        $up.hide();
                        $down.hide();
                    }

                    // Also optimization to avoid watch if it is unnecessary
                    if (pipUtils.toBoolean($attrs.pipRebind)) {
                        $scope.$watch(documentsGetter, function (newValue) {
                            if (differentDocumentList(newValue)) {
                                $scope.documents = newValue;
                            }
                        });
                    }

                    $scope.onTitleClick = onTitleClick;
                    $scope.documentUrl = documentContentUrl;

                    // Add class
                    $element.addClass('pip-document-list');

                    function differentDocumentList(newList) {
                        var i, obj;

                        if (!$scope.documents && newList) { return true; }
                        if ($scope.documents && !newList) { return true; }
                        if ($scope.documents.length !== newList.length) { return true; }

                        for (i = 0; i < newList.length; i++) {
                            obj = _.find($scope.documents, {file_id: newList[i].file_id});

                            if (obj === undefined) { return true; }
                        }

                        return false;
                    }

                    function onTitleClick(event) {
                        if (event) { event.stopPropagation(); }

                        if ($attrs.disabled) { return; }

                        $scope.showDocuments = !$scope.showDocuments;
                        $up[$scope.showDocuments ? 'show' : 'hide']();
                        $down[!$scope.showDocuments ? 'show' : 'hide']();
                        $documentsContainer[$scope.showDocuments ? 'show' : 'hide']();
                    }

                    function documentContentUrl(document) {
                        return pipDataDocument.getDocumentContentUrl(document.file_id);
                    }
                }
            };
        }]
    );

})(window.angular, window._);


/**
 * @file Document list edit control
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Improve samples in sampler app
 * - Add add/remove/hover animations
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipDocumentListEdit',
        ['ui.event', 'pipCore', 'pipFocused', 'pipDataDocument', 'pipDocuments.Templates']);

    thisModule.config(['pipTranslateProvider', function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            DOCUMENT_LIST_EDIT_TEXT: 'Click here to add a document',
            ERROR_TRANSACTION_IN_PROGRESS: 'Transaction is in progress. Please, wait until it\'s finished or abort'
        });
        pipTranslateProvider.translations('ru', {
            DOCUMENT_LIST_EDIT_TEXT: 'Нажмите сюда, чтобы добавить документ',
            ERROR_TRANSACTION_IN_PROGRESS: 'Транзакция еще не завершена. Подождите окончания или прервите её'
        });
    }]);

    thisModule.directive('pipDocumentListEdit',
        function () {
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
        ['$scope', '$rootScope', '$element', '$attrs', '$parse', '$timeout', 'pipDataDocument', 'pipUtils', function ($scope, $rootScope, $element, $attrs, $parse, $timeout, pipDataDocument, pipUtils) {
            var
                $control = $element.children('.pip-picture-drop'),
                itemPin = 0;

            $scope.documentList = {};
            $scope.documentList.text = $attrs.pipDefaultText || 'DOCUMENT_LIST_EDIT_TEXT';
            $scope.documentList.icon = $attrs.pipDefaultIcon || 'document';
            $scope.documentList.iconError = 'warn-circle';
            $scope.documentStartState = pipUtils.toBoolean($scope.pipAddedDocument) ? 'copied' : 'original';
            $scope.cancelDrag = pipUtils.toBoolean($attrs.pipCanselDrag) === true;

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
                function (newValue) {
                    if (!_.isEqual(newValue, $scope.pipDocuments)) {
                        $scope.control.reset();
                    }
                }
            );

            function getItems() {
                var
                    documents = $scope.pipDocuments,
                    items = [],
                    i;

                if (documents === null || documents.length === 0) {
                    return items;
                }

                for (i = 0; i < documents.length; i++) {
                    items.push({
                        pin: itemPin++,
                        id: documents[i].file_id,
                        name: documents[i].file_name,
                        uploading: false,
                        uploaded: false,
                        progress: 0,
                        file: null,
                        state: $scope.documentStartState // 'original'
                    });
                }

                return items;
            }

            function setItems() {
                var item, i;

                // Clean the array
                if ($scope.pipDocuments && $scope.pipDocuments.length > 0) {
                    $scope.pipDocuments.splice(0, $scope.pipDocuments.length);
                }

                for (i = 0; i < $scope.control.items.length; i++) {
                    item = $scope.control.items[i];

                    if (item.id) {
                        $scope.pipDocuments.push({
                            file_id: item.id,
                            file_name: item.name
                        });
                    }
                }
            }

            function resetDocument() {
                $scope.control.uploading = 0;
                $scope.control.items = getItems();
            }

            function addItem(item, callback) {
                var
                    file = item.file,
                    fileReader = new FileReader();

                // Avoid double transactions
                if (item.uploading || item.file === null || item.state !== 'added') { return; }

                fileReader.onload = function (e) {
                    if (item.uploading) { return; }

                    item.uploading = true;


                    item.upload = pipDataDocument.createDocument({
                            name: item.file.name,
                            type: file.type,
                            data: e.target.result
                        }, function (response) {
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
                        function () {
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
            }

            function deleteItem(item, callback) {
                var control = $scope.control;

                // Avoid double transactions
                if (item.upload) {
                    item.upload.abort();
                    item.upload = null;
                }

                if (item.state !== 'deleted') { return; }

                pipDataDocument.deleteDocument(item.id, 
                    function () {
                        _.remove(control.items, {pin: item.pin});
                        callback();
                    }, 
                    function (data) {
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
            }

            function saveDocument(successCallback, errorCallback) {
                var control = $scope.control,
                    onItemCallback,
                    item,
                    i;

                if (control.uploading) {
                    if (errorCallback) {
                        errorCallback('ERROR_TRANSACTION_IN_PROGRESS');
                    }

                    return;
                }

                control.error = null;
                control.uploading = 0;

                onItemCallback = function (error) {
                    // Storing only the first error
                    if (error && !control.error) {
                        control.error = error;
                    }

                    control.uploading--;

                    // Finished uploading
                    if (control.uploading == 0) {
                        if (control.error) {
                            if (errorCallback) {
                                errorCallback(control.error);
                            } else {
                                console.error(control.error);   // eslint-disable-line no-console
                            }
                        } else {
                            setItems();
                            if (successCallback) {
                                successCallback();
                            }
                        }
                    }
                };

                for (i = 0; i < control.items.length; i++) {
                    item = control.items[i];

                    if (item.state === 'added') {
                        control.uploading++;
                        addItem(item, onItemCallback);
                    } else if (item.state === 'deleted') {
                        control.uploading++;
                        deleteItem(item, onItemCallback);
                    }
                }

                // Nothing was uploaded
                if (control.uploading == 0) {
                    if (successCallback) {
                        successCallback();
                    }
                }
            }

            function onAbort() {
                var control = $scope.control,
                    item,
                    i;

                for (i = 0; i < control.items.length; i++) {
                    item = control.items[i];

                    if (item.uploading) {
                        if (item.upload) {
                            item.upload.abort();
                        }

                        item.uploaded = false;
                        item.uploading = false;
                        item.progress = 0;
                        item.upload = null;
                    }
                }

                // Abort transaction
                control.uploading = 0;
            }

            // Visualization functions

            function filterItem(item) {
                return item.state !== 'deleted';
            }

            // Process user actions
            function onSelect($files) {
                var file,
                    i;

                $control.focus();

                if ($files == null || $files.length === 0) { return; }

                for (i = 0; i < $files.length; i++) {
                    file = $files[i];

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
            }

            function onDelete(item) {
                if (item.state === 'added' || item.state === 'copied') {
                    _.remove($scope.control.items, {pin: item.pin});
                } else {
                    item.state = 'deleted';
                }

                $scope.onChange();
            }

            function onKeyDown($event, item) {
                if (item) {
                    if ($event.keyCode === 46 || $event.keyCode === 8) {
                        if (item.state === 'added') {
                            _.remove($scope.control.items, { pin: item.pin });
                        } else {
                            item.state = 'deleted';
                        }

                        $scope.onChange();
                    }
                } else if ($event.keyCode === 13 || $event.keyCode === 32) {
                    // !! Avoid clash with $apply()
                    setTimeout(function () {
                        $control.trigger('click');
                    }, 0);
                }
            }

            // On change event
            function onChange() {
                if ($scope.pipChanged) {
                    $scope.pipChanged({
                        $event: { sender: $scope.control },
                        $control: $scope.control
                    });
                }
            }

            function executeCallback() {
                // Execute callback
                if ($scope.pipCreated) {
                    $scope.pipCreated({
                        $event: { sender: $scope.control },
                        $control: $scope.control
                    });
                }
            }

        }]
    );

})(window.angular, window._);


//# sourceMappingURL=pip-webui-documents.js.map
