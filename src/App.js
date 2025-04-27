import User from "./components/User";
// import Modal from "./components/Modal"
// import { useState, useEffect } from "react";

const App = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const openModal = () => {
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    return (
        <>
            <User/>
            {/* <div className="min-h-screen flex justify-center items-center">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={openModal}
                >
                    Open Modal
                </button>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <h2 className="text-xl">This is a Modal</h2>
                    <p>Content goes here...</p>
                </Modal>
            </div> */}

        </>
    )
}

export default App;