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
                  pipRestProvider, pipSideNavProvider, pipAppBarProvider, pipEntryProvider, $mdIconProvider) {

            var content = [
                    {title: 'Document List',
                        state: 'documents',
                        url: '/documents',
                        controller: 'pipDocumentsController',
                        templateUrl: 'documents/documents.html'
                    }
                ],
                contentItem, i;
            
            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            pipAppBarProvider.globalSecondaryActions([
                {name: 'global.signout', title: 'SIGNOUT', state: 'signout'}
            ]);

            // String translations
            pipTranslateProvider.translations('en', {
                'DOCUMENTS': 'Documents',
                'SIGNOUT': 'Sign out',
                'DOCUMENT_LIST': 'Document List',
                'COLLAPSED': 'Collapsed',
                'DOCUMENT_LIST_EDIT': 'Document List Edit'
            });

            pipTranslateProvider.translations('ru', {
                'DOCUMENTS': 'Документы',
                'SIGNOUT': 'Выйти',
                'DOCUMENT_LIST': 'Список документов',
                'COLLAPSED': 'Раcкрытый',
                'DOCUMENT_LIST_EDIT': 'Редактирования списка документов'
            });

            for (i = 0; i < content.length; i++) {
                contentItem = content[i];
                $stateProvider.state(contentItem.state, contentItem);
            }

            pipAuthStateProvider.unauthorizedState('signin');
            pipAuthStateProvider.authorizedState('documents');

            $urlRouterProvider.otherwise(function ($injector, $location) {
                if ($location.$$path === '') {
                    return '/signin';
                }

                return '/documents';
            });

            // Configure REST API
            pipRestProvider.serverUrl('http://alpha.pipservices.net');

            // Configure navigation menu
            pipSideNavProvider.sections([
                {
                    links: [{title: 'DOCUMENTS', url: '/documents'}]
                },
                {
                    links: [{title: 'SIGNOUT', url: '/signout'}]
                }
            ]);
        }
    );

})(window.angular);
