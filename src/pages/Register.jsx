import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import summaryAPI from '../api/api';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    postcode: '',
    services: {
      delivery: false,
      pickup: false,
      payment: false,
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      services: {
        ...prevData.services,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mutation = `
      mutation {
        register(name: "${formData.name}", email: "${formData.email}", mobile: "${formData.mobile}", postcode: "${formData.postcode}", services: {
          delivery: ${formData.services.delivery},
          pickup: ${formData.services.pickup},
          payment: ${formData.services.payment}
        }) {
          success
          message
        }
      }
    `;

    try {
      const response = await fetch(summaryAPI.add.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });

      const dataAPI = await response.json();
      console.log('Success:', dataAPI);

      if (dataAPI.errors) {
        toast.error(dataAPI.errors[0].message);
      } else {
        toast.success(dataAPI.data.register.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('An error occurred while submitting the form.');
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-full max-w-6xl mt-5 mx-auto text-green-900 gap-2">
      <h2 className="mr-auto text-lg text-green-900 px-2">Register Interest for Brighte Eats</h2>
      <hr className="border-t border-green-300 w-full " />

      <form className="w-full max-w-[30rem] min-w-[15rem] px-1" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block ">
            Name: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-green-100 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block ">
            Email Address: <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-green-100 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block ">
            Mobile: <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-green-100 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block ">
            Postcode: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-green-100 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-normal text-green-700">Interested Services:</label>
          <div className='text-green-950'>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="delivery"
                    checked={formData.services.delivery}
                    onChange={handleServiceChange}
                    className="appearance-none w-4 h-4 border-2 border-green-950 rounded checked:bg-green-950 checked:border-transparent hover:scale-125 transition"
                />
                <span className="ml-2">Delivery</span>
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="pickup"
                    checked={formData.services.pickup}
                    onChange={handleServiceChange}
                    className="appearance-none w-4 h-4 border-2 border-green-950 rounded checked:bg-green-950 checked:border-transparent hover:scale-125 transition"
                />
                <span className="ml-2">Pick-up</span>
            </label>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="payment"
                    checked={formData.services.payment}
                    onChange={handleServiceChange}
                    className="appearance-none w-4 h-4 border-2 border-green-950 rounded checked:bg-green-950 checked:border-transparent hover:scale-125 transition"
                />
                <span className="ml-2">Payment</span>
            </label>
        </div>

        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-400 text-white py-2 px-4 rounded-full hover:bg-green-500"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
