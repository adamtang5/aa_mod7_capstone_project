import ToggleAuthForm from "../auth/ToggleAuthForm";

const SplashBanner = () => {
    return (
        <div className="splash-banner-container flex-row">
            <div className="splash-banner bounded-1200 centered flex-row">
                <div className="splash-banner-text">
                    <h1 className="headliner">ITSM unlocked for every project.</h1>
                    <div className="splash-banner-features">
                        <h3 className="all-caps">Get it free today:</h3>
                        <ul className="splash-banner-features-list">
                            <li>
                                <p>Access to ITSM features</p>
                            </li>
                            <li>
                                <p>Unlimited agents</p>
                            </li>
                            <li>
                                <p>Unlimited customers</p>
                            </li>
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
