const Product = require("../models/productModel");

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts({})
    //Product.findAll()
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

  req.user
    .createProduct({
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

  req.user
    .getProducts({ where: { id: productId } })
    // Product.findById(productId)
    .then((products) => {
      const product = products[0];
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
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  Product.findById(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;
      return product.save();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      res.redirect("/error");
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      res.redirect("/error");
    });
  // Product.delete(productId)
  //   .then(() => {
  //     res.redirect("/admin/products");
  //   })
  //   .catch((err) => {
  //     res.redirect("/error");
  //   });
};
