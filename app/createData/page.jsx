"use client"

import {contactAction} from '../serverActions/contact.action'
import { toast } from 'react-toastify';
import Loader1 from '../components/Loader1';
import { useState } from 'react';

export default function Create() {

    const [loading,setLoading] = useState(false);

    async function handleSubmit(event) {
        setLoading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        
        const result = await contactAction(formData);

        setTimeout(()=>{
            setLoading(false);
            if (result.success) {
                toast.success(result.message);
                event.target.reset();
            } 
            else {
                toast.error(result.message);
            }
        },3000);
    }

    return (
        loading ? (<Loader1 />) : (
            <div className="w-screen h-[91.9vh] bg-amber-400 flex justify-center items-center">
                <div className="relative p-1 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 w-[90vw] max-w-xl shadow-inner relative z-10">

                    <form onSubmit={handleSubmit} className="text-2xl flex flex-col gap-5">
                        <h1 className="text-center text-3xl mb-10 font-semibold text-gray-800 dark:text-white">Details</h1>

                        <div className="flex gap-3 flex-col md:flex-row">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" className="border-2 rounded-md px-2 py-1 md:ml-5 w-full" required/>
                        </div>

                        <div className="flex gap-3 flex-col md:flex-row">
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" name="price" className="border-2 rounded-md px-2 py-1 md:ml-8 w-full" required/>
                        </div>

                        <div className="flex gap-3 flex-col md:flex-row">
                        <label htmlFor="paid_by">Paid_By</label>
                        <select id="paid_by" name="paid_by" className="border-2 rounded-md px-2 py-1 w-full md:ml-3">
                            <option value="Choose">Choose a Person</option>
                            <option value="Sumit">Sumit</option>
                            <option value="Yash">Yash</option>
                            <option value="Vidu">Vidu</option>
                            <option value="Shivam">Shivam</option>
                        </select>
                        </div>

                        <div className="flex justify-center mt-5">
                        <button type='submit' className="cursor-pointer text-white bg-gradient-to-r from-green-500 to-lime-500 rounded-xl px-6 py-2 shadow-md hover:brightness-110 transition">
                            Submit
                        </button>
                        </div>
                    </form>

                    </div>
                </div>
            </div>
        )
    )
}