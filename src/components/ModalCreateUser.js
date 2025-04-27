import { useState } from 'react';
import Swal from 'sweetalert2'

const ModalCreateUser = ({ isOpen, onClose, onSubmitUser }) => {
    const [inputDataUser, setInputDataUser] = useState({
        firstName: '',
        lastName: '',
        department: '',
        age: '',
        gender: ''
    });

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        department: '',
        age: '',
        gender: ''
    })

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputDataUser((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = {};

        if (inputDataUser.firstName.trim() === '') newErrors.firstName = 'First name is required.'
        if (inputDataUser.lastName.trim() === '') newErrors.lastName = 'Last name is required.'
        if (inputDataUser.department.trim() === '') newErrors.department = 'Department is required.'
        if (inputDataUser.age.trim() === '') newErrors.age = 'Age is required.'
        if (inputDataUser.gender.trim() === '') newErrors.gender = 'Gender is required.'

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Success",
            text: 'Create user successfuly!',
            timer: 2000,
            timerProgressBar: true,
        })

        onSubmitUser(inputDataUser);
        setError({})
        setInputDataUser({
            firstName: '',
            lastName: '',
            department: '',
            age: '',
            gender: ''
        })
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleSubmit}>
                <div className="bg-white p-10 rounded-xl shadow-2xl-">
                    <div className='space-y-4'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Firstname</p>
                                <input type="text" className='border rounded-md py-2 px-3 w-full' name="firstName" value={inputDataUser.firstName} onChange={handleChange} />
                                {error.firstName && <span className='text-red-500 text-xs'>{error.firstName}</span>}
                            </div>
                            
                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Lastname</p>
                                <input type="text" className='border rounded-md py-2 px-3 w-full' name="lastName" value={inputDataUser.lastName} onChange={handleChange} />
                                {error.lastName && <span className='text-red-500 text-xs'>{error.lastName}</span>}
                            </div>
                        </div>

                        <div className='grid grid-cols-3 gap-4'>
                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Department</p>
                                <input type="text" className='border rounded-md py-2 px-3' name="department" value={inputDataUser.department} onChange={handleChange} />
                                {error.department && <span className='text-red-500 text-xs'>{error.department}</span>}
                            </div>

                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Age</p>
                                <input type="number" className='border rounded-md py-2 px-3' name="age" value={inputDataUser.age} onChange={handleChange} />
                                {error.age && <span className='text-red-500 text-xs'>{error.age}</span>}
                            </div>

                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Gender</p>
                                <select name="gender" value={inputDataUser.gender} onChange={handleChange} className='border rounded-md py-2 px-3 w-full text-left'>
                                    <option value="" className='text-gray-400 bg-gray-100'>------ select ------</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {error.gender && <span className='text-red-500 text-xs'>{error.gender}</span>}
                                {/* <input type="text" className='border rounded-md py-2 px-3' name="gender" value={inputDataUser.gender} onChange={handleChange} /> */}
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <button type="submit" className="mt-4 bg-green-400 hover:bg-green-500 duration-300 text-white py-2 px-4 rounded w-[100px]">Submit</button>
                        <button className="mt-4 bg-gray-400 hover:bg-gray-500 duration-300 text-white py-2 px-4 rounded w-[100px]" 
                            onClick={() => {
                                onClose(); 
                                setError('');
                            }}>
                            Back
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ModalCreateUser;
