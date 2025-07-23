'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";

export default function NavBar(params) {

    const pathname = usePathname();

    return (
        <div className="w-screen bg-black p-3">
            <ul className="flex justify-around cursor-pointer w-full font-bold text-red-300">
                <Link href={"/"}><li className={pathname === '/' ? 'active' : ''}>Home</li></Link>
                <Link href={"/createData"}><li className={pathname === '/createData' ? 'active' : ''}>CreateData</li></Link>
                <Link href={"/showData"}><li className={pathname === '/showData' ? 'active' : ''}>ShowData</li></Link>
            </ul>
        </div>
    )
}