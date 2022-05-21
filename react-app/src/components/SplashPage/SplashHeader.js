import Logo from '../Icons/MiraLogo';

export default function SplashHeader() {
    return (
        <div className="splash-top-nav flex-row">
            <div className="splash-top-left">
                <Logo />
            </div>
            {/* <div className="splash-top-right">
                Action buttons go here
            </div> */}
        </div>
    )
}
