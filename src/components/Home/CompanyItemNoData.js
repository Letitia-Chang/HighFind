import { setFakeData } from "../../utils/index";
import "../../assets/scss/components/home/companyItemNoData.scss";

const CompanyItemNoData = () => {
    return (
        < div className="company-items-no-data d-flex flex-row">
            {
                setFakeData(3).map((company, index) => (
                    <div key={index} className="company-item d-flex flex-column">
                        <div className="d-flex flex-column align-items-center w-100">
                            <div style={{ backgroundColor: '#D9D9D9', borderRadius: '5px', height: '136px', width: '100%' }}></div>
                            <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#909090', marginTop: '-62px', boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.2)' }}></div>

                            <div className="d-flex flex-column w-100">
                                <div className="no-data-line" style={{ width: '240px', marginTop: '4px', marginBottom: '8px' }}></div>
                                <div className="no-data-line" style={{ width: '100%', marginBottom: '4px' }}></div>
                                <div className="no-data-line" style={{ width: '100%', marginBottom: '4px' }}></div>
                                <div className="no-data-line" style={{ width: '100%', marginBottom: '8px' }}></div>
                            </div>

                            <div className="d-flex flex-column align-items-start w-100">
                                <div className="no-data-line" style={{ width: '100px', marginBottom: '8px' }}></div>
                                <div className="no-data-line" style={{ width: '140px', marginBottom: '8px' }}></div>
                                <div className="no-data-line" style={{ width: '160px', marginBottom: '8px' }}></div>
                            </div>
                        </div>

                        <div className="no-data-circle d-flex" style={{ backgroundColor: company.isLiked ? '#F27072' : '#CCCCCC' }}></div>
                    </div>
                ))
            }
        </div>
    );
}

export default CompanyItemNoData;