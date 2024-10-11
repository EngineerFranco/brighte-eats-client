import React from 'react';

function About() {
  return (
    <section className="flex flex-col justify-center items-center text-center mx-5 mt-16">
      <div className="max-w-lg mx-auto p-6 bg-green-50 rounded-lg shadow-md border border-green-200 text-green-950">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-green-950">About Brighte Eats</h1>
        <p className="text-base sm:text-lg mb-6">
          Welcome to Brighte Eats, your go-to platform for seamless food delivery! Our service connects you with a variety of local restaurants, allowing you to enjoy delicious meals from the comfort of your home. 
        </p>
        <div className='flex flex-col'>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 mt-10 mr-auto">Key Features</h2>
          <ul className="list-disc list-inside mb-6 text-left mx-auto">
            <li>Browse a wide selection of local restaurants</li>
            <li>Customize your order with ease</li>
            <li>Track your delivery in real-time</li>
            <li>Enjoy exclusive promotions and discounts</li>
          </ul>
        </div>
        <p className="text-base sm:text-medium font-light mt-16">
          Our mission is to provide a convenient and enjoyable food delivery experience. We value your feedback, so don't hesitate to register or participate in our survey to help us serve you better!
        </p>
      </div>
    </section>
  );
}

export default About;
