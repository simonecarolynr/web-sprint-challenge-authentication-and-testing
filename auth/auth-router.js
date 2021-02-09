const router = require('express').Router();
const bcrypt = require('bcryptjs')
const db = require('../model/auth-model')

router.post('/register', async (req, res, next) => {
  // implement registration
  try {
    const { username, password } = req.body
    const user = await db.findBy({ username }).first()

    if(user) {
      return res.status(409).json({
        message: "username is already taken"
      })
    }

    const newUser = await db.addUser({
      username,
      password: await bcrypt.hash(password, 15)
    })

    res.status(201).json(newUser)

  } catch (err) {
    next (err)
  }
});

router.post('/login', async (req, res, next) => {
  // implement login
  try {
    const { username, password } = req.body
    const user = await db.findBy({ username }).first()

    if(!user) {
      return res.status(401).json({
        message: "invalid credentials"
      })
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if(!passwordValid) {
      return res.status(401).json({
        message: "invalid credentials"
      })
    }

    req.session.user = user

    res.json({
      message: `Welcome ${user.username}!`
    })

  } catch (err) {
    next (err)
  }
});

module.exports = router;
