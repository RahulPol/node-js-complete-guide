const fs = require("fs");
const path = require("path");

const rootDirectory = require("../util/util");

const filePath = path.join(rootDirectory, "data/cart.json");

const getCartFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, content) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err && content.length > 0) {
        cart = JSON.parse(content);
      }
      resolve(cart);
    });
  });
};

const setCartInFile = (cart) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(cart), (err) => {
      if (!err) {
        return resolve();
      }
      return reject(err);
    });
  });
};
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

  static async deleteProductFromCart(productId, productPrice) {
    try {
      const cart = await getCartFromFile();
      const product = cart.products.find((p) => p.id == productId);
      cart.products = cart.products.filter((p) => p.id !== productId);
      cart.totalPrice = cart.totalPrice - product.qty * productPrice;

      return await setCartInFile(cart);
    } catch (err) {
      return err;
    }
  }

  static async fetchCart() {
    return getCartFromFile();
    //     new Promise(async (resolve, reject) => {
    //       const cart = await getCartFromFile();
    //       if (cart) {
    //         resolve(cart);
    //         return;
    //       }
    //       resolve([]);
    //     });
  }
}

module.exports = Cart;
