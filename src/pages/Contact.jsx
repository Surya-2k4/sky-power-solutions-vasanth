import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Contact() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: 'Residential', message: '' });
    const [note, setNote] = useState('');

    const WHATSAPP_NUMBER = "919976222422";

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone) {
            setNote('Please fill in your name, email and phone number.');
            return;
        }

        const msg = [
            "New Solar Lead – Sky Power Solutions",
            "",
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Phone: ${formData.phone}`,
            `Project type: ${formData.type}`,
            "",
            "Details:",
            formData.message || "N/A",
        ].join("\n");

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
        setNote("Opening WhatsApp…");
    };

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-inner">
                    <h1>{t('cont-hero-title')}</h1>
                    <p>{t('cont-hero-desc')}</p>
                </div>
            </section>

            <section className="section">
                <div className="section-inner">
                    <div className="grid-2">
                        <div className="flex-col">
                            <h2 className="section-title">{t('cont-title')}</h2>
                            <p className="section-desc">{t('cont-desc')}</p>

                            <div className="card">
                                <ul className="card-list">
                                    <li>📞 <div><strong>{t('label-sales')}</strong><br />+91 99762 22422</div></li>
                                    <li>📧 <div><strong>{t('label-email')}</strong><br />contact@skypower.in</div></li>
                                    <li>📍 <div><strong>{t('label-addr')}</strong><br />Perundurai, Erode - 638052</div></li>
                                </ul>
                                <a href="https://maps.app.goo.gl/" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ marginTop: '10px' }}>
                                    {t('btn-yours')}
                                </a>
                            </div>
                        </div>

                        <div className="card">
                            <form onSubmit={handleSubmit} className="flex-col">
                                <div className="form-group">
                                    <label>{t('label-fullname')}</label>
                                    <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Your Name" required />
                                </div>
                                <div className="form-group">
                                    <label>{t('label-email')}</label>
                                    <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="name@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label>{t('label-phone')}</label>
                                    <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+91" required />
                                </div>
                                <div className="form-group">
                                    <label>{t('label-proj-type')}</label>
                                    <select value={formData.type} onChange={(e) => handleChange('type', e.target.value)}>
                                        <option value="Residential">Residential</option>
                                        <option value="Commercial">Commercial / Industrial</option>
                                        <option value="Agricultural">Agricultural</option>
                                        <option value="Maintenance">Maintenance Service</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>{t('label-site-details')}</label>
                                    <textarea value={formData.message} onChange={(e) => handleChange('message', e.target.value)} rows="4" placeholder="Tell us about your requirements..."></textarea>
                                </div>

                                {note && <p className="form-note">{note}</p>}

                                <button type="submit" className="btn-primary">📤 {t('btn-req-quote')}</button>
                                <p className="footer-note">{t('note-response')}</p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;
