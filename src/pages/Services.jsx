import React from 'react';
import { useTranslation } from 'react-i18next';

const servicesList = [
    { key: 'serv-solar-panels', icon: '☀️' },
    { key: 'serv-water-heaters', icon: '💧' },
    { key: 'serv-street-light', icon: '🔦' },
    { key: 'serv-water-pump', icon: '💦' },
    { key: 'serv-home-ups', icon: '🔋' },
    { key: 'serv-vehicle-batt', icon: '🚗' },
    { key: 'serv-cctv', icon: '📹' },
    { key: 'serv-biometric', icon: '🔐' },
    { key: 'serv-access', icon: '🔑' },
    { key: 'serv-video-door', icon: '🚪' },
    { key: 'serv-fire', icon: '🔥' },
    { key: 'serv-gps', icon: '📍' },
];

function Services() {
    const { t } = useTranslation();

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-inner">
                    <h1>{t('serv-hero-title')}</h1>
                    <p>{t('serv-hero-desc')}</p>
                </div>
            </section>

            <section className="section">
                <div className="section-inner">
                    <p className="section-desc">{t('serv-intro')}</p>
                    <h2 className="section-title">{t('serv-do')}</h2>

                    <div className="cards-grid">
                        {servicesList.map((serv, idx) => (
                            <article className="card" key={idx}>
                                <div className="card-icon">{serv.icon}</div>
                                <h3>{t(serv.key)}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Services;
