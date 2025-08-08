const express = require('express');
const {getExposesByUserId, deleteExpose, addExpose, summaryExpose} = require("../controllers/transactionsController");
const router = express.Router();

router.post("/", addExpose)
router.get("/:user_id", getExposesByUserId)
router.delete("/:id", deleteExpose)
router.get("/summary/:user_id", summaryExpose)

module.exports = router;