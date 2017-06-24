const express = require('express');
const router = express.Router();
const {
  io
} = require('../setup/express');

router.get('/comments', (req, res) => {
  const Comment = require('../dal/comment');
  Comment.find().then((comments) => {
    res.json(comments)
  })
});

router.post('/comments/add', (req, res) => {
	console.log("Server Test " + req.body.comment);
	const Comment = require('../dal/comment');
	const newComment = new Comment({ updatedAt: new Date(),
		comment: req.body.comment,
		email: "test@acme.com"
	})
	
	return newComment.save().then(() => {
		Comment.find().then((comments) => {
			console.log("Load comments " + req.body.comment);
		    res.json(comments);
			console.log("Calling newComment event with: " + comments);
		    io.emit('newComment', comments);
		  })
	})
});

router.post('/comments/:commentId/rate', (req, res) => {
  const Comment = require('../dal/comment');

  Comment.findById(req.params.commentId).then(comment => {
    if (!comment.rate){
    	comment.rate = 0;
    }
    
    if (!comment.ratingHits){
    	comment.ratingHits = 0;
    }
    
    console.log("Comment: " + comment);

    comment.rate += parseInt(req.body.rate, 10);

    comment.ratingHits += 1;

    console.log("Comment ID: " + req.params.commentId + " Rated: " + req.body.rate + " Avarage: " + (comment.rate / comment.ratingHits));

    return comment.save();
  }).then((newComment) => {
	console.log("Calling newRating event with:" + newComment);
    io.emit('newRating', newComment);
	console.log("Returning newComment:" + newComment);
    res.send(newComment);
  })
});

module.exports = router;
