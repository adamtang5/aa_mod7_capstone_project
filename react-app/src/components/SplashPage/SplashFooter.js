import React, { useState } from 'react';
import TechIconsPanel from "./TechIconsPanel";

const SplashFooter = () => {
    const [panelOpen, setPanelOpen] = useState(false);

    const togglePanel = e => {
        setPanelOpen(!panelOpen);
    }

    return (
        <div className="splash-footer bounded-1200 centered flex-row">
            <div className="top-layer flex-row">
                <div className="tech-icon">
                    <a href="https://github.com/adamtang5/aa_mod7_capstone_project" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/github/github-original.svg" alt="project on github" />
                    </a>
                </div>
                <div className="creator-card">
                    <a href="https://github.com/adamtang5/" target="_blank" rel="noreferrer">
                        <div className="tech-icon">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/github/github-original.svg" alt="project on github" />
                        </div>
                        <div className="creator-avatar">
                            <img src="https://avatars.githubusercontent.com/u/95706331?v=4" alt="Adam Tang" />
                        </div>
                    </a>
                </div>
                <div className="creator-card">
                    <a href="https://linkedin.com/in/adamtangx/" target="_blank" rel="noreferrer">
                        <div className="tech-icon">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/linkedin/linkedin-original.svg" alt="project on github" />
                        </div>
                        <div className="creator-avatar">
                            <img src="https://avatars.githubusercontent.com/u/95706331?v=4" alt="Adam Tang" />
                        </div>
                    </a>
                </div>
                <TechIconsPanel />
            </div>
        </div>
    )
};

export default SplashFooter;
