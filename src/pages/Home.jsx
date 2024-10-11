import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="flex flex-col justify-center items-center text-center mx-5 mt-16 ">
      <div className="max-w-lg mx-auto p-6 bg-green-50 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl sm:text-3xl  font-bold mb-10 text-green-950 ">Welcome to Employee Management System</h1>
        <p className="text-lg text-green-800 mb-6">
          Manage your survey records efficiently with our simple  <span className='font-semibold'>CRUD application</span>.
         
        </p>
        <Link to={"/dashboard/lead"}>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition duration-200 mt-10 ">
          <span className='text-lg'>View Leads</span>
        </button>
        </Link>
      </div>
    </section>
  );
}


export default Home;
