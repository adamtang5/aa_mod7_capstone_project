import React from "react";
import SplashBanner from "./SplashBanner";
import SplashFooter from "./SplashFooter";
import SplashHeader from "./SplashHeader";
import './SplashPage.css';

const SplashPage = () => {
    return (
        <div className="page-container">
            <header className="bounded-1200 centered fixed">
                <SplashHeader />
            </header>
            <main>
                <SplashBanner />
            </main>
            <footer>
                <SplashFooter />
            </footer>
        </div>
    )
};

export default SplashPage;
