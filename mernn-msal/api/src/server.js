// src/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { loadDiscovery } = require("./auth/oidc");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.use("/api/foods", require("./routes/foods.routes"));
app.use("/admin", require("./routes/admin.routes"));

async function bootstrap() {
  await loadDiscovery(); // discover issuer + JWKS once at startup
  mongoose.set("autoIndex", false);
  mongoose.set("debug", true); // TEMP: logs all driver ops to console
  await mongoose.connect(process.env.MONGO_URI);
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`API up on :${port}`));
}

if (process.argv[2] === "seed") {
  // optional CLI seeding if you prefer
  (async () => {
    await loadDiscovery();
    await mongoose.connect(process.env.MONGO_URI);
    const Food = require("./models/food.model");
    await Food.deleteMany({});
    await Food.insertMany([
      { name: "Oatmeal (1 cup)", calories: 158, tags: ["fiber"] },
      { name: "Greek Yogurt (170g)", calories: 100, tags: ["protein"] },
    ]);
    console.log("Seeded CLI data.");
    process.exit(0);
  })();
} else {
  bootstrap().catch((e) => {
    console.error("Fatal boot error", e);
    process.exit(1);
  });
}
