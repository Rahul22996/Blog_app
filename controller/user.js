const USER = require('../model/user_model')
const BLOG = require('../model/blog_model')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");
// let Storage = require('node-persist');Storage.init();
const jwt = require("jsonwebtoken");
const { log } = require('node-persist');
const COMMENT = require('../model/comment_model')

//   ------------------------------------------------------------------------------------------------------

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "rahulmakwana0037@gmail.com",
        pass: "eqdt vgke uydr gumu",
    },
});

async function main(email) {
    const info = await transporter.sendMail({
        from: '"rahulmakwana0037@gmail.com>',
        to: email,
        subject: "Testing E-mail",
        html: "<h1>Signup Seccess</h1>",
    });

    console.log("Message sent: %s", info.messageId);
}

//   ------------------------------------------------------------------------------------------------------

exports.signup = async function (req, res, next) {
    try {
        req.body.image = req.file.filename;
        req.body.password = await bcrypt.hash(req.body.password, 9)

        if (!req.body.name || !req.body.username || !req.body.email || !req.body.password) {
            throw new Error("Please Enter Valid Fields");
        }

        const checkUser = await USER.findOne({ username: req.body.username })

        if (checkUser) {
            throw new Error("User name is already Taken");
        }

        const check_email = await USER.findOne({ email: req.body.email })

        if (check_email) {
            throw new Error("Email is already Taken");
        }

        const data = await USER.create(req.body);

        main(req.body.email).catch(console.error);

        res.status(200).json({
            status: "Success",
            messeage: "Signup Succesful",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.login = async function (req, res, next) {
    try {
        if (!req.body.username || !req.body.password) {
            throw new Error("Please Enter Valid Fields");
        }

        var checkUser = await USER.findOne({ username: req.body.username })

        if (!checkUser) {
            throw new Error("User not Found")
        }

        var checkPass = await bcrypt.compare(req.body.password, checkUser.password)

        if (!checkPass) {
            throw new Error("Wrong Password")
        }
        var token = jwt.sign({ id: checkUser._id }, 'token')



        res.status(200).json({
            status: "Success",
            messeage: "Login Succesful",
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//   ------------------------------------------------------------------------------------------------------

exports.add_blog = async function (req, res, next) {
    try {
        let uid = await jwt.verify(req.headers.token, 'token')
        req.body.uid = uid.id;
        let data = await BLOG.create(req.body);

        res.status(200).json({
            status: "Success",
            message: "blog posted",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail"
        })
    }
}

exports.show_blog = async function (req, res, next) {
    try {

        let data = await BLOG.find().populate('user');

        res.status(200).json({
            status: "Success",
            message: "Blogs posted by User",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail"
        })
    }
}

exports.update_blog = async function (req, res, next) {
    try {
        let b_id = req.params.id
        let data = await BLOG.findOneAndUpdate(b_id, req.body)

        res.status(200).json({
            status: "Success",
            message: "Blogs posted by User",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail"
        })
    }
}

exports.delete_blog = async function (req, res, next) {
    try {
        let b_id = req.params.id
        let data = await BLOG.findByIdAndDelete(b_id)
        res.status(200).json({
            status: "Success",
            message: "Blog is Deleted",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail"
        })
    }
}

//   ------------------------------------------------------------------------------------------------------

exports.add_like = async function (req, res, next) {
    try {
        let uid = await jwt.verify(req.headers.token, 'token')
        var id = uid.id
        var bid = req.params.bid
        let data = await BLOG.findById(bid)

        var like = data.like
        console.log(like);
        if (!like.includes(id)) {
            like.push(id)
        }
        else {
            var new_like = []
            for (let likes of like) {
                if (likes == id) {
                    null
                    //   like.splice(likes, 1)
                }
                else {
                    new_like.push(likes)
                }
            }
            like = new_like
        }
        var like_count = await BLOG.findByIdAndUpdate(bid, { "like": like })
        res.status(200).json({
            status: "Success",
            message: "like added",
            like_count
        })
    }

    catch (error) {
        res.status(404).json({
            status: "Fail"
        })
    }
}

// exports.add_like = async function (req, res, next) {
//     //try {
//     let uid = await jwt.verify(req.headers.token, 'token')
//     var id = uid.id
//     var bid = req.params.bid
//     let data = await BLOG.findById(bid)
//     const checkId = data.like.find(uId => uId.toString() == id)

//     if (!checkId) {
//         data.like.push(id)
//     }
//     else {
//         data.like = data.like.filter(uId => uId.toString() !== id)
//     }

//     await data.save()



//     res.status(200).json({
//         status: "Success",
//         message: "blog posted"
//     })
// } 

exports.add_comment = async function(req, res, next) {
    try {
        let uid = await jwt.verify(req.headers.token, 'token')
        req.body.uid = uid.id
        let bid = req.params.bid

        let data = await COMMENT.create(req.body)

        res.status(200).json({
            status : "Success",
            message : "Comment Added",
            data
        })       

    } catch (error) {
        res.status(404).json({
            status : "Fail"
        })
    }
}

exports.show_comment = async function(req, res, next) {
    try {
        let bid = req.params.id
        let data = await COMMENT.find().populate('uid')

        res.status(200).json({
            status : "Success",
            message : "Comment on Blog",
            data
        })       

    } catch (error) {
        res.status(404).json({
            status : "Fail",
        })
    }
}

exports.delete_comment = async function(req, res, next) {
    try {
        var userid = req.body.uid
        let data = await COMMENT.findOneAndDelete({"uid" : userid})

        res.status(200).json({
            status : "Success",
            message : "Comment Deleted",
            data
        })       

    } catch (error) {
        res.status(404).json({
            status : "Fail",
        })
    }
}