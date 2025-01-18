const express = require("express");
const dotenv = require("dotenv");
const monogoose = require("mongoose");
const CategoryRoute = require("./routes/category-route");
const RestaurantRoute = require("./routes/restaurant-route");
const FoodRoute = require("./routes/food-route");
const RatingRoute = require("./routes/rating-route");
const AuthenticationRoute = require("./routes/authentication-route");
const UserRoute = require("./routes/user-route");
const AddressRoute = require("./routes/address-route");
const CartRoute = require("./routes/cart-route");
const OrderRoute = require("./routes/order-route");
//vGLZUBa4PbKGMLd6
//n9FqN5xT

dotenv.config();

const app = express();

monogoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Foodly Database connected"))
  .catch((error) => console.log(`Error while connecting to db: ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/categories", CategoryRoute);
app.use("/api/v1/restaurants", RestaurantRoute);
app.use("/api/v1/foods", FoodRoute);
app.use("/api/v1/ratings", RatingRoute);
app.use("/api/v1/authentications", AuthenticationRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/address", AddressRoute);
app.use("/api/v1/carts", CartRoute);
app.use("/api/v1/orders", OrderRoute);

app.listen(process.env.PORT || 6013, () =>
  console.log(`Food-ly Backend is running on ${process.env.PORT}!`)
);
