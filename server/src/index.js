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
const pokemon = require('./routes');
app.use('/pokemon', pokemon);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Am running at port ${port}`));
