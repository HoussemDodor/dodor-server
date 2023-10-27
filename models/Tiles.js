module.exports = (sequelize, DataTypes) => {
  const Tiles = sequelize.define("Tiles", {
    ArtNrSupplier: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Thickness: {
      // Possible 1:* Table
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "1cm",
    },
    SerieName: {
      // Possible 1:*
      type: DataTypes.STRING,
      allowNull: true,
    },
    ColorName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HasToBeOrdered: {
      // TileInfo table
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    MeterProbox: {
      // TileInfo table
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    ImportPrice: {
      // TileInfo table
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    PalletPrice: {
      // TileInfo table
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Unit: {
      // m² or m1 or on net // TileInfo table
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    BtwPercentage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Discontinuing: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Tiles.associate = (models) => {
    Tiles.hasOne(models.Users, { foreignKey: "LastModifiedByUserID" });
    Tiles.hasOne(models.Suppliers);
  };

  return Tiles;
};
/*  
ArtNrSupplier: The product number by the supplier
Name: 		    	Full name of the tile [Serie + Color]
Color:			
Size:		    	Size of the tiles written down in string form
Thickness:		    Thick of tile in cm
Serie:			    The name of the series of the tile
OnNet:			    Is the product on a Net, and if so on what kind of net.
HasToBeOrdered:	    Directly available or shipping takes 2+ weeks
MeterPerBox: :		Quantity of m² in a box
ImportPrice:		Import price for a single PriceUnit
PalletPrice:		Import price of the tile when importing pallets
Price:		    	Selling price of the tile
UnitPrice:	    	The unit of the price. (m², m1, pro piece, etc.)
BtwPercentage:  	The percentage of tax calculated in INT
Comment	        	Any extra information about the tile
LastUpdated:		The date the last time the row has been updated
LastModifierUserID:	The UserID of the User that last has modified the row
Discontinuing:		Boolean indicating if the tile is being pulled from the collection
*/
