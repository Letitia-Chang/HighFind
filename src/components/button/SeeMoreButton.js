import { Link } from 'react-router-dom';
import arrowRightIconYellow from "../../assets/img/icon-arrow-right-yellow.svg"

const SeeMoreButton = ({ to, name }) => {
    return (
        <Link to={to} className="see-more-btn d-flex flex-row align-items-center">
            <p className="mb-0">{name}</p>
            <img src={arrowRightIconYellow} alt="arrow right icon" />
        </Link>
    );
}

export default SeeMoreButton;