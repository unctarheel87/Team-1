module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    message: {
      type: DataTypes.BLOB,
      allowNull: false,
      validate: {
        // need to investigate BLOB
        len: [1, 255]
      }
    }
  });
  Message.associate = function(models) {
    // associations can be defined here
    console.log(models);
  };

  return Message;
};
