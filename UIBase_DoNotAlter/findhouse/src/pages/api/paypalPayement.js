import axios from "axios";
import CryptoJS from "crypto-js";


 async function handler (request,response) {

    const decryptionKey = process.env.CRYPTO_SECRET_KEY;

  try {

    const encryptedBody = await request.body.data;

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedBody, decryptionKey);
    const body = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
   

    const {userId,planId,token} = body;


    const userResponse = await axios.post(`https://calltech20230920213721.azurewebsites.net/api/payments/paymenturl?Planid=${planId}&UserId=${userId}`,
    null,{
        headers: {
          Authorization:`Bearer ${token}`
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
