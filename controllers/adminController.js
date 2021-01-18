const Product = require("../models/productModel");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        products,
        docTitle: "Admin Products",
        path: "/admin/products",
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
  const title = req.body.title;
  const imageUrl =
    "https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png";
  const price = req.body.price;
  const description = req.body.description;

  // Product.create({
  //   title: product.title
  // })
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
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

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageURL = req.body.imageURL;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedImageURL,
    updatedPrice,
    updatedDescription
  );
  updatedProduct.save().then(() => {
    res.redirect("/admin/products");
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.delete(productId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      res.redirect("/error");
    });
};
