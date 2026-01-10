const router = require("express").Router()
const AdminConfig = require("../../models/AdminConfig")
router.post("/wallet", async (req, res) => {
  try {
    const config = await AdminConfig.create();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
});

  

module.exports = router