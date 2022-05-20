import { useHistory } from 'react-router-dom';
import './BackCard.css';

const BackCard = () => {
    const history = useHistory();

    return (
        <div
            className="back-card cursor-pointer flex-row"
            onClick={() => history.goBack()}
        >
            <div className="icon">
                <i className="fa-solid fa-circle-left fa-sm" />
            </div>
            <div className="text">
                Back
            </div>
        </div>
    )
};

export default BackCard;
