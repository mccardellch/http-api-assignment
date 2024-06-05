const http = require('http');
const url = require('url');
const query = require('querystring');
const responseHandler = require('./responses.js'); // importing our files and scoping them to variables

// since we are running a server, we need a Port to run on
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getStyles,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  '/notFound': responseHandler.notFound
};

// start server and listen for HTTP traffic
const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const params = query.parse(parsedURL.query);

  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, acceptedTypes, params);
    // call the function attached to this key
  } else {
    urlStruct.notFound(request, response, params);
    // otherwise call notFound function and pass request and response
  }

  console.dir(parsedURL);
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
