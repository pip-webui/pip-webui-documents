/**
 * @file Global configuration for sample application
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipSampleConfig', ['pipRest.State', 'pipRest', 'pipEntry', 'pipSideNav',
        'pipAppBar']);

    // Configure application services before start
    thisModule.config(
        function ($mdThemingProvider, $stateProvider, $urlRouterProvider, pipAuthStateProvider, pipTranslateProvider,
                  pipRestProvider, pipSideNavProvider, pipAppBarProvider, pipStateProvider, $mdIconProvider) {

            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            pipAppBarProvider.globalSecondaryActions([
                {name: 'global.signout', title: 'SIGNOUT', state: 'signout'}
            ]);

            // String translations
            pipTranslateProvider.translations('en', {
                DOCUMENTS: 'Documents',
                SIGNOUT: 'Sign out',
                DOCUMENT_LIST: 'Document List',
                COLLAPSED: 'Collapsed',
                DOCUMENT_LIST_EDIT: 'Document List Edit'
            });

            pipTranslateProvider.translations('ru', {
                DOCUMENTS: 'Документы',
                SIGNOUT: 'Выйти',
                DOCUMENT_LIST: 'Список документов',
                COLLAPSED: 'Раcкрытый',
                DOCUMENT_LIST_EDIT: 'Редактирования списка документов'
            });

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

            pipAuthStateProvider.unauthorizedState('signin');
            pipAuthStateProvider.authorizedState('document-list');

            // Configure REST API
            pipRestProvider.serverUrl('http://alpha.pipservices.net');

            // Configure navigation menu
            pipSideNavProvider.sections([
                {
                    links: [{title: 'DOCUMENTS', url: '/list'}]
                },
                {
                    links: [{title: 'SIGNOUT', url: '/signout'}]
                }
            ]);
        }
    );

})(window.angular);
