const express = require('express');
const dev = process.env.NODE_ENV !== 'production'
const next = require('next')
const app = next({dev})
const bodyParser = require('body-parser');
const handle = app.getRequestHandler()

const port = process.env.PORT || 3001;

let healthRoutes = require('./routes/health');
let usersRoutes = require('./routes/users');

app.prepare().then(() => {

  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded

  server.use('/health', healthRoutes)
  server.use('/users', usersRoutes)

  server.listen(port,  (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port);
  })

  server.get('*', (req, res) => {
      handle(req, res);
  })

}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})