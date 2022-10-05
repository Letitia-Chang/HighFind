import { Link } from 'react-router-dom';
import "../../assets/scss/components.scss";
import graduateIcon from "../../assets/img/icon-graduate.svg";
import graduateIconGray from "../../assets/img/icon-graduate-gray.svg";

const FindJobs = ({isActive}) => {
    return (
        <div>
            {isActive && 
            <Link to="/jobs" className="find-job-btn active d-flex align-items-center justify-content-center">
                <img src={graduateIcon} alt="find jobs icon active" />
                <span>找實習</span>
            </Link>
            }
            {!isActive && 
            <Link to="/jobs" className="find-job-btn inactive d-flex align-items-center justify-content-center">
                <img src={graduateIconGray} alt="find jobs icon inactive" />
                <span>找實習</span>
            </Link>
            }
        </div>
    );
}

export default FindJobs;