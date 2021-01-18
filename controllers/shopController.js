const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        docTitle: "Product Details",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).redirect("/error");
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
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

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.fetchCart();
    const products = await Product.fetchAll();
    const cartProducts = [];
    for (product of products) {
      const prod = cart.products.find((p) => p.id == product.id);
      if (prod) {
        cartProducts.push({ productData: product, qty: prod.qty });
      }
    }
    res.render("shop/cart", {
      cartProducts,
      docTitle: "Your Cart",
      path: "/cart",
    });
  } catch (error) {
    res.status(500).redirect("/error");
  }
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId).then((product) => {
    Cart.addProducts(productId, product.price);
    res.redirect("/cart");
  });
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

exports.postCartDeleteItem = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then((product) => {
      Cart.deleteProductFromCart(productId, product.price).then(() => {
        return res.redirect("/cart");
      });
    })
    .catch((err) => {
      res.redirect("/error");
    });
};
