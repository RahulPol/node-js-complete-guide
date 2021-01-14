const Product = require("../models/productModel");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  res.render("shop", {
    products: Product.fetchAll(),
    docTitle: "Shop",
    path: "/",
  });
};
