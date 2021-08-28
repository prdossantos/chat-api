import { Schema, model, ValidatorProps } from 'mongoose';

export interface User {
    _id?: string,
    name: string
}

const UserSchema = new Schema<User>({
    __v: { type: Number, select: false},
    name: {
        type: String, 
        required: true
    }
}, {
    collection: 'users',
    timestamps: true
});


const UserModel = model<User>('user', UserSchema)


export default UserModel;