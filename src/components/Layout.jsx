import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import RecommendationChatbot from './RecommendationChatbot';

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="page-main">{children}</main>
            <Footer />
            <RecommendationChatbot />
        </>
    );
}

export default Layout;
