const router = require('express').Router();
const { addGame,
        getAllGames,
        getGamesByGenera,
        getGameById,
        updateGame,
        deleteGame
    } = require('../../controllers/game-controller');

router
    .route('/')
    .get(getAllGames)
    .post(addGame);

router
    .route('/:id')
    .get(getGameById)
    .put(updateGame)
    .delete(deleteGame);

router
    .route(':/genera')
    .get(getGamesByGenera)
//TODO: need to determine how genera will be structured. do we want custom genera or pre-defined
module.exports = router;
