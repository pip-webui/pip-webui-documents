/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('appDocuments.Documents', []);

    thisModule.controller('DocumentsController',
        function ($scope, pipAppBar) {
            $scope.documents = [
                {
                    file_id: '56324968830c5b1b16bfaae5',
                    file_name: '5.jpg'
                },
                {
                    file_id: '568d3fdfec1f0f102a799965',
                    file_name: 'Фенист ясный сокол.jpg'
                },
                {
                    file_id: '568d3f70ec1f0f102a799963',
                    file_name: '13951160-R3L8T8D-1000-i16TusGXdPdIB.jpg'
                }
            ];
            $scope.documentList = null;

            $scope.onDocumentListCreated = function ($event) {
                console.log('Document list created');
                $scope.documentList = $event.sender;
            };

            $scope.onSaveDocumentsClick = function () {
                $scope.documentList.save(
                    // Success callback
                    function () {
                        console.log('Document list saved');
                    },
                    // Error callback
                    function (error) {
                        console.error(error);
                    }
                );
            };

            $scope.onResetDocumentsClick = function () {
                $scope.documentList.reset();
            };

            pipAppBar.showTitleText('DOCUMENTS');
            pipAppBar.showMenuNavIcon();
        }
    );

})();
