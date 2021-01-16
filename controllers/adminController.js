const Product = require("../models/productModel");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        products,
        docTitle: "Admin Products",
        path: "admin/products",
      });
    })
    .catch((err) => {
      res.status(500).redirect("/error");
    });
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(
    req.body.title,
    req.body.imageURL,
    req.body.price,
    req.body.description
  );
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).redirect("/error");
    });
};
