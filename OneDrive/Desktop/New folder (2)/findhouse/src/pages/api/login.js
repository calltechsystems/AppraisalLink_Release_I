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

    // Make an HTTP request to get user data based on the email
    const userResponse = await axios.post("https://calltech20230809222640.azurewebsites.net/api/Login/login", { email : email , password :password})
    const user = userResponse.data;
    

    //storing session
    // const session = request.session;
    // session.set('userInfo', user);
    //  await session.save();


    if(user === {}){
        return response.status(404).json({error:"User Not Found"});
    }

    return response.status(200).json({msg:"OK"},user);
  } catch (err) {
    console.log(err);
    return response.status(400).json({err:err.message});
  }
}
 
export default handler;


//
