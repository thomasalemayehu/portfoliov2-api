import "mocha";
import clearDatabase from "../util/Database.util";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";

chai.use(chaiHttp);
chai.should();

describe("User Authentication Tests", () => {
  /**
   * Register User Test
   */
  describe("Register user /auth/register", () => {
    const registerRoute = "/auth/register";
    before(async () => {
      await clearDatabase();
    });

    it("Register User with Empty Body", async () => {
      const response = await chai.request(app).post(registerRoute);

      response.should.have.status(400);
      response.body.should.be.eql({
        message: "Email is required to register",
      });
    });

    it("Register User with Email only", async () => {
      const response = await chai
        .request(app)
        .post(registerRoute)
        .send({ email: "test@gmail.com" });

      response.should.have.status(400);
      response.body.should.be.eql({
        message: "Password is required to register",
      });
    });

    it("Register User with  Email & Password", async () => {
      const response = await chai
        .request(app)
        .post(registerRoute)
        .send({ email: "test@gmail.com", password: "StrongPass@123" });

      response.should.have.status(400);
      response.body.should.be.eql({
        message: "Name is required to register",
      });
    });

    it("Register User with  invalid Email", async () => {
      const email: string = "testgmail.com";
      const response = await chai
        .request(app)
        .post(registerRoute)
        .send({ email: email, password: "StrongPass@123", name: "Test User" });

      response.should.have.status(400);
      response.body.should.be.eql({
        message: `${email} is not a valid email`,
      });
    });

    it("Register User with  invalid Password", async () => {
      const password: string = "Password";
      const response = await chai.request(app).post(registerRoute).send({
        email: "test@gmail.com",
        password: password,
        name: "Test User",
      });

      response.should.have.status(400);
      response.body.should.be.eql({
        message:
          "Password must have at least 8 characters, 1 capital, 1 small, 1 number and 1 special character",
      });
    });

    it("Register User with  invalid Name", async () => {
      const name: string = "A";

      const response = await chai.request(app).post(registerRoute).send({
        email: "test@gmail.com",
        password: "StrongPass@123",
        name: name,
      });

      response.should.have.status(400);
      response.body.should.be.eql({
        message: `${name} is not a valid name`,
      });
    });

    it("Register User with  valid info", async () => {
      const userObject = {
        email: "test@gmail.com",
        password: "StrongPass@123",
        name: "User one",
      };

      const response = await chai
        .request(app)
        .post(registerRoute)
        .send(userObject);
      response.should.have.status(201);
      response.body.email.should.be.eql(userObject.email);
      response.body.name.should.be.eql(userObject.name);
      response.body.token.should.not.be.eql(null);
      response.body.id.should.not.be.eql(null);
    });

    it("Register duplicate User with  valid info", async () => {
      const response = await chai.request(app).post(registerRoute).send({
        email: "test@gmail.com",
        password: "StrongPass@123",
        name: "User one",
      });
      response.should.have.status(400);
    });
  });

  /**
   * Login User Test
   */
  describe("Login user /auth/login", () => {
    const loginRoute = "/auth/login";
    before(async () => {
      await clearDatabase();

      await chai.request(app).post("/auth/register").send({
        email: "test@gmail.com",
        password: "StrongPass@123",
        name: "User one",
      });

      await chai.request(app).post("/auth/register").send({
        email: "test2@gmail.com",
        password: "StrongPass@1234",
        name: "User Two",
      });
    });

    it("Login User with Empty Body", async () => {
      const response = await chai.request(app).post(loginRoute);

      response.should.have.status(400);
      response.body.should.be.eql({
        message: "Email is required to login",
      });
    });

    it("Login User with Email only", async () => {
      const response = await chai
        .request(app)
        .post(loginRoute)
        .send({ email: "test@gmail.com" });

      response.should.have.status(400);
      response.body.should.be.eql({
        message: "Password is required to login",
      });
    });

    it("Login User with  incorrect Email", async () => {
      const response = await chai
        .request(app)
        .post(loginRoute)
        .send({ email: "test3@gmail.com", password: "MyPassword@1234" });

      response.should.have.status(401);
    });

    it("Login User with  invalid password", async () => {
      const response = await chai
        .request(app)
        .post(loginRoute)
        .send({ email: "test@gmail.com", password: "StrongPass@1234" });

      response.should.have.status(401);
    });

    it("Login User with existing email & password(wrong combination)", async () => {
      const response = await chai.request(app).post(loginRoute).send({
        email: "test@gmail.com",
        password: "StrongPass@1234",
      });

      response.should.have.status(401);
    });

    it("Login User with  valid info", async () => {
      const userObject = {
        email: "test@gmail.com",
        password: "StrongPass@123",
      };

      const response = await chai
        .request(app)
        .post(loginRoute)
        .send(userObject);

      response.should.have.status(200);
      response.body.email.should.be.eql(userObject.email);
      response.body.token.should.not.be.eql(null);
      response.body.id.should.not.be.eql(null);
    });
  });
});
