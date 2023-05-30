const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersControllers = require("../users-controllers");
const User = require("../../models/User");
const HttpError = require("../../models/http-error");

jest.mock("../../models/User");


describe("createUser", () => {
  test("Should return status code 201, if user created", async () => {
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

  test("Should return error (422), if user already exists", async () => {
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

  test("Should return status code 500, if saving the user fails", async () => {
    User.findOne.mockResolvedValue(null);
    User.prototype.save.mockRejectedValue(new Error("Mocked save error"));

    const req = {
      body: {
        email: "test@test.com",
        password: "testpassword",
        firstname: undefined, // should occur an error when saving User to the database
        lastname: "test",
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await usersControllers.createUser(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toBeCalledWith(new HttpError("Creating user failed, please try again", 500));

    User.findOne.mockRestore();
    User.prototype.save.mockRestore();
  });
});

describe("userLogin", () => {
  test("Should return status code 200, user data and token for valid credentials", async () => {
    const existingUser = {
      id: "mockUserId",
      email: "testing@testing.com",
      password: await bcrypt.hash("testing123", 12)
    }

    User.findOne.mockResolvedValue(existingUser);

    const req = {
      body: {
        email: "testing@testing.com",
        password: "testing123"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    await usersControllers.userLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      userId: existingUser.id,
      email: existingUser.email,
      token: expect.any(String)
    });

    User.findOne.mockRestore();
  });
});
