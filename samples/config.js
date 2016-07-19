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
                DOCUMENT_LIST_EDIT: 'Document List Edit',
                WITH_ICON: 'with icon'
            });

            pipTranslateProvider.translations('ru', {
                DOCUMENTS: 'Документы',
                SIGNOUT: 'Выйти',
                DOCUMENT_LIST: 'Список документов',
                COLLAPSED: 'Раcкрытый',
                DOCUMENT_LIST_EDIT: 'Редактирования списка документов',
                WITH_ICON: 'с иконкой'
            });

            pipStateProvider
                .state('document-list', {
                    url: '/list',
                    controller: 'pipDocumentsController',
                    templateUrl: 'document_list_sample/document-list.html',
                    auth: false
                })
                .state('document-list-edit', {
                    url: '/list-edit',
                    controller: 'pipDocumentsController',
                    templateUrl: 'document_list_edit_sample/document-list-edit.html',
                    auth: false
                });

            $urlRouterProvider.otherwise('/list');

            // pipAuthStateProvider.unauthorizedState('document-list');
            // pipAuthStateProvider.authorizedState('document-list');

            // Configure REST API
            pipRestProvider.serverUrl('http://alpha.pipservices.net');

            // Configure navigation menu
            pipSideNavProvider.sections([
                {
                    links: [{title: 'DOCUMENTS', url: '/list'}]
                }
                /*{
                    links: [{title: 'SIGNOUT', url: '/signout'}]
                }*/
            ]);
        }
    );

})(window.angular);
