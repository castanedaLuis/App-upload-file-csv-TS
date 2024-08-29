import express from 'express'
import cors from 'cors'
import multer from 'multer'
import csvToJson from 'convert-csv-to-json'


const app = express()
const port =  3000

const storage = multer.memoryStorage()
const upload = multer({ storage:storage })

//un Array de objetos
let userData:Array<Record<string,string>> = []

app.use(cors())

app.post('/api/files',upload.single('file') ,async(req,res) =>{
    //Extract file the frontend
    const { file } = req
    //Validate exist file
    if(!file){
        return res.status(500).json({ message : "File is required"})
    }
    //Validate tipe the file
    if(file.mimetype != 'text/csv') return res.status(500).json({ message : "File must be csv"})

    let json:Array<Record<string,string>> = []
    try {
         //Transform file buffer to string
        const csv = Buffer.from(file.buffer).toString('utf-8')
        console.log(csv);
        //Transform string to JSON
        json  = csvToJson.csvStringToJson(csv)
    } catch (error) {
        return res.status(500).json({ message : "Error parsing Array File"})
    }

    //save json to memory DB
    userData = json
    // return messgae with data(JSON)
    return res.status(200).json({data:json, message:"El archivo se cargo correctamente"})
})

app.get('/api/user',async (req,res)=>{

    return res.status(200).json({data:[]})
})

app.listen(port ,()=>{
    console.log(`Server run on port ${port}`)
    
})