import {contactAction} from '../serverActions/contact.action'

export default async function Create(params) {
    return (
        <div className="w-screen h-[91.9vh] bg-amber-400 flex justify-center items-center">
            <form action={contactAction} className="text-2xl flex flex-col gap-5">

                <h1 className="text-center text-3xl mb-10">Details</h1>

                <div className="flex gap-3 flex-col md:flex-row">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" className="border-2 md:ml-5"/>
                </div>

                <div className="flex gap-3 flex-col md:flex-row">
                    <label htmlFor="price">Price</label>
                    <input type="text" id="price" name="price" className="border-2 md:ml-8"/>
                </div>

                <div className="flex gap-3 flex-col md:flex-row">
                    <label htmlFor="paid_by">Paid_By</label>
                    <select id="paid_by" name="paid_by" className="border-2 w-71">
                        <option value="Choose">Choose a Person</option>
                        <option value="Sumit">Sumit</option>
                        <option value="Yash">Yash</option>
                        <option value="Vidu">Vidu</option>
                        <option value="Shivam">Shivam</option>
                    </select>
                </div>

                <div className="flex justify-center mt-5">
                    <button className="text-green-700 rounded-2xl p-2 border-2 cursor-pointer">Submit</button>
                </div>

            </form>
        </div>
    )
}