const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => respond(request, response, index, 'text/html');

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  return respond(request, response, 200, responseJSON);
};

const badRequest = (request, response) => {
  const responseJSON = {
    message: 'This is message has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    return respond(request, response, 400, responseJSON);
  }

  return respond(request, response, 200, responseJSON);
};

const unauthorized = (request, response) => {
  const responseJSON = {
    message: 'You have successfully viewed the content',
  };

  if (!params.valid || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';

    return respond(request, response, 401, responseJSON);
  }

  return respond(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  return respond(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };

  return respond(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  return respond(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respond(request, response, 404, responseJSON);
};

module.exports = {
  getIndex,
  success,
  badRequest,
  unaauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,

};
