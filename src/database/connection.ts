import {Sequelize} from 'sequelize';


const connection = new Sequelize('apidb', 'root', '1234567', {
  host: 'localhost',
  dialect: 'mysql'
});
module.exports = connection;