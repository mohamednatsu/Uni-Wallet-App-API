const express = require('express');
const cors = require('cors');
const db = require("./config/db");
const {initDB} = require("./config/db");
const transactionsRouter = require("./routes/transactionsRoutes");
const rateLimiter = require("./middleware/rateLimiter");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use("/api/transactions",transactionsRouter);

initDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
