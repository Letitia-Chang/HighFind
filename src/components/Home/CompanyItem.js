import { Link } from 'react-router-dom';

import "../../assets/scss/components/home/companyItem.scss"
import landmarkIcon from "../../assets/img/icon-landmark.svg"
import blocksIcon from "../../assets/img/icon-blocks.svg"
import labelIcon from "../../assets/img/icon-label.svg"

import SaveButtonSm from "../../components/button/SaveButtonSm";


const CompanyItem = ({ item, index, handleSavedStatus }) => {
    return (
        <div key={index} className="company-item d-flex flex-column">
            <div className="d-flex flex-column align-items-center w-100">
                <Link to={`/company/${item.id}`} className="company-image" style={{ backgroundImage: `url(${item.image})` }}></Link>
                <Link to={`/company/${item.id}`} className="company-logo" style={{ backgroundImage: `url(${item.logo})` }}></Link>
                <Link to={`/company/${item.id}`} className="company-name">{item.name}</Link>
                <p className="company-description">{item.description}</p>

                <div className="d-flex flex-column align-items-start w-100">
                    <div className="company-location d-flex flex-row">
                        <img src={landmarkIcon} alt="location icon" />
                        {item.location.city}{item.location.adress}
                    </div>
                    <div className="company-industry d-flex flex-row">
                        <img src={blocksIcon} alt="industry icon" />
                        {item.industry}
                    </div>
                    {item.labels.length > 0 &&
                        <div className="company-labels d-flex flex-row">
                            <img src={labelIcon} alt="job label icon" />
                            {item.labels.map((label, index) => (
                                <span key={index}>{label}</span>
                            ))}
                        </div>
                    }
                </div>
            </div>

            <SaveButtonSm item={item} handleSavedStatus={handleSavedStatus} />
        </div>
    );
}

export default CompanyItem;