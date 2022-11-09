import express from 'express'
import { UserModel } from '../models/user';

export const router = express.Router()

/* GET home page. */
router.post('/login', async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  const user = await UserModel.findOne({username: username, password: password})
  
  if(user) {
    res.send('OK')
  }else{
    res.send('NG')
  }

})
