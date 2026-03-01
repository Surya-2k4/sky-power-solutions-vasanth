import React from 'react';
import { useTranslation } from 'react-i18next';

function Products() {
    const { t } = useTranslation();

    const categories = [
        {
            title: 'sec-solar-title',
            desc: 'sec-solar-desc',
            chips: ['Solar Street', 'Smart Sensor', 'Garden'],
            items: [
                {
                    titleKey: 'street-light',
                    label: 'Street Light',
                    img: '/assets/Images/streetlight.jpeg',
                    features: ['5 – 50W LED options', 'In-built LiFePO4 battery', '10–12 hours backup']
                },
                {
                    titleKey: 'sensor-light',
                    label: 'Smart Light',
                    img: 'https://placehold.co/600x400/1a1a2e/ffcc7b?text=PIR+Sensor+Light',
                    features: ['PIR motion detection', 'Auto ON / OFF', 'IP65 weatherproof']
                },
                {
                    titleKey: 'solar-batt',
                    label: 'Battery',
                    img: 'https://placehold.co/600x400/1a1a2e/13d0b4?text=Solar+Tubular+Battery',
                    features: ['28Ah - 200Ah capacity', '1500+ charge cycles', '3–5 years warranty']
                }
            ]
        },
        {
            title: 'sec-cctv-title',
            desc: 'sec-cctv-desc',
            chips: ['IP Camera', 'Recording', 'Remote View'],
            items: [
                {
                    titleKey: 'ip-cam',
                    label: 'IP Camera',
                    img: 'https://placehold.co/600x400/0b1020/ffcc7b?text=IP+Dome+Camera',
                    features: ['2MP / 4MP / 5MP resolution', 'IR night vision', 'Live view on mobile']
                }
            ]
        },
        {
            title: 'sec-ups-title',
            desc: 'sec-ups-desc',
            chips: ['UPS', 'Lithium', 'Lead Acid'],
            items: [
                {
                    titleKey: 'home-ups',
                    label: 'UPS Inverter',
                    img: 'https://placehold.co/600x400/0b1020/ffe3b4?text=Home+UPS+Inverter',
                    features: ['500VA – 5KVA range', 'Pure sine wave output', 'Overload protection']
                },
                {
                    titleKey: 'batt-lithium',
                    label: 'Li Battery',
                    img: 'https://placehold.co/600x400/1a1a2e/13d0b4?text=Lithium+Battery',
                    features: ['Long cycle life', 'Lightweight', 'Fast charging']
                }
            ]
        }
    ];

    return (
        <>
            <section className="page-hero">
                <div className="page-hero-inner">
                    <h1>{t('prod-hero-title')}</h1>
                    <p>{t('prod-hero-desc')}</p>
                </div>
            </section>

            {categories.map((cat, idx) => (
                <section className="section" key={idx}>
                    <div className="section-inner">
                        <div className="section-header-row">
                            <div>
                                <h2 className="section-title">{t(cat.title)}</h2>
                                <p className="section-desc">{t(cat.desc)}</p>
                            </div>
                            <div>
                                {cat.chips.map((chip, cIdx) => (
                                    <span className="chip" key={cIdx}>{chip}</span>
                                ))}
                            </div>
                        </div>

                        <div className="cards-grid">
                            {cat.items.map((item, iIdx) => (
                                <article className="card" key={iIdx}>
                                    <div className="product-media">
                                        <img src={item.img} alt={t(item.titleKey)} loading="lazy" />
                                        <div className="product-pill">{item.label}</div>
                                    </div>
                                    <h3>{t(item.titleKey)}</h3>
                                    <ul className="card-list">
                                        {item.features.map((feat, fIdx) => (
                                            <li key={fIdx}>✓ {feat}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}

export default Products;
