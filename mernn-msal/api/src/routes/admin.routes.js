// src/routes/admin.routes.js
const express = require("express");
const Food = require("../models/food.model");
const { authenticateJwt } = require("../auth/oidc");
const { requireScope } = require("../auth/requireScope");

const router = express.Router();

router.use(authenticateJwt);

// POST /admin/seed  (Foods.Write)
router.post("/seed", requireScope(["Foods.Write"]), async (_req, res) => {
  const demo = [
    { name: "Apple", calories: 95, tags: ["fruit", "snack"] },
    { name: "Banana", calories: 105, tags: ["fruit", "potassium"] },
    { name: "Chicken Breast (100g)", calories: 165, tags: ["protein"] },
    {
      name: "Brown Rice (1 cup)",
      calories: 216,
      tags: ["carb", "whole-grain"],
    },
    { name: "Broccoli (1 cup)", calories: 55, tags: ["veg", "fiber"] },
  ];
  await Food.insertMany(demo);
  res.json({ seeded: demo.length });
});

module.exports = router;
