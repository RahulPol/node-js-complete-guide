const Product = require("../models/productModel");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).redirect("/error");
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop", {
        products,
        docTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      res.status(500).redirect("/error");
    });
};
