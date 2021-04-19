import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../app";
import { user4 } from "./user-sign-in-test-data";
import { profile, profile2, profile3 } from "./profile-data";

chai.should();

const { expect } = chai;
chai.use(chaiHttp);

describe("Update user profile", () => {
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
  it("should update a user profile successfully", done => {
    chai
      .request(server)
      .patch("/api/v1/user-profile")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(profile)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("User profile updated.");
        done();
      });
  });
  it("should only Update profile names with a strings", done => {
    chai
      .request(server)
      .patch("/api/v1/user-profile")
      .set("Authorization", `Bearer ${userToken}`)
      .set("Accept", "application/json")
      .send(profile2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("firstName must be a string. lastName must be a string");
        done();
      });
  });
  it("should not allow user without token update a profile ", done => {
    chai
      .request(server)
      .patch("/api/v1/user-profile")
      .set("Accept", "application/json")
      .send(profile3)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
