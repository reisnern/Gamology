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

router.post('/register', (req, res) => {
    if (req.body.Password !== req.body.Password2) {
        res.send("Passwords do not match")
    } else {
        MyUser.findOne({ name: req.body.Username })
            .then((data) => {
                if (data) {
                    res.send("Username already exists")
                }
                else {
                    const newUser = new MyUser({ name: req.body.Username, password: req.body.Password })
                    newUser.save().then(() => res.send('User Saved'));
                }
            })
    }




})

router.post('/login', (req, res) => {
    const Username = req.body.Username
    MyUser.findOne({ name: Username })
        .then((data) => {
            if (data){
                if (req.body.Password === data.password){
                    res.send("Login Successful")
                } else{
                    res.send("Incorrect Password")
                }
            } else{
                res.send("User does not exist")
            }
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

