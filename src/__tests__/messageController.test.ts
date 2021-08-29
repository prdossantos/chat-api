import { Request, Response } from "express";
import MessageController from "../controllers/messageController";
import MessageModel from "../models/MessageModel";
import { mockRequest, mockResponse, expects } from "../../jest.utils";
const mockingoose = require("mockingoose");

jest.mock("../mongo.connection", () => ( { isDBConnected: jest.fn(() => () => true) } ));

expect.extend(expects);

describe("test messageController::listMessages", () => {

    it("case 1. list all messages", async () => {

        const req = mockRequest();
        const res = mockResponse();

        mockingoose(MessageModel).toReturn([], "find");

        await MessageController.listMessages(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
                data: []
            }),
        );
    });
});

describe("test MessageController::create", () => {

    it("case 1. should not be create a new message", async () => {

        const req = mockRequest();
        const res = mockResponse();
        req.body = {};

        mockingoose(MessageModel).toReturn([], "save");

        await MessageController.create(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            //@ts-ignore
            expect.toBeInJson("error", "message validation failed")
        );
    });

});
