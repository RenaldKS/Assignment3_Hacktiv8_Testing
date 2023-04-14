const { Photo, User } = require('../models');
class PhotoController {
    static GetAllPhotos(req,res) {
       Photo.findAll({
            include: User
    })
       .then(result => {
        res.status(200).json(result);
       })
       .catch(err => {
        console.log(err),
        res.status(500).json(err);
       })
    }
    static getOnePhotoById(req, res) {
        let id = +req.params.id
        Photo.findByPk(id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
    static async createPhoto(req, res) {
        try {
    
          const { 
            title,
            caption,
            image_url
          } = req.body
    
          const { id } = req.UserData
    
          const result = await Photo.create({
            title,
            caption,
            image_url,
            UserId: id
          })
         
          res.status(201).json(result)
        } catch (error) {
          res.status(error?.code || 500).json(error)
        }
      }
    static updatePhotoById(req, res) {
        let id = +req.params.id
        const {title,caption,image_url} = req.body;
        let data = {
            title,
            caption,
            image_url
        }
        Photo.update(
            data,
        { 
            where: {
                id

        },
        returning : true
    })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
    static deletePhotoById(req,res) {
        let id = req.params.id
        Photo.destroy({
            where: {
                id
            }
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
};

module.exports = PhotoController;