const { Review } = require('../models')

// TODO: determine how reviews will be nested before continuing, games and users.

const reviewController = {
  // ==================================CREATE==================================
  // add review
  addReview ({ body }, res) {
    Review.create(body)
      .then(dbReviewData => res.json(dbReviewData))
      .catch(err => res.status(400).json(err))
  },
  //= ===================================READ==================================
  // get all reviews
  // TODO: find all reviews for a game? all reviews? needs revisment!
  getReviews ({ body }, res) {
    Review.find({})
      .then(dbReviewData => res.json(dbReviewData))
      .catch(err => {
        console.log(err)
        res.status(400).json(err)
      })
  }

  //= ===================================UPDATE==================================

  //= ===================================DELETE==================================
}

module.exports = reviewController
