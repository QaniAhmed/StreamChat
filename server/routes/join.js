import { Router } from "express";
import { DB } from "../DB/db.js";

const join = Router();
join.post("/", async (req, res) => {
  const user_name = req.body.user_name;
  console.log(user_name);

  //test connection
  const { data, error } = await DB.from("users").select("*", {
    count: "exact",
    head: true,
  });

  if (error) {
    console.error("wrong to connect to DB", error.message);
    return res
      .status(400)
      .json({ message: "Error: can't create the username" });
  } else {
    console.log("connection successfully");
    //insert the users to DB
    const { data, error } = await DB.from("users")
      .insert({
        username: user_name,
      })
      .select();
    if (error) {
      //duplicate error
      if (error.code === "23505") {
        console.error("This username exists.");
        return res.status(409).json({
          message: "Username already taken, please choose another one.",
        });
      }
      //general error
      console.error("Error to insert", error.message);
      return res
        .status(400)
        .json({ message: "Error: can't create the username" }, error);
    }
    console.log(data);
    res.status(201).json({
      message: "created succefully",
      username: user_name,
      id: data[0].user_id,
    });
  }
});

export default join;
