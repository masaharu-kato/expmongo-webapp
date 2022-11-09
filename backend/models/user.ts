import { model, Schema } from 'mongoose'

export interface User {
    username: string,
    password: string,
}

const UserSchema = new Schema<User>({
    username: String,
    password: String,
})

export const UserModel = model('User', UserSchema)
