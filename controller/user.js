const { v4: uuidv4 } = require("uuid");

const User = require("../model/user_model");

// let users = [
//    { id: 1, name: "Hannan", email: "hannan@gmail.com" },
//    { id: 2, name: "Reza", email: "reza@gmail.com" },
// ];

module.exports = {
   getusers: (req, res) => {
      let keyword = {};
      if (req.query.keyword) {
         keyword = { name: { $regex: req.query.keyword } };
      }

      // Cara pertama
      // User.find(keyword, "name _id", (err, users) => {
      //    if (err) console.log(err);
      //    res.render("pages/user/index", { users });
      // });

      // Cara kedua (query builder)
      const query = User.find(keyword);
      query.select("name _id");
      query.exec((err, users) => {
         if (err) console.log(err);
         res.render("pages/user/index", { users });
      });
   },

   show: (req, res) => {
      User.findById(req.params.id, (err, data) => {
         if (err) console.log(err);
         res.render("pages/user/show", { user: data });
      });
      // const id = req.pauser :rams.id;
      // const data = users.filter((user) => {
      //    return user.id == id;
      // });
      // res.render("pages/user/show", { user: data });
   },

   create: (req, res) => {
      res.render("pages/user/create");
   },

   post: (req, res) => {
      // metode save
      // const newUser = new User({
      //    name: req.body.name,
      //    email: req.body.email,
      //    password: req.body.password,
      // });

      // newUser.save((err, data) =>{
      //    if (err) console.log(err);
      //    console.log(data);
      //    res.redirect("/users");
      // });

      // Metode create
      User.create(
         {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
         },
         (err, data) => {
            if (err) console.log(err);
            console.log(data);
            res.redirect("/users");
         }
      );

      // users.push({
      //    id: uuidv4(),
      //    name: req.body.name,
      //    email: req.body.email,
      // });
   },

   edit: (req, res) => {
      const id = req.params.id;
      User.findById(id, (err, data) => {
         if (err) console.log(err);
         res.render("pages/user/edit", { user: data });
      });
   },

   update: (req, res) => {
      const id = req.params.id;
      users.filter((user) => {
         if (user.id == id) {
            user.id = id;
            user.name = req.body.name;
            user.email = req.body.email;

            return user;
         }
      });
      res.json({
         status: true,
         message: "Data berhasil di Update",
         data: users,
         method: req.method,
         url: req.url,
      });
   },
   delete: (req, res) => {
      let id = req.params.id;
      users = users.filter((user) => user.id != id);
      res.send({
         status: true,
         message: "Data berhasil di Delete",
         data: users,
         method: req.method,
         url: req.url,
      });
   },
};
