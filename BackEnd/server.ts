import express from 'express'
import cors from 'cors'


const app = express()
const port =  3000


app.use(cors())

app.post('/api/files', async(req,res) =>{
    //Extract file the frontend


    return res.status(200).json({data:[], message:"El archivo se cargo correctamente"})
})

app.listen(port ,()=>{
    console.log(`Server run on port ${port}`)
    
})