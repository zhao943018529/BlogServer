import mongoose from "mongoose";

mongoose
  // .connect("mongodb://192.168.43.44:27017/blogdb", {
  .connect("mongodb://127.0.0.1:27017/blogdb", {
    user: "ninja",
    pass: "root1234",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("successfull");
  })
  .catch((err) => {
    console.error(err);
  });
