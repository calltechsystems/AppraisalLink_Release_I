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

    const { email, password , userType  } = body;
    
       const formData = {
        email : email, 
        password : password ,
        userType : userType
    };

    // const checkUser = await axios.post("https://calltech20230809222640.azurewebsites.net/api/Login/login", { email : email})
    // if(checkUser){
    //     return response.status(403).json({error:"This email user already exists!"});
    // }

    // Make an HTTP request to get user data based on the email
    const userResponse = await axios.post("https://calltech20230920213721.azurewebsites.net/api/Registration/Registration", formData)
    const user = userResponse.data;

    return response.status(201).json({msg:"Successfully Created !!"});
  } catch (err) {
   
    if (err.response) {
      // If the error is from an axios request (e.g., HTTP 4xx or 5xx error)
      const axiosError = err.response.data;
      const statusCode = err.response.status;
      console.error(statusCode,axiosError.message); // Log the error for debugging

      return response.status(statusCode).json({ error: axiosError.message });
    } else {
      // Handle other types of errors
      return response.status(500).json({ error: "Internal Server Error" });
    }

  }
}
 
