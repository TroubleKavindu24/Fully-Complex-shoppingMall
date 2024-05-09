const express = require("express");

const Posts = require("../model/order.model");

const router = express.Router();
const Cart = require("../model/cart-modal");

//save posts

router.post("/order/save", (req, res) => {
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

// Save order
// router.post("/order/save", async (req, res) => {
//   try {
//     // Fetch the cart details to get the price
//     const cart = await Cart.findById(req.body.cartId); // Assuming you have cartId in req.body

//     if (!cart) {
//       return res.status(404).json({ error: "Cart not found" });
//     }

//     const newOrder = new Posts({
//       name: req.body.name,
//       postalNo: req.body.postalNo,
//       street: req.body.street,
//       town: req.body.town,
//       contactNo: req.body.contactNo,
//       orderDate: req.body.orderDate,
//       price: cart.price, // Set the price of the order from the cart
//     });

//     await newOrder.save();

//     return res.status(200).json({
//       success: "Order saved successfully",
//       newOrder,
//     });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// });

//get posts

router.get("/orders", (req, res) => {
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

//get a specific post
router.get("/order/:id", (req, res) => {
  let postId = req.params.id;

  Posts.findById(postId)
    .then((post) => {
      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }
      return res.status(200).json({
        success: true,
        post,
      });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err.message });
    });
});

//update posts

router.put("/order/update/:id", (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => {
      return res.status(200).json({ success: "Update Successfully" });
    })
    .catch((err) => {
      return res.status(400).json({ error: err.message });
    });
});

//delete post

router.delete("/order/delete/:id", (req, res) => {
  Posts.findByIdAndDelete(req.params.id)
    .then((deletedPost) => {
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json({
        message: "Delete is successful",
        deletedPost,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Delete unsuccessful",
        error: err.message,
      });
    });
});

module.exports = router;
