const db = require("../models/index");
const Address = db.Address;

const addAddress = async (req, res) => {
  const userData = req.body;
  const { userId } = req.params;

  if (
    userData.city == "" ||
    userData.state == "" ||
    userData.country == "" ||
    userData.pincode == "" ||
    userData.city == null ||
    userData.state == null ||
    userData.country == null ||
    userData.pincode == null
  ) {
    return res.send({ status: false, message: "Please fill all the details!!!" });
  }
  try {
    const data = await Address.create({ ...userData, userUserId: userId });

    return res
      .status(200)
      .json({ status: true, message: "Address added successfully!!", data: data.dataValues });
  } catch (err) {
    throw err;
  }
};

module.exports = { addAddress };
