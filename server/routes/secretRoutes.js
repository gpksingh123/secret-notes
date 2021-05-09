const router = require("express").Router()
const Post = require("../models/postModel")

//Storing information in mangoose takes time and it's an asynchrous function
//Go over async await
router.post("/secretMessage", async (req, res) => {

    // retrieve data from request
    const {createdAt,encryptedMessage,encryptionType} = req.body;
    console.log(req.body)

    // construct the post model
    const newPost = new Post({
        createdAt, encryptedMessage, encryptionType
    })

    // save the post model
    try{
        const savedPost = await newPost.save()
        res.json(savedPost)
    } catch(err) {
        console.error(err);
    }
});

router.get("/getEncryptedMessages", async (req, res) => {
    const posts = await Post.find();
    res.json(posts)

});

router.get("/:id", async (req, res) => {
    console.log(req.params.id)
    const post = await Post.findById(req.params.id);
    res.json(post)

});



module.exports = router;