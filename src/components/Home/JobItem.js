
import "../../assets/scss/global.scss";
import "../../assets/scss/components/home/jobItem.scss";

import billIconGray from "../../assets/img/icon-bill-gray.svg"
import lightningIcon from "../../assets/img/icon-lightning.svg"
import labelIconGray from "../../assets/img/icon-label-gray.svg"
import blocksIconGray from "../../assets/img/icon-blocks-gray.svg"
import landmarkIconGray from "../../assets/img/icon-landmark-gray.svg"

import { Link } from 'react-router-dom';
import SaveButtonSm from "../../components/button/SaveButtonSm";

const JobItem = ({ index, item, handleSavedStatus }) => {

    return (
        <div key={index} className="job-item d-flex flex-column">
            <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                    <div className="company-logo" style={{ backgroundImage: `url(${item.logo})` }}></div>
                    <div className="d-flex flex-column">
                        <Link to={`/job/${item.id}`} className="job-title">{item.title}</Link>
                        <Link to={`/company/${item.companyId}`} className="company-name mb-0">{item.company}</Link>
                    </div>
                </div>
                {item.isActive && <div className="active-recruit d-flex"><img src={lightningIcon} alt="lightning icon" />積極招募</div>}
            </div>

            <div className="d-flex flex-column">
                <div className="job-location d-flex flex-row">
                    <img src={landmarkIconGray} alt="location icon" />
                    <p className="mb-0"> {item.location[0]}</p>
                </div>
                <div className="job-salary d-flex flex-row">
                    <img src={billIconGray} alt="salary icon" />
                    <p className="mb-0">{item.salary == null ? '薪資面議' : `NT$ ${item.salary[1].toLocaleString()} - ${item.salary[2].toLocaleString()} ( ${item.salary[0]})`}</p>
                </div>
                <div className="job-description d-flex flex-row">
                    <img src={blocksIconGray} alt="job content icon" />
                    <p className="mb-0"> {item.description}</p>
                </div>
                {item.labels.length > 0 && <div className="job-labels d-flex flex-row">
                    <img src={labelIconGray} alt="job label icon" />
                    <p className="mb-0">{item.labels.map((label, index) => (
                        <span key={index}>{label}</span>
                    ))}</p>
                </div>}
                <SaveButtonSm item={item} handleSavedStatus={handleSavedStatus} />
            </div>
        </div>
    );
}

export default JobItem;