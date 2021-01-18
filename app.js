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

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use("/error", errorController.getError);
app.use(errorController.get404);

ProductModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(ProductModel);

sequelize
  .sync({ force: true })
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
