const router = require('express').Router();
const PhotoController = require('../controllers/photoControllers');
const UserController = require ('../controllers/userControllers');
const authentication = require('../middlewares/authentication')

router.post('/user/register', UserController.register);
router.post('/user/login', UserController.login);   

router.use(authentication);
router.get('/photos', PhotoController.GetAllPhotos);
router.get('/photos/:id', PhotoController.getOnePhotoById);
router.post('/photos', PhotoController.createPhoto);
router.put('/photos/:id', PhotoController.updatePhotoById);
router.delete('/photos/:id', PhotoController.deletePhotoById);;
 

module.exports = router;
