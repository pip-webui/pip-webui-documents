/**
 * @file Document list control
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo
 * - Improve samples in sampler app
 */

(function (angular, _) {
    'use strict';

    var thisModule = angular.module('pipDocumentList', ['pipCore', 'pipDataDocument', 'pipFocused', 'pipDocuments.Templates']);

    thisModule.config(function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            DOCUMENTS_ATTACHED: 'document(s) attached',
            ERROR_DOCUMENTS_LOADED: 'Error: <%= error_number %> document(s) are not loaded'
        });
        pipTranslateProvider.translations('ru', {
            DOCUMENTS_ATTACHED: 'документов добавлено',
            ERROR_DOCUMENTS_LOADED: 'Ошибка: <%= error_number %> документ(ов) не загружено'
        });
    });

    thisModule.directive('pipDocumentList',
        function ($parse, $rootScope, pipUtils, pipDataDocument, pipToasts, pipTranslate) {  // eslint-disable-line no-unused-vars
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
        }
    );

})(window.angular, window._);

