"use server"
import axios from "axios";
import { revalidateTag } from "next/cache";

export const contactAction = async (formData) =>{
    const data = Object.fromEntries(formData.entries());
    sendData(data);
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




