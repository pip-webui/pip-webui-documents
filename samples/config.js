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

            var links = [
                    { title: 'Composite controls', href: '/pip-webui-composite/index.html'},
                    { title: 'Basic controls', href: '/pip-webui-controls/index.html'},
                    { title: 'Core', href: '/pip-webui-core/index.html'},
                    { title: 'CSS components', href: '/pip-webui-css/index.html'},
                    { title: 'Entry pages', href: '/pip-webui-entry/index.html'},
                    { title: 'Error handling', href: '/pip-webui-errors/index.html'},
                    { title: 'Guidance components', href: '/pip-webui-guidance/index.html'},
                    { title: 'Help components', href: '/pip-webui-help/index.html'},
                    { title: 'Layouts', href: '/pip-webui-layouts/index.html'},
                    { title: 'Location Controls', href: '/pip-webui-locations/index.html'},
                    { title: 'Navigation controls', href: '/pip-webui-nav/index.html'},
                    { title: 'Picture controls', href: '/pip-webui-pictures/index.html'},
                    { title: 'REST API', href: '/pip-webui-rest/index.html'},
                    { title: 'Settings components', href: '/pip-webui-settings/index.html'},
                    { title: 'Support components', href: '/pip-webui-support/index.html'},
                    { title: 'Test Framework', href: '/pip-webui-test/index.html'}
                ];

            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            pipAppBarProvider.globalSecondaryActions([
                {name: 'global.signout', title: 'SIGNOUT', state: 'signout'}
            ]);

            // String translations
            pipTranslateProvider.translations('en', {
                DOCUMENTS: 'Document controls',
                SIGNOUT: 'Sign out',
                DOCUMENT_LIST: 'Document List',
                COLLAPSED: 'Collapsed',
                DOCUMENT_LIST_EDIT: 'Document List Edit',
                WITH_ICON: 'with icon'
            });

            pipTranslateProvider.translations('ru', {
                DOCUMENTS: 'Document контролы',
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
                }/*, Links only for publishing samples
                {
                    links: links
                }
                /*{
                    links: [{title: 'SIGNOUT', url: '/signout'}]
                }*/
            ]);
        }
    );

})(window.angular);
