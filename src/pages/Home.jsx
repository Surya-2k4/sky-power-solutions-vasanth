import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Home() {
    const { t } = useTranslation();

    return (
        <>
            <div className="bg-video-container">
                <video autoPlay loop muted playsInline className="bg-video">
                    <source src="/assets/Videos/home.mp4" type="video/mp4" />
                </video>
                <div className="overlay"></div>
            </div>

            <section className="hero">
                <div className="tag-pill">
                    <span className="dot"></span>
                    <span>{t('hero-tag')}</span>
                </div>

                <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t('hero-title') }} />

                <p className="hero-subtitle">{t('hero-subtitle')}</p>

                <div className="hero-cta-group">
                    <Link to="/contact" className="btn-primary">{t('get-quote')}</Link>
                    <Link to="/products" className="btn-outline">{t('view-products')}</Link>
                </div>
            </section>

            <section className="section">
                <div className="section-inner">
                    <h2 className="section-title">{t('why-sun')}</h2>
                    <p className="section-desc">{t('why-desc')}</p>

                    <div className="cards-grid">
                        <article className="card">
                            <div className="card-icon">☀️</div>
                            <h3>{t('high-yield')}</h3>
                            <p>{t('high-yield-desc')}</p>
                        </article>

                        <article className="card">
                            <div className="card-icon">⚡</div>
                            <h3>{t('smart-inverters')}</h3>
                            <p>{t('smart-inverters-desc')}</p>
                        </article>

                        <article className="card">
                            <div className="card-icon">🌍</div>
                            <h3>{t('carbon-optimized')}</h3>
                            <p>{t('carbon-optimized-desc')}</p>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
