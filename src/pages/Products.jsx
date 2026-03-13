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
                    img: 'https://kenbrooksolar.com/wp-content/uploads/2024/11/30-watt-semi-integrated-2.1.jpg?q=80&w=800&auto=format&fit=crop',
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
                    img: 'https://images.unsplash.com/photo-1625217527288-93919c99650a?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-pir', 'feat-auto', 'feat-ip65']
                },
                {
                    titleKey: 'solar-batt',
                    label: 'Deep Cycle',
                    img: 'https://m.media-amazon.com/images/I/51ImsrT5dxL._AC_UF1000,1000_QL80_.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-tubular', 'feat-cycles', 'feat-durability']
                },
                {
                    titleKey: 'garden-light',
                    label: 'Garden',
                    img: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-auto', 'feat-ip65', 'feat-auto-charge']
                },
                {
                    titleKey: 'bifacial-panel',
                    label: 'Double Yield',
                    img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-mono', 'feat-eff', 'feat-high-res']
                },
                {
                    titleKey: 'flood-light',
                    label: 'High Power',
                    img: 'https://image.made-in-china.com/202f0j00usrYEkHhagoJ/Solar-Flood-Outdoor-Solar-Power-Light-10W-25W-40W-60W-100W-200W-Solar-Sensor-LED-Flood-Lamp.webp?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-ip65', 'feat-pir', 'feat-backup']
                },
                {
                    titleKey: 'water-heater-fpc',
                    label: 'Premium',
                    img: 'https://www.tradekeyindia.com/Pimages/Solar-Hot-Water-Systems.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-durability', 'feat-warranty', 'feat-shock-proof']
                },
                {
                    titleKey: 'solar-lantern',
                    label: 'Portable',
                    img: 'https://m.media-amazon.com/images/I/71PSCcMBTTL._AC_UF1000,1000_QL80_.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-lightweight', 'feat-auto-charge', 'feat-compact']
                },
                {
                    titleKey: 'solar-brick',
                    label: 'Pathways',
                    img: 'https://m.media-amazon.com/images/I/7192rQtPyEL.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-auto', 'feat-ip65', 'feat-auto-charge']
                },
                {
                    titleKey: 'solar-gate',
                    label: 'Entrance',
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQahBFIgQZAvmyC-kiiw2UPAa45oR3grNkRzQ&s?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-pir', 'feat-auto', 'feat-ip65']
                },
                {
                    titleKey: 'flex-panel',
                    label: 'Flexible',
                    img: 'https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-flexible', 'feat-lightweight', 'feat-eff']
                },
                {
                    titleKey: 'solar-fan',
                    label: 'Ventilation',
                    img: 'https://m.media-amazon.com/images/I/91hMECk-NlL._AC_UF1000,1000_QL80_.jpg?q=80&w=800&auto=format&fit=crop', // Reusing battery-like tech aesthetic
                    features: ['feat-portable', 'feat-auto-charge', 'feat-compact']
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
                    img: 'https://www.techfinder.in/cdn/shop/files/product-1533-2.jpg?v=1743478621&width=1500?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-res', 'feat-night', 'feat-live']
                },
                {
                    titleKey: 'bullet-cam',
                    label: 'Outdoor',
                    img: 'https://image.made-in-china.com/202f0j00ToDqOMVEhPbc/H-265-Outdoor-8MP-Ultra-HD-4K-Poe-Ai-Camera-Face-Detect-CCTV-Security-Camera-8MP-4K-Poe-IP-Outdoor-Waterproof-Cylinder-Bullet-Camera-with-Motorized-Zoom-Lens.webp?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-weather', 'feat-4k', 'feat-night-30m']
                },
                {
                    titleKey: 'nvr-system',
                    label: 'NVR',
                    img: 'https://eu.sannce.com/cdn/shop/products/N48WHE-V2_I51CL_71a547cf-adc0-42c7-8c3f-b5e3faf226f1.jpg?v=1701844525?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-8ch', 'feat-h265', 'feat-hdd']
                },
                {
                    titleKey: 'ptz-cam',
                    label: 'PTZ Zoom',
                    img: 'https://cpimg.tistatic.com/10854105/b/4/Iv-at-ptz-20x-ip5-poe-5-Megapixel-Ptz-Speed-Dome-Camera..jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-360-view', 'feat-high-res', 'feat-remote-control']
                },
                {
                    titleKey: 'wifi-cam',
                    label: 'Smart Wifi',
                    img: 'https://5.imimg.com/data5/ANDROID/Default/2023/2/CS/YJ/MJ/111360885/product-jpeg-1000x1000.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-live', 'feat-cloud', 'feat-compact']
                },
                {
                    titleKey: 'dvr-system',
                    label: 'DVR',
                    img: 'https://m.media-amazon.com/images/I/61ZdDr1b2EL.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-8ch', 'feat-hdd', 'feat-warranty']
                },
                {
                    titleKey: 'bio-reader',
                    label: 'Biometric',
                    img: 'https://5.imimg.com/data5/FY/AS/PU/SELLER-34583643/rfid-access-card-for-biometric-fingerprint-face-and-card-reader-machines-500x500.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-lcd', 'feat-fast-charge', 'feat-durability']
                },
                {
                    titleKey: 'door-phone',
                    label: 'Security',
                    img: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-res', 'feat-live', 'feat-night']
                },
                {
                    titleKey: 'sim-cam',
                    label: '4G/LTE',
                    img: 'https://www.thevaluestore.in/image/cache/catalog/2024/CP-Plus/Camera/cp-v32g-1-1000x1000.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-sim', 'feat-live', 'feat-cloud']
                },
                {
                    titleKey: 'solar-cam',
                    label: 'Solar Secure',
                    img: 'https://www.maizic.com/cdn/shop/files/1_86ab14e5-da38-4c43-ac1c-5cab78552dea_1200x1200.png?v=1737549660?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-auto-charge', 'feat-sim', 'feat-weather']
                },
                {
                    titleKey: 'panic-alarm',
                    label: 'Emergency',
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqoNVLbXAbf1LbEl9IH1gbYFZdL5eueo48VA&s?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-remote-control', 'feat-wireless', 'feat-warranty']
                },
                {
                    titleKey: 'door-sensor',
                    label: 'Alerts',
                    img: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-wifi-app', 'feat-compact', 'feat-live']
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
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4M3F6jCeQ6x12TyfaeA4GA-1p47bVDeL9w&s?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-sine', 'feat-overload', 'feat-warranty']
                },
                {
                    titleKey: 'batt-lithium',
                    label: 'Li-Ion',
                    img: 'https://5.imimg.com/data5/SELLER/Default/2023/12/371781884/DZ/NW/UB/205848928/exide-battery-lithium-batteries-500x500.png?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-longlife', 'feat-lightweight', 'feat-maint-free']
                },
                {
                    titleKey: 'solar-pcu',
                    label: 'Controller',
                    img: 'https://www.upsinverter.com/wp-content/uploads/2020/09/solar-pcu31-min.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-mppt', 'feat-lcd', 'feat-priority']
                },
                {
                    titleKey: 'online-ups',
                    label: 'Online UPS',
                    img: 'https://cpimg.tistatic.com/09512723/b/4/Industrial-Online-Ups-Systems.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-sine', 'feat-surge', 'feat-heavy-duty']
                },
                {
                    titleKey: 'tubular-150',
                    label: 'Tubular',
                    img: 'https://www.moxikart.com/assets/images/fairdealbattery/battery/155_exide-elmaster-150-150ah-tall-tubular-battery.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-cycles', 'feat-warranty', 'feat-longlife']
                },
                {
                    titleKey: 'inv-trolley',
                    label: 'Accessory',
                    img: 'https://m.media-amazon.com/images/I/61CZeQWPeUL._AC_UF894,1000_QL80_.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-durability', 'feat-compact', 'feat-shock-proof']
                },
                {
                    titleKey: 'stabilizer',
                    label: 'Protector',
                    img: 'https://m.media-amazon.com/images/I/61Uu+UFyk0L._AC_UF894,1000_QL80_.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-surge', 'feat-lcd', 'feat-warranty']
                },
                {
                    titleKey: 'lifepo4-pack',
                    label: 'LFP Pack',
                    img: 'https://m.media-amazon.com/images/I/61IFp-Qe5NL._AC_UF1000,1000_QL80_.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-lifepo4', 'feat-fast-charge', 'feat-longlife']
                },
                {
                    titleKey: 'router-ups',
                    label: 'Mini UPS',
                    img: 'https://m.media-amazon.com/images/I/61ApG4DwHOL._AC_UF1000,1000_QL80_.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-backup', 'feat-compact', 'feat-auto-charge']
                },
                {
                    titleKey: 'batt-water',
                    label: 'Maintenance',
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcHPzQFcIfo7kalTcDo_dj_8AGbtYa00Lz5g&s?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-maint-free', 'feat-heavy-duty', 'feat-pure']
                },
                {
                    titleKey: 'pure-converter',
                    label: 'Converter',
                    img: 'https://invertersrus.com/wp-content/uploads/2019/04/300-Watt-12V-Pure-Sine-Wave-Inverter-SP-PS300-Front.jpg?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-sine', 'feat-lcd', 'feat-surge']
                },
                {
                    titleKey: 'energy-meter',
                    label: 'Smart Meter',
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoniEiGd7_xWOSuoiX8DT86DB8dhb__rQ3Tw&s?q=80&w=800&auto=format&fit=crop',
                    features: ['feat-wifi-app', 'feat-lcd', 'feat-live']
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
