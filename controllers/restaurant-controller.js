const { messaging } = require("firebase-admin");
const Restaurant = require("../models/Restaurant");
const { all } = require("../routes/restaurant-route");

module.exports = {
  addRestaurant: async (req, res) => {
    const { title, time, imageUrl, owner, code, logoUrl, coords } = req.body;

    if (
      !title ||
      !time ||
      !imageUrl ||
      !owner ||
      !code ||
      !logoUrl ||
      !coords ||
      !coords.latitude ||
      !coords.longitude ||
      !coords.address ||
      !coords.title
    ) {
      res
        .status(400)
        .json({ status: false, message: "All field are required" });
    }
    try {
      const newRestaurant = new Restaurant(req.body);
      await newRestaurant.save();
      res
        .status(200)
        .json({ status: true, message: "Restaurant created success" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  //! fetch restaurants
  getAllRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.status(200).json({ status: true, message: restaurants });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getRestaurntById: async (req, res) => {
    const id = req.params.id;
    try {
      const restaurant = await Restaurant.findById(id);

      res.status(200).json(restaurant);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getRandomRestaurants: async (req, res) => {
    const code = req.params.code;

    try {
      let randomRestaurant = [];

      if (code) {
        randomRestaurant = await Restaurant.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
      }
      if (randomRestaurant.length === 0) {
        randomRestaurant = await Restaurant.aggregate([
          { $match: { isAvailable: true } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } },
        ]);
      }

      res.status(200).json(randomRestaurant);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getAllNearbyRestaurants: async (req, res) => {
    const code = req.params.code;
    try {
      let allNearbyRestaurants = [];

      if (code) {
        allNearbyRestaurants = await Restaurant.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $project: { __v: 0 } },
        ]);
      }

      if (allNearbyRestaurants.length === 0) {
        allNearByRestaurants = await Restaurant.aggregate([
          { $match: { isAvailable: true } },
          { $project: { __v: 0 } },
        ]);
      }

      res.status(200).json({ status: true, message: allNearbyRestaurants });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
