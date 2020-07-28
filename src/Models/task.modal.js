const Sequelize = require("sequelize");
const connection = require("../database/connection");

const Task = connection.define('tasks', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt:{
      type: Sequelize.DATE,
      allowNull: true
  },

  updatedAt:{
    type: Sequelize.DATE,
    allowNull: true
}
});

Task.sync({force: false}).then(()=>{})

module.exports = Task;