import express from 'express';
import cors from 'cors';
import {google} from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const auth=new google.auth.GoogleAuth({
    credentials:{
        client_email:process.env.GOOGLE_CLIENT_EMAIL,
        private_key:process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    },
    scopes:['https://www.googleapis.com/auth/spreadsheets'],
}); 
    

const sheets=google.sheets({version:'v4',auth});

app.post('/api/submit',async(req,res)=>{
  
    try{
        const {name, email,phone}=req.body;

        await sheets.spreadsheets.values.append({
            spreadsheetId:process.env.SPREADSHEET_ID,
            range:'Sheet1!A:C',
            valueInputOption:'USER_ENTERED',
           requestBody:{
            values:[[name,email,phone]]
           }
        });
        res.status(200).json({message:'Data submitted successfully'});
    }catch(error){
        console.error('Error submitting data:',error);
        res.status(500).json({message:'Error submitting data'});
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
 

