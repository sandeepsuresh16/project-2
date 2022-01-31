const express = require("express")
const router = express.Router();

router.get('/',(req,res)=>res.status(200).json({msg:"Admin Route"}))

module.exports = router;