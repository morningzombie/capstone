const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const models = db.models;
const fileUpload = require('express-fileupload');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json());

const isLoggedIn = (req, res, next) => {
  console.log(req.user, 'req.user in isLoggedin');
  if (!req.user) {
    const error = Error('not authorized');
    error.status = 401;
    return next(error);
  }
  next();
};

const isAdmin = (req, res, next) => {
  //console.log(req.user.role, 'req.user.role');
  if (req.user.role !== 'ADMIN') {
    return next(Error('not authorized'));
  }
  next();
};

app.use((req, res, next) => {
  const token = req.headers.authorization;
  //console.log(token, 'token');
  if (!token) {
    return next();
  }
  db.findUserFromToken(token)
    .then((auth) => {
      req.user = auth;
      next();
    })
    .catch((ex) => {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    });
});

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

app.post('/api/auth', (req, res, next) => {
  db.authenticate(req.body)
    .then((token) => res.send({ token }))
    .catch(() => {
      const error = Error('NOT authorized');
      error.status = 401;
      next(error);
    });
});

app.get('/api/auth', isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

//============PHOTO UPLOAD=================//
app.use(fileUpload());

//Upload endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
//============PHOTO UPLOAD END=================//

app.get('/api/getCart', (req, res, next) => {
  db.getCart(req.user.id)
    .then((cart) => res.send(cart))
    .catch(next);
});

app.get('/api/getOrders', (req, res, next) => {
  db.getOrders(req.user.id)
    .then((orders) => res.send(orders))
    .catch(next);
});

app.post('/api/createOrder', (req, res, next) => {
  db.createOrder(req.user.id)
    .then((order) => res.send(order))
    .catch(next);
});

app.get('/api/getLineItems', (req, res, next) => {
  db.getLineItems(req.user.id)
    .then((lineItems) => res.send(lineItems))
    .catch(next);
});

app.post('/api/addToCart', (req, res, next) => {
  db.addToCart({ userId: req.user.id, productId: req.body.productId })
    .then((lineItem) => res.send(lineItem))
    .catch(next);
});

app.delete('/api/removeFromCart/:id', (req, res, next) => {
  db.removeFromCart({ userId: req.user.id, lineItemId: req.params.id })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.get('/api/products', (req, res, next) => {
  db.models.products
    .read()
    .then((products) => res.send(products))
    .catch(next);
});

Object.keys(models).forEach((key) => {
  app.get(`/api/${key}`, isLoggedIn, isAdmin, (req, res, next) => {
    models[key]
      .read({ user: req.user })
      .then((items) => res.send(items))
      .catch(next);
  });
  app.post(`/api/${key}`, (req, res, next) => {
    //console.log(req.body, 'user post');
    models[key]
      .create(req.body)
      .then((items) => res.send(items))
      .catch(next);
  });
});

//will make sure the get requests work with the router
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res, next) => {
  const error = {
    message: `page not found ${req.url} for ${req.method}`,
    status: 404,
  };
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err.status);
  res.status(err.status || 500).send({ message: err.message });
});

module.exports = app;
