import mongoose from "mongoose";

export default async function connect(){
    await mongoose.connect("mongodb+srv://saniaahmad:abcdef123@quiz.lxl2fsz.mongodb.net/?retryWrites=true&w=majority")
    console.log("dbconnected")
}