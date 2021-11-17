const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product');

const app = express();

mongoose.connect('mongodb+srv://Emeric:ygNtmCA9z2qiTRIG@cluster0.gp1ym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/products', (req, res, next) => {
    delete req.body._id;
    const product = new Product({
      ...req.body
    });
    product.save()
      .then(() => res.status(201).json({product}))
      .catch(error => res.status(400).json({ error }));
  });

  app.get('/api/products', (req, res, next) => {
    Product.find()
      .then(products => res.status(200).json({products}))
      .catch(error => res.status(400).json({ error }));
  });

module.exports = app;