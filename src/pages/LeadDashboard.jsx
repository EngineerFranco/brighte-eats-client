import React, { useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client'; 
import toast from 'react-hot-toast';

// Define the GraphQL query to fetch leads
const GET_LEADS = gql`
  query {
    leads {
      id
      name
      email
      mobile
      postcode
      services
    }
  }
`;

// Define the GraphQL mutation to delete a lead
const DELETE_LEAD = gql`
  mutation DeleteLead($id: ID!) {
    deleteLead(id: $id) {
      id
    }
  }
`;

const LeadDashboard = () => {
    const [filterService, setFilterService] = useState('');
    
    // Use the useQuery hook to fetch leads data
    const { loading, error, data } = useQuery(GET_LEADS);
    
    // Use the useMutation hook for deleting a lead
    const [deleteLead] = useMutation(DELETE_LEAD, {
        update(cache, { data: { deleteLead } }) {
            // Update the cache after deleting a lead
            const { leads } = cache.readQuery({ query: GET_LEADS });
            cache.writeQuery({
                query: GET_LEADS,
                data: { leads: leads.filter(lead => lead.id !== deleteLead.id) },
            });
        }
    });

    const handleFilterChange = (e) => {
        setFilterService(e.target.value);
    };

    const handleDelete = (id) => {
        deleteLead({ variables: { id } });
        toast.success('Lead deleted successfully');
    };

    const filteredLeads = (data?.leads || []).filter(lead =>
        filterService ? lead.services.includes(filterService) : true
    );

    if (loading) return <p>Loading...</p>; 
    if (error) {
        console.error(error);
        return <p>Error fetching leads!</p>; 
    }

    return (
        <section className="flex flex-col justify-center items-center w-full max-w-6xl mt-5 mx-auto text-green-950 gap-4 ">
            <h2 className="text-xl md:text-2xl font-semibold">Brighte Eats: <span className="text-green-600">Dashboard</span></h2>
            <hr className="border-t border-gray-300 w-full" />

            <div className='flex flex-col sm:flex-row justify-between gap-4 items-center w-full mx-auto'>
                <div className="w-full sm:w-auto text-green-900 text-xl px-4 sm:px-0">
                    <select 
                    value={filterService} 
                    onChange={handleFilterChange} 
                    className="w-full sm:w-auto border border-green-800 rounded-sm text-lg border-opacity-40 text-green-900 px-4 py-2"
                    >
                    <option className='font-sm' value="">All Services</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Pick-up">Pick-up</option>
                    <option value="Payment">Payment</option>
                    </select>
                </div>

                <Link to={"/dashboard/register"} className="w-full sm:w-auto px-4 sm:px-0">
                    <div className="flex justify-center items-center gap-2 p-2 bg-green-600 hover:bg-green-700 rounded-sm border border-green-50 border-opacity-20 w-full sm:w-auto">
                    <FaPlusSquare className="text-white" />
                    <button className="uppercase text-sm md:text-base text-white font-medium tracking-widest">Register</button>
                    </div>
                </Link>
            </div>

            <div className="overflow-x-auto w-full ">
                <table className="text-green-950 w-full border-opacity-80 table-fixed rounded-lg"> 
                    <thead className='bg-green-200'>
                        <tr className="uppercase text-xs md:text-sm text-green-900 sm:tracking-widest tracking-tight">
                            <th className="font-medium p-2 w-1/5">Name</th>
                            <th className="font-medium p-2 w-1/5">Email</th>
                            <th className="font-medium p-2 w-1/5">Mobile</th>
                            <th className="font-medium p-2 w-1/5">Postcode</th>
                            <th className="font-medium p-2 w-1/5">Services</th>
                            <th className="font-medium p-2 w-1/5">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center text-xs md:text-sm border border-green-200">
                        {filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-200 transition duration-200">
                                <td className="p-2 break-all">{lead.name}</td>
                                <td className="p-2 break-all">{lead.email}</td>
                                <td className="p-2 break-all">{lead.mobile}</td>
                                <td className="p-2 break-all">{lead.postcode}</td>
                                <td className="p-2 break-all">{lead.services.join(', ')}</td>
                                <td className="p-2 flex justify-center items-center gap-3">
                                    <Link to={`/dashboard/edit/${lead.id}`}>
                                        <FaRegEdit className="text-yellow-400 text-xl cursor-pointer hover:text-yellow-500 transition duration-200" />
                                    </Link>
                                    <RiDeleteBin5Line className="text-red-400 text-xl cursor-pointer hover:text-red-500 transition duration-200" onClick={() => handleDelete(lead.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default LeadDashboard;
