/* */ 
(function(process) {
  module.exports = function(config) {
    var customLaunchers = {
      sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '46'
      },
      sl_chrome_beta: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: 'beta'
      },
      sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '44'
      },
      sl_safari7: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.9',
        version: '7'
      },
      sl_safari8: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.10',
        version: '8'
      },
      sl_safari9: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.11',
        version: '9.0'
      },
      sl_ios7: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.11',
        version: '7.1'
      },
      sl_ios8: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.11',
        version: '8.4'
      },
      sl_ios9: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.11',
        version: '9.1'
      },
      sl_ie9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2008',
        version: '9'
      },
      sl_ie10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2012',
        version: '10'
      },
      sl_ie11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
      },
      sl_edge: {
        base: 'SauceLabs',
        browserName: 'microsoftedge',
        platform: 'Windows 10',
        version: '20.10240'
      },
      sl_android_4_1: {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: '4.1'
      },
      sl_android_4_2: {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: '4.2'
      },
      sl_android_4_3: {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: '4.3'
      },
      sl_android_4_4: {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: '4.4'
      },
      sl_android5: {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: '5.1'
      }
    };
    config.set({
      basePath: '',
      frameworks: ['browserify', 'jasmine'],
      files: ['node_modules/babel-polyfill/dist/polyfill.js', 'spec-js/helpers/marble-testing.js', 'spec-js/helpers/test-helper.js', 'spec-js/helpers/ajax-helper.js', 'spec-js/**/*-spec.js'],
      exclude: [],
      preprocessors: {'spec-js/**/*.js': ['browserify']},
      reporters: ['dots', 'saucelabs'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      customLaunchers: customLaunchers,
      browsers: process.env.TRAVIS ? Object.keys(customLaunchers) : ['Chrome'],
      singleRun: true,
      concurrency: 1,
      browserNoActivityTimeout: 30000,
      sauceLabs: {
        testName: 'RxJS 5 browser test',
        options: {
          'command-timeout': 600,
          'idle-timeout': 12000,
          'max-duration': 10800,
          'recordScreenshots': true
        }
      }
    });
  };
})(require('process'));
