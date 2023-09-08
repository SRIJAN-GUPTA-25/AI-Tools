const express = require('express');
const { summaryController, articleController, chatbotController, jsconverterController, scifiController, CppconverterController } = require('../controllers/openaiController');

const router = express.Router();
router.post("/summarize", summaryController);
router.post("/article", articleController);
router.post("/chatbot", chatbotController);
router.post("/jsconverter", jsconverterController);
router.post("/cppconverter", CppconverterController);
router.post("/scifi", scifiController);

module.exports = router;