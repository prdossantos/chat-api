import { Request, Response } from "express";
import UserController from "../controllers/userController";
import UserModel from "../models/UserModel";
import { mockRequest, mockResponse, expects } from "../../jest.utils";
const mockingoose = require("mockingoose")

jest.mock("../mongo.connection", () =>( { isDBConnected: jest.fn(() => () => true) } ))

expect.extend(expects);


describe("test userController::signIn", () => {

    it("case 1. should return that it is not a valid name.", async () => {

        const req = mockRequest();
        const res = mockResponse();
        req.body = {}

        mockingoose(UserModel).toReturn({}, "findOne");

        await UserController.signIn(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith(
            //@ts-ignore
            expect.toBeInJson("error", "user validation failed")
        )
    });

});
