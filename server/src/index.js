const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());

// Routes
const pokemon_router = require("./routes/pokemon_routes");
const readonly_router = require("./routes/readonly_routes");
app.use("/user", pokemon_router);
app.use("/readonly", readonly_router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Am running at port ${port}`));
