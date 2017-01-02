# serverless-plugin-encode-env-var-objects

Serverless plugin to encode any environment variable objects.

AWS Lambda/CloudFormation does not allow for environment variables to be of type object.  

This [Serverless](http://serverless.com) plugin will check any environment variables under `provider` and `functions`.  If the environment variable is an object the plugin will resave the variable as a base64 stringified version. 

Base64 encoding is required because commas are not allowed in AWS Lambda environment variables.

To use, add it to your `serverless.yml` under plugins:

```
plugins:
  - serverless-plugin-encode-env-var-objects
```