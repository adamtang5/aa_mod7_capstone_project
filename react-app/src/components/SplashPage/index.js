import React from "react";
import SplashBanner from "./SplashBanner";
import SplashFooter from "./SplashFooter";
import SplashHeader from "./SplashHeader";
import TechIconsPanel from "./TechIconsPanel";
import './SplashPage.css';

const SplashPage = () => {
    return (
        <div className="splash-page-container">
            <header className="bounded-1200 centered fixed">
                <SplashHeader />
            </header>
            <main>
                <SplashBanner />
                <TechIconsPanel />
            </main>
            <footer id="splash-footer">
                <SplashFooter />
            </footer>
        </div>
    )
};

export default SplashPage;
