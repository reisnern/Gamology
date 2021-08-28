const { User } = require('../models')

const userController = {
  //= ================================CREATE==============================
  // create new user
  newUser ({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err))
  },
  //= ==================================READ===============================
  // get user by id
  getUserById ({ params }, res) {
    User.findOne({ id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: '404! There is no user with that id. At least Hal 9000 couldn\'t find one.' })
        }
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      })
  },
  // get all users
  getAllUsers (req, res) {
    User.find({})
    // TODO: add a .populate for reviews
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      })
  },
  // ==================================UPDATE================================
  // update user by id
  updateUser ({ params, body }, res) {
    User.findOneAndUpdate({ id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: '404! We cant update it is we cant find it.' })
          return
        }
        res.json(dbUserData)
      })
      .catch(err => res.status(400).json(err))
  },
  //= ===================================DELETE=================================
  // delete user
  deleteUser ({ params }, res) {
    User.findOneAndDelete({ id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: "404! Looks like the user you're trying to delete doesn't exist." })
          return
        }
        res.json(dbUserData)
      })
      .catch(err => res.status(400).json(err))
  }
}

module.exports = userController
