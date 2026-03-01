import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

function AdminDashboard() {
    const { user, isAdmin, logout, getCustomers } = useAuth();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
            return;
        }
        fetchCustomers();
    }, [isAdmin, navigate]);

    const fetchCustomers = async () => {
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (err) {
            console.error('Error fetching customers:', err);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const filteredCustomers = customers.filter(c =>
        c.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getProviderBadge = (provider) => {
        if (provider === 'google') {
            return <span className="provider-badge google">Google</span>;
        }
        return <span className="provider-badge email">Email</span>;
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Stats
    const totalCustomers = customers.length;
    const googleUsers = customers.filter(c => c.provider === 'google').length;
    const emailUsers = customers.filter(c => c.provider === 'email').length;
    const todayCount = customers.filter(c => {
        if (!c.createdAt) return false;
        const date = c.createdAt.toDate ? c.createdAt.toDate() : new Date(c.createdAt);
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }).length;

    return (
        <div className="admin-page">
            {/* Admin sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <img src="/assets/Images/skypower.png" alt="Sky Power" className="sidebar-logo" />
                    <h2 className="sidebar-title">Admin Panel</h2>
                </div>

                <nav className="sidebar-nav">
                    <button className="sidebar-link active">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                        </svg>
                        Dashboard
                    </button>
                    <button className="sidebar-link" onClick={() => navigate('/')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        View Site
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <div className="admin-profile">
                        <div className="admin-avatar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        </div>
                        <div className="admin-info">
                            <span className="admin-name">Admin</span>
                            <span className="admin-email">{user?.email}</span>
                        </div>
                    </div>
                    <button className="sidebar-logout" onClick={handleLogout}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="admin-main">
                <div className="admin-topbar">
                    <div>
                        <h1 className="admin-page-title">Dashboard</h1>
                        <p className="admin-page-subtitle">Welcome back, Admin! Here's your overview.</p>
                    </div>
                    <div className="topbar-actions">
                        <button className="refresh-btn" onClick={fetchCustomers}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                            </svg>
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats cards */}
                <div className="stats-grid">
                    <motion.div
                        className="stat-card stat-total"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="stat-icon-wrap">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-number">{totalCustomers}</span>
                            <span className="stat-label">Total Customers</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card stat-google"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="stat-icon-wrap">
                            <svg width="28" height="28" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-number">{googleUsers}</span>
                            <span className="stat-label">Google Sign-ups</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card stat-email"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="stat-icon-wrap">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-number">{emailUsers}</span>
                            <span className="stat-label">Email Sign-ups</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card stat-today"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="stat-icon-wrap">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <span className="stat-number">{todayCount}</span>
                            <span className="stat-label">Today's Sign-ups</span>
                        </div>
                    </motion.div>
                </div>

                {/* Customers table */}
                <motion.div
                    className="customers-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="customers-header">
                        <h2 className="customers-title">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            Registered Customers
                        </h2>
                        <div className="search-wrapper">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="admin-loader"></div>
                            <p>Loading customer data...</p>
                        </div>
                    ) : filteredCustomers.length === 0 ? (
                        <div className="empty-state">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <p>{searchTerm ? 'No customers found matching your search.' : 'No customers registered yet.'}</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="customers-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Customer</th>
                                        <th>Email</th>
                                        <th>Provider</th>
                                        <th>Registered</th>
                                        <th>Last Login</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.map((customer, index) => (
                                        <motion.tr
                                            key={customer.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <td className="td-num">{index + 1}</td>
                                            <td>
                                                <div className="customer-cell">
                                                    {customer.photoURL ? (
                                                        <img src={customer.photoURL} alt="" className="customer-avatar" />
                                                    ) : (
                                                        <div className="customer-avatar-placeholder">
                                                            {getInitials(customer.displayName)}
                                                        </div>
                                                    )}
                                                    <span className="customer-name">{customer.displayName || 'Unknown'}</span>
                                                </div>
                                            </td>
                                            <td className="td-email">{customer.email}</td>
                                            <td>{getProviderBadge(customer.provider)}</td>
                                            <td className="td-date">{formatDate(customer.createdAt)}</td>
                                            <td className="td-date">{formatDate(customer.lastLogin)}</td>
                                            <td>
                                                <button
                                                    className="view-btn"
                                                    onClick={() => setSelectedCustomer(customer)}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                    View
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>
            </main>

            {/* Customer detail modal */}
            <AnimatePresence>
                {selectedCustomer && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCustomer(null)}
                    >
                        <motion.div
                            className="modal-card"
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={() => setSelectedCustomer(null)}>✕</button>
                            <div className="modal-header">
                                {selectedCustomer.photoURL ? (
                                    <img src={selectedCustomer.photoURL} alt="" className="modal-avatar" />
                                ) : (
                                    <div className="modal-avatar-placeholder">
                                        {getInitials(selectedCustomer.displayName)}
                                    </div>
                                )}
                                <h2 className="modal-name">{selectedCustomer.displayName || 'Unknown User'}</h2>
                                {getProviderBadge(selectedCustomer.provider)}
                            </div>

                            <div className="modal-details">
                                <div className="detail-row">
                                    <span className="detail-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                        Email
                                    </span>
                                    <span className="detail-value">{selectedCustomer.email}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                        User ID
                                    </span>
                                    <span className="detail-value detail-uid">{selectedCustomer.uid}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                        Registered
                                    </span>
                                    <span className="detail-value">{formatDate(selectedCustomer.createdAt)}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        Last Login
                                    </span>
                                    <span className="detail-value">{formatDate(selectedCustomer.lastLogin)}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                        Sign-in Method
                                    </span>
                                    <span className="detail-value" style={{ textTransform: 'capitalize' }}>{selectedCustomer.provider || 'N/A'}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AdminDashboard;
