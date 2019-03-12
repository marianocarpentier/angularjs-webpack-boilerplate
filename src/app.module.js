import angular from 'angular';
import config from './common/config';

import views from './views/views.module';
import parentComponents from './components/parent-components.module';

import '@uirouter/angularjs';
import 'angular-local-storage';

import './common/app.scss';
import './common/app.less';

angular
  .module(config.appName, [
    views,
    parentComponents,
    'ui.router',
    'LocalStorageModule'
  ])
  .config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider) => {
    Object.keys(config.stateUrls).forEach(stateKey => {
      $stateProvider.state({
        name: stateKey,
        component: stateKey,
        url: config.stateUrls[stateKey]
      });
    });

    $locationProvider.html5Mode(true);
  }]);

angular.element(document).ready(() => {
  angular.bootstrap(document, [config.appName], { strictDi: true });
});
