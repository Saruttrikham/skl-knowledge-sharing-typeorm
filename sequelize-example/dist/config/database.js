"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('demo', 'demo', 'demo', {
    host: 'localhost',
    dialect: 'oracle',
    dialectOptions: {
        connectString: 'localhost/orcl' // Adjust according to your Oracle setup
    }
});
exports.default = sequelize;
