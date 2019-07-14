var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2] || 80

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('超哥说：含查询字符串的路径\n' + pathWithQuery);

  if (path === '/' || path === '/index') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.write('<!DocType html>' +
      '<html>' +
      '<head><link rel="stylesheet" href="./style"></head>' +
      '<body>' +
      '<h1>游客您好， 欢迎来到小站</h1>' +
      '<script src="./main"></script>' +
      '</body>' +
      '</html>'
    );
    response.end();
  } else if (path === '/style') {
    response.setHeader('Content-Type', 'text/css');
    response.write('body {background: #ccc;} h1 {color: red;}');
    response.end();
  } else if (path === '/main') {
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    response.write('alert("欢迎来到小站")');
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请在浏览器里打开 http://localhost:' + port)


