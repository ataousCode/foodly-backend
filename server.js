const express = require("express");
const dotenv = require("dotenv");
const monogoose = require("mongoose");
const CategoryRouter = require("./routes/category-route");
const RestaurantRouter = require("./routes/restaurant-route");
const FoodRouter = require("./routes/food-route");
const RatingRouter = require("./routes/rating-route");
const generateOtp = require("./utils/otp_generator");

//vGLZUBa4PbKGMLd6

dotenv.config();
const app = express();

monogoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Foodly Database connected"))
  .catch((error) => console.log(`Error while connecting to db: ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/categories", CategoryRouter);
app.use("/api/v1/restaurants", RestaurantRouter);
app.use("/api/v1/foods", FoodRouter);
app.use("/api/v1/ratings", RatingRouter);

app.listen(process.env.PORT || 6013, () =>
  console.log(`Foodly Backend is running on ${process.env.PORT}!`)
);
