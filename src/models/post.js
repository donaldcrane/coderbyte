const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Posts",{  
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      unique: true,
    },
    post: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  });
  Post.associate = models => {
  Post.belongsTo(models.Users, {
      as: "Posts",
      foreignKey: "userId",
    });
  };
  return Post;
};
