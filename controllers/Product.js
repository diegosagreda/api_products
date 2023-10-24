const mongoose = require('mongoose');
const Product = require('../models/Product');
const Client = require('../models/Client'); 
const Brand = require('../models/Brand');

const findAllProducts = (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
const getProductPrice = (req, res) => {
    const { user_id, nombre_producto } = req.params;

    Client.findOne({ _id: user_id })

      .then((client) => {
        if (!client) {
          return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        return Promise.all([Product.findOne({ nombre: nombre_producto }), client]);
      })
      .then(([product, client]) => {

        if (!product) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const brandIds = client.brands.map((brand) => brand._id.toString());
        const productBrandId = product.get('id_marca').toString();
        const precioBase = product.get('precioBase');

        if (!brandIds.includes(productBrandId)) {
          return res.status(200).json({ message: 'El cliente no tiene precio especial en esta marca', precio_normal: precioBase });
        }
  
        //Validation special prices
        if (product.get('specialPrices')) {
          const specialPrices = product.get('specialPrices');
          res.status(200).json({message: 'Precio especial', precio_especial: specialPrices['1001']});
        } else {
    
          return res.status(200).json({ message: 'La marca no tiene precios especiales', precio_normal: precioBase });
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  };

module.exports = {
  findAllProducts, getProductPrice
};
