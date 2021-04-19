import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from "sequelize-test-helpers";
import chai, { expect } from "chai";

import sinonChai from "sinon-chai";
import PostModel from "../../models/post";

chai.use(sinonChai);

describe("src/models/post", () => {
  const Post = PostModel(sequelize, dataTypes);
  const post = new Post();

  checkModelName(Post)("Posts");
  context("properties", () => {
    ["userId", "post", "likes"].forEach(
      checkPropertyExists(post),
    );
  });
  context("associations", () => {
    const Users = "Post data";
    before(() => {
      Post.associate({ Users });
    });
    it("defined a belongsTo association with Post", () => {
      expect(Post.belongsTo).to.have.been.calledWith(Users);
    });
  });
});
