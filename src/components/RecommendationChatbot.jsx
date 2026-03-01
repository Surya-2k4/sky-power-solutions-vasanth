import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

/* ─────────────────────────── Question flow ─────────────────────────── */
const QUESTIONS = [
    {
        id: 'purpose',
        text: '👋 Hi! I\'m SkyBot, your solar advisor. What is the primary purpose of your solar installation?',
        options: [
            { label: '🏠 Home electricity backup', value: 'home_backup' },
            { label: '🏭 Commercial/Industrial use', value: 'commercial' },
            { label: '🛣️ Street / outdoor lighting', value: 'street_light' },
            { label: '📷 Security & surveillance', value: 'security' },
        ],
    },
    {
        id: 'area',
        text: '📐 Approximately, how large is the area you want to power or cover?',
        options: [
            { label: '🏡 Small (< 500 sq ft / single room)', value: 'small' },
            { label: '🏘️ Medium (500–2000 sq ft / apartment)', value: 'medium' },
            { label: '🏢 Large (2000+ sq ft / office/factory)', value: 'large' },
            { label: '🛤️ Open area / road (outdoor lighting)', value: 'outdoor' },
        ],
    },
    {
        id: 'power_cut',
        text: '⚡ How frequently do power cuts occur in your area?',
        options: [
            { label: '✅ Rarely (< 1 hr / day)', value: 'rarely' },
            { label: '⚠️ Sometimes (1–4 hrs / day)', value: 'sometimes' },
            { label: '🔴 Often (4–8 hrs / day)', value: 'often' },
            { label: '❌ Very frequent (8+ hrs / day)', value: 'very_often' },
        ],
    },
    {
        id: 'budget',
        text: '💰 What is your approximate budget for this installation?',
        options: [
            { label: '🪙 Economy (₹10k – ₹30k)', value: 'economy' },
            { label: '💵 Mid-range (₹30k – ₹80k)', value: 'midrange' },
            { label: '💎 Premium (₹80k+)', value: 'premium' },
            { label: '🤷 Not decided yet', value: 'undecided' },
        ],
    },
    {
        id: 'night_use',
        text: '🌙 Do you need the system to work during the night or power outages?',
        options: [
            { label: '✅ Yes, definitely', value: 'yes' },
            { label: '🌤️ Day-time only is fine', value: 'no' },
            { label: '🔁 Need backup for critical devices only', value: 'partial' },
        ],
    },
    {
        id: 'cctv',
        text: '📹 Are you also looking for a security / CCTV system along with solar?',
        options: [
            { label: '✅ Yes, I need CCTV too', value: 'yes' },
            { label: '❌ No, solar only', value: 'no' },
            { label: '🤔 Maybe later', value: 'maybe' },
        ],
    },
];

/* ─────────────────────────── Recommendation engine ─────────────────── */
const PRODUCTS = {
    street_light: {
        title: '🛣️ Solar Street Light',
        img: '/assets/Images/streetlight.jpeg',
        desc: 'Our all-in-one 5–50W LED Solar Street Lights with built-in LiFePO₄ battery and 10–12 hour backup. Ideal for roads, parking lots, and community areas.',
        features: ['5–50W LED options', 'In-built LiFePO₄ battery', '10–12 hours night backup', 'IP65 weatherproof'],
        badge: 'Top Pick',
    },
    home_ups: {
        title: '🔋 Home UPS Inverter',
        img: 'https://placehold.co/600x400/0b1020/ffe3b4?text=Home+UPS+Inverter',
        desc: 'Pure sine-wave UPS Inverter (500VA – 5KVA) with overload protection. Perfect for homes and offices that face frequent power cuts.',
        features: ['500VA – 5KVA range', 'Pure sine wave output', 'Overload & short-circuit protection', 'Compatible with solar panels'],
        badge: 'Best Seller',
    },
    lithium_battery: {
        title: '⚡ Lithium Battery Pack',
        img: 'https://placehold.co/600x400/1a1a2e/13d0b4?text=Lithium+Battery',
        desc: 'Lightweight, long-lasting Lithium batteries for solar storage. Ideal when you need maximum backup with minimum maintenance.',
        features: ['Long cycle life (3000+)', 'Lightweight & compact', 'Fast charging capability', '5-year warranty'],
        badge: 'Premium',
    },
    tubular_battery: {
        title: '🔌 Solar Tubular Battery',
        img: 'https://placehold.co/600x400/1a1a2e/13d0b4?text=Solar+Tubular+Battery',
        desc: 'Heavy-duty tubular batteries (28Ah – 200Ah) designed for deep solar charge/discharge cycles. Proven reliability for home and commercial setups.',
        features: ['28Ah – 200Ah capacity', '1500+ charge cycles', '3–5 year warranty', 'Low maintenance'],
        badge: 'Value Pick',
    },
    sensor_light: {
        title: '💡 PIR Smart Sensor Light',
        img: 'https://placehold.co/600x400/1a1a2e/ffcc7b?text=PIR+Sensor+Light',
        desc: 'Auto on/off PIR motion sensor solar lights for gardens, pathways, and perimeter security. IP65 rated for all weather conditions.',
        features: ['PIR motion detection', 'Auto ON / OFF', 'IP65 weatherproof', 'Zero electricity bill'],
        badge: 'Smart Choice',
    },
    ip_camera: {
        title: '📷 IP Dome Camera',
        img: 'https://placehold.co/600x400/0b1020/ffcc7b?text=IP+Dome+Camera',
        desc: 'High-definition 2MP/4MP/5MP IP cameras with IR night vision and live mobile monitoring. Pair with solar backup for uninterrupted surveillance.',
        features: ['2MP / 4MP / 5MP resolution', 'IR night vision 30m', 'Remote mobile view', 'PoE compatible'],
        badge: 'Security Pick',
    },
};

function getRecommendations(answers) {
    const recs = [];
    const { purpose, area, power_cut, budget, night_use, cctv } = answers;

    // Street lighting path
    if (purpose === 'street_light' || area === 'outdoor') {
        recs.push(PRODUCTS.street_light);
        recs.push(PRODUCTS.sensor_light);
    } else {
        // Home / commercial path
        if (power_cut === 'very_often' || power_cut === 'often') {
            if (budget === 'premium' || budget === 'midrange') {
                recs.push(PRODUCTS.home_ups);
                recs.push(PRODUCTS.lithium_battery);
            } else {
                recs.push(PRODUCTS.home_ups);
                recs.push(PRODUCTS.tubular_battery);
            }
        } else if (power_cut === 'sometimes') {
            recs.push(PRODUCTS.home_ups);
            recs.push(PRODUCTS.tubular_battery);
        } else {
            recs.push(night_use === 'yes' ? PRODUCTS.lithium_battery : PRODUCTS.tubular_battery);
        }

        if (area === 'outdoor' || purpose === 'street_light') {
            recs.push(PRODUCTS.street_light);
        }
    }

    // Add smart sensor lights for security context
    if (purpose === 'security' || cctv === 'yes') {
        recs.push(PRODUCTS.ip_camera);
    }

    if (cctv === 'yes') {
        if (!recs.find(r => r.title.includes('Camera'))) recs.push(PRODUCTS.ip_camera);
    }

    // De-duplicate
    const seen = new Set();
    return recs.filter(r => {
        if (seen.has(r.title)) return false;
        seen.add(r.title);
        return true;
    }).slice(0, 3);
}

/* ─────────────────────────── Component ─────────────────────────────── */
export default function RecommendationChatbot() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);          // which question index
    const [answers, setAnswers] = useState({});
    const [messages, setMessages] = useState([]);  // chat log
    const [done, setDone] = useState(false);
    const [recs, setRecs] = useState([]);
    const [pulse, setPulse] = useState(true);
    const bottomRef = useRef(null);
    const [hasGreeted, setHasGreeted] = useState(false);

    // Stop pulsing after 5 s
    useEffect(() => {
        const t = setTimeout(() => setPulse(false), 5000);
        return () => clearTimeout(t);
    }, []);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (open && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open]);

    // Add first greeting when opened
    useEffect(() => {
        if (open && !hasGreeted) {
            setHasGreeted(true);
            const greeting = {
                from: 'bot',
                text: `Hello, ${user?.displayName?.split(' ')[0] || 'there'}! 👋 I\'m SkyBot, your personal solar advisor.\n\nAnswer a few quick questions and I\'ll recommend the perfect SkyPower products for your needs! Let\'s start ☀️`,
                time: now(),
            };
            setMessages([greeting]);
            // show first question after a short delay
            setTimeout(() => {
                setMessages(prev => [...prev, botQuestion(QUESTIONS[0])]);
            }, 800);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    if (!user) return null; // Only show for logged-in users

    function now() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function botQuestion(q) {
        return { from: 'bot', isQuestion: true, question: q, time: now() };
    }

    function handleAnswer(question, option) {
        const newAnswers = { ...answers, [question.id]: option.value };
        setAnswers(newAnswers);

        // Add user bubble
        const userMsg = { from: 'user', text: option.label, time: now() };
        setMessages(prev => [...prev, userMsg]);

        const nextStep = step + 1;

        if (nextStep < QUESTIONS.length) {
            setStep(nextStep);
            setTimeout(() => {
                setMessages(prev => [...prev, botQuestion(QUESTIONS[nextStep])]);
            }, 600);
        } else {
            // Done — compute recommendations
            setTimeout(() => {
                const results = getRecommendations(newAnswers);
                setRecs(results);
                setDone(true);
                const doneMsg = {
                    from: 'bot',
                    text: `🎉 Analysis complete! Based on your answers, here are my top ${results.length} product recommendations tailored for you:`,
                    time: now(),
                };
                setMessages(prev => [...prev, doneMsg]);
            }, 700);
        }
    }

    function handleReset() {
        setStep(0);
        setAnswers({});
        setMessages([]);
        setDone(false);
        setRecs([]);
        setHasGreeted(false);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            {/* Floating button */}
            <button
                id="skybot-toggle"
                className={`skybot-fab ${open ? 'skybot-fab--open' : ''} ${pulse && !open ? 'skybot-fab--pulse' : ''}`}
                onClick={() => setOpen(o => !o)}
                aria-label="Open SkyBot recommendation chatbot"
            >
                {open ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="22" height="22"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <circle cx="9" cy="10" r="1" fill="currentColor" />
                        <circle cx="12" cy="10" r="1" fill="currentColor" />
                        <circle cx="15" cy="10" r="1" fill="currentColor" />
                    </svg>
                )}
                {!open && <span className="skybot-fab__label">Get Recommendations</span>}
            </button>

            {/* Chat window */}
            {open && (
                <div className="skybot-window" id="skybot-window">
                    {/* Header */}
                    <div className="skybot-header">
                        <div className="skybot-header__left">
                            <div className="skybot-avatar">☀️</div>
                            <div>
                                <div className="skybot-header__name">SkyBot Advisor</div>
                                <div className="skybot-header__status">
                                    <span className="skybot-status-dot" />
                                    {done ? 'Recommendation ready!' : 'Analyzing your needs…'}
                                </div>
                            </div>
                        </div>
                        <button className="skybot-close-btn" onClick={handleClose} aria-label="Close chatbot">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </button>
                    </div>

                    {/* Progress bar */}
                    {!done && (
                        <div className="skybot-progress-bar">
                            <div
                                className="skybot-progress-bar__fill"
                                style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                            />
                        </div>
                    )}

                    {/* Messages */}
                    <div className="skybot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx}>
                                {msg.from === 'bot' && !msg.isQuestion && (
                                    <div className="skybot-msg skybot-msg--bot">
                                        <div className="skybot-msg__avatar">☀️</div>
                                        <div className="skybot-msg__bubble">
                                            {msg.text.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</React.Fragment>
                                            ))}
                                            <span className="skybot-msg__time">{msg.time}</span>
                                        </div>
                                    </div>
                                )}

                                {msg.from === 'bot' && msg.isQuestion && (
                                    <div className="skybot-question-block">
                                        <div className="skybot-msg skybot-msg--bot">
                                            <div className="skybot-msg__avatar">☀️</div>
                                            <div className="skybot-msg__bubble">
                                                {msg.question.text}
                                                <span className="skybot-msg__time">{msg.time}</span>
                                            </div>
                                        </div>
                                        {/* Show options only for the latest question (no answer yet) */}
                                        {!answers[msg.question.id] && idx === messages.length - 1 && (
                                            <div className="skybot-options">
                                                {msg.question.options.map((opt, oi) => (
                                                    <button
                                                        key={oi}
                                                        className="skybot-option-btn"
                                                        onClick={() => handleAnswer(msg.question, opt)}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {msg.from === 'user' && (
                                    <div className="skybot-msg skybot-msg--user">
                                        <div className="skybot-msg__bubble">
                                            {msg.text}
                                            <span className="skybot-msg__time">{msg.time}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Recommendations */}
                        {done && recs.length > 0 && (
                            <div className="skybot-recs">
                                {recs.map((rec, ri) => (
                                    <div key={ri} className="skybot-rec-card">
                                        <img src={rec.img} alt={rec.title} className="skybot-rec-card__img" />
                                        <div className="skybot-rec-card__body">
                                            <div className="skybot-rec-card__badge">{rec.badge}</div>
                                            <h4 className="skybot-rec-card__title">{rec.title}</h4>
                                            <p className="skybot-rec-card__desc">{rec.desc}</p>
                                            <ul className="skybot-rec-card__features">
                                                {rec.features.map((f, fi) => (
                                                    <li key={fi}>✓ {f}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Action buttons when done */}
                        {done && (
                            <div className="skybot-done-actions">
                                <a href="/products" className="skybot-cta-btn skybot-cta-btn--primary">
                                    🛍️ View All Products
                                </a>
                                <a href="/contact" className="skybot-cta-btn skybot-cta-btn--outline">
                                    📞 Get a Quote
                                </a>
                                <button className="skybot-restart-btn" onClick={handleReset}>
                                    🔄 Start Over
                                </button>
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>
                </div>
            )}
        </>
    );
}
