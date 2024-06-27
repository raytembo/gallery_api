import  express  from "express";
import multer from "multer";
import path from 'path';
import ejs from 'ejs';
import { postImages,getImage } from "./database.js";


const storage = multer.diskStorage({
    destination:(req,file,cb)=>
     cb(null,'uploads'),
    filename:(req,file,cb)=>{
       // console.log(file)
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

const app = express();

app.set ('view engine', 'ejs');


app.get('/',(req,res)=>{
   // console.log(getImages())
    res.send("Images")
});

app.get('/upload',(req,res)=>{
    res.render("upload");
});
app.post('/upload', upload.single('Image'),(req,res)=>{
    //console.log(req.file.path)
    postImages(req.file.path)
    getImage(10) 
   //res.json(req.Image)
    res.send("Uploaded")

})
app.post('/uploads', upload.array('Image',3),(req,res)=>{
    console.log(req.files) 
   //res.json(req.Image)
    res.send("Files Uploaded")

})

app.listen(4000,()=>{
    console.log("Listening on port 4000");
});