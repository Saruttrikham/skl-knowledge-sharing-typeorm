import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Category from './Category';

interface PostAttributes {
  post_id: number;
  post_title: string;
  post_content: string;
  category_id: number;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'post_id'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public post_id!: number;
  public post_title!: string;
  public post_content!: string;
  public category_id!: number;
}

Post.init(
  {
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'category_id',
      },
    },
  },
  {
    sequelize,
    tableName: 'posts',
    timestamps: false,
  }
);

Post.belongsTo(Category, { foreignKey: 'category_id' });

export default Post;