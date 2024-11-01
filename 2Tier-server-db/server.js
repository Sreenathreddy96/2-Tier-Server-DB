const mongoose = require("mongoose");

let studentSchema = new mongoose.Schema({
  firstName:{
    type: String,
    validate: {
      validator: function(v) {
        return/^[a-zA-Z\s]{2,25}$/.test(v);
      },
      message: props => `${props.value} is not a valid  firstName!`
    },
    required: [true, 'User firstName is required']
  },
lastName:{
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s]{2,25}$/.test(v);
      },
      message: props => `${props.value} is not a valid  last name!`
    },
    required: [true, 'User name is required']
  },
  age:{
    type: Number,
    min: [18,"You are too young to creat account."],
    max: [120,"You are too old to create account."],
    required: true,
  },
  gender:{
    type: String,
    required: true,
    lowercase: true,
    enum: ["male","female"],
    },
    email: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: props => `${props.value} is not a valid  email id!`
      },
      required: [true, 'User email id is required']
    },
  phoneNumber: String,
});

let Student = new mongoose.model("students", studentSchema);

let saveToDB = async () => {
  try {
    let sreenath = new Student({
      firstName: "Sreenath Reddy",
      lastName: "CH",
      age: 26,
      gender: "male",
      email: "Sreenath@gmail.com",
      phoneNumber: "+918886665660",
    });
    //await sreenath.save();
    let uday = new Student({
      firstName: "Uday",
      lastName: "P",
      age: 27,
      gender: "male",
      email: "Uday@gmail.com",
      phoneNumber: "+918886465660",
    });
    //await uday.save();
    let saikrishna = new Student({
      firstName: "Sai Krishna",
      lastName: "VG",
      age: 29,
      gender: "MALE",
      email: "Saikrishnah@gmail.com",
      phoneNumber: "+918886565660",
    });
    Student.insertMany([sreenath,uday,saikrishna]);
    console.log("Save to MDB succesfully");
  } catch (err) {
    console.log("Unable to save");
  }
};
let getDataFromDB = async ()=>{

  let studentsData = await Student.find();
  console.log(studentsData);

}

let connectToMDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sreenathlsp44:Sreenath@mern2406cluster.jyxki.mongodb.net/Batch2406Students?retryWrites=true&w=majority&appName=Mern2406Cluster"
    );
    console.log("Sucessfully connected to MDB");
    getDataFromDB();
    //saveToDB();
  } catch (err) {
    console.log("Unable to connect to MDB");
    console.log(err);
  }
};

connectToMDB();
