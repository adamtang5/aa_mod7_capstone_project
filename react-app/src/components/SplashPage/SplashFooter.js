const SplashFooter = () => {
    return (
        <div className="splash-footer bounded-1200 centered flex-row">
            <div className="footer-left flex-row">
                <p>Project repo</p>
                <div className="tech-icon flex-row">
                    <a href="https://github.com/adamtang5/aa_mod7_capstone_project" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/github/github-original.svg" alt="project on github" />
                    </a>
                </div>
            </div>
            <div className="footer-middle">
                <p>Copyright © 2022 Adam Tang</p>
            </div>
            <div className="footer-right flex-row">
                <div className="creator-card">
                    <a href="https://github.com/adamtang5/" target="_blank" rel="noreferrer">
                        <div className="tech-icon">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/github/github-original.svg" alt="project on github" />
                        </div>
                    </a>
                </div>
                <div className="creator-card">
                    <a href="https://linkedin.com/in/adamtangx/" target="_blank" rel="noreferrer">
                        <div className="tech-icon">
                            <img className="no-filter" src="https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/linkedin/linkedin-original.svg" alt="project on github" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
};

export default SplashFooter;
