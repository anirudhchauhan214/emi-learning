module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("address", {
    pincode: { type: DataTypes.INTEGER, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
  });
  return Address;
};
