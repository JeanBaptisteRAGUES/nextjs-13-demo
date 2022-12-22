import Link from 'next/link';
import React from 'react';
import Gallery from './Gallery';
import OpeningsTrainer from './chess/OpeningsTrainer';

{/* <div className=' flex flex-col w-full h-full bg-red-300 justify-center content-center gap-5'>
      <h1 className=' w-fit bg-green-500'>Home Page</h1>
      <Link href='/todos' className=' bg-blue-500 w-fit'>Todo List</Link>
      <Link href='/search' className=' bg-blue-500 w-fit'>Search</Link>
    </div> */}

function Home() {
  return (
    <div className=' test-flex bg-black overflow-y-hidden'>
      <h1 className=' font-bold text-lg text-white'>Home Page</h1>
      <Link href='/todos' className=' text-cyan-400 font-semibold'>Todo List</Link>
      <Link href='/search' className=' text-cyan-400 font-semibold'>Search</Link>
      <Link href='/chess' className=' text-cyan-400 font-semibold'>Chess</Link>
    </div>
  )
}

export default Home;