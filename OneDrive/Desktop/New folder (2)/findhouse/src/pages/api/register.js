import axios from "axios";
import CryptoJS from "crypto-js";

export default async function handler (request,response) {

    const decryptionKey = process.env.CRYPTO_SECRET_KEY;
  try {

    const encryptedBody = await request.body.data;

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedBody, decryptionKey);
    const body = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

    if(!body){
        return response.status(403).json({error:"Not a verified Data"})
    }

    const { email, password , AccountType  } = body;
    
       const formData = {
        email : email, 
        password : password ,
        AccountType : AccountType
    };

    // const checkUser = await axios.post("https://calltech20230809222640.azurewebsites.net/api/Login/login", { email : email})
    // if(checkUser){
    //     return response.status(403).json({error:"This email user already exists!"});
    // }

    // Make an HTTP request to get user data based on the email
    const userResponse = await axios.post("https://calltech20230809222640.azurewebsites.net/api/Registration/Registration", formData)
    const user = userResponse.data;

    if (!user) {
      return response.status(500).json({error:"Server Error"});
    }
    return response.status(201).json({msg:"Successfully Created !!"},user);
  } catch (err) {
    return response.status(400).json({err:err.message});
  }
}
 
