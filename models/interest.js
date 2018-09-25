module.exports = function(sequelize, DataTypes) {
  var Interest = sequelize.define("Interest", {
    interest: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    }
  });
  Interest.associate = function(models) {
    console.log(models);
  };

  return Interest;
};
