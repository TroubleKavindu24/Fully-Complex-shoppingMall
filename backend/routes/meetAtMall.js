const express = require("express");

const Posts = require("../model/meetAtMall.model");
const router = express.Router();

//save posts

router.post("/meetAtMall/save", (req, res) => {
  let newPost = new Posts(req.body);

  newPost
    .save()
    .then((savedPost) => {
      return res.status(200).json({
        success: "post saved successfully",
        savedPost,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err.message,
      });
    });
});

//get posts

router.get("/meetAtMall", (req, res) => {
  Posts.find()
    .then((posts) => {
      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err.message,
      });
    });
});

module.exports = router;
