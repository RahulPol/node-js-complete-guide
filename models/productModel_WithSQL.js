const databaseConnection = require("../util/database");
const Cart = require("./cartModel");

const getProductFromDatabase = () => {
  return new Promise((resolve, reject) => {
    databaseConnection
      .execute("SELECT * FROM products")
      .then(([rows, fieldData]) => {
        resolve(rows);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  async save() {
    return databaseConnection.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static fetchAll() {
    return getProductFromDatabase();
  }

  static findProductById(id) {
    try {
      return new Promise((resolve, reject) => {
        databaseConnection
          .execute("SELECT * FROM products WHERE id = ?", [id])
          .then(([rows, fieldData]) => {
            if (rows.length == 1) {
              return resolve(rows[0]);
            }
            return reject("Too many results");
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      return err;
    }
  }

  static delete(productId) {}
}

module.exports = Product;
