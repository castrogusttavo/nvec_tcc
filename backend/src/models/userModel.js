const { DataTypes } = require('sequelize');
const db = require('../db');

const UserModel = db.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
    unique: true // Garante que cada email seja único no banco de dados
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'tb_usuario'
});

module.exports = UserModel;
