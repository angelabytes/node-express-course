const jwt = require("jsonwebtoken");
const {BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  //throw error if no email or passwor entered
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  //just for demonstration
  const id = new Date().getDate();

  //try to keep payloads small for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
