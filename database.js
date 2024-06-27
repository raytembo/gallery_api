import { createPool} from 'mysql2/promise';


const pool = await createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'gallery'
})

async function getImages(){
    const [Images] = await pool.query('SELECT * FROM photos')
    return Images
  }
export async function getImage(id){
    const [Images] = await pool.query(`SELECT photopath FROM photos WHERE idphotos =${id}`)
    console.log(Images[0]['photopath'])
    return Images
  }  

export async function postImages(image){
  const [photouploaded] = await pool.query(`
    INSERT INTO photos
    (photopath) 
    VALUES (?)`,[image])
    return [photouploaded];
}  

const output = getImages();
console.log(output);