'use strict';

const _ = require('lodash');

module.exports = exports = class EncodeEnvironmentVariableObjects {

  constructor(serverless, options) {
    this._serverless = serverless;
    this.commands = {
      deploy: {
        lifecycleEvents: [
          'resources'
        ]
      }
    };

    this.hooks = {
      'before:deploy:resources': this.beforeDeployResources.bind(this)
    };
  }

  beforeDeployResources() {
    // encode global provider env objects
    this._serverless.service.provider.environment = this.encodeEnvironmentObjects(this._serverless.service.provider.environment);
    // encode function specific env objects
    _.forEach(this._serverless.service.functions, (v, k) => {
      v.environment = this.encodeEnvironmentObjects(v.environment);
    });
  }

  encodeEnvironmentObjects(envs) {
    if (_.isObject(envs)) {
      _.forEach(envs, (v, k) => {
        if (_.isObject(v)) {
          envs[k] = new Buffer(JSON.stringify(v)).toString('base64');
        }
      });
    }
    return envs;
  }

};
