import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Users, BedDouble, Settings, Search, Filter, ConciergeBell, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';

// Import Redux Thunks and actions from your slices
import { fetchRooms, addRoom, updateRoom, deleteRoom, fetchRoomById, clearCurrentRoom, clearRoomError } from '../../redux/reducers/roomSlice'; // Adjust path if necessary
import { getReservationTable, createReservation, updateReservation, deleteReservation, getReservationById, clearCurrentReservation, resetReservationError } from '../../redux/reducers/reservationSlice'; // Adjust path if necessary
import { getAllTeachers, resetAuthError, checkAuth } from '../../redux/reducers/userSlice'; // Adjust path if necessary, added checkAuth


// --- Reusable Components ---

const Modal = ({ children, title, onClose }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <motion.div
                    className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all"
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 id="modal-title" className="text-2xl font-bold text-gray-800">{title}</h2>
                        <motion.button
                            onClick={onClose}
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            aria-label="Close modal"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="w-5 h-5" />
                        </motion.button>
                    </div>
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const FormField = ({ label, name, value, onChange, type = 'text', options = [], required = false }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current && required && !value) {
            // Simple validation feedback on initial render if required and empty
        }
    }, [value, required]);

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium mb-2 text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {type === 'select' ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    required={required}
                    ref={inputRef}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    required={required}
                    ref={inputRef}
                />
            )}
        </div>
    );
};

const RoomForm = ({ item, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        number: item?.number || '',
        type: item?.type || 'Single',
        status: item?.status || 'Available',
        price: item?.price || '',
    });

    useEffect(() => {
        if (item) {
            setFormData({
                number: item.number || '',
                type: item.type || 'Single',
                status: item.status || 'Available',
                price: item.price || '',
            });
        } else {
            setFormData({
                number: '',
                type: 'Single',
                status: 'Available',
                price: '',
            });
        }
    }, [item]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.number && formData.type && formData.status && formData.price) {
            onSubmit(formData, 'room');
        } else {
            console.error("Please fill all required fields.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField label="Room Number" name="number" value={formData.number} onChange={handleInputChange} required />
            <FormField
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                type="select"
                options={[
                    { value: 'Single', label: 'Single' },
                    { value: 'Double', label: 'Double' },
                    { value: 'Suite', label: 'Suite' },
                    { value: 'Deluxe', label: 'Deluxe' },
                ]}
                required
            />
            <FormField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                type="select"
                options={[
                    { value: 'Available', label: 'Available' },
                    { value: 'Occupied', label: 'Occupied' },
                    { value: 'Maintenance', label: 'Maintenance' },
                ]}
                required
            />
            <FormField label="Price per Night ($)" name="price" value={formData.price} onChange={handleInputChange} type="number" required />

            <div className="flex gap-2 mt-6">
                <motion.button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {item ? 'Update Room' : 'Add Room'}
                </motion.button>
                <motion.button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Cancel
                </motion.button>
            </div>
        </form>
    );
};

const ReservationForm = ({ item, rooms, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        roomId: item?.roomId || (rooms.length > 0 ? rooms[0].id : ''),
        customerName: item?.customerName || '',
        checkInDate: item?.checkInDate ? new Date(item.checkInDate).toISOString().split('T')[0] : '',
        checkOutDate: item?.checkOutDate ? new Date(item.checkOutDate).toISOString().split('T')[0] : '',
        status: item?.status || 'Confirmed',
    });

    useEffect(() => {
        if (item) {
            setFormData({
                roomId: item.roomId || '',
                customerName: item.customerName || '',
                checkInDate: item.checkInDate ? new Date(item.checkInDate).toISOString().split('T')[0] : '',
                checkOutDate: item.checkOutDate ? new Date(item.checkOutDate).toISOString().split('T')[0] : '',
                status: item.status || 'Confirmed',
            });
        }
    }, [item]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.roomId || !formData.customerName || !formData.checkInDate || !formData.checkOutDate) {
            alert('Please fill all required fields.');
            return;
        }
        onSubmit(formData, 'reservation');
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label="Room Number"
                name="roomId"
                type="select"
                value={formData.roomId}
                onChange={handleInputChange}
                options={rooms.map(room => ({ value: room.id, label: room.number }))}
                required
            />
            <FormField label="Customer Name" name="customerName" value={formData.customerName} onChange={handleInputChange} required />
            <FormField label="Check-in Date" name="checkInDate" type="date" value={formData.checkInDate} onChange={handleInputChange} required />
            <FormField label="Check-out Date" name="checkOutDate" type="date" value={formData.checkOutDate} onChange={handleInputChange} required />
            <FormField
                label="Status"
                name="status"
                type="select"
                value={formData.status}
                onChange={handleInputChange}
                options={[
                    { value: 'Confirmed', label: 'Confirmed' },
                    { value: 'Pending', label: 'Pending' },
                    { value: 'Cancelled', label: 'Cancelled' },
                    { value: 'Checked-in', label: 'Checked-in' },
                    { value: 'Checked-out', label: 'Checked-out' },
                ]}
                required
            />
            <div className="flex gap-2 mt-6">
                <motion.button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {item ? 'Update Reservation' : 'Add Reservation'}
                </motion.button>
                <motion.button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Cancel
                </motion.button>
            </div>
        </form>
    );
};

const CustomerForm = ({ item, onSubmit, onCancel }) => {
    // This form still uses local state and mock data because no corresponding Redux slice was provided.
    const [formData, setFormData] = useState({
        name: item?.name || '',
        email: item?.email || '',
        phone: item?.phone || '',
        room: item?.room || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.phone && formData.room) {
            onSubmit(formData, 'customer');
        } else {
            console.error("Please fill all required fields.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField label="Full Name" name="name" value={formData.name} onChange={handleInputChange} required />
            <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
            <FormField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
            <FormField label="Assigned Room" name="room" value={formData.room} onChange={handleInputChange} required />
            <div className="flex gap-2 mt-6">
                <motion.button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {item ? 'Update Customer' : 'Add Customer'}
                </motion.button>
                <motion.button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Cancel
                </motion.button>
            </div>
        </form>
    );
};

const ServiceForm = ({ item, onSubmit, onCancel }) => {
    // This form still uses local state and mock data because no corresponding Redux slice was provided.
    const [formData, setFormData] = useState({
        name: item?.name || '',
        category: item?.category || 'Food & Beverage',
        price: item?.price || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.category && formData.price) {
            onSubmit(formData, 'service');
        } else {
            console.error("Please fill all required fields.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField label="Service Name" name="name" value={formData.name} onChange={handleInputChange} required />
            <FormField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                type="select"
                options={[
                    { value: 'Food & Beverage', label: 'Food & Beverage' },
                    { value: 'Housekeeping', label: 'Housekeeping' },
                    { value: 'Wellness', label: 'Wellness' },
                    { value: 'Transportation', label: 'Transportation' },
                    { value: 'Entertainment', label: 'Entertainment' },
                ]}
                required
            />
            <FormField label="Price ($)" name="price" type="number" value={formData.price} onChange={handleInputChange} required />
            <div className="flex gap-2 mt-6">
                <motion.button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {item ? 'Update Service' : 'Add Service'}
                </motion.button>
                <motion.button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Cancel
                </motion.button>
            </div>
        </form>
    );
};

const CustomerServiceForm = ({ customers, services, onSubmit, onCancel }) => {
    // This form still uses local state and mock data because no corresponding Redux slice was provided for customer services.
    const [formData, setFormData] = useState({
        customerId: customers[0]?.id || '',
        serviceId: services[0]?.id || '',
        quantity: 1,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.customerId && formData.serviceId && formData.quantity) {
            onSubmit(formData.customerId, formData.serviceId, Number(formData.quantity));
        } else {
            console.error("Please fill all required fields.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label="Customer"
                name="customerId"
                value={formData.customerId}
                onChange={handleInputChange}
                type="select"
                options={customers.map(c => ({ value: c.id, label: c.name }))}
                required
            />
            <FormField
                label="Service"
                name="serviceId"
                value={formData.serviceId}
                onChange={handleInputChange}
                type="select"
                options={services.map(s => ({ value: s.id, label: s.name }))}
                required
            />
            <FormField label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleInputChange} required />
            <div className="flex gap-2 mt-6">
                <motion.button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Assign Service
                </motion.button>
                <motion.button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Cancel
                </motion.button>
            </div>
        </form>
    );
};

const AdminDashboard = () => {
    const dispatch = useDispatch();

    // Selectors for Room Management
    const { rooms, loading: roomsLoading, error: roomsError, currentRoom } = useSelector((state) => state.roomSlice);

    // Selectors for Reservation Management
    const { tableData: reservationTableData, loading: reservationLoading, error: reservationError, currentReservation } = useSelector((state) => state.reservationSlice);

    // Selectors for User/Auth (teachers)
    const { teachers, loading: authLoading, error: authError, user: currentUser } = useSelector((state) => state.userSlice);

    // Local state for UI
    const [activeTab, setActiveTab] = useState('rooms');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch data on component mount based on active tab
    useEffect(() => {
        dispatch(checkAuth()); // Check auth status on component mount
        if (activeTab === 'rooms') {
            dispatch(fetchRooms());
        } else if (activeTab === 'reservations') {
            dispatch(getReservationTable());
        } else if (activeTab === 'teachers') {
            dispatch(getAllTeachers());
        }
    }, [activeTab, dispatch]);

    const openModal = (type, item = null) => {
        setModalType(type);
        setEditingItem(item);
        setShowModal(true);
        if (type === 'room' && item?.id) {
            dispatch(fetchRoomById(item.id));
        } else if (type === 'reservation' && item?.id) {
            dispatch(getReservationById(item.id));
        } else {
            dispatch(clearCurrentRoom());
            dispatch(clearCurrentReservation());
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        dispatch(clearCurrentRoom());
        dispatch(clearRoomError());
        dispatch(clearCurrentReservation());
        dispatch(resetReservationError());
        dispatch(resetAuthError());
    };

    const handleSubmit = async (data, type) => {
        try {
            if (type === 'room') {
                if (editingItem) {
                    await dispatch(updateRoom({ ...data, id: editingItem.id })).unwrap();
                } else {
                    await dispatch(addRoom(data)).unwrap();
                }
            } else if (type === 'reservation') {
                if (editingItem) {
                    await dispatch(updateReservation({ ...data, id: editingItem.id })).unwrap();
                } else {
                    await dispatch(createReservation(data)).unwrap();
                }
            }
            // Customer and Service forms do not have corresponding Redux slices
            closeModal();
        } catch (err) {
            console.error(`Failed to ${editingItem ? 'update' : 'add'} ${type}:`, err);
        }
    };

    const handleDelete = async (type, id) => {
        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            try {
                if (type === 'room') {
                    await dispatch(deleteRoom(id)).unwrap();
                } else if (type === 'reservation') {
                    await dispatch(deleteReservation(id)).unwrap();
                }
            } catch (err) {
                console.error(`Failed to delete ${type}:`, err);
            }
        }
    };

    const handleAddCustomerService = (customerId, serviceId, quantity) => {
        // This function would typically dispatch an action to a `customerServiceSlice`
        // if one were provided. For now, it's a placeholder.
        console.warn("Customer service assignment requires a dedicated API and Redux slice.");
        closeModal();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-800';
            case 'Occupied': return 'bg-red-100 text-red-800';
            case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
            case 'Confirmed': return 'bg-blue-100 text-blue-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            case 'Checked-in': return 'bg-green-100 text-green-800';
            case 'Checked-out': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Filter data based on active tab and search term
    const getFilteredData = (data, fieldsToSearch) => {
        if (!data) return [];
        return data.filter(item =>
            fieldsToSearch.some(field =>
                item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const filteredRooms = getFilteredData(rooms, ['number', 'type', 'status']);
    const filteredReservations = getFilteredData(reservationTableData, ['customerName', 'roomNumber', 'status']);
    const filteredTeachers = getFilteredData(teachers, ['name', 'email']);


    // Placeholders for Customers and Services as no Redux slices were provided for them
    const mockCustomers = [
        { id: 'c1', name: 'Alice Smith', email: 'alice@example.com', phone: '123-456-7890', room: '101' },
        { id: 'c2', name: 'Bob Johnson', email: 'bob@example.com', phone: '098-765-4321', room: '203' },
    ];
    const mockServices = [
        { id: 's1', name: 'Room Service Dinner', category: 'Food & Beverage', price: 50 },
        { id: 's2', name: 'Laundry Service', category: 'Housekeeping', price: 25 },
    ];
    const mockCustomerServices = [
        { id: 'cs1', customerName: 'Alice Smith', serviceName: 'Room Service Dinner', quantity: 1 },
        { id: 'cs2', customerName: 'Bob Johnson', serviceName: 'Laundry Service', quantity: 2 },
    ];

    const filteredCustomers = getFilteredData(mockCustomers, ['name', 'email', 'room']);
    const filteredServices = getFilteredData(mockServices, ['name', 'category']);
    const filteredCustomerServices = getFilteredData(mockCustomerServices, ['customerName', 'serviceName']);


    const tableHeaders = {
        rooms: ['Room Number', 'Type', 'Status', 'Price/Night', 'Actions'],
        customers: ['Name', 'Email', 'Phone', 'Room', 'Actions'], // Placeholder
        services: ['Service Name', 'Category', 'Price', 'Actions'], // Placeholder
        customerServices: ['Customer', 'Service', 'Quantity', 'Actions'], // Placeholder
        reservations: ['Reservation ID', 'Room Number', 'Customer', 'Check-in', 'Check-out', 'Status', 'Actions'],
        teachers: ['Teacher Name', 'Email', 'Role', 'Actions'],
    };

    const tableRows = {
        rooms: roomsLoading ? (
            <tr><td colSpan="5" className="text-center py-4 text-gray-500">Loading rooms...</td></tr>
        ) : roomsError ? (
            <tr><td colSpan="5" className="text-center py-4 text-red-500">Error: {roomsError}</td></tr>
        ) : filteredRooms.length === 0 ? (
            <tr><td colSpan="5" className="text-center py-4 text-gray-500">No rooms found.</td></tr>
        ) : (
            filteredRooms.map(room => (
                <tr key={room.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{room.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(room.status)}`}>
                            {room.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${room.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <motion.button
                            onClick={() => openModal('room', room)}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition duration-150 ease-in-out"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Edit room ${room.number}`}
                        >
                            <Edit2 className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            onClick={() => handleDelete('room', room.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition duration-150 ease-in-out ml-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Delete room ${room.number}`}
                        >
                            <Trash2 className="w-5 h-5" />
                        </motion.button>
                    </td>
                </tr>
            ))
        ),
        reservations: reservationLoading ? (
            <tr><td colSpan="7" className="text-center py-4 text-gray-500">Loading reservations...</td></tr>
        ) : reservationError ? (
            <tr><td colSpan="7" className="text-center py-4 text-red-500">Error: {reservationError}</td></tr>
        ) : filteredReservations.length === 0 ? (
            <tr><td colSpan="7" className="text-center py-4 text-gray-500">No reservations found.</td></tr>
        ) : (
            filteredReservations.map(reservation => (
                <tr key={reservation.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{reservation.roomNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{reservation.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(reservation.checkInDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(reservation.checkOutDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                            {reservation.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <motion.button
                            onClick={() => openModal('reservation', reservation)}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition duration-150 ease-in-out"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Edit reservation ${reservation.id}`}
                        >
                            <Edit2 className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            onClick={() => handleDelete('reservation', reservation.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition duration-150 ease-in-out ml-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Delete reservation ${reservation.id}`}
                        >
                            <Trash2 className="w-5 h-5" />
                        </motion.button>
                    </td>
                </tr>
            ))
        ),
        teachers: authLoading ? (
            <tr><td colSpan="4" className="text-center py-4 text-gray-500">Loading teachers...</td></tr>
        ) : authError ? (
            <tr><td colSpan="4" className="text-center py-4 text-red-500">Error: {authError}</td></tr>
        ) : filteredTeachers.length === 0 ? (
            <tr><td colSpan="4" className="text-center py-4 text-gray-500">No teachers found.</td></tr>
        ) : (
            filteredTeachers.map(teacher => (
                <tr key={teacher.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{teacher.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{teacher.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {/* No edit/delete actions for teachers in userSlice, so these are omitted */}
                        <span className="text-gray-500">N/A</span>
                    </td>
                </tr>
            ))
        ),
        customers: filteredCustomers.length === 0 ? (
            <tr><td colSpan="5" className="text-center py-4 text-gray-500">No customer data available via API.</td></tr>
        ) : (
            filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.room}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <motion.button
                            onClick={() => openModal('customer', customer)}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition duration-150 ease-in-out"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Edit customer ${customer.name}`}
                        >
                            <Edit2 className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            onClick={() => handleDelete('customer', customer.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition duration-150 ease-in-out ml-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Delete customer ${customer.name}`}
                        >
                            <Trash2 className="w-5 h-5" />
                        </motion.button>
                    </td>
                </tr>
            ))
        ),
        services: filteredServices.length === 0 ? (
            <tr><td colSpan="4" className="text-center py-4 text-gray-500">No service data available via API.</td></tr>
        ) : (
            filteredServices.map(service => (
                <tr key={service.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{service.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${service.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <motion.button
                            onClick={() => openModal('service', service)}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition duration-150 ease-in-out"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Edit service ${service.name}`}
                        >
                            <Edit2 className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            onClick={() => handleDelete('service', service.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition duration-150 ease-in-out ml-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Delete service ${service.name}`}
                        >
                            <Trash2 className="w-5 h-5" />
                        </motion.button>
                    </td>
                </tr>
            ))
        ),
        customerServices: filteredCustomerServices.length === 0 ? (
            <tr><td colSpan="4" className="text-center py-4 text-gray-500">No customer service data available via API.</td></tr>
        ) : (
            filteredCustomerServices.map(cs => (
                <tr key={cs.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cs.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cs.serviceName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cs.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <motion.button
                            onClick={() => handleDelete('customerService', cs.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition duration-150 ease-in-out ml-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Delete customer service assignment for ${cs.customerName}`}
                        >
                            <Trash2 className="w-5 h-5" />
                        </motion.button>
                    </td>
                </tr>
            ))
        ),
    };


    const renderContent = () => {
        const currentHeaders = tableHeaders[activeTab];
        const currentRows = tableRows[activeTab];

        return (
            <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 mt-6 transition-colors duration-200">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0">
                    <h3 className="text-xl font-semibold text-gray-900 capitalize">{activeTab} Management</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        </div>
                        {activeTab === 'rooms' && (
                            <motion.button
                                onClick={() => openModal('room')}
                                className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Add new room"
                            >
                                <Plus className="w-5 h-5" />
                            </motion.button>
                        )}
                        {activeTab === 'reservations' && (
                            <motion.button
                                onClick={() => openModal('reservation')}
                                className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Add new reservation"
                            >
                                <Plus className="w-5 h-5" />
                            </motion.button>
                        )}
                        {activeTab === 'customers' && (
                            <motion.button
                                onClick={() => openModal('customer')}
                                className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Add new customer"
                            >
                                <Plus className="w-5 h-5" />
                            </motion.button>
                        )}
                        {activeTab === 'services' && (
                            <motion.button
                                onClick={() => openModal('service')}
                                className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Add new service"
                            >
                                <Plus className="w-5 h-5" />
                            </motion.button>
                        )}
                        {activeTab === 'customerServices' && (
                            <motion.button
                                onClick={() => openModal('assignService')}
                                className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Assign new service to customer"
                            >
                                <Plus className="w-5 h-5" />
                            </motion.button>
                        )}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {currentHeaders.map((header, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className={`min-h-screen bg-gray-100 text-gray-900 transition-colors duration-200 p-4 md:p-6 font-sans`}>
            <header className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-white shadow-md rounded-xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">Admin Panel</h1>
                <div className="flex items-center space-x-4">
                    <span className="font-medium">Welcome, {currentUser?.name || 'Admin'}!</span>
                </div>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                <nav className="md:col-span-1 bg-white shadow-lg rounded-xl p-6 transition-colors duration-200 h-fit">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
                    <ul>
                        <li>
                            <motion.button
                                onClick={() => setActiveTab('rooms')}
                                className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-200 ${activeTab === 'rooms' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                whileHover={{ x: 5 }}
                            >
                                <BedDouble className="w-5 h-5 mr-3" /> Room Management
                            </motion.button>
                        </li>
                        <li className="mt-2">
                            <motion.button
                                onClick={() => setActiveTab('reservations')}
                                className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-200 ${activeTab === 'reservations' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                whileHover={{ x: 5 }}
                            >
                                <ConciergeBell className="w-5 h-5 mr-3" /> Reservation Management
                            </motion.button>
                        </li>
                        <li className="mt-2">
                            <motion.button
                                onClick={() => setActiveTab('customers')}
                                className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-200 ${activeTab === 'customers' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                whileHover={{ x: 5 }}
                            >
                                <Users className="w-5 h-5 mr-3" /> Customer Management
                            </motion.button>
                        </li>
                        <li className="mt-2">
                            <motion.button
                                onClick={() => setActiveTab('services')}
                                className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-200 ${activeTab === 'services' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                whileHover={{ x: 5 }}
                            >
                                <Settings className="w-5 h-5 mr-3" /> Service Management
                            </motion.button>
                        </li>
                        <li className="mt-2">
                            <motion.button
                                onClick={() => setActiveTab('customerServices')}
                                className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-200 ${activeTab === 'customerServices' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                whileHover={{ x: 5 }}
                            >
                                <Filter className="w-5 h-5 mr-3" /> Customer Services
                            </motion.button>
                        </li>
                        <li className="mt-2">
                            <motion.button
                                onClick={() => setActiveTab('teachers')}
                                className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-200 ${activeTab === 'teachers' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                whileHover={{ x: 5 }}
                            >
                                <Users className="w-5 h-5 mr-3" /> Teachers List
                            </motion.button>
                        </li>
                    </ul>
                </nav>

                <div className="md:col-span-3">
                    {renderContent()}
                </div>
            </main>

            <AnimatePresence>
                {showModal && (
                    <Modal title={modalType === 'room' ? (editingItem ? 'Edit Room' : 'Add New Room') :
                        modalType === 'customer' ? (editingItem ? 'Edit Customer' : 'Add New Customer') :
                            modalType === 'service' ? (editingItem ? 'Edit Service' : 'Add New Service') :
                                modalType === 'assignService' ? 'Assign Service to Customer' :
                                    modalType === 'reservation' ? (editingItem ? 'Edit Reservation' : 'Add New Reservation') : ''}
                           onClose={closeModal}
                    >
                        {modalType === 'room' && (
                            <RoomForm
                                item={currentRoom}
                                onSubmit={handleSubmit}
                                onCancel={closeModal}
                            />
                        )}
                        {modalType === 'reservation' && (
                            <ReservationForm // Using the new ReservationForm
                                item={currentReservation}
                                rooms={rooms} // Pass rooms for selection
                                onSubmit={(data) => handleSubmit(data, modalType)}
                                onCancel={closeModal}
                            />
                        )}
                        {modalType === 'customer' && (
                            <CustomerForm
                                item={editingItem}
                                onSubmit={handleSubmit}
                                onCancel={closeModal}
                            />
                        )}
                        {modalType === 'service' && (
                            <ServiceForm
                                item={editingItem}
                                onSubmit={handleSubmit}
                                onCancel={closeModal}
                            />
                        )}
                        {modalType === 'assignService' && (
                            <CustomerServiceForm
                                customers={mockCustomers} // Still uses mock data
                                services={mockServices}   // Still uses mock data
                                onSubmit={handleAddCustomerService}
                                onCancel={closeModal}
                            />
                        )}
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
};

// Main App component (no AdminProvider needed if dark mode is removed and no other context is provided)
const App = () => {
    return (
        <AdminDashboard />
    );
};

export default App;