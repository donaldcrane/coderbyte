import PostServices from "../services/post";
import { validation, validateId } from "../validations/postValidation";

const {
  addPost, getAllPosts, getPost, deletePost, updatePost, like
} = PostServices;

/**
 * @class PostController
 * @description create Post, get all Posts, get a Post, delete a Post, update a Post
 * @exports PostController
 */
export default class PostController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async addPost(req, res) {
    try {
      const { id } = req.decoded.user;
      const { post } = req.body;
      const { error } = validation(req.body);
      if (error) {
        return res.status(400).json({ status: 400, error: error.message });
      }
      const newPost = { userId: id, post };
      const createdPost = await addPost(newPost);
      return res.status(201).json({ status: 201, message: "A Post has been added.", data: createdPost, });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getPosts(req, res) {
    try {
      const Posts = await getAllPosts();
      res.status(200).json({
        status: 200,
        message: "Successfully retrived all Posts.",
        data: Posts,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getPostById(req, res) {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const Post = await getPost(id);
      if (!Post) return res.status(404).json({ status: 404, error: "Post not found" });
      return res.status(200).json({
        status: 200,
        message: "Successfully retrived Post.",
        data: Post,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found."
      });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const userId = req.decoded.user.id;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const Post = await getPost(id);
      if (!Post) return res.status(404).json({ status: 404, error: "Post not found." });
      if (Post.userId !== userId) return res.status(401).json({ status: 401, error: "Access Denied" });
      await deletePost(id);
      return res.status(200).json({
        status: 200,
        message: "Successfully Deleted Post.",
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found.",
      });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async likePost(req, res) {
    const { id } = req.params;
    try {
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const Post = await getPost(id);
      if (!Post) return res.status(404).json({ status: 404, error: "Post not found." });
      const likedPost = await like(id);
      return res.status(200).json({
        status: 200,
        message: "Successfully liked Post.",
        data: likedPost
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Server error.",
      });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const userId = req.decoded.user.id;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const Post = await PostServices.getPost(id);
      if (!Post) return res.status(404).json({ status: 404, error: "Post not found." });
      if (Post.userId !== userId) return res.status(401).json({ status: 401, error: "Access Denied" });
      const newPost = await updatePost(id, req.body);
      return res.status(200).json({
        status: 200,
        message: "Successfully updated Post.",
        data: newPost[1],
      });
    } catch (error) {
      return res.status(404).json({ status: 404, error: "Resource not found.", });
    }
  }
}
