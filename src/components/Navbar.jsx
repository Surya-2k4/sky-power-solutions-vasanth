import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslation();
    const { theme, lang, toggleTheme, toggleLang } = useAppContext();
    const { user, isAdmin, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <header className={`navbar ${isScrolled || location.pathname !== '/' ? 'solid' : ''}`}>
            <div className="navbar-inner">
                <NavLink to="/" className="logo">
                    <img src="/assets/Images/skypower.png" alt="Sky Power Solutions" className="logo-img" />
                    <span className="logo-text">Sky Power Solutions</span>
                </NavLink>

                <nav className={`nav-links ${isOpen ? 'show' : ''}`}>
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>{t('home')}</NavLink>
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>{t('product')}</NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>{t('services')}</NavLink>
                    <NavLink to="/reviews" className={({ isActive }) => isActive ? 'active' : ''}>{t('reviews')}</NavLink>
                    <NavLink to="/faq" className={({ isActive }) => isActive ? 'active' : ''}>{t('faq')}</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>{t('about')}</NavLink>

                    {/* These appear inside the mobile dropdown menu only */}
                    <div className="mobile-only-links">
                        <NavLink to="/contact" className="mobile-nav-cta">{t('contact-us')}</NavLink>
                        {user ? (
                            <>
                                {isAdmin && (
                                    <NavLink to="/admin" className="mobile-nav-cta">⚙️ Admin Dashboard</NavLink>
                                )}
                                <button className="mobile-nav-cta mobile-logout-btn" onClick={handleLogout}>
                                    🚪 Logout
                                </button>
                            </>
                        ) : (
                            <NavLink to="/login" className="mobile-nav-cta mobile-login-btn">
                                Login
                            </NavLink>
                        )}
                    </div>
                </nav>

                <div className="nav-actions">
                    <button className="btn-ghost btn-icon-only" onClick={toggleTheme} title="Toggle Theme">
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    <button className="btn-ghost btn-icon-only" onClick={toggleLang} title="Switch Language">
                        🌐 {lang === 'en' ? 'TA' : 'EN'}
                    </button>
                    <NavLink to="/contact" className="btn-outline sm-hidden">{t('contact-us')}</NavLink>
                    {user ? (
                        <>
                            {isAdmin && (
                                <NavLink to="/admin" className="btn-ghost sm-hidden" title="Admin Dashboard">
                                    ⚙️ Admin
                                </NavLink>
                            )}
                            <button className="btn-ghost nav-user-btn sm-hidden" onClick={handleLogout} title="Logout">
                                <span className="nav-user-avatar">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt="" style={{ width: 24, height: 24, borderRadius: '50%' }} />
                                    ) : (
                                        user.displayName ? user.displayName[0].toUpperCase() : '👤'
                                    )}
                                </span>
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className="btn-primary sm-hidden">
                            Login
                        </NavLink>
                    )}
                    <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
