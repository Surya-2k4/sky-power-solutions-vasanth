import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="footer">
            <div className="footer-inner">
                <p>&copy; {new Date().getFullYear()} Sky Power Solutions. All rights reserved.</p>
                <p className="footer-note">{t('footer-note')}</p>
            </div>
        </footer>
    );
}

export default Footer;
