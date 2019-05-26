const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../models/User");
const Shoe = require("../models/Shoe");

router.post("/:id", verify, async (req, res) => {
  current = await User.findById(req.user.id);
  shoe = await Shoe.findById(req.params.id);
  if (current.bag[shoe._id]) {
    current.bag[shoe._id].countInBag = current.bag[shoe._id].countInBag + 1;
  } else {
    shoe.countInBag = 1;
    current.bag[shoe._id] = shoe;
  }
  final = await User.findByIdAndUpdate(current._id, current, { new: true });
  res.send(final);
});

router.delete("/:id", verify, async (req, res) => {
  current = await User.findById(req.user.id);
  current = current.toObject();
  shoe = await Shoe.findById(req.params.id);
  if (current.bag[shoe._id].countInBag > 1) {
    current.bag[shoe._id].countInBag = current.bag[shoe._id].countInBag - 1;
  } else {
    delete current.bag[shoe._id];
  }
  final = await User.findByIdAndUpdate(current._id, current, { new: true });

  res.send(final);
});

module.exports = router;
