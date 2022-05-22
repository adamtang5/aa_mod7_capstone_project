import logo from '../../../static/images/logo/mira-logo.png';
import './MiraLogo.css';

const Logo = () => {
    return (
        <div className="logo-card flex-row">
            <img id="mira-logo" src={logo} alt="home" />
            <div className="logo-text">Mira</div>
        </div>
    )
};

export default Logo;
