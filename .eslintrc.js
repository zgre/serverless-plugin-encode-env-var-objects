module.exports = exports = {
  "env": {
    "browser": false,
    "es6": true,
    "mocha": true,
    "node": true
  },
  "extends": "standard",
  "plugins": [
    "standard",
    "promise",
    "mocha"
  ],
  "rules": {
    "semi": [
      "error",
      "always"
    ],
    "padded-blocks": [
      "error",
      {
        "switches": "always",
        "classes": "always"
      }
    ],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "never"
      }
    ],
    "no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "args": "none"
      }
    ],
    "mocha/no-exclusive-tests": "error"
  },
};