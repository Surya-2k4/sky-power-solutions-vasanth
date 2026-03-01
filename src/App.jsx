import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './i18n/config';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Services from './pages/Services';
import Reviews from './pages/Reviews';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}

function ProtectedAdminRoute({ children }) {
    const { user, isAdmin, loading } = useAuth();
    if (loading) return <div className="auth-loading"><div className="auth-spinner"></div></div>;
    if (!user || !isAdmin) return <Navigate to="/login" />;
    return children;
}

function AuthRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <div className="auth-loading"><div className="auth-spinner"></div></div>;
    if (user) return <Navigate to="/" />;
    return children;
}

function App() {
    return (
        <AppProvider>
            <AuthProvider>
                <BrowserRouter>
                    <ScrollToTop />
                    <Routes>
                        {/* Auth pages - no layout */}
                        <Route path="/login" element={
                            <AuthRoute><Login /></AuthRoute>
                        } />
                        <Route path="/signup" element={
                            <AuthRoute><Signup /></AuthRoute>
                        } />

                        {/* Admin page - no layout */}
                        <Route path="/admin" element={
                            <ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>
                        } />

                        {/* Public pages with layout */}
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/about" element={<Layout><About /></Layout>} />
                        <Route path="/products" element={<Layout><Products /></Layout>} />
                        <Route path="/services" element={<Layout><Services /></Layout>} />
                        <Route path="/reviews" element={<Layout><Reviews /></Layout>} />
                        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
                        <Route path="/contact" element={<Layout><Contact /></Layout>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </AppProvider>
    );
}

export default App;
