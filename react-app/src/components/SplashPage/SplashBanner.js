import ToggleAuthForm from "../auth/ToggleAuthForm";

const SplashBanner = () => {
    return (
        <div className="splash-banner-container">
            <div className="splash-banner centered flex-column">
                <div className="splash-banner-text">
                    <h1 className="headliner">ITSM unlocked for every project.</h1>
                    <div className="splash-banner-features">
                        <h3 className="all-caps">Get it free today:</h3>
                        <ul className="splash-banner-features-list">
                            <li>Access to ITSM features</li>
                            <li>Unlimited agents</li>
                            <li>Unlimited customers</li>
                        </ul>
                    </div>
                </div>
                <div className="splash-banner-auth-window">
                    <ToggleAuthForm />
                </div>
            </div>
        </div>
    )
}

export default SplashBanner;
