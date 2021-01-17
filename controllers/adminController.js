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
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(
    req.body.title,
    "https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png",
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

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit == "true" ? true : false;
  if (!Boolean(editMode)) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  Product.findProductById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        product,
        docTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
      });
    })
    .catch((err) => {
      res.redirect("/error");
    });
};
