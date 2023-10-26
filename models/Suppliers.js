module.exports = (sequelize, DataTypes) => {
    const Suppliers = sequelize.define("Suppliers", {
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Site: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  
    return Suppliers;
  };
  