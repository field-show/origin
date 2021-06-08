const Gun = require('gun')
const gun = Gun({ web: require('http').createServer().listen(8080) })
