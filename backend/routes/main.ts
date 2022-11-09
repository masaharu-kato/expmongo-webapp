import express from 'express'
import { MessageModel } from '../models/message';

export const router = express.Router()

router.get('/messages', async (_req, res) => {
  return res.json(await MessageModel.find())
});

router.post('/message', async (req, res) => {
  const message = new MessageModel()
  message.username = req.body.username
  message.content = req.body.content
  await message.save()
  return res.json({status: 'OK'})
})

router.delete('/messages', async (_req, res) => {
  await MessageModel.deleteMany({})
  return res.json({status: 'OK'})
});
