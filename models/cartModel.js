const fs = require("fs");
const path = require("path");

const rootDirectory = require("../util/util");

const filePath = path.join(rootDirectory, "data/cart.json");

class Cart {
  static addProducts(id, productPrice) {
    // fetch the previous cart
    fs.readFile(filePath, (err, content) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err && content.length > 0) {
        cart = JSON.parse(content);
      }
      // analyze the cart and check if product exists
      const existingProductIndex = cart.products.findIndex((p) => p.id == id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        if (!err) {
          return;
        }
        console.log(err);
      });
    });
  }
}

module.exports = Cart;
