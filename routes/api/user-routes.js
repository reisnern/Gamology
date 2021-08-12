const router = require('express').Router();
const {
    newUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

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