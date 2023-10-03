import axios from "axios";
import CryptoJS from "crypto-js";


 async function handler (request,response) {

    const decryptionKey = process.env.CRYPTO_SECRET_KEY;

  try {
    const token = request.headers.authorization;


    const userResponse = await axios.get(`https://calltech20230920213721.azurewebsites.net/api/Plan`,
    {
        headers: {
          Authorization:token,
          "Content-Type":"application/json"
        }
      });
    const users = userResponse.data;


    return response.status(200).json({msg:"OK",data : users});
  } catch (err) {
    console.log(err);
    return response.status(400).json({err:err.message});
  }
}
 
export default handler;

