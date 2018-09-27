module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    message: {
      type: DataTypes.BLOB,
      allowNull: true,
      validate: {
        // need to investigate BLOB
        len: [1, 255]
      }
    }
  });
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User);
  };
  return Message;
};
