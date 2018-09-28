module.exports = function(sequelize, DataTypes) {
  var Interest = sequelize.define("Interest", {
    interest: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 100]
      }
    }
  });
  Interest.associate = function(models) {
    Interest.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });
  };

  return Interest;
};
