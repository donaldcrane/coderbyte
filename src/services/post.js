import database from "../models";

/**
 * @class Post
 * @description allows user create and check Post details
 * @exports Post
 */
export default class PostServices {
  /**
   * @param {string} newPost - The post details
   * @returns {object} An instance of the Posts model class
   */
  static async addPost(newPost) {
    try {
      return await database.Posts.create(newPost);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the Posts model class
   */
  static async getAllPosts() {
    try {
      return await database.Posts.findAll({
        order: [
          ["likes", "DESC"]
        ],
        attributes: [
          "id", "userId", "post", "likes", "createdAt", "updatedAt"
        ]
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The Post id
   * @returns {object} An instance of the Posts model class
   */
  static async getPost(id) {
    try {
      return await database.Posts.findOne({
        where: {
          id
        }
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The Post name
   * @returns {object} An instance of the Posts model class
   */
  static async deletePost(id) {
    try {
      const Post = await database.Posts.findOne({ where: { id } });
      return await Post.destroy({ cascade: true });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The old state name
   * @param {string} Post - The new state details
   * @returns {object} An instance of the Posts model class
   */
  static async updatePost(id, Post) {
    try {
      return await database.Posts.update(Post, {
        where: { id },
        returning: true,
        plain: true
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The old state name
   * @returns {object} An instance of the Posts model class
   */
  static async like(id) {
    try {
      return await database.Posts.increment({
        likes: +1
      }, {
        where: {
          id
        },
        returning: true,
        plain: true
      });
    } catch (err) {
      throw err;
    }
  }
}
