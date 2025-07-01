import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Users, BedDouble, Settings, Search, Filter } from 'lucide-react';

const RoomForm = ({ item, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        number: item?.number || '',
        type: item?.type || 'Single',
        status: item?.status || 'Available',
        price: item?.price || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (formData.number && formData.type && formData.status && formData.price) {
            onSubmit(formData);
        }
    };

    return (
        <>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Room Number</label>
                <input
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                >
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Suite">Suite</option>
                    <option value="Deluxe">Deluxe</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price per Night ($)</label>
                <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                />
            </div>
            <div className="flex gap-2">
                <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    {item ? 'Update' : 'Add'}
                </button>
                <button
                    onClick={onCancel}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </>
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

    const handleSubmit = () => {
        if (formData.name && formData.email && formData.phone && formData.room) {
            onSubmit(formData);
        }
    };

    return (
        <>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Room</label>
                <input
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                />
            </div>
            <div className="flex gap-2">
                <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    {item ? 'Update' : 'Add'}
                </button>
                <button
                    onClick={onCancel}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </>
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

    const handleSubmit = () => {
        if (formData.name && formData.category && formData.price) {
            onSubmit(formData);
        }
    };

    return (
        <>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Service Name</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                >
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price ($)</label>
                <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    required
                />
            </div>
            <div className="flex gap-2">
                <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    {item ? 'Update' : 'Add'}
                </button>
                <button
                    onClick={onCancel}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </>
    );
};

const Admin = () => {
    const [activeTab, setActiveTab] = useState('rooms');
    const [rooms, setRooms] = useState([
        { id: 1, number: '101', type: 'Single', status: 'Available', price: 120 },
        { id: 2, number: '102', type: 'Double', status: 'Occupied', price: 180 },
        { id: 3, number: '201', type: 'Suite', status: 'Maintenance', price: 350 },
    ]);

    const [customers, setCustomers] = useState([
        { id: 1, name: 'John Smith', email: 'john@email.com', phone: '+1234567890', room: '102' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+0987654321', room: '305' },
    ]);

    const [services, setServices] = useState([
        { id: 1, name: 'Room Service', price: 25, category: 'Food & Beverage' },
        { id: 2, name: 'Laundry', price: 15, category: 'Housekeeping' },
        { id: 3, name: 'Spa Treatment', price: 120, category: 'Wellness' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editingItem, setEditingItem] = useState(null);

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
        if (type === 'room') {
            if (editingItem) {
                setRooms(rooms.map(room => room.id === editingItem.id ? { ...room, ...data, price: Number(data.price) } : room));
            } else {
                const newRoom = { id: Date.now(), ...data, price: Number(data.price) };
                setRooms([...rooms, newRoom]);
            }
        } else if (type === 'customer') {
            if (editingItem) {
                setCustomers(customers.map(customer => customer.id === editingItem.id ? { ...customer, ...data } : customer));
            } else {
                const newCustomer = { id: Date.now(), ...data };
                setCustomers([...customers, newCustomer]);
            }
        } else if (type === 'service') {
            if (editingItem) {
                setServices(services.map(service => service.id === editingItem.id ? { ...service, ...data, price: Number(data.price) } : service));
            } else {
                const newService = { id: Date.now(), ...data, price: Number(data.price) };
                setServices([...services, newService]);
            }
        }
        closeModal();
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-800';
            case 'Occupied': return 'bg-red-100 text-red-800';
            case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const Modal = ({ type, item }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {item ? 'Edit' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}
                </h2>
                <div>
                    {type === 'room' && (
                        <RoomForm
                            item={item}
                            onSubmit={(data) => handleSubmit(data, type)}
                            onCancel={closeModal}
                        />
                    )}
                    {type === 'customer' && (
                        <CustomerForm
                            item={item}
                            onSubmit={(data) => handleSubmit(data, type)}
                            onCancel={closeModal}
                        />
                    )}
                    {type === 'service' && (
                        <ServiceForm
                            item={item}
                            onSubmit={(data) => handleSubmit(data, type)}
                            onCancel={closeModal}
                        />
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-900">Hotel Management Admin</h1>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {[
                            { id: 'rooms', label: 'Room Management', icon: BedDouble },
                            { id: 'customers', label: 'Customer Registration', icon: Users },
                            { id: 'services', label: 'Services', icon: Settings }
                        ].map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                                    activeTab === id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Room Management */}
                {activeTab === 'rooms' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Room Management</h2>
                            <button
                                onClick={() => openModal('room')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Room</span>
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Number</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Night</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {rooms.map((room) => (
                                    <tr key={room.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.number}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(room.status)}`}>
                          {room.status}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${room.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => openModal('room', room)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteItem('room', room.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Customer Registration */}
                {activeTab === 'customers' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Customer Registration</h2>
                            <button
                                onClick={() => openModal('customer')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Customer</span>
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.room}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => openModal('customer', customer)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteItem('customer', customer.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Services */}
                {activeTab === 'services' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Services Management</h2>
                            <button
                                onClick={() => openModal('service')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Service</span>
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {services.map((service) => (
                                    <tr key={service.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${service.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => openModal('service', service)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteItem('service', service.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* Modal */}
            {showModal && <Modal type={modalType} item={editingItem} />}
        </div>
    );
};

export default Admin;