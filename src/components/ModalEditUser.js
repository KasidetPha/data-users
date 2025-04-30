import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ModalEditUser = ({ isOpen, onClose, user, onSubmitEditUser }) => {
    // console.log(user?.firstName);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [department, setDepartment] = useState('');

    
    const [error, setError] = useState({
        firstName: firstName,
        lastName: lastName,
        department: department,
        age: age,
        gender: gender
    })

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName)
            setAge(user.age)
            setGender(user.gender)
            setDepartment(user.company.department)
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (firstName === '') newErrors.firstName = 'First name is required.'
        if (lastName === '') newErrors.lastName = 'Last name is required.'
        if (department === '') newErrors.department = 'Department is required.'
        if (age === '') newErrors.age = 'Age is required.'
        if (gender === '') newErrors.gender = 'Gender is required.'

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'Do you want to edit user?',
            showCancelButton: true,
            confirmButtonText: 'Yes I do!',
            confirmButtonColor: '#5CB85C',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {

                const updateUser = {
                    ...user,
                    firstName,
                    lastName,
                    age,
                    gender,
                    company: {department}
                };

                onSubmitEditUser(updateUser);
                setError({})
                onClose();

                Swal.fire({
                    icon: 'success',
                    title: 'Edited!',
                    text: 'Successfully Edited user!',
                    timer: 2000,
                    timerProgressBar: true
                })
            }
        })

    }

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleSubmit}>
                <div className="bg-white p-10 rounded-xl shadow-2xl mx-10">
                    <div className='space-y-4'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Firstname</p>
                                <input type="text" className='border rounded-md py-2 px-3 w-full' name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                {error.firstName && <span className='text-red-500 text-xs'>{error.firstName}</span>}

                            </div>
                            
                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Lastname</p>
                                <input type="text" className='border rounded-md py-2 px-3 w-full' name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                {error.lastName && <span className='text-red-500 text-xs'>{error.lastName}</span>}

                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Department</p>
                                <input type="text" className='border rounded-md py-2 px-3' name="department" value={department} onChange={(e) => setDepartment(e.target.value)}/>
                                {error.department && <span className='text-red-500 text-xs'>{error.department}</span>}

                            </div>

                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Age</p>
                                <input type="number" className='border rounded-md py-2 px-3' name="age" value={age} onChange={(e) => setAge(e.target.value)}/>
                                {error.age && <span className='text-red-500 text-xs'>{error.age}</span>}

                            </div>

                            <div className='flex flex-col'>
                                <p className='text-gray-400'>Gender</p>
                                <select name="gender" className='border rounded-md py-2 px-3 w-full text-left' value={gender} onChange={(e) => setGender(e.target.value)}>
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
                        <button className="mt-4 bg-gray-400 hover:bg-gray-500 duration-300 text-white py-2 px-4 rounded w-[100px]" onClick={() => {onClose(); setError('');}}>Back</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ModalEditUser;
