'use server'

import axios from "axios";

export const contactAction = async (formData) => {
  const data = Object.fromEntries(formData.entries());
  try {
    const response = await axios.post('https://trip-y1a7.onrender.com/createTrip', data);
    console.log('Success:', response.data);
    return { success: true, message: 'Data Added successfully!' };
  } 
  catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'Failed to Add Data' };
  }
};
