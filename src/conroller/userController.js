//
import Blog from "../models/userModel.js";
import jsonwebtoken from "jsonwebtoken";
import { json } from "express";
class UserController {
  async createUser(req, res) {
    const blog = new Blog({ title: "THis is title", author: "Author name" });
    const token = jsonwebtoken.sign({ title: blog.title }, "hhh");
    blog.token = token;
    console.log(token);
    try {
      // const result = await blog.save(function (err, data) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     res.send({ messsage: "Data inserted", data: data });
      //   }
      // });
      // if (result) {
      //   console.log(`result == ${result}`);
      // }

      const result = jsonwebtoken.verify(token, "hhh");
      res.send(result);
    } catch (e) {
      res.send({ error: e });
    }
  }
}

export default UserController;
