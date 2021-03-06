// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute
// in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push',
  'ionic.service.deploy',

  //controllers
  'starter.controllers',
  'starter.messagecontrollers',
  'starter.contactcontrollers',
  'starter.friendcirclecontrollers',
  'starter.homepagecontrollers',
  'starter.accountcontrollers',
  'SystemCtrls',

  //factories
  'ContactServiceFactory',
  'FactoryPersonalHomepageService',
  'FactoryFormat',
  'FactoryAuthService',
  'MessageServiceFactory',
  'EventServiceFactory',
  'IdSearchFactroy',

  //route
  'RouteConfig',

  //globalpara
  'GlobalPath',

  //zixia
  'angularLocalStorage'
])

/*
 .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
 localStorageServiceProvider
 .setPrefix('17SALSA')
 .setStorageType('localStorage')
 .setNotify(true, true)
 }])
 */

.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    // jscs:disable
    app_id: '301dd65b',
    // The public API key all services will use for this app
    api_key: 'd76bc552414571ce7024ed7a642e2c08a77c2c357f4647d2',
    // jscs:enable

    // TheGCMproject ID (project number) from your Google Developer Console (un-comment if used)
    //gcm_id: 'GCM_ID',
  })
}])

.config (['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true
}])

.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default remove this to show
    // the accessory bar above the keyboard
    // for form inputs
    if (window.cordova && window.cordova.plugins.Keyboard) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
    }
    if (window.StatusBar) {
      window.StatusBar.styleDefault()
    }
  })
}])

.run(function($rootScope, $location, AuthService, $state, $timeout, $log) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    $log.log('$stateChangeStart (toState:' + toState.name + ',fromState:' + fromState.name + ')' + fromParams)

    if (AuthService.isAuthenticated()) {
      return
    }

    if (toState.name === 'login') {
      return
    }

    event.preventDefault()
    $state.go('login')
  })
})
