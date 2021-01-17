const fs = require("fs");
const path = require("path");

const rootDirectory = require("../util/util");

const Cart = require("./cartModel");

const filePath = path.join(rootDirectory, "data/products.json");
const products = [];

const getProductsFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, content) => {
      // do not reject in case file does not exist, rather return blank array
      if (err && err.errno !== -4058) {
        reject(err);
        return;
      }
      resolve(content && content.length > 0 ? JSON.parse(content) : []);
    });
  });
};

const setProductsInFile = (products) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(products), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
class Product {
  constructor(id, title, imageURL, price, description) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }

  async save() {
    try {
      const products = await getProductsFromFile();
      if (this.id !== null) {
        const existingProductIndex = products.findIndex((p) => p.id == this.id);
        products[existingProductIndex] = this;
      } else {
        this.id =
          products.length === 0
            ? 1
            : Number(products[products.length - 1].id) + 1;
        products.push(this);
      }
      await setProductsInFile(products);
    } catch (err) {
      return err;
    }
  }

  static fetchAll() {
    return getProductsFromFile();
  }

  static async findProductById(id) {
    const products = await getProductsFromFile();
    return products.find((p) => p.id == id);
  }

  static delete(productId) {
    return new Promise(async (resolve, reject) => {
      try {
        let products = await getProductsFromFile();
        const product = products.find((p) => p.id == productId);
        if (product) {
          products = products.filter((p) => p.id != productId);

          await setProductsInFile(products);

          await Cart.deleteProductFromCart(productId, product.price);
          return resolve();
        }
        return reject("Product doesn't exist");
      } catch (err) {
        return reject(err);
      }
    });
  }
}

module.exports = Product;
