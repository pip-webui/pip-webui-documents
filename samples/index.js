(function (angular, _) {
    'use strict';

    var thisModule = angular.module('appDocuments',
        [
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'wu.masonry', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate',
            // Application Configuration must go first
            'pipSampleConfig',
            // Modules from WebUI Framework
            'pipCore', 'pipRest', 'pipData', 'pipBasicControls', 'pipDocuments',
            'pipRest.State', 'pipDropdown', 'pipLayout',
            // testing data modules (have some data for example)
            'pipWebuiTests',
            // Sample Application Modules
            'appDocuments.Documents'
        ]
    );

    thisModule.controller('pipSampleController',
        function ($scope, $rootScope, $state, $mdSidenav, pipTranslate, pipRest, pipToasts, pipTestAccount,
                  pipTestContent, pipSession, $mdTheming, $timeout, pipTheme) {

            pipTheme.setCurrentTheme($rootScope.$theme);

            $scope.serverUrl = pipTestAccount.getServerUrl();
            $scope.sampleAccount = pipTestAccount.getSamplerAccount();

            $scope.selected = {};
            $timeout(function () {
                $scope.selected.pageIndex = _.findIndex($scope.pages, {state: $state.current.name});
            });

            $scope.onNavigationSelect = function (state) {
                $state.go(state);
            };

            $scope.onDropdownSelect = function (state) {
                $scope.onNavigationSelect(state.state);
            };

            $scope.pages = [{
                state: 'document-list',
                title: 'Document list'
            }, {
                state: 'document-list-edit',
                title: 'Documnent list edit'
            }];

            $scope.isEntryPage = function () {
                return $state.current.name === 'signin' || $state.current.name === 'signup' ||
                    $state.current.name === 'recover_password' || $state.current.name === 'post_signup';
            };

        }
    );

})(window.angular, window._);
