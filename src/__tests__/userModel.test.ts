import UserModel from "../models/UserModel";

describe("test UserModel::validation", () => {
    it("case 1. should return that it is not a valid name", () => {
        const hasErrors = (new UserModel({name: ""})).validateSync(["name"]);
        expect(hasErrors?.message).toContain("user validation failed")
    });
});