import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Swal from 'sweetalert2'
import ModalCreateUser  from "./ModalCreateUser";
import ModalEditUser from "./ModalEditUser"
import Pagination from "./Pagination";

const User = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const URL = "https://dummyjson.com/users";

    // ---- crate user ----

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const openCreateModal = () => {
        setIsModalCreateOpen(true);
    };

    const closeCreateModal = () => {
        setIsModalCreateOpen(false);
    };

    const handleAddUser = (newUser) => {
        // const idNew = dataUsers.length + 1;
        const idNew = Math.max(...dataUsers.map(user => user.id)) + 1;
        const newDataUser = {
            id: idNew,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            age: newUser.age,
            gender: newUser.gender,
            company: {department: newUser.department}
        };
        setDataUsers((prevUsers) => [...prevUsers, newDataUser])
    }

    // ---- Edit user ----

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsModalEditOpen(true);
    }

    const closeEditModal = () => {
        setIsModalEditOpen(false);
        setSelectedUser(null);
    }

    const handleEditUser = (updatedUser) => {
        setDataUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === updatedUser.id ? updatedUser : user
            )
        )
    }

    // delete user

    // const [users, setUsers] = useState([]);
    const handleDeleteUser = (id) => {
        const newUsers = dataUsers.filter((user) => user.id !== id);
        Swal.fire({
            icon: 'warning',
            title: "Are you sure?",
            text: "Do you want to delete user?",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#5CB85C',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                setDataUsers(newUsers);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Successfully deleted user!',
                    timer: 2000,
                    timerProgressBar: true,
                })
            }
        })
    }

    // pagination

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const sortedUsers = [...dataUsers].sort((a,b) => b.id - a.id)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error("Error fetching data!")
                }

                const data = await response.json();
                console.log(data.users);
                setDataUsers(data.users);

            } catch (err) {
                console.log('Error fetching user data!', err);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    if (loading) {
        return <>Loading...</>
    }

    if (error) {
        return <>Error: {error}</>
    }



    return (
        <div className="p-4 sm:p-6 my-10 box-border max-w-[1200px] mx-auto">
            <div className="flex sm:flex-row justify-between items-center mb-4 gap-4">
                <h1 className="text-2xl font-semibold text-center sm:text-left">User List</h1>
                <button onClick={openCreateModal} className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-md duration-300 font-semibold sm:w-auto">Create User</button>
            </div>

            <div className="overflow-x-auto shadow-md">
                <table className="min-w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-200 uppercase text-sm sm:text-md">
                            <th className="border border-black px-6 py-3">#</th>
                            <th className="border border-black px-6 py-3">first-name</th>
                            <th className="border border-black px-6 py-3">last-name</th>
                            <th className="border border-black px-6 py-3">age</th>
                            <th className="border border-black px-6 py-3">gender</th>
                            <th className="border border-black px-6 py-3">department</th>
                            <th className="border border-black px-6 py-3">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...currentUsers].sort((a,b) => b.id - a.id).map((dataUser, index) => (
                            <tr key={dataUser.id} className="hover:bg-gray-100 transition duration-200 text-xs sm:text-sm">
                                <td className="border border-black px-6 py-3 text-sm text-center capitalize">{indexOfFirstItem + index + 1}</td>
                                <td className="border border-black px-6 py-3 text-sm capitalize">{dataUser.firstName}</td>
                                <td className="border border-black px-6 py-3 text-sm capitalize">{dataUser.lastName}</td>
                                <td className="border border-black px-6 py-3 text-sm text-center">{dataUser.age}</td>
                                <td className="border border-black px-6 py-3 text-sm capitalize">{dataUser.gender}</td>
                                <td className="border border-black px-6 py-3 text-sm capitalize">{dataUser.company.department}</td>
                                <td className="border border-black px-6 py-3 text-sm text-center">
                                    <div className="flex gap-4 justify-center">
                                        <button onClick={() => openEditModal(dataUser)} className="bg-yellow-400 hover:bg-yellow-500 duration-300 p-1 sm:p-2 rounded-md shadow-md">
                                            <Icon className="text-white" icon="lucide:edit" width="24" height="24" />
                                        </button>
                                        <button type="button" onClick={() => handleDeleteUser(dataUser.id)} className="bg-red-400 hover:bg-red-500 duration-300 p-1 sm:p-2 rounded-md shadow-lg">
                                            <Icon className="text-white" icon="tabler:trash" width="24" height="24" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalCreateUser isOpen={isModalCreateOpen} onClose={closeCreateModal} onSubmitUser={handleAddUser} />
            <ModalEditUser isOpen={isModalEditOpen} onClose={closeEditModal} user={selectedUser} onSubmitEditUser={handleEditUser}/>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    )
}

export default User;