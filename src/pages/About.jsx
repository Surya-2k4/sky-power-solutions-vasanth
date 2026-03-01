import React from 'react';
import { useTranslation } from 'react-i18next';

function About() {
    const { t } = useTranslation();

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-inner">
                    <h1>{t('who-we-are')}</h1>
                    <p>{t('about-desc')}</p>
                </div>
            </section>

            <section className="section">
                <div className="section-inner">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">{t('who-we-are')}</h2>
                            <p className="section-desc">{t('who-body')}</p>
                            <ul className="card-list">
                                <li>✅ {t('who-point-1')}</li>
                                <li>✅ {t('who-point-2')}</li>
                                <li>✅ {t('who-point-3')}</li>
                            </ul>
                        </div>
                        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <img src="/assets/Images/hero.jpeg" alt="Solar Installation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <div className="section-inner">
                    <div className="grid-2">
                        <div>
                            <h2 className="section-title">{t('mission-title')}</h2>
                            <p className="section-desc">{t('mission-desc')}</p>
                        </div>
                        <div>
                            <h2 className="section-title">{t('vision-title')}</h2>
                            <p className="section-desc">{t('vision-desc')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;
