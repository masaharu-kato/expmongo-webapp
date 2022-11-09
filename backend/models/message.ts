import { model, Schema } from 'mongoose'

export interface Message {
  username: string,
  content: string,
  datetime: string,
}

const MessageSchema = new Schema<Message>({
  username: String,
  content: String,
  datetime: String,
})

export const MessageModel = model('Message', MessageSchema)
