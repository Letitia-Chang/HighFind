import { Link } from 'react-router-dom';
import "../../assets/scss/components.scss";
import buildingIconGray from "../../assets/img/icon-building-gray.svg"
import buildingIcon from "../../assets/img/icon-building.svg"


const FindCompany = ({isActive}) => {
    return (
        <div>
            {isActive &&
                <Link to="/companies" className="find-company-btn active d-flex align-items-center justify-content-center">
                    <img src={buildingIcon} alt="find companies icon active" />
                    <span>找企業</span>
                </Link>
            }
            {!isActive &&
                <Link to="/companies" className="find-company-btn inactive d-flex align-items-center justify-content-center">
                    <img src={buildingIconGray} alt="find companies icon inactive" />
                    <span>找企業</span>
                </Link>
            }
        </div>
    );
}

export default FindCompany;