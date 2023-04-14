'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
     this.hasMany(models.Photo)
    } 
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username can't be empty!"
        },
        notNull: false
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email must be unique!"
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user,opt) => {
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword

      }

    }
  });
  return User;
};