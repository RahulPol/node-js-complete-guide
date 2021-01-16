const Product = require("../models/productModel");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        products,
        docTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      res.status(500).redirect("/error");
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findProductById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        docTitle: "Product Details",
      });
    })
    .catch((err) => {
      res.status(500).redirect("/error");
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        products,
        docTitle: "Index",
        path: "/",
      });
    })
    .catch((err) => {
      res.status(500).redirect("/error");
    });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    docTitle: "Your Cart",
    path: "/cart",
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    docTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
