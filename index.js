const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
const PORT = process.env.PORT || 8000;

//setting limit
const limit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
});

//Middlewares
app.use(express.static("./public"));
app.use(limit);
app.use(cors());
app.set("trust proxy", 1);
app.use("/api", routes);

//starting server
app.listen(PORT, () => {
  console.log(`server has been started at ${PORT}`);
});
