const router = require('express').Router();
const { Game } = require('../models');

var igdb = "https://api.igdb.com/v4/games";

async function dbGameCall(url = igdb) {
    const response = await fetch(url, {
        method: 'GET',
    })
        .then(gameData => gameData.json())
        .then(gameData => {
            const game = gameData.map(game => game.get({ plain: true }))
            
        })
}

dbGameCall();

setInterval(dbGameCall(),{ message: "daily game call initiated"},8640000);