import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setLoading(true);
        try {
            await signup(email, password, name);
            navigate('/');
        } catch (err) {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError('An account with this email already exists.');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email format.');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak. Use at least 6 characters.');
                    break;
                default:
                    setError('Registration failed. Please try again.');
            }
        }
        setLoading(false);
    };

    const handleGoogleSignup = async () => {
        setError('');
        setLoading(true);
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            console.error("Google signup error:", err);
            if (err.code === 'auth/popup-closed-by-user') {
                setError('The popup was closed before completing the sign-up.');
            } else if (err.code === 'auth/popup-blocked') {
                setError('The sign-up popup was blocked by your browser. Please allow popups for this site.');
            } else if (err.code === 'auth/account-exists-with-different-credential') {
                setError('An account already exists with this email but using a different sign-in method.');
            } else {
                setError(`Google sign-up failed: ${err.message || 'Please try again.'}`);
            }
        }
        setLoading(false);
    };

    return (
        <div className="auth-page">
            {/* Animated solar background elements */}
            <div className="auth-bg-elements">
                <div className="solar-orbit orbit-1">
                    <div className="solar-particle"></div>
                </div>
                <div className="solar-orbit orbit-2">
                    <div className="solar-particle"></div>
                </div>
                <div className="solar-orbit orbit-3">
                    <div className="solar-particle"></div>
                </div>
                <div className="sun-glow"></div>
                <div className="solar-rays">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="ray" style={{ transform: `rotate(${i * 45}deg)` }}></div>
                    ))}
                </div>
            </div>

            <motion.div
                className="auth-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="auth-card">
                    <div className="auth-header">
                        <Link to="/" className="auth-logo">
                            <img src="/assets/Images/skypower.png" alt="Sky Power" className="auth-logo-img" />
                        </Link>
                        <div className="auth-solar-icon">
                            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="32" cy="32" r="12" fill="url(#sunGrad2)" />
                                <g stroke="url(#rayGrad2)" strokeWidth="2.5" strokeLinecap="round">
                                    <line x1="32" y1="4" x2="32" y2="14" />
                                    <line x1="32" y1="50" x2="32" y2="60" />
                                    <line x1="4" y1="32" x2="14" y2="32" />
                                    <line x1="50" y1="32" x2="60" y2="32" />
                                    <line x1="12.2" y1="12.2" x2="19.1" y2="19.1" />
                                    <line x1="44.9" y1="44.9" x2="51.8" y2="51.8" />
                                    <line x1="12.2" y1="51.8" x2="19.1" y2="44.9" />
                                    <line x1="44.9" y1="19.1" x2="51.8" y2="12.2" />
                                </g>
                                <defs>
                                    <radialGradient id="sunGrad2"><stop stopColor="#ffcc7b" /><stop offset="1" stopColor="#ff9a3c" /></radialGradient>
                                    <linearGradient id="rayGrad2" x1="0" y1="0" x2="64" y2="64"><stop stopColor="#ffcc7b" /><stop offset="1" stopColor="#13d0b4" /></linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">Join Sky Power Solutions today</p>
                    </div>

                    {error && (
                        <motion.div
                            className="auth-error"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <span className="error-icon">⚠️</span> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSignup} className="auth-form">
                        <div className="auth-input-group">
                            <label htmlFor="signup-name">Full Name</label>
                            <div className="auth-input-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                </span>
                                <input
                                    id="signup-name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="signup-email">Email Address</label>
                            <div className="auth-input-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </span>
                                <input
                                    id="signup-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="signup-password">Password</label>
                            <div className="auth-input-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>
                                <input
                                    id="signup-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="signup-confirm">Confirm Password</label>
                            <div className="auth-input-wrapper">
                                <span className="input-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </span>
                                <input
                                    id="signup-confirm"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="auth-btn-primary" disabled={loading}>
                            {loading ? (
                                <span className="auth-spinner"></span>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
                                    </svg>
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>or continue with</span>
                    </div>

                    <button
                        className="auth-btn-google"
                        onClick={handleGoogleSignup}
                        disabled={loading}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Sign up with Google
                    </button>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Signup;
