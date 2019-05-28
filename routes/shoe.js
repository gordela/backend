const Shoe = require("../models/Shoe");
const Style = require("../models/Style");
const router = require("express").Router();
const { shoeValidation } = require("../validation");
const verify = require("../routes/verifyToken");
const validateObjectId = require("../validateObjectId");
const admin = require("./admin");

router.get("/", (req, res) => {
  Shoe.find((err, shoes) => res.send(shoes));
});

router.post("/", [verify, admin], async (req, res) => {
  const { error } = shoeValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const style = await Style.findById(req.body.styleId);
  if (!style) return res.status(400).send("Invalid style.");

  const shoe = new Shoe({
    publishDate: Date.now(),
    title: req.body.title,
    style: { _id: style._id, name: style.name },
    numberInStock: req.body.numberInStock,
    price: req.body.price,
    picture: req.body.picture,
    pictureTwo: req.body.pictureTwo,
    gender: req.body.gender,
    countInBag: req.body.countInBag
  });

  await shoe.save();

  res.send(shoe);
});

router.put("/:id", [validateObjectId, verify, admin], async (req, res) => {
  const { error } = shoeValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const style = await Style.findById(req.body.styleId);
  if (!style) return res.status(400).send("Invalid style.");
  const shoe = await Shoe.findByIdAndRemove(req.params.id);

  const newShoe = new Shoe({
    publishDate: Date.now(),
    title: req.body.title,
    style: { _id: style._id, name: style.name },
    numberInStock: req.body.numberInStock,
    price: req.body.price,
    picture: req.body.picture,
    pictureTwo: req.body.pictureTwo,
    gender: req.body.gender,
    countInBag: req.body.countInBag
  });

  await newShoe.save();

  res.send(newShoe);
});

router.get("/:id", async (req, res) => {
  const shoe = await Shoe.findById(req.params.id);

  if (!shoe)
    return res.status(404).send("The shoe with the given ID was not found.");

  res.send(shoe);
});

router.delete("/:id", [validateObjectId, verify, admin], async (req, res) => {
  try {
    const shoe = await Shoe.findByIdAndRemove(req.params.id);
    res.send(shoe);
  } catch (error) {
    if (error)
      return res.status(404).send("The shoe with the given ID was not found.");
  }
});

module.exports = router;
