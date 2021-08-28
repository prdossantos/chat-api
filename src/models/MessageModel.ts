import { Schema, model } from "mongoose";

export interface Message {
    _id?: string,
    userId: Schema.Types.ObjectId,
    message: string,
    date: string
}

const MessageSchema = new Schema<Message>({
    __v: { type: Number, select: false},
    userId: {type: Schema.Types.ObjectId, required: true },
    message: {
        type: String, 
        required: true
    }
}, {
    collection: "messages",
    timestamps: true
});

const MessageModel = model<Message>("message", MessageSchema)


export default MessageModel;