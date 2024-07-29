"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Category_1 = __importDefault(require("./Category"));
class Post extends sequelize_1.Model {
}
Post.init({
    post_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    post_title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    post_content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Category_1.default,
            key: 'category_id',
        },
    },
}, {
    sequelize: database_1.default,
    tableName: 'posts',
    timestamps: false,
});
Post.belongsTo(Category_1.default, { foreignKey: 'category_id' });
exports.default = Post;
