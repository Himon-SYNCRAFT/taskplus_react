// tests.webpack.js
var context = require.context('./src', true, /_test\.jsx?$/);
context.keys().forEach(context);
