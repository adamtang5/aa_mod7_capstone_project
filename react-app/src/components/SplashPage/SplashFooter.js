const SplashFooter = () => {
    return (
        <div className="splash-footer bounded-1200 centered flex-row">
            <div className="tech-icon">
                <a href="https://github.com/adamtang5/aa_mod7_capstone_project" target="_blank" rel="noreferrer">
                    <img src="https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/github/github-original.svg" alt="project on github" />
                </a>
            </div>
            <div className="creator-card">
                <a href="https://github.com/adamtang5/" target="_blank" rel="noreferrer">
                    <div className="creator-avatar">
                        <img src="https://avatars.githubusercontent.com/u/95706331?v=4" alt="Adam Tang" />
                    </div>
                </a>
            </div>
        </div>
    )
};

export default SplashFooter;
