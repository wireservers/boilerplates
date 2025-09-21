// src/routes/foods.routes.js
const express = require("express");
const Food = require("../models/food.model");
const { authenticateJwt } = require("../auth/oidc");
const { requireScope } = require("../auth/requireScope");

const router = express.Router();

router.use(authenticateJwt);

// GET /api/foods  (Foods.Read)
router.get("/", requireScope(["Foods.Read"]), async (req, res) => {
  const items = await Food.find().sort({ createdAt: -1 }).limit(100);
  res.json(items);
});

// GET /api/foods/:id  (Foods.Read)
router.get("/:id", requireScope(["Foods.Read"]), async (req, res) => {
  const item = await Food.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// POST /api/foods  (Foods.Write)
router.post("/", requireScope(["Foods.Write"]), async (req, res) => {
  const doc = await Food.create(req.body);
  res.status(201).json(doc);
});

// PUT /api/foods/:id  (Foods.Write)
router.put("/:id", requireScope(["Foods.Write"]), async (req, res) => {
  const doc = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
});

// DELETE /api/foods/:id  (Foods.Write)
router.delete("/:id", requireScope(["Foods.Write"]), async (req, res) => {
  const doc = await Food.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

module.exports = router;
