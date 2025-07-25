import axios from "axios";
import { revalidatePath } from "next/cache";

export const contactAction = async (formData) =>{
    "use server"
    const data = Object.fromEntries(formData.entries());
    sendData(data);
    revalidatePath("/showData");
}

async function sendData(data) {
  try {
    const response = await axios.post('https://trip-y1a7.onrender.com/createTrip', 
        data
    );
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}
 




