var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    image: {
      type: DataTypes.STRING
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Interest, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "cascade"
    });
    User.hasMany(models.Message, {
      foreignKey: {
        name: "userId",
        allowNull: false
      },
      onDelete: "cascade"
    });
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, 10);
  });

  return User;
};
