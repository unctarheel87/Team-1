module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    message: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 255]
      }
    }
  });
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });
  };
  return Message;
};
