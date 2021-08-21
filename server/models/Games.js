const { Schema, model } = require('mongoose');

const GameSchema = new Schema ({
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);

const Game = model('Game', GameSchema);

module.exports = Game;