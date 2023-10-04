import axios from "axios";
import CryptoJS from "crypto-js";


 async function handler (request,response) {

    const decryptionKey = process.env.CRYPTO_SECRET_KEY;

  try {
    const encryptedBody = await request.body.data;

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedBody, decryptionKey);
    const body = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    
    if(!body){
        return response.status(403).json({error:"Not a verified Data"})
    }

    const {userId,propertyId,streetName,streetNumber,city,state,zipCode,area,community,typeOfBuilding,applicantFirstName,
    applicantLastName,applicantEmail,applicantPhoneNumber,bidLowerRange,bidUpperRange,urgency,propertyStatus,token} = body;

    const formData = {
      propertyId : propertyId,
        userId:userId,
        streetName: streetName,
        streetNumber:streetNumber,
        city: city,
        state: state,
        zipCode:zipCode,
        area:area,
        community: community,
        typeOfBuilding: typeOfBuilding,
        applicantFirstName:applicantFirstName,
        applicantLastName: applicantLastName,
        applicantEmailAddress: applicantEmail,
        applicantPhoneNumber: applicantPhoneNumber,
        bidLowerRange: bidLowerRange,
        bidUpperRange: bidUpperRange,
        propertyStatus: propertyStatus,
        urgency: urgency,
        propertyStatus: propertyStatus
    }

  
    const userResponse = await axios.put(`https://calltech20230920213721.azurewebsites.net/api/Property/ByPropertyID/${propertyId}`, formData,
    {
      headers: {
        Authorization:`Bearer ${token}`,
        "Content-Type":"application/json"
      }
    }
    );
    const user = userResponse.data;


    if(!user){
        return response.status(404).json({error:"User Not Found"});
    }
    return response.status(200).json({msg:"OK",userData : user});
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
 
export default handler;

