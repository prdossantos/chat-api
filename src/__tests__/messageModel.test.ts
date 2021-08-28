import MessageModel from "../models/MessageModel";
import { expects } from "../../jest.utils";

jest.mock("../mongo.connection", () =>( { isDBConnected: jest.fn(() => () => true) } ))

expect.extend(expects);

describe("test MessageModel::validation", () => {
    it("case 2. should return that it is not valid message", () => {
        const hasErrors = (new MessageModel({message: ""})).validateSync(["message"]);
        expect(hasErrors?.message).toContain("message validation failed")
    });
});