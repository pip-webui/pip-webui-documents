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
            'pipCore', 'pipRest', 'pipData', 'pipBasicControls', 'pipDocuments', 'pipSideNav', 'pipAppBar', 'pipEntry',
            'pipRest.State',
            // testing data modules (have some data for example)
            'pipWebuiTests',
            // Sample Application Modules
            'appDocuments.Documents'
        ]
    );

    thisModule.config(function (pipStateProvider, $urlRouterProvider) {
        pipStateProvider
            .state('document-list', {
                url: '/list',
                controller: 'pipDocumentsController',
                templateUrl: 'document-list/document-list.html'
            })
            .state('document-list-edit', {
                url: '/list-edit',
                controller: 'pipDocumentsController',
                templateUrl: 'document-list-edit/document-list-edit.html'
            });

        $urlRouterProvider.otherwise('/list');
    });

    thisModule.controller('pipSampleController',
        function ($scope, $rootScope, $state, $mdSidenav, pipTranslate, pipRest, pipToasts, pipTestAccount,
                  pipTestContent, pipSession, $mdTheming, localStorageService, pipTheme) {

            $scope.languages = ['en', 'ru'];
            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));
            pipTheme.setCurrentTheme($rootScope.$theme);

            $scope.serverUrl = pipTestAccount.getServerUrl();
            $scope.sampleAccount = pipTestAccount.getSamplerAccount();

            $scope.openConnection = openConnection;

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

            // Connect to server
            // openConnection();

            // ------------------------------------------------------------------------------------------------------

            function openConnection() {
                $rootScope.$routing = true;
                pipSession.signin(
                    {
                        serverUrl: $scope.serverUrl,
                        email: $scope.sampleAccount.email,
                        password: $scope.sampleAccount.password
                    },
                    function (user) {
                        user.owner = true;
                        $rootScope.$party = {
                            id: user.id,
                            name: user.name
                        };
                        $rootScope.$user = user;
                        $rootScope.$theme = user.theme;
                        $rootScope.$routing = false;
                        pipTheme.setCurrentTheme($rootScope.$theme);
                        pipToasts.showNotification('Signed in as ' + user.name, ['ok']);
                    },
                    function () {
                        $rootScope.$routing = false;
                        pipToasts.showError('Failed to signed in');
                    }
                );
            }

        }
    );

})(window.angular, window._);
