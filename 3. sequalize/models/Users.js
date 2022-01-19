module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: true }
  );
  return Users;
};
