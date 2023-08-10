const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");
const cors = require('cors');

app.use(cors());

dotenv.config();
const connectDB = async () => {
    try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology:true})
    console.log("Connected to MongoDB")
    }catch (err) {
    console.log(err);
    }
}
connectDB();

app.use("/images", express.static(path.join(__dirname, "public/images")));

//Middle Wares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        const fileName = req.body.name
        cb(null, fileName);
    },
});

const upload = multer({storage});
app.post('/api/upload', upload.single("file"), (req, res) =>{
    try{
        return res.status(200).json("File Uploaded successfully");
    }catch(err){
        console.log(err);
    }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute)

app.listen(8800, ()=>{
    console.log("Backend server is running!")
})