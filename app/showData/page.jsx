"use client"

import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

export default function Show() {

    const [data,setData] = useState([]);
    const [amount,setAmount] = useState(0);
    const [amount_yash,setAmount_yash] = useState(0);
    const [amount_sumit,setAmount_sumit] = useState(0);
    const [amount_vidu,setAmount_vidu] = useState(0);
    const [amount_shivam,setAmount_shivam] = useState(0);
    const [loading,setLoading] = useState(true);

    async function getData() {
        try {
            setLoading(true);
            const response = await axios.get('https://trip-y1a7.onrender.com/getTrip');
            const fetchedData = response.data;
            setData(fetchedData);

            let total = 0, yash = 0, sumit = 0, vidu = 0, shivam = 0;

            fetchedData.forEach(element => {
                total += parseInt(element.price);
                if (element.paid_by === "Yash") yash += parseInt(element.price);
                if (element.paid_by === "Sumit") sumit += parseInt(element.price);
                if (element.paid_by === "Vidu") vidu += parseInt(element.price);
                if (element.paid_by === "Shivam") shivam += parseInt(element.price);
            });

            setAmount(total);
            setAmount_yash(yash);
            setAmount_sumit(sumit);
            setAmount_vidu(vidu);
            setAmount_shivam(shivam);
            setTimeout(()=>{
                setLoading(false);
                toast.success("Data Loaded Successfully");
            },3000);
        } 
        catch (error) {
            console.error('Error:', error);
            setLoading(false);
            toast.error("Network error while fetching data!");
        }
    }

    const deleteHandler = async (id) =>{
        try{
            const res = await axios.delete(`https://trip-y1a7.onrender.com/deleteTrip/${id}`);
            console.log(res.data);
            toast.success("Data Deleted Successfully");
            getData();
        }
        catch(error){
            console.log("Error : ",error);
            toast.error("Network error while deleting data!");
        }
        
    }

    useEffect(()=>{
        getData()
    },[]);

    return (
        loading ? (<Loader />) :
        (
            <div className={`${data.length === 0 ? "h-[91.9vh]" : ""} flex flex-col justify-center items-center px-4`}>
        {
            data.length === 0 ?
            (
                <h1 className="text-3xl sm:text-5xl text-center">No Data Found</h1>
            )
            :
            (
                <>
                <div className="w-full overflow-x-auto p-2 sm:p-6">
                    <table className="min-w-full border border-gray-300 text-xs sm:text-sm text-gray-700">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                        <th className="px-2 py-1 sm:px-4 sm:py-2 border-b">ID</th>
                        <th className="px-2 py-1 sm:px-4 sm:py-2 border-b">Name</th>
                        <th className="px-2 py-1 sm:px-4 sm:py-2 border-b">Price</th>
                        <th className="px-2 py-1 sm:px-4 sm:py-2 border-b">Paid By</th>
                        <th className="px-2 py-1 sm:px-4 sm:py-2 border-b">Date</th>
                        <th className="px-2 py-1 sm:px-4 sm:py-2 border-b">Time</th>
                        <th className="px-2 py-1 sm:px-4 sm:py-2 border-b">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ele, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                            <td className="px-2 py-1 sm:px-4 sm:py-2 border-b">{index + 1}</td>
                            <td className="px-2 py-1 sm:px-4 sm:py-2 border-b">{ele.name}</td>
                            <td className="px-2 py-1 sm:px-4 sm:py-2 border-b">{ele.price}</td>
                            <td className="px-2 py-1 sm:px-4 sm:py-2 border-b">{ele.paid_by}</td>
                            <td className="px-2 py-1 sm:px-4 sm:py-2 border-b">{ele.date}</td>
                            <td className="px-2 py-1 sm:px-4 sm:py-2 border-b">{ele.time}</td>
                            <td className="px-2 py-1 sm:px-4 sm:py-2 border-b">
                            <button className="text-red-500 hover:underline cursor-pointer"><TrashIcon onClick={() => deleteHandler(ele.id)} className="h-5 w-5 text-red-500 hover:text-red-700" /></button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>

                <div className="w-full sm:w-auto text-sm sm:text-base space-y-1 p-4">
                    <div className="text-center"><strong>Total Amount:</strong> {amount}</div>
                    <div className="text-center"><strong>Amount paid by Sumit:</strong> {amount_sumit}</div>
                    <div className="text-center"><strong>Amount paid by Yash:</strong> {amount_yash}</div>
                    <div className="text-center"><strong>Amount paid by Vidu:</strong> {amount_vidu}</div>
                    <div className="text-center"><strong>Amount paid by Shivam:</strong> {amount_shivam}</div>
                    <div className="text-center"><strong>Amount per Person:</strong> {amount / 4}</div>
                </div>
                </>
            )
        }
        </div>
        )
    )
}
