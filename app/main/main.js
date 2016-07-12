'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngLodash',
  'pascalprecht.translate',
  'ngCordova',
  'LocalForageModule'
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/list');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
  .state('main', {
    url: '/main',
    abstract: true,
    templateUrl: 'main/templates/menu.html',
    controller: 'MenuCtrl as menu'
  })
  .state('main.list', {
    url: '/list',
    views: {
      'pageContent': {
        templateUrl: 'main/templates/list.html',
        // controller: '<someCtrl> as ctrl'
      }
    }
  })
  .state('main.listDetail', {
    url: '/list/detail',
    views: {
      'pageContent': {
        templateUrl: 'main/templates/list-detail.html',
        // controller: '<someCtrl> as ctrl'
      }
    }
  })
  .state('main.debug', {
    url: '/debug',
    views: {
      'pageContent': {
        templateUrl: 'main/templates/debug.html',
        controller: 'DebugCtrl as ctrl'
      }
    }
  })
  .state('main.settings', {
    url: '/settings',
    views: {
      'pageContent': {
        templateUrl: 'main/templates/settings.html',
        controller: 'SettingsCtrl as ctrl'
      }
    }
  });
  $translateProvider.useStaticFilesLoader({
    prefix: 'main/assets/languages/',
    suffix: '.json'
  });
  $translateProvider.registerAvailableLanguageKeys(['en'], {'en': 'en'});
  $translateProvider.preferredLanguage('en');
  $translateProvider.fallbackLanguage('en');
  $translateProvider.determinePreferredLanguage();
});
