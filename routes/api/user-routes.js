const router = require('express').Router();
const { response } = require('express');
const mongoose = require('mongoose');
const MyUser = mongoose.model('MyUser', { name: String, password: String });
const {
    newUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

router.post('/register', (req, res)=>{
    res.send('Hello World')
    const newUser = new MyUser({name: req.body.Username, password: req.body.Password})
    newUser.save().then(() => console.log('User Saved'));

})

router.post('/login', (req, res)=>{
    const Username = req.body.Username
    MyUser.findOne({name: Username})
    .then((data) => {console.log(data)
    res.send(data)
    })

})

router
    .route('/')
    .get(getAllUsers)
    .post(newUser)
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;

