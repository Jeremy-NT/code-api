const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const defaultEmail = "default@example.com"; // Change to your desired default email
const defaultPassword = "password"; // Change to your desired default password

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if provided credentials match the default values
    if (email === defaultEmail && password === defaultPassword) {
      // Generate a JWT token
      const token = jwt.sign({ userId: "default", role: "Admin" }, "secretKey");

      // Construct a response object for the default user
      const responseUser = {
        _id: "default",
        username: "Default",
        email: defaultEmail,
        token: token,
      };

      // Return the response for the default user
      return res.json(responseUser);
    }

    // If provided credentials do not match the default, proceed to database check
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or password" });
    }

    // Check the provided password against the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Generate a JWT token for the database user
    const token = jwt.sign({ userId: user._id, role: user.role }, "secretKey");

    // Construct a new object with user details and token
    const responseUser = {
      _id: user._id,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      email: user.email,
      token: token,
    };

    // Return the new object in the response
    res.json(responseUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: error.message });
  }
};

const Home = (req, res, next) => {
  res.send({ message: "Hello, world" }); // Fixed syntax for sending an object
  next();
};

const SignUp = async (req, res) => {
  try {
    // console.log(req.body);
    const { email } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving
    // console.log("Password before hashing:", req.body.password);
    const saltRounds = 12; // Number of salt rounds to use for hashing
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user with the hashed password
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User Created Successfully", user });
  } catch (err) {
    // console.log(err)
    res.status(500).json({ message: err.message });
  }
};

module.exports = { Login, Home, SignUp };

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require("../models/userModel");

// const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find User By Email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid Email or password" });
//     }

//     // Check the provided password against the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid Email or Password" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user._id }, "secretKey");

//     // Construct a new object with user details and token
//     const responseUser = {
//       _id: user._id,
//       first_name: user.first_name,
//       middle_name: user.middle_name,
//       last_name: user.last_name,
//       email: user.email,
//       token: token,
//     };

//     // Return the new object in the response
//     res.json(responseUser);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message:  error.message});
//   }
// };

// const Home = (req, res, next) => {
//   res.send({ message: "Hello, world" }); // Fixed syntax for sending an object
//   next();
// };

// module.exports = { Login, Home };
