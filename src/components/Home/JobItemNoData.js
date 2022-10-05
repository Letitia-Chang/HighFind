import { setFakeData } from "../../utils/index";
import "../../assets/scss/components/home/jobItemNoData.scss";

const JobItemNoData = () => {
    return (
        setFakeData(3).map((item, index) => (
            <div key={index} className="job-item-no-data d-flex flex-column">
                <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <div className="title"></div>
                        <div className="d-flex flex-column">
                            <div className="no-data-line" style={{ width: '120px' }}></div>
                            <div className="no-data-line" style={{ width: '175px' }}></div>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column">
                    <div className="no-data-line" style={{ width: '240px' }}></div>
                    <div className="no-data-line" style={{ width: '200px' }}></div>
                    <div className="no-data-line" style={{ width: '160px' }}></div>
                    <div className="no-data-circle d-flex" style={{ position: 'absolute', right: "16px", bottom: '16px' }}></div>
                </div>
            </div>
        ))
    );
}

export default JobItemNoData;