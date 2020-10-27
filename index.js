'use strict';

const _ = require('lodash');

module.exports = exports = class EncodeEnvironmentVariableObjects {

  constructor(serverless, options) {
    this._serverless = serverless;
    this.commands = {
      initialize: {
        lifecycleEvents: [
          'package'
        ]
      }
    };

    this.hooks = {
      'before:initialize:package': this.beforeInitializePackage.bind(this)
    };
  }

  beforeDeployResources() {

    let envProperties = [];
    if (this._serverless.service.custom && this._serverless.service.custom.encodeEnvObjects) {
      envProperties = _.isString(this._serverless.service.custom.encodeEnvObjects) ? [this._serverless.service.custom.encodeEnvObjects] : this._serverless.service.custom.encodeEnvObjects;
    } else {
      envProperties = _.keys(this._serverless.service.provider.environment);
    }

    // encode global provider env objects
    this._serverless.service.provider.environment = this.encodeEnvironmentObjects(this._serverless.service.provider.environment, envProperties);

    // encode function specific env objects
    _.forEach(this._serverless.service.functions, (v, k) => {
      let envs = envProperties;
      if (!this._serverless.service.custom || !this._serverless.service.custom.encodeEnvObjects) {
        envs = envs.concat(_.keys(v.environment));
      }
      v.environment = this.encodeEnvironmentObjects(v.environment, envs);
    });

  }

  encodeEnvironmentObjects(envVars, envProperties) {
    if (_.isObject(envVars)) {
      _.forEach(envVars, (v, k) => {
        if (_.isObject(v) && _.indexOf(envProperties, k) >= 0) {
          envVars[k] = new Buffer(JSON.stringify(v)).toString('base64');
        }
      });
    }
    return envVars;
  }

};
