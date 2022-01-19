const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("crud-demo", "root", "admin@1234", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to db crud-demo !!"))
  .catch((err) => console.log("Error: " + err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = require("./Users")(sequelize, DataTypes);
db.Address = require("./Address")(sequelize, DataTypes);
db.Auth = require("./Auth")(sequelize, DataTypes);

db.Users.hasMany(db.Address);
db.Address.belongsTo(db.Users);

db.sequelize.sync();

module.exports = db;
