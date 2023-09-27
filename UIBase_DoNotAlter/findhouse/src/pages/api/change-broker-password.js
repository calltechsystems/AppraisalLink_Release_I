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

    const { email, oldPassword , newPassword , token  } = body;
    
       const formData = {
        email : email, 
        oldPassword : oldPassword ,
        newPassword : newPassword
    };
    const userResponse = await axios.post("https://calltech20230920213721.azurewebsites.net/api/Login/changepassword", formData,
    {
        headers: {
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
          }
    })
    const user = userResponse.data;

    if (!user) {
      return response.status(403).json({error:"No user Exists"});
    }
    return response.status(200).json({msg:"Successfully Updated The Password !!"});
  } catch (err) {
    console.log(err.message);
    return response.status(400).json({err:err.message});
  }
}
 
