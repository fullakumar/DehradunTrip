import axios from "axios";

export default async function Show(params) {
    const response = await axios.get('https://trip-y1a7.onrender.com/getTrip',{
  headers: {
    "Content-Type": "application/json",
  },
});
    const data = response.data;
    let amount = 0;
    let amount_yash = 0;
    let amount_sumit = 0;
    let amount_vidu = 0;
    let amount_shivam = 0;
    data.forEach(element => {
        amount = amount + parseInt(element.price);
        if (element.paid_by=="Yash"){
            amount_yash = amount_yash + parseInt(element.price);
        }
        if (element.paid_by=="Sumit"){
            amount_sumit = amount_sumit + parseInt(element.price);
        }
        if (element.paid_by=="Vidu"){
            amount_vidu = amount_vidu + parseInt(element.price);
        }
        if (element.paid_by=="Shivam"){
            amount_shivam = amount_shivam + parseInt(element.price);
        }
    });
    return (
        <div className={`${data.length===0 ? "h-[91.9vh]" : ""} flex flex-col justify-center items-center`}>
            {
                data.length===0 ? 
                (
                    <h1 className="text-5xl">No Data Found</h1>
                ) 
                : 
                (
                    <>
                    <div className="overflow-x-auto p-6">
                        <table className="min-w-full border border-gray-300 text-sm text-gray-700">
                            <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="px-4 py-2 border-b">ID</th>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Price</th>
                                <th className="px-4 py-2 border-b">Paid By</th>
                                <th className="px-4 py-2 border-b">Date</th>
                                <th className="px-4 py-2 border-b">Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((ele, index) => (
                                <tr
                                key={index}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                >
                                    <td className="px-4 py-2 border-b">{ele.id}</td>
                                    <td className="px-4 py-2 border-b">{ele.name}</td>
                                    <td className="px-4 py-2 border-b">{ele.price}</td>
                                    <td className="px-4 py-2 border-b">{ele.paid_by}</td>
                                    <td className="px-4 py-2 border-b">{ele.date}</td>
                                    <td className="px-4 py-2 border-b">{ele.time}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>     
                    <div>
                        <div>Total Amount = {amount}</div>
                        <div>Amount paid by Sumit = {amount_sumit}</div>
                        <div>Amount paid by Yash = {amount_yash}</div>
                        <div>Amount paid by Vidu = {amount_vidu}</div>
                        <div>Amount paid by Shivam = {amount_shivam}</div>
                        <div>Amount per Person = {amount/4}</div>
                    </div> 
                    </>
                )
            }
        </div>
    )
}
