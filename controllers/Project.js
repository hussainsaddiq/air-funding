const jwtDecode = require("jwt-decode");
const formIdable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const { findUser } = require("../services/userService");
const ProjectModel = require("../models/Project");
const User = require("../models/User");
module.exports.create = (req, res) => {
  res.render("users/create", {
    title: "profile",
    auth: req.cookies.donationUser,
    user: req.user,
    errors: [],
    fields: {},
  });
};
module.exports.createProject = (req, res) => {
  const form = formIdable();
  form.parse(req, async (err, fields, files) => {
    if (!err) {
      console.log(fields);
      const errors = [];
      const startDate = new Date(fields.start_date).getTime();
      const currentDate = new Date().getTime();
      const endDate = new Date(fields.end_date).getTime();

      if (fields.title.trim().length === 0) {
        errors.push({ name: "title", msg: "title is required" });
      }
      if (
        fields.amount.trim().length === 0 ||
        parseInt(fields.amount) < 30000
      ) {
        errors.push({ name: "amount", msg: "amount should be above 3000pkr" });
      }
      if (fields.start_date.trim().length === 0) {
        errors.push({ name: "start_date", msg: "start date is required" });
      } else if (
        moment(new Date()).format("ll") ===
        moment(fields.start_date).format("ll")
      ) {
      } else if (startDate < currentDate) {
        errors.push({ name: "start_date", msg: "please add future date" });
      }
      if (fields.end_date.trim().length === 0) {
        errors.push({ name: "end_date", msg: "end date is required" });
      } else if (endDate < startDate) {
        errors.push({
          name: "end_date",
          msg: "end date should be above than start date",
        });
      }
      if (fields.category.trim().length === 0) {
        errors.push({ name: "category", msg: "category is required" });
      }
      if (fields.description.length === 0) {
        errors.push({ name: "description", msg: "description is required" });
      }
      if (errors.length === 0) {
        const images = {};
        console.log(files);
        for (let i = 0; i < Object.keys(files).length; i++) {
          // console.log(`index: ${files[i]}`)
          const mimeType = files[`doc_${i + 1}`].mimetype;
          const extension = mimeType.split("/")[1].toLowerCase();
          const imageName = uuidv4() + `.${extension}`;
          const __dirname = path.resolve();
          const newPath = __dirname + `/views/assets/images/${imageName}`;
          images[`image${i + 1}`] = imageName;
          if (i === 0) {
            if (
              extension !== "jpeg" &&
              extension !== "jpg" &&
              extension !== "png"
            ) {
              errors.push({
                name: "doc_1",
                msg: "only jpeg/jpg and png image is required",
              });
              // return;
            } else {
              fs.copyFile(files[`doc_${i + 1}`].filepath, newPath, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          }
          if (i === 1) {
            if (extension !== "pdf") {
              errors.push({ name: "doc_2", msg: "only pdf file is required" });
              // return;
            } else {
              fs.copyFile(files[`doc_${i + 1}`].filepath, newPath, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          }
        }
        if (errors.length === 0) {
          const { title, amount, start_date, end_date, category, description } =
            fields;
          const user = req.user;
          try {
            await ProjectModel.create({
              title,
              amount,
              startDate: start_date,
              endDate: end_date,
              image: images.image1,
              file: images.image2,
              category,
              description,
              user: user._id,
            });
            res.redirect("/projects");
          } catch (error) {
            console.log(error.message);
          }
        } else {
          res.render("users/create", {
            title: "profile",
            auth: req.cookies.donationUser,
            user: req.user,
            errors,
            fields,
          });
        }
      } else {
        res.render("users/create", {
          title: "profile",
          auth: req.cookies.donationUser,
          user: req.user,
          errors,
          fields,
        });
      }
    }
  });
};
module.exports.projects = async (req, res) => {
  const user = req.user;
  try {
    const projects = await ProjectModel.find({ user: user._id });
    res.render("users/projects", {
      title: "projects",
      auth: req.cookies.donationUser,
      user: req.user,
      projects,
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.getProject = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const project = await ProjectModel.findOne({ _id: id }).populate(
      "donations"
    );
    console.log(project);
    res.render("users/details", {
      title: project.title,
      auth: req.cookies.donationUser,
      user: req.user,
      project,
      moment,
    });
  } catch (err) {
    console.log(err.message);
  }
};
