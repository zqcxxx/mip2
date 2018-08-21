const req = require.context('./sub', true, /(utils|second)\.js$/)
console.log(req)
