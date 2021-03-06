const { validationResult } = require("express-validator");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// SIGNUP
exports.signup = (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: 
        errors.array()[0].msg
      });
    }
  
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: "NOT able to save user in DB"
        });
      }
      res.json({
        name: user.name,
        email: user.email,
        id: user._id
      });
    });
  };
  

//SIGNIN   
  exports.signin = (req, res) => {
      const errors = validationResult(req);
      const{email, password} = req.body;

      if (!errors.isEmpty() ) {
          return res.status(422).json({
              error: errors.array()[0].msg
          })
      }

      User.findOne({email}, (err, user) => {
          if (err || !user) {
              return res.status(400).json({
                  err: "Email doesnot exists"
              })
          }
      
      if (!user.authenticate(password)) {
          return res.status(401).json({
              err: "Email and Password doesnot match"
          })
      }

    // tokken
      var token = jwt.sign({ id: user._id }, process.env.SECRET);
    //token in cookie
      res.cookie("token", token, {expire: new Date() + 9999});

    // Response to frontend
      const{_id, name, email, role} = user;
      return res.json({token, user: {_id, name, email, role} });
    })
  }

//SIGNOUT
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "USER SIGNED OUT"
    })
}



