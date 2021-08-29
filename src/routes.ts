import express from "express";
import MessageController from "./controllers/messageController";
import UserController from "./controllers/userController";

const routes = express.Router();

// Routes
routes.get("/", (req, res, next) => {
    res.status(200).send({
        title: "Chat API",
        version: "1.0.0"
    });
});

routes.post( "/signin",        UserController.signIn);
routes.post( "/message",       MessageController.create);
routes.get(  "/messages",      MessageController.listMessages);

export default routes;