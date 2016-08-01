// tests.webpack.js
var context = require.context('./components', true, /_test\.jsx?$/);
context.keys().forEach(context);
