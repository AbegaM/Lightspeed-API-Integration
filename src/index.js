const express = require("express");
const cors = require("cors")
require("dotenv").config();

const env = require("./utils/environment")
const router = require("./api")

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api", router);


const PORT = env.server.port ;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
