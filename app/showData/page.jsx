"use client"

import UpdateFormModal from '../components/UpdateFormModal';
import DeleteDataModal from '../components/DeleteDataModal';
import axios from 'axios';
import { TrashIcon,PencilIcon  } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Loader1 from '../components/Loader1';
import { toast } from 'react-toastify';

export default function Show() {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [data,setData] = useState([]);

    const [amount,setAmount] = useState(0);
    const [amount_yash,setAmount_yash] = useState(0);
    const [amount_sumit,setAmount_sumit] = useState(0);
    const [amount_vidu,setAmount_vidu] = useState(0);
    const [amount_shivam,setAmount_shivam] = useState(0);

    const [amount_yash_set,setAmount_yash_set] = useState(0);
    const [amount_sumit_set,setAmount_sumit_set] = useState(0);
    const [amount_vidu_set,setAmount_vidu_set] = useState(0);
    const [amount_shivam_set,setAmount_shivam_set] = useState(0);

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
            setAmount_yash_set(yash-(total/4));
            setAmount_sumit_set(sumit-(total/4));
            setAmount_vidu_set(vidu-(total/4));
            setAmount_shivam_set(shivam-(total/4));
            setTimeout(()=>{
                setLoading(false);
                toast.success("Data Loaded Successfully");
            },3000);
        } 
        catch (error) {
            console.error('Error:', error);
            setTimeout(()=>{
                setLoading(false);
                toast.error("Network error while fetching data!");
            },3000);
        }
    }

    const deleteHandler = async (id) =>{
        try{
            const res = await axios.delete(`https://trip-y1a7.onrender.com/deleteTrip/${id}`);
            console.log(res.data);
            toast.success("Data Deleted Successfully");
            setIsDeleteModalOpen(false);
            getData();
        }
        catch(error){
            console.log("Error : ",error);
            toast.error("Network error while deleting data!");
        }
        
    }

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleUpdate = async (updatedData) => {
    try {
        const data = {
            name : updatedData.name,
            price : updatedData.price,
            paid_by : updatedData.paid_by
        }
        const res = await axios.patch(`https://trip-y1a7.onrender.com/updateTrip/${updatedData.id}`, data);
        console.log(res.data);
        toast.success("Data Updated Successfully");
        getData();
    } catch (error) {
        console.error("Update error:", error);
        toast.error("Network error while updating data!");
    }
    };


    useEffect(()=>{
        getData()
    },[]);

    return (
        loading ? (<Loader1 />) :
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
                        <th className="px-2 py-1 sm:px-4 sm:py-2 border-b">Delete or Update</th>
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
                            <button className="text-red-500 hover:underline cursor-pointer"><TrashIcon onClick={() => handleDeleteClick(ele)} className="h-5 w-5 text-red-500 hover:text-red-700" /></button>
                            <button className="text-blue-500 hover:underline cursor-pointer"><PencilIcon  onClick={() => handleEdit(ele)} className="h-5 w-5 text-blue-500 hover:text-blue-700" /></button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>



                <h1 className="mt-6 mb-4 text-2xl font-bold text-center text-gray-800">📊 Trip Spending Report</h1>
                <div className="w-full max-w-3xl mx-auto px-4">
                    <div className="overflow-x-auto rounded-lg shadow-lg">
                        <table className="w-full text-left border border-gray-300 bg-white">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                            <th className="p-3 font-semibold">Description</th>
                            <th className="p-3 text-center font-semibold">Amount (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-gray-200 bg-white">
                            <td className="p-3 font-medium text-gray-800">Total Amount</td>
                            <td className="p-3 text-center text-gray-700">{amount}</td>
                            </tr>
                            <tr className="border-t border-gray-200 bg-gray-50">
                            <td className="p-3 font-medium text-gray-800">Paid by Sumit</td>
                            <td className="p-3 text-center text-gray-700">{amount_sumit}</td>
                            </tr>
                            <tr className="border-t border-gray-200 bg-white">
                            <td className="p-3 font-medium text-gray-800">Paid by Yash</td>
                            <td className="p-3 text-center text-gray-700">{amount_yash}</td>
                            </tr>
                            <tr className="border-t border-gray-200 bg-gray-50">
                            <td className="p-3 font-medium text-gray-800">Paid by Vidu</td>
                            <td className="p-3 text-center text-gray-700">{amount_vidu}</td>
                            </tr>
                            <tr className="border-t border-gray-200 bg-white">
                            <td className="p-3 font-medium text-gray-800">Paid by Shivam</td>
                            <td className="p-3 text-center text-gray-700">{amount_shivam}</td>
                            </tr>
                            <tr className="border-t border-gray-300 bg-yellow-50">
                            <td className="p-3 font-semibold text-yellow-800">Amount Per Person</td>
                            <td className="p-3 text-center font-bold text-yellow-900">{amount / 4}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>





                <h1 className="mt-6 mb-4 text-2xl font-bold text-center text-gray-800">💸 Time to Settle Up</h1>
                <div className="w-full max-w-3xl mx-auto px-4 mb-5">
                    <div className="overflow-x-auto rounded-lg shadow-lg">
                        <table className="w-full text-left border border-gray-300 bg-white">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                            <th className="p-3 font-semibold">Person</th>
                            <th className="p-3 text-center font-semibold">Amount (₹)</th>
                            <th className="p-3 text-center font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                            { name: 'Sumit', amount: amount_sumit_set },
                            { name: 'Yash', amount: amount_yash_set },
                            { name: 'Vidu', amount: amount_vidu_set },
                            { name: 'Shivam', amount: amount_shivam_set },
                            ].map((person, index) => (
                            <tr
                                key={person.name}
                                className={`border-t border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                <td className="p-3 font-medium text-gray-800">{person.name}</td>
                                <td className="p-3 text-center text-gray-700">
                                {Math.abs(person.amount)}
                                </td>
                                <td className="p-3 text-center">
                                {person.amount >= 0 ? (
                                    <span className="inline-block px-2 py-1 text-green-700 bg-green-100 rounded-full text-sm font-medium">
                                    ✅ Extra
                                    </span>
                                ) : (
                                    <span className="inline-block px-2 py-1 text-red-700 bg-red-100 rounded-full text-sm font-medium">
                                    ❌ Pending
                                    </span>
                                )}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>




                <UpdateFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleUpdate}
                    defaultData={selectedItem}
                />




                <DeleteDataModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={deleteHandler}
                    item={itemToDelete}
                />
                </>
            )
        }
        </div>
        )
        
    )
}
