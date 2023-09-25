import axios from "axios";
import CryptoJS from "crypto-js";
import withSession from "../../utils/session/session";


 async function handler (request,response) {

    const decryptionKey = process.env.CRYPTO_SECRET_KEY;

  try {
    const encryptedBody = await request.body.data;

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedBody, decryptionKey);
    const body = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    
    if(!body){
        return response.status(403).json({error:"Not a verified Data"})
    }

    const { email, password   } = body;

    const userResponse = await axios.post("https://calltech20230920213721.azurewebsites.net/api/Login/Login", { email : email , password :password})
    const user = userResponse.data;


    if(!user){
        return response.status(404).json({error:"User Not Found"});
    }
    return response.status(200).json({msg:"OK",userData : user});
  } catch (err) {
    console.log(err);
    return response.status(400).json({err:err.message});
  }
}
 
export default handler;

