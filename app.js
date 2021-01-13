const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminData = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const rootDir = require("./util/util");

const app = express();
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "Page Not Found" });
});

app.listen(3000);
