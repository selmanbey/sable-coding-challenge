const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

const HTTP_PORT = 8000;
http.createServer(app).listen(HTTP_PORT, () => console.log('HTTP server running on port ' + HTTP_PORT ));

app.use(require("body-parser").text());  // node.js body parsing middleware

let TRANSACTIONS = require('./transactions.json');

/************************       API       *************************************/

app.get("/api/get-unresolved-transactions", (req, res) => {
  let unresolved_trs = TRANSACTIONS.filter( trs => !trs.status );

  res.json( unresolved_trs )
});

app.post("/api/resolve-transaction", (req, res) => {
  let resolved_trs = JSON.parse(req.body);

  TRANSACTIONS = TRANSACTIONS.map( (trs, index) => {
    if(trs.id === resolved_trs.id) {
      trs.status = resolved_trs.status;
    }
    return trs
  });

  res.json( { success: true })
});

/**********************  CLIENT RELATED SERVING  ******************************/

const CLIENT_BUILD_PATH = path.join(__dirname, '/client/build');  // the path to the build directory

app.use(express.static(CLIENT_BUILD_PATH)); // serves static files from /build folder

app.get('*', function(req, res) {
  // returns all remaining get requests to the react app so that react-router can handle inner-app routing.
  res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});
