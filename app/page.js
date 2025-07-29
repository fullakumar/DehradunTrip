import Image from 'next/image'
import profile from './images/dehradun.jpg'

export default async function Home() {
  return (
    <div className="w-screen h-[91.9vh] bg-amber-400 flex justify-center items-center flex-col md:flex-row">
      <h1 className='text-4xl text-center w-screen m-20 md:w-1/2 md:m-0'> Welcome to TripEase</h1>
      <Image
      src={profile}
      width={500}
      height={500}
      alt="Picture of the Trip"
      quality={100}
    />
    </div>
  );
}
