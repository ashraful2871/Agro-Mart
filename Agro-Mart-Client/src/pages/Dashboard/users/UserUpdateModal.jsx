import React, { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UserUpdateModal = ({ isOpen, closeModal, user, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosSecure.patch(
                `/user/${user._id}`,
                formData
            );
            if (response.status === 200) {
                Swal.fire({
                    title: "Updated!",
                    text: "User information updated successfully.",
                    icon: "success",
                    background: "#1D232A",
                    color: "#FFFFFF",
                });
                refetch();
                closeModal();
            }
        } catch (error) {
            console.error("Error updating user:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update user.",
                icon: "error",
                background: "#1D232A",
                color: "#FFFFFF",
            });
        }
    };

    return (
        <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
            <div className="p-6 bg-base-100 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Update User Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={closeModal} className="btn">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-success bg-green-700 text-white">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export default UserUpdateModal;
