import chai from "chai";
import chaiHttp from "chai-http";
import db from "../../models/index";
import { user4, user6 } from "./user-sign-in-test-data";
import {
  post, post2, post3, post4, post5
} from "./post-data";
import server from "../../app";

chai.should();

const { expect } = chai;
chai.use(chaiHttp);

describe("Add post", () => {
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow user with token add a post", done => {
    chai
      .request(server)
      .post("/api/v1/post")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(post)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("A Post has been added.");
        done();
      });
  });
  it("should not allow user add a post with incomplete details", done => {
    chai
      .request(server)
      .post("/api/v1/post")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(post2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it("should not allow user without token add a post ", done => {
    chai
      .request(server)
      .post("/api/v1/post")
      .send(post3)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe("Update post", () => {
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user6)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow User update a post", done => {
    chai
      .request(server)
      .patch("/api/v1/post/c375c640-81ff-405a-89a8-460ea2f71755")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send({ post: "This is a nice movie" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully updated Post.");
        done();
      });
  });
  it("should not allow user update a post with invalid ID data type", done => {
    chai
      .request(server)
      .patch("/api/v1/post/8d58")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send({ post: "i live in a Duplex" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("should not allow user update a post with that does not belong to him", done => {
    chai
      .request(server)
      .patch("/api/v1/post/a430e505-937b-4908-9422-7aa57044e85a")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send({ post: "I am loving this feeling" })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Access Denied.");
        done();
      });
  });
  it("returns 404 when updating post which is not in db", done => {
    chai
      .request(server)
      .patch("/api/v1/post/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send({ post: "He is a kind person" })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Post not found.");
        done();
      });
  });
});

describe("Delete post", () => {
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user6)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow User Delete a post", done => {
    chai
      .request(server)
      .delete("/api/v1/post/c375c640-81ff-405a-89a8-460ea2f71755")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully Deleted Post.");
        done();
      });
  });
  it("should not allow user Delete a post with that does not belong to him", done => {
    chai
      .request(server)
      .delete("/api/v1/post/a430e505-937b-4908-9422-7aa57044e85a")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.error).to.equal("Access Denied.");
        done();
      });
  });
  it("should not allow user delete a post with invalid ID data type", done => {
    chai
      .request(server)
      .delete("/api/v1/post/8d58")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("returns 404 when deleting post which is not in db", done => {
    chai
      .request(server)
      .delete("/api/v1/post/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Post not found.");
        done();
      });
  });
});

describe("GET post api route", () => {
  beforeEach(async () => {
    await db.Posts.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Posts.create(post4);
    await db.Posts.create(post5);
  });
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("returns all posts", done => {
    chai
      .request(server)
      .get("/api/v1/posts")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived all Posts.");

        data.forEach(posts => {
          expect(posts).to.have.property("id");
          expect(posts).to.have.property("post");
          expect(posts).to.have.property("userId");
          expect(posts).to.have.property("likes");
        });

        expect(data).to.have.length(2);

        expect(data).to.be.an("array");
        done();
      });
  });

  it("returns post with specific id", done => {
    chai
      .request(server)
      .get("/api/v1/post/c375c640-81ff-405a-89a8-460ea2f71755")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrived Post.");
        expect(data).to.have.property("id");
        expect(data).to.have.property("post");
        expect(data).to.have.property("userId");
        expect(data).to.have.property("likes");
        expect(data).to.be.an("object");
        done();
      });
  });
});

describe("Like post", () => {
  beforeEach(async () => {
    await db.Posts.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Posts.create(post4);
  });
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow User like a post", done => {
    chai
      .request(server)
      .patch("/api/v1/like-post/c375c640-81ff-405a-89a8-460ea2f71755")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully liked Post.");
        done();
      });
  });
  it("should not allow user like a post with invalid ID data type", done => {
    chai
      .request(server)
      .patch("/api/v1/like-post/8d58")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("returns 404 when deleting post which is not in db", done => {
    chai
      .request(server)
      .patch("/api/v1/like-post/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Post not found.");
        done();
      });
  });
});
