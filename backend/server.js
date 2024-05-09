const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const Cart = require("./routes/cart-route");
const Customer = require("./routes/customer-route");
const Event = require("./routes/event-route");
const PermanentShop = require("./routes/permanentShops-route");
const Item = require("./routes/item-route");
const ShopOwner = require("./routes/shopOwner-route");
const StallSeeker = require("./routes/stallSeeker-route");
const TemporaryShop = require("./routes/temporaryShop-route");
const orderRoutes = require("./routes/order.route");
const stallRoutes = require("./routes/stall-route");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const meetAtMallRoutes = require("./routes/meetAtMall");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8070;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

mongoose.connection.once("open", () => {
  console.log("Database Synced");
});

app.use("/api/v0/cart", Cart);
app.use("/api/v0/customer", Customer);
app.use("/api/v0/event", Event);
app.use("/api/v0/permanentShop", PermanentShop);
app.use("/api/v0/item", Item);
app.use("/api/v0/shopOwner", ShopOwner);
app.use("/api/v0/stallSeeker", StallSeeker);
app.use("/api/v0/temporaryShop", TemporaryShop);
app.use(orderRoutes);
app.use(stallRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use(meetAtMallRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
