import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('demo', 'demo', 'demo', {
  host: 'localhost',
  dialect: 'oracle',
  dialectOptions: {
    connectString: 'localhost/orcl' // Adjust according to your Oracle setup
  }
});

export default sequelize;