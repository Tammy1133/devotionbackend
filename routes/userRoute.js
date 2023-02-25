const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const config = process.env;

router.post("/registernewadmin", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(408).send("All input is required");
    } else {
      if (password.split("").length > 4) {
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await userModel.findOne({ username });

        if (oldUser) {
          res.status(409).send("User Already Exist. Please Login");
        } else {
          //Encrypt user password
          encryptedUserPassword = await bcrypt.hash(password, 10);

          // Create user in our database
          const user = await userModel({
            username: username.toLowerCase(), // sanitize
            password: encryptedUserPassword,
          });

          // Create token
          const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {
              expiresIn: "4s",
            }
          );
          // save user token
          user.token = token;
          await user.save();

          // return new user
          res.status(201).json(user);
        }
      } else {
        res.status(405).send("Password should be longer than 7 characters");
      }
    }
  } catch (err) {
    console.log(err);
  }

  // Our register logic ends here
});

router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await userModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      // const token = jwt.sign(
      //   { user_id: user._id, email },
      //   process.env.TOKEN_KEY,
      //   {
      //     expiresIn: "10m",
      //   }
      // );
      // // save user token
      // user.token = token;

      if (user.plan === "admin") {
        return res.status(200).json(user);
      }
    }
    return res.status(400).send("Invalid Credentials");

    // Our login logic ends here
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
