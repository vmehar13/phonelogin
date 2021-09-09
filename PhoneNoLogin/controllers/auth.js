const User = require("../models/user");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {

    console.log(req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: "NOT SAVING PAGE/FILE"
            })
        }
        res.json({
            name: user.name,
            phone: user.phone,
            id: user._id,
        });
    });   
} 

exports.signin = (req, res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
       return res.status(422).json({
            error: errors.array()[0].msg
		
        })
    }
const { phone, password } = req.body;
    User.findOne({ phone }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER phone does not exists"
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "phone and password do not match"
      });
    }


    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
 
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, phone, role } = user;
    return res.json({ token, user: { _id, name, phone, role } });
  });
};


//protected Routes

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['sha1', 'RS256', 'HS256'],
})

//================================CUSTOM MIDDLE-WARES===========================

exports.isAuthenticated = (req, res, next) => {
    var checked = req.profile && req.auth && req.auth._id == req.profile._id;
    if(!checked){
        res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        res.status(403).json({
            error: "YOU ARE NOT AN ADMIN"
        })
    }
    next();
}