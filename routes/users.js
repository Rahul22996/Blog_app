var express = require('express');
var router = express.Router();
const userController = require('../controller/user')
const adminController = require('../controller/admin')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  
  /* GET users listing. */
router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.post('/add_category', upload.single('image'), adminController.add_category);
router.get('/show_category', adminController.show_category);
router.patch('/update_category/:id', adminController.update_category);
router.delete('/delete_category/:id', adminController.delete_category);

router.post('/add_blog', upload.array('image', 10), userController.add_blog);
router.get('/show_blog', userController.show_blog);
router.post('/show_category_blog/:cid', userController.show_category_blog);
router.patch('/update_blog/:id', userController.update_blog);
router.delete('/delete_blog/:id', userController.delete_blog);

router.post('/add_like/:bid', userController.add_like);
router.post('/add_comment/:bid', userController.add_comment);
router.get('/show_comment/:bid', userController.show_comment);
router.delete('/delete_comment/:cid', userController.delete_comment);

module.exports = router;
