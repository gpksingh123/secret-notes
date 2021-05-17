const router = require("express").Router()
const Post = require("../models/postModel")

//Storing information in mangoose takes time and it's an asynchrous function
//Go over async await
//Here we will 
router.post("/secretMessage", async (req, res) => {
    // retrieve data from request
    const {createdAt, message, encryptionType} = req.body;
    console.log("Got a post request",createdAt,message,encryptionType)


    // Logic for encrytion of message will be worked out in encryptMessage Function
    let encryptedMessage = await encryptMessage(encryptionType, message)
    // console.log(req.body)

    // construct the post model
    const newPost = new Post({
        createdAt, message, encryptedMessage, encryptionType
    })
    
     // save the post model
    try{
        const savedPost = await newPost.save()
        res.json(savedPost)
        console.log(savedPost)
    } catch(err) {
        console.error(err);
    }
});

router.patch("/:id", async (req, res) => {
  let id = req.params.id
  let message = req.body.message
  let encryptionType = req.body.encryptionType
  let encryptedMessage = encryptMessage(encryptionType,message)
  
  console.log("Got a patch request",id,message,encryptionType)
  try{
    const post = await Post.findByIdAndUpdate({_id:id}, {message:message,
      encryptedMessage: encryptedMessage
    });
    res.json(post)
  } catch (err){
    console.log(err)
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

router.delete("/:id", async (req, res) => {
  let id = req.params.id
  
  const post = await Post.deleteOne({_id : req.params.id});
  res.json(post)
});


/*___________HELPER FUNCTIONS_________________*/
let pigLatinSentenceEncrypter = function(sentence) {
  let encryptedSentence = ""
  let words = sentence.split(" ")
  
  for(let i = 0; i < words.length; i++) {
    encryptedSentence += pigLatin(words[i]) + " "
  }

  return encryptedSentence
}

let pigLatin = function(str) {
    // Convert string to lowercase
    str = str.toLowerCase()
    
    // Initialize array of vowels
    const vowels = ["a", "e", "i", "o", "u"];
    // Initialize vowel  index to 0
    let vowelIndex = 0;
  
    if (vowels.includes(str[0])) {
      // If first letter is a vowel
      return str + "way";
    } else {
      // If the first letter isn't a vowel i.e is a consonant
      for (let char of str) {
        // Loop through until the first vowel is found
        if (vowels.includes(char)) {
          // Store the index at which the first vowel exists
          vowelIndex = str.indexOf(char);
          break;
        }
      }
      // Compose final string
      return str.slice(vowelIndex) + str.slice(0, vowelIndex) + "ay";
    }
  }

let emoGize = function(message) {
  let result = ""
  console.log("message  in emo", message)
  let str = message.toLowerCase()
  let letters = {
    a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10,k:11,l:12,m:13,n:14,o:15,p:16,q:17,r:18,s:19,t:20,u:21,v:22,w:23,x:24,y:25,z:26
  }

  for (let i = 0; i < message.length; i++) {
    result += letters[message[i]].toString()
  }
  return result
}

let letterScramble = function(message) {
  let result = ""
  let letters = {
    a:"b",b:"c",c:"d",d:"e",e:"f",f:"g",g:"h",h:"i",i:"j",j:"k",k:"l",l:"m",m:"n",n:"o",o:"p",p:"q",q:"r",r:"s",s:"t",t:"u",u:"v",v:"w",w:"x",x:"y",y:"z",z:"a"
  }
  for (let i = 0; i < message.length; i++) {
    result += letters[message[i]]
  }
  return result
 
}
  
let encryptMessage = function(encryptionType, message) {
    console.log("Encrypt message called", encryptionType)
    let encryptedMessage =  ""
    if(encryptionType === "Pig Latin"){
        encryptedMessage = pigLatinSentenceEncrypter(message)
        return encryptedMessage
    } else if (encryptionType === "nothing") {
        return message
    } else if (encryptionType=== "Emo-gize") {
        encryptedMessage = emoGize(message)
        return encryptedMessage
    } else {
        encryptedMessage = letterScramble(message)
        return encryptedMessage
    }
}


module.exports = router;