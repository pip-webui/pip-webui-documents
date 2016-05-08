/* global angular */

(function () {
    'use strict';

    var content = [
        { title: 'Document List', state: 'documents', url: '/documents', controller: 'DocumentsController', templateUrl: 'documents.html' }
    ];

    var thisModule = angular.module('appDocuments', 
        [
            // 3rd Party Modules
            'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
            'ngMaterial', 'wu.masonry', 'LocalStorageModule', 'angularFileUpload', 'ngAnimate',
            // Modules from WebUI Framework
			'pipCore', 'pipRest', 'pipData', 'pipBasicControls', 'pipDocuments',
            // testing data modules (have some data for example)
            'pipWebuiTests',
            // Sample Application Modules
            'appDocuments.Documents'
        ]
    );

    thisModule.config(function (pipTranslateProvider, $stateProvider, $urlRouterProvider, $mdIconProvider, $mdThemingProvider) {
            $mdIconProvider.iconSet('icons', '../../node_modules/pip-webui-css/dist/images/icons.svg', 512);


            // String translations
            pipTranslateProvider.translations('en', {
                'APPLICATION_TITLE': 'WebUI Sampler',

                'blue': 'Blue Theme',
                'green': 'Green Theme',
                'pink': 'Pink Theme',
                'grey': 'Grey Theme',
                'GOAL': 'goal'
            });

            pipTranslateProvider.translations('ru', {
                'APPLICATION_TITLE': 'WebUI Демонстратор',

                'blue': 'Голубая тема',
                'green': 'Зеленая тема',
                'pink': 'Розовая тема',
                'grey': 'Серая тема',
                'GOAL': 'цель'
            });

            for (var i = 0; i < content.length; i++) {
                var contentItem = content[i];
                $stateProvider.state(contentItem.state, contentItem);
            }

            $urlRouterProvider.otherwise('/activities');

        } 
    );

    thisModule.controller('AppController',
        function ($scope, $rootScope, $state, $mdSidenav, pipTranslate, pipRest, pipToasts, pipTestAccount,
                  pipTestContent, pipSession, $mdTheming, localStorageService, pipTheme) {
            $scope.languages = ['en', 'ru'];
            $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));
            pipTheme.setCurrentTheme($rootScope.$theme);

            $scope.serverUrl = pipTestAccount.getServerUrl();
            $scope.sampleAccount = pipTestAccount.getSamplerAccount();

            $scope.selected = {
                theme: $rootScope.$theme,
                tab: 0
            };

            $scope.content = content;
            $scope.menuOpened = false;

            $scope.onLanguageClick = onLanguageClick;
            $scope.onThemeClick = onThemeClick;
            $scope.onSwitchPage = onSwitchPage;
            $scope.onToggleMenu = onToggleMenu;
            $scope.isActiveState = isActiveState;


            // Update page after language changed
            $rootScope.$on('languageChanged', function(event) {
                console.log('Reloading...');
                console.log($state.current);
                console.log($state.params);

                $state.reload();
            });

            // Update page after theme changed
            $rootScope.$on('themeChanged', function(event) {
                $state.reload();
            });

            // Connect to server
            openConnection();

            return;

            function onLanguageClick(language) {
                pipTranslate.use(language);
            };

            function onThemeClick(theme) {
                $rootScope.$theme = theme;
                pipTheme.setCurrentTheme(theme);
            };

            function onSwitchPage(state) {
                $mdSidenav('left').close();
                $state.go(state);
            };

            function onToggleMenu() {
                $mdSidenav('left').toggle();
            };

            function isActiveState(state) {
                return $state.current.name == state;
            };

            function openConnection() {
                $rootScope.$routing = true;
                pipSession.signin(
                    {
                        serverUrl: $scope.serverUrl,
                        email: $scope.sampleAccount.email,
                        password: $scope.sampleAccount.password
                    },
                    function(user) {
                        $rootScope.$party = {
                            id: user.id,
                            name: user.name
                        };
                        $rootScope.$user = user;
                        $rootScope.$theme = user.theme;
                        $rootScope.$routing = false;
                        pipTheme.setCurrentTheme($rootScope.$theme);
                        pipToasts.showNotification('Signed in as ' + user.name, ['ok'])
                    },
                    function(err) {
                        $rootScope.$routing = false;
                        pipToasts.showError('Failed to signed in');
                    }
                );
            };

        }
    );

})();
