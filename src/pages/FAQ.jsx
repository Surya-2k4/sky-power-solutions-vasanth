import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const faqData = [
    { q: 'q-save', a: 'a-save' },
    { q: 'q-maint', a: 'a-maint' },
    { q: 'q-cloudy', a: 'a-cloudy' },
    { q: 'q-ongrid', a: 'a-ongrid' },
    { q: 'q-install', a: 'a-install' },
    { q: 'q-warranty', a: 'a-warranty' },
];

function FAQ() {
    const { t } = useTranslation();
    const [openIdx, setOpenIdx] = useState(null);

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-inner">
                    <h1>{t('faq-hero-title')}</h1>
                    <p>{t('faq-hero-desc')}</p>
                </div>
            </section>

            <section className="section">
                <div className="section-inner" style={{ maxWidth: '800px' }}>
                    {faqData.map((faq, idx) => (
                        <div key={idx} className={`faq-item ${openIdx === idx ? 'open' : ''}`}>
                            <div className="faq-question" onClick={() => setOpenIdx(openIdx === idx ? null : idx)}>
                                <span>{t(faq.q)}</span>
                                <span style={{ transform: openIdx === idx ? 'rotate(180deg)' : 'none', transition: '0.3s', display: 'inline-block' }}>▼</span>
                            </div>
                            <div className="faq-answer">
                                <p>{t(faq.a)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default FAQ;
