import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Users, BedDouble, Settings, Search, Filter, ConciergeBell, LogIn, LogOut, Sun, Moon } from 'lucide-react'; // Added LogIn, LogOut, Sun, Moon
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { checkAuth, login, logout } from '../../redux/reducers/userSlice.js'; // Assuming userSlice.js is in the same directory, adjust path if necessary

// --- Context for Data (Simplified "Slice" Concept) ---
// Keep AdminContext for data specific to this admin panel (rooms, customers, services)
// Theme will be managed locally within AdminProvider or could be lifted to Redux if truly global
const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    // Keeping dark mode local as it's a UI preference and not directly related to userSlice data
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [rooms, setRooms] = useState([
        { id: 1, number: '101', type: 'Single', status: 'Available', price: 120, images: [] },
        { id: 2, number: '102', type: 'Double', status: 'Occupied', price: 180, images: [] },
        { id: 3, number: '201', type: 'Suite', status: 'Maintenance', price: 350, images: [] },
    ]);
    const [customers, setCustomers] = useState([
        { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1234567890', room: '102' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+0987654321', room: '305' },
    ]);
    const [services, setServices] = useState([
        { id: 1, name: 'Room Service', price: 25, category: 'Food & Beverage' },
        { id: 2, name: 'Laundry', price: 15, category: 'Housekeeping' },
        { id: 3, name: 'Spa Treatment', price: 120, category: 'Wellness' },
    ]);
    const [customerServices, setCustomerServices] = useState([]);

    // Persist dark mode preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };

    const addOrUpdateItem = (type, itemData) => {
        if (type === 'room') {
            if (itemData.id) {
                setRooms(rooms.map(room => room.id === itemData.id ? { ...room, ...itemData, price: Number(itemData.price) } : room));
            } else {
                setRooms([...rooms, { id: Date.now(), ...itemData, price: Number(itemData.price) }]);
            }
        } else if (type === 'customer') {
            if (itemData.id) {
                setCustomers(customers.map(customer => customer.id === itemData.id ? { ...customer, ...itemData } : customer));
            } else {
                setCustomers([...customers, { id: Date.now(), ...itemData }]);
            }
        } else if (type === 'service') {
            if (itemData.id) {
                setServices(services.map(service => service.id === itemData.id ? { ...service, ...itemData, price: Number(itemData.price) } : service));
            } else {
                setServices([...services, { id: Date.now(), ...itemData, price: Number(itemData.price) }]);
            }
        }
    };

    const deleteItem = (type, id) => {
        if (type === 'room') {
            setRooms(rooms.filter(room => room.id !== id));
        } else if (type === 'customer') {
            setCustomers(customers.filter(customer => customer.id !== id));
        } else if (type === 'service') {
            setServices(services.filter(service => service.id !== id));
        }
    };

    const addCustomerService = (customerId, serviceId, quantity = 1) => {
        setCustomerServices(prev => [...prev, { id: Date.now(), customerId, serviceId, quantity }]);
    };

    const deleteCustomerService = (id) => {
        setCustomerServices(prev => prev.filter(cs => cs.id !== id));
    };

    return (
        <AdminContext.Provider value={{
            isDarkMode, toggleDarkMode,
            rooms, customers, services, customerServices,
            addOrUpdateItem, deleteItem,
            addCustomerService, deleteCustomerService
        }}>
            {children}
        </AdminContext.Provider>
    );
};

// --- Reusable Components ---

const Modal = ({ children, title, onClose }) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all"
                    initial={{ scale: 0.9, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 50 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 id="modal-title" className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
                        <motion.button
                            onClick={onClose}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            aria-label="Close modal"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {/* Assuming X icon is available from lucide-react, add it if not already imported */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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
            // More robust validation would be handled by a form library or onSubmit
        }
    }, [value, required]);

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {type === 'select' ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out"
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
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out"
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.number && formData.type && formData.status && formData.price) {
            onSubmit(formData);
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
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
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
            onSubmit(formData);
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
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
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
            onSubmit(formData);
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
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Cancel
                </motion.button>
            </div>
        </form>
    );
};

const CustomerServiceForm = ({ onSubmit, onCancel, customers, services }) => {
    const [formData, setFormData] = useState({
        customerId: '',
        serviceId: '',
        quantity: 1
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.customerId && formData.serviceId) {
            onSubmit(formData.customerId, formData.serviceId, Number(formData.quantity));
        } else {
            console.error("Please select a customer and a service.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label="Select Customer"
                name="customerId"
                value={formData.customerId}
                onChange={handleInputChange}
                type="select"
                options={[{ value: '', label: 'Choose a customer' }, ...customers.map(c => ({ value: c.id, label: c.name }))]}
                required
            />
            <FormField
                label="Select Service"
                name="serviceId"
                value={formData.serviceId}
                onChange={handleInputChange}
                type="select"
                options={[{ value: '', label: 'Choose a service' }, ...services.map(s => ({ value: s.id, label: s.name }))]}
                required
            />
            <FormField
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                required
            />
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
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Cancel
                </motion.button>
            </div>
        </form>
    );
};


// --- Main Admin Dashboard Component ---

const AdminDashboard = () => {
    const { isDarkMode, toggleDarkMode, rooms, customers, services, customerServices, addOrUpdateItem, deleteItem, addCustomerService, deleteCustomerService } = useContext(AdminContext);

    const dispatch = useDispatch();
    const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth); // Assuming 'auth' is the slice name

    const [activeTab, setActiveTab] = useState('rooms');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false); // New state for login modal
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginFormData));
        setShowLoginModal(false); // Close login modal after submission
        setLoginFormData({ email: '', password: '' }); // Clear form
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const openModal = (type, item = null) => {
        setModalType(type);
        setEditingItem(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
    };

    const handleSubmit = (data, type) => {
        addOrUpdateItem(type, data);
        closeModal();
    };

    const handleAddCustomerService = (customerId, serviceId, quantity) => {
        addCustomerService(customerId, serviceId, quantity);
        closeModal();
    };

    const handleDelete = (type, id) => {
        if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
            if (type === 'customerService') {
                deleteCustomerService(id);
            } else {
                deleteItem(type, id);
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100';
            case 'Occupied': return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100';
            case 'Maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100';
        }
    };

    const filteredRooms = rooms.filter(room =>
        room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.room && customer.room.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCustomerServices = customerServices.filter(cs => {
        const customer = customers.find(c => c.id === cs.customerId);
        const service = services.find(s => s.id === cs.serviceId);
        const customerName = customer ? customer.name.toLowerCase() : '';
        const serviceName = service ? service.name.toLowerCase() : '';
        return customerName.includes(searchTerm.toLowerCase()) || serviceName.includes(searchTerm.toLowerCase());
    });

    // Dynamic content for tables
    const tableHeaders = {
        rooms: ['Room Number', 'Type', 'Status', 'Price/Night', 'Actions'],
        customers: ['Name', 'Email', 'Phone', 'Room', 'Actions'],
        services: ['Service Name', 'Category', 'Price', 'Actions'],
        customerServices: ['Customer', 'Service', 'Quantity', 'Actions']
    };

    const tableRows = {
        rooms: filteredRooms.map(room => (
            <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{room.number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{room.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(room.status)}`}>
                        {room.status}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${room.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <motion.button
                        onClick={() => openModal('room', room)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                        title="Edit Room"
                        aria-label={`Edit room ${room.number}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        onClick={() => handleDelete('room', room.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out ml-2"
                        title="Delete Room"
                        aria-label={`Delete room ${room.number}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </motion.button>
                </td>
            </tr>
        )),
        customers: filteredCustomers.map(customer => (
            <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{customer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{customer.room}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <motion.button
                        onClick={() => openModal('customer', customer)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                        title="Edit Customer"
                        aria-label={`Edit customer ${customer.name}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        onClick={() => handleDelete('customer', customer.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out ml-2"
                        title="Delete Customer"
                        aria-label={`Delete customer ${customer.name}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </motion.button>
                </td>
            </tr>
        )),
        services: filteredServices.map(service => (
            <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{service.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{service.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">${service.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <motion.button
                        onClick={() => openModal('service', service)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                        title="Edit Service"
                        aria-label={`Edit service ${service.name}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        onClick={() => handleDelete('service', service.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out ml-2"
                        title="Delete Service"
                        aria-label={`Delete service ${service.name}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </motion.button>
                </td>
            </tr>
        )),
        customerServices: filteredCustomerServices.map(cs => {
            const customer = customers.find(c => c.id === cs.customerId);
            const service = services.find(s => s.id === cs.serviceId);
            return (
                <tr key={cs.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{customer ? customer.name : 'Unknown Customer'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{service ? service.name : 'Unknown Service'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{cs.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <motion.button
                            onClick={() => handleDelete('customerService', cs.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out ml-2"
                            title="Delete Customer Service"
                            aria-label={`Delete service for ${customer ? customer.name : 'Unknown Customer'}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Trash2 className="w-4 h-4" />
                        </motion.button>
                    </td>
                </tr>
            );
        })
    };

    const currentData = {
        rooms: filteredRooms,
        customers: filteredCustomers,
        services: filteredServices,
        customerServices: filteredCustomerServices
    };

    const currentEmptyStateMessage = {
        rooms: 'No rooms found. Add a new room to get started!',
        customers: 'No customers registered. Add a new customer!',
        services: 'No services found. Add a new service!',
        customerServices: 'No services assigned to customers. Assign a service!'
    };

    const tabIcons = {
        rooms: BedDouble,
        customers: Users,
        services: Settings,
        customerServices: ConciergeBell
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans antialiased text-gray-900 dark:text-white transition-colors duration-300">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4"> {/* Changed flex-direction for header content */}
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            {loading && <span className="text-blue-500">Loading...</span>}
                            {error && <span className="text-red-500">{error}</span>}
                            {isAuthenticated ? (
                                <>
                                    <span className="text-gray-700 dark:text-gray-300">Welcome, {user?.name || user?.email || 'Admin'}!</span>
                                    <motion.button
                                        onClick={handleLogout}
                                        className="bg-red-500 text-white px-3 py-1.5 rounded-md flex items-center space-x-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition duration-150 ease-in-out"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label="Logout"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </motion.button>
                                </>
                            ) : (
                                <motion.button
                                    onClick={() => setShowLoginModal(true)}
                                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md flex items-center space-x-1 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition duration-150 ease-in-out"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Login"
                                >
                                    <LogIn className="w-4 h-4" />
                                    <span>Login</span>
                                </motion.button>
                            )}
                            <motion.button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                aria-label="Toggle dark mode"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs (only visible if authenticated) */}
            {isAuthenticated && (
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex space-x-8 overflow-x-auto scrollbar-hide items-center">
                            {[
                                { id: 'rooms', label: 'Room Management', icon: BedDouble },
                                { id: 'customers', label: 'Customer Registration', icon: Users },
                                { id: 'services', label: 'Services', icon: Settings },
                                { id: 'customerServices', label: 'Customer Services', icon: ConciergeBell }
                            ].map(({ id, label, icon: IconComponent }) => (
                                <motion.button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap
                                        ${activeTab === id
                                        ? 'border-blue-600 text-blue-700 dark:text-blue-400'
                                        : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    aria-controls={`${id}-panel`}
                                    role="tab"
                                    aria-selected={activeTab === id}
                                    id={`${id}-tab`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{label}</span>
                                </motion.button>
                            ))}
                            <div className="relative ml-auto flex-shrink-0">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm transition duration-150 ease-in-out"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    aria-label="Search items"
                                />
                            </div>
                        </div>
                    </div>
                </nav>
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="tablist">
                {!isAuthenticated ? (
                    <div className="text-center py-20">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Please log in to access the dashboard.</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">You need to be authenticated to manage hotel resources.</p>
                        <motion.button
                            onClick={() => setShowLoginModal(true)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center mx-auto space-x-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition duration-150 ease-in-out shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Open login form"
                        >
                            <LogIn className="w-5 h-5" />
                            <span>Log In Now</span>
                        </motion.button>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            role="tabpanel"
                            id={`${activeTab}-panel`}
                            aria-labelledby={`${activeTab}-tab`}
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
                                    {activeTab.replace(/([A-Z])/g, ' $1').trim()} Management
                                </h2>
                                {activeTab !== 'customerServices' ? (
                                    <motion.button
                                        onClick={() => openModal(activeTab.slice(0, -1))}
                                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition duration-150 ease-in-out shadow-md"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={`Add new ${activeTab.slice(0, -1)}`}
                                    >
                                        <Plus className="w-5 h-5" />
                                        <span>Add {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(0, -1).slice(1)}</span>
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        onClick={() => openModal('assignService')}
                                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition duration-150 ease-in-out shadow-md"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label="Assign new service to customer"
                                    >
                                        <Plus className="w-5 h-5" />
                                        <span>Assign Service</span>
                                    </motion.button>
                                )}
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            {tableHeaders[activeTab].map((header, index) => (
                                                <th
                                                    key={index}
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {currentData[activeTab].length > 0 ? (
                                            tableRows[activeTab]
                                        ) : (
                                            <tr>
                                                <td colSpan={tableHeaders[activeTab].length} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400 text-lg">
                                                    {currentEmptyStateMessage[activeTab]}
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </main>

            {/* Modals for Add/Edit/Assign */}
            <AnimatePresence>
                {showModal && isAuthenticated && ( // Only show if authenticated
                    <Modal
                        title={`${modalType === 'assignService' ? 'Assign Service' : (editingItem ? 'Edit' : 'Add')} ${modalType === 'assignService' ? '' : (modalType.charAt(0).toUpperCase() + modalType.slice(1))}`}
                        onClose={closeModal}
                    >
                        {modalType === 'room' && (
                            <RoomForm
                                item={editingItem}
                                onSubmit={(data) => handleSubmit(data, modalType)}
                                onCancel={closeModal}
                            />
                        )}
                        {modalType === 'customer' && (
                            <CustomerForm
                                item={editingItem}
                                onSubmit={(data) => handleSubmit(data, modalType)}
                                onCancel={closeModal}
                            />
                        )}
                        {modalType === 'service' && (
                            <ServiceForm
                                item={editingItem}
                                onSubmit={(data) => handleSubmit(data, modalType)}
                                onCancel={closeModal}
                            />
                        )}
                        {modalType === 'assignService' && (
                            <CustomerServiceForm
                                customers={customers}
                                services={services}
                                onSubmit={handleAddCustomerService}
                                onCancel={closeModal}
                            />
                        )}
                    </Modal>
                )}
            </AnimatePresence>

            {/* Login Modal */}
            <AnimatePresence>
                {showLoginModal && !isAuthenticated && (
                    <Modal title="Login" onClose={() => setShowLoginModal(false)}>
                        <form onSubmit={handleLoginSubmit}>
                            <FormField
                                label="Email"
                                name="email"
                                type="email"
                                value={loginFormData.email}
                                onChange={handleLoginChange}
                                required
                            />
                            <FormField
                                label="Password"
                                name="password"
                                type="password"
                                value={loginFormData.password}
                                onChange={handleLoginChange}
                                required
                            />
                            <div className="flex gap-2 mt-6">
                                <motion.button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-md"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                >
                                    {loading ? 'Logging In...' : 'Login'}
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={() => setShowLoginModal(false)}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Cancel
                                </motion.button>
                            </div>
                            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                        </form>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
};

// Main App component to wrap with context provider
// This App component would typically be wrapped by Redux's Provider in your root index.js
const App = () => {
    return (
        <AdminProvider>
            <AdminDashboard />
        </AdminProvider>
    );
};

export default App;