import React from 'react';
import { useTranslation } from 'react-i18next';

function Products() {
    const { t } = useTranslation();

    const categories = [
        {
            title: 'sec-solar-title',
            desc: 'sec-solar-desc',
            chips: ['Solar Street', 'Smart Sensor', 'Garden', 'Industrial'],
            items: [
                {
                    titleKey: 'street-light',
                    label: 'Solar Street',
                    img: 'https://images.unsplash.com/photo-1509391366360-fe5bb6583e22?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-led', 'feat-lifepo4', 'feat-backup']
                },
                {
                    titleKey: 'mono-panel',
                    label: 'High Yield',
                    img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-mono', 'feat-eff', 'feat-warranty']
                },
                {
                    titleKey: 'sensor-light',
                    label: 'Smart Sensor',
                    img: 'https://images.unsplash.com/photo-1594818379496-da1e345b0ded?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-pir', 'feat-auto', 'feat-ip65']
                },
                {
                    titleKey: 'solar-batt',
                    label: 'Deep Cycle',
                    img: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-tubular', 'feat-cycles', 'feat-durability']
                }
            ]
        },
        {
            title: 'sec-cctv-title',
            desc: 'sec-cctv-desc',
            chips: ['IP Camera', 'Recording', 'Remote View', 'Wireless'],
            items: [
                {
                    titleKey: 'ip-cam',
                    label: 'IP Camera',
                    img: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-res', 'feat-night', 'feat-live']
                },
                {
                    titleKey: 'bullet-cam',
                    label: 'Outdoor',
                    img: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-weather', 'feat-4k', 'feat-night-30m']
                },
                {
                    titleKey: 'nvr-system',
                    label: 'NVR',
                    img: 'https://images.unsplash.com/photo-1558494949-ef010ca659d?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-8ch', 'feat-h265', 'feat-hdd']
                }
            ]
        },
        {
            title: 'sec-ups-title',
            desc: 'sec-ups-desc',
            chips: ['UPS', 'Lithium', 'Lead Acid', 'Inverters'],
            items: [
                {
                    titleKey: 'home-ups',
                    label: 'Pure Sine',
                    img: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-sine', 'feat-overload', 'feat-warranty']
                },
                {
                    titleKey: 'batt-lithium',
                    label: 'Li-Ion',
                    img: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-longlife', 'feat-lightweight', 'feat-maint-free']
                },
                {
                    titleKey: 'solar-pcu',
                    label: 'Controller',
                    img: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-mppt', 'feat-lcd', 'feat-priority']
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
                                            <li key={fIdx}>✓ {t(feat)}</li>
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
