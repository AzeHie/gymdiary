require("dotenv").config();
const usersControllers = require("../users-controllers");
const mongoose = require("mongoose");
const User = require("../../models/User");
const HttpError = require("../../models/http-error");

jest.mock("../../models/User");


describe("Users controllers", () => {
  beforeEach(async () => {
    await mongoose.connect(
      "mongodb+srv://aze:" +
        process.env.MONGO_ATLAS_PW +
        "@gymdiary.dwn62zx.mongodb.net/?retryWrites=true&w=majority"
    );
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  test("createUser: should return status code 201, if user created", async () => {
    User.findOne.mockResolvedValue(null); // simulates the case where user is not found in database
    User.prototype.save.mockResolvedValue({}); // simulates a successful save operation to the database

    const req = {
      body: {
        email: "test@test.com",
        password: "testpassword",
        firstname: "test",
        lastname: "test",
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await usersControllers.createUser(req, res, next);
    expect(res.status).toBeCalledWith(201);

    // restore original implementations:
    User.findOne.mockRestore();
    User.prototype.save.mockRestore();
  });

  test("createUser: should return error (422), if user already exists", async () => {
    User.findOne.mockResolvedValue(true);

    const req = {
      body: {
        email: "test@test.com",
        password: "testpassword",
        firstname: "test",
        lastname: "test",
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    
    await usersControllers.createUser(req, res, next);
    
    expect(next).toBeCalledWith(new HttpError("User exists already", 422));
    User.findOne.mockRestore();
  });

  test("createUser: should return status code 500, if some fields missing in req.body", async () => {
    // code here
  });
});
