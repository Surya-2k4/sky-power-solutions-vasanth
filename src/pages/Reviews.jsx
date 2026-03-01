import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Reviews() {
    const { t } = useTranslation();
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({ name: '', phone: '', rating: 5, comment: '', captcha: '' });
    const [captchaCode, setCaptchaCode] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        try {
            const saved = localStorage.getItem('sunSolutionsReviews');
            if (saved) setReviews(JSON.parse(saved).reverse());
        } catch { }
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        let code = '';
        for (let i = 0; i < 5; i++) code += Math.floor(Math.random() * 10);
        setCaptchaCode(code);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.comment) {
            setNote('Please fill all required fields.');
            return;
        }
        if (formData.captcha !== captchaCode) {
            setNote('Captcha mismatch. Try again.');
            generateCaptcha();
            handleChange('captcha', '');
            return;
        }

        const newReview = {
            name: formData.name,
            rating: formData.rating,
            comment: formData.comment,
            date: new Date().toLocaleString()
        };

        const updated = [newReview, ...reviews];
        setReviews(updated);
        try { localStorage.setItem('sunSolutionsReviews', JSON.stringify(updated.slice().reverse())); } catch { }

        setNote('Thank you! Your review has been added.');
        setFormData({ name: '', phone: '', rating: 5, comment: '', captcha: '' });
        generateCaptcha();
    };

    const resetForm = () => {
        setFormData({ name: '', phone: '', rating: 5, comment: '', captcha: '' });
        generateCaptcha();
        setNote('');
    };

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-inner">
                    <h1>{t('rev-hero-title')}</h1>
                    <p>{t('rev-hero-desc')}</p>
                </div>
            </section>

            <section className="section">
                <div className="section-inner">
                    <div className="grid-2">
                        <div className="card">
                            <h2 className="section-title">{t('rev-form-title')}</h2>
                            <form onSubmit={handleSubmit} className="flex-col">
                                <div className="form-group">
                                    <label>{t('label-name')} <span className="required">*</span></label>
                                    <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Your Name" required />
                                </div>
                                <div className="form-group">
                                    <label>{t('label-phone')} <span className="required">*</span></label>
                                    <input type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="Phone Number" required />
                                </div>
                                <div className="form-group">
                                    <label>{t('label-rating')}</label>
                                    <div className="rating-stars">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button key={star} type="button" onClick={() => handleChange('rating', star)}>
                                                <span style={{ fontSize: '1.4rem' }}>{formData.rating >= star ? '★' : '☆'}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>{t('label-comment')} <span className="required">*</span></label>
                                    <textarea value={formData.comment} onChange={(e) => handleChange('comment', e.target.value)} rows="4" placeholder="Share your experience..." required></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Captcha: <span className="captcha-box">{captchaCode}</span></label>
                                    <input type="text" value={formData.captcha} onChange={(e) => handleChange('captcha', e.target.value)} placeholder="Enter digits" />
                                </div>

                                {note && <p className="form-note">{note}</p>}

                                <div className="review-actions">
                                    <button type="submit" className="btn-primary">📤 {t('btn-submit')}</button>
                                    <button type="button" className="btn-ghost" onClick={resetForm}>🔄 {t('btn-reset')}</button>
                                </div>
                            </form>
                        </div>

                        <div className="flex-col">
                            <h2 className="section-title">{t('recent-reviews')}</h2>
                            <div className="flex-col" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                {reviews.length > 0 ? reviews.map((rev, idx) => (
                                    <div className="card" key={idx}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <strong>{rev.name}</strong>
                                            <span style={{ color: '#ffc857' }}>{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rev.date}</p>
                                        <p>{rev.comment}</p>
                                    </div>
                                )) : (
                                    <p style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Reviews;
