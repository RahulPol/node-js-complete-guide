const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/adminRoutes.js");
const shopRoutes = require("./routes/shopRoutes.js");
const errorController = require("./controllers/errorController");
const sequelize = require("./util/database");
const Product = require("./models/ProductModel");
const User = require("./models/UserModel");
const Cart = require("./models/cartModel");
const CartItem = require("./models/cartItemModel.js");

const app = express();
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      res.redirect("/error");
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use("/error", errorController.getError);
app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({ name: "Rahul Pol", email: "polrahul10@gmail.com" });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
