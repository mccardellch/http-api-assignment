const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styles = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => respond(request, response, 200, index, 'text/html');
const getStyles = (request, response) => respond(request, response, 200, styles, 'text/css');
// ^ loads css files into the client page


const success = (request, response, acceptedTypes) => {
  // standardized response
  const message = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // response to JSON
  const responseString = JSON.stringify(message);

  // return JSON (default)
  return respond(request, response, 200, responseString, 'application/json');
};


const badRequest = (request, response, acceptedTypes, params) => {
  // standardized response
  const message = {
      message: 'This message has the required parameters',
      id: 'badRequest'
  };
    
  let statusCode = 200;

    //make sure information is valid
  if (!params.valid || params.valid !== 'true') {
    message.message = 'Missing valid query parameter set to true';
    message.id = 'badRequest';
    statusCode = 400; //update status code if missing param
  }
    
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message></response>`;
    
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }

  // response to JSON
  const responseString = JSON.stringify(message);

  // return JSON (default)
  return respond(request, response, statusCode, responseString, 'application/json');
};


const unauthorized = (request, response, acceptedTypes, params) => {
  // standardized response
  const message = {
      message: 'You have successfully viewed the content'
  };
    
  let statusCode = 200;

    //make sure information is valid
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    message.message = 'Missing loggedIn query parameter set to yes';
    message.id = 'unauthorized';
    statusCode = 401; //update status code if missing param
  }
    
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message><id>${message.id}</id></response>`;
    
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }

  // response to JSON
  const responseString = JSON.stringify(message);

  // return JSON (default)
  return respond(request, response, statusCode, responseString, 'application/json');
};

const forbidden = (request, response, acceptedTypes, params) => {
  // standardized response
  const message = {
      message: 'You do not have access to this content',
      id: 'forbidden'
  };
    
  let statusCode = 403;
    
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message><id>${message.id}</id></response>`;
    
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }

  // response to JSON
  const responseString = JSON.stringify(message);

  // return JSON (default)
  return respond(request, response, statusCode, responseString, 'application/json');
};

const internal = (request, response, acceptedTypes, params) => {
  // standardized response
  const message = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError'
  };
    
  let statusCode = 500;
    
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message><id>${message.id}</id></response>`;
    
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }

  // response to JSON
  const responseString = JSON.stringify(message);

  // return JSON (default)
  return respond(request, response, statusCode, responseString, 'application/json');
};

const notImplemented = (request, response, acceptedTypes, params) => {
  // standardized response
  const message = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented'
  };
    
  let statusCode = 501;
    
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message><id>${message.id}</id></response>`;
    
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }

  // response to JSON
  const responseString = JSON.stringify(message);

  // return JSON (default)
  return respond(request, response, statusCode, responseString, 'application/json');
};

const notFound= (request, response, acceptedTypes, params) => {
  // standardized response
  const message = {
    message: 'The page you are looking for was not found',
    id: 'notFound'
  };
    
  let statusCode = 404;
    
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${message.message}</message><id>${message.id}</id></response>`;
    
    return respond(request, response, statusCode, responseXML, 'text/xml');
  }

  // response to JSON
  const responseString = JSON.stringify(message);

  // return JSON (default)
  return respond(request, response, statusCode, responseString, 'application/json');
};

module.exports = {
  getIndex,
  getStyles,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound
};
