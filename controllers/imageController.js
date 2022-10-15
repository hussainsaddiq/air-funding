const jwtDecode = require("jwt-decode")
const formIdable = require("formidable");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path")
const {findUser} = require("../services/userService")
const User = require("../models/User");

module.exports.changePictureView = (req, res) => {
    const id = jwtDecode(req.cookies.donationUser);
    findUser(id.id).then(function(response) {
        res.render("users/updatePicture", {title: 'Change Picture', auth: req.cookies.donationUser, user: response});
    });
}
module.exports.profileImagePost = (req, res) => {
    const form = formIdable();
    const id = jwtDecode(req.cookies.donationUser);
    let error = ''
    form.parse(req, (err, fields, files) => {
        if(!err) {
          if(!files) {
            error = 'Please choose an image';
          } else {
              console.log("Your image", files)
            const mimetype = files.image.mimetype.split('/');
            const extension = mimetype[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                console.log(`${extension} is not a valid extension`)
                error = `${extension} is not a valid extension`;
            } else {
                const newName = uuidv4() + '.' + extension;
                const __dirname = path.resolve();
                console.log(__dirname)
                const newPath = __dirname + `/views/assets/images/${newName}`;
                fs.copyFile(files.image.filepath, newPath, async (error) => {
                      if(!error) {
                          const response = await User.findByIdAndUpdate(id.id, {photo: newName}, {new: true});
                          if(response) {
                             res.redirect('/profile')
                          } else {
                              console.log('error in query');
                          }
                      } else {
                          console.log(error)
                      }
                })
            }
          }
        } else {
            console.log(err);
        }
    });
}