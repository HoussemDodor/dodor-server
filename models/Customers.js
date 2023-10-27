module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define("Customers", {
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Surname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Housenumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Zipcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    VisitedStoreOn: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });


  Customers.associate = (models) => {
    Customers.hasOne(models.Users, { foreignKey: "RegisteredByUserID" });
  };

  return Customers;
};
