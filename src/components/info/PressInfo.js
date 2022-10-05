import exportIconGreen from "../../assets/img/icon-export-green.svg"

const Press = ({ data, isPending }) => {
    return (
        <div>
            {/* Data Fetched */}
            {!isPending &&
                <div className='press-info'>
                    <div className="title" >媒體報導</div>
                    {data.length > 0 && data.map((item, index) => (
                        <div key={index} className="d-flex flex-row align-items-center" >
                            <span>{item.title}</span>
                            <img onClick={() => window.open(item.link)} src={exportIconGreen} alt="export icon" />
                        </div>
                    ))}
                </div>
            }

            {/* No Data */}
            {isPending && <div className='press-info'>
                <div className="title" >媒體報導</div>
                <div>
                    <div className="fake-half-content"></div>
                    <div className="fake-half-content"></div>
                </div>
            </div>}
        </div>
    );
}

export default Press;