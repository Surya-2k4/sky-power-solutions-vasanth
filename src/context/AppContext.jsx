import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n/config';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        try { return localStorage.getItem('site-theme') || 'dark'; } catch { return 'dark'; }
    });
    const [lang, setLang] = useState(() => {
        try { return localStorage.getItem('site-lang') || 'en'; } catch { return 'en'; }
    });

    useEffect(() => {
        try { localStorage.setItem('site-theme', theme); } catch { }
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }, [theme]);

    useEffect(() => {
        try { localStorage.setItem('site-lang', lang); } catch { }
        i18n.changeLanguage(lang);
    }, [lang]);

    const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    const toggleLang = () => setLang(prev => (prev === 'en' ? 'ta' : 'en'));

    return (
        <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
