const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, admin, async(req, res) => {
   try {
    const products = await Product.find({});
    res.json(products);

   } 
   catch (error) {
    res.status(500).json({message: "Server error"});
   }
});

module.exports = router;