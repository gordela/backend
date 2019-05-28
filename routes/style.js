const Style = require("../models/Style");
const router = require("express").Router();
const verify = require("../routes/verifyToken");
const { styleValidation } = require("../validation");
const validateObjectId = require("../validateObjectId");
const admin = require("./admin");
router.get("/", async (req, res) => {
  const styles = await Style.find();
  res.send(styles);
});

router.post("/", verify, async (req, res) => {
  const { error } = styleValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const style = new Style({ name: req.body.name });
  try {
    const savedStyle = await style.save();
    res.send(savedStyle);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", [validateObjectId, verify, admin], async (req, res) => {
  const { error } = styleValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const style = await Style.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!style)
    return res.status(404).send("The style with the given ID was not found.");

  res.send(style);
});

router.delete("/:id", [validateObjectId, verify, admin], async (req, res) => {
  const style = await Style.findByIdAndDelete(req.params.id);
  console.log(style);

  if (!style)
    return res.status(404).send("The style with the given ID was not found.");

  res.send(style);
});

router.get("/:id", async (req, res) => {
  const style = await Style.findById(req.params.id).select("-__v");

  if (!style)
    return res.status(404).send("The style with the given ID was not found.");

  res.send(style);
});
module.exports = router;
