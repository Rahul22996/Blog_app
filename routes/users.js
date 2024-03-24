var express = require('express');
var router = express.Router();
const userController = require('../controller/user')

/* GET users listing. */
router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.post('/add_blog', userController.add_blog);
router.get('/show_blog', userController.show_blog);
router.patch('/update_blog/:b_id', userController.update_blog);
router.delete('/delete_blog/:id', userController.delete_blog);

router.post('/add_like/:bid', userController.add_like);
router.post('/add_cmt/:bid', userController.add_comment);
router.get('/show_cmt/:id', userController.show_comment);
router.delete('/delete_cmt', userController.delete_comment);

module.exports = router;
