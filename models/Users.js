module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Users;
};
