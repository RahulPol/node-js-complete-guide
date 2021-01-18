const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/adminRoutes.js");
const shopRoutes = require("./routes/shopRoutes.js");
const errorController = require("./controllers/errorController");
const sequelize = require("./util/database");
const ProductModel = require("./models/ProductModel");
const UserModel = require("./models/UserModel");
const Product = require("./models/ProductModel");

const app = express();
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  UserModel.findByPk(1)
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

ProductModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(ProductModel);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return UserModel.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      UserModel.create({ name: "Rahul Pol", email: "polrahul10@gmail.com" });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
