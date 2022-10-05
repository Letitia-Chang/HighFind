import closeIconWhite from "../../assets/img/icon-close-white.svg";
import resetIcon from "../../assets/img/icon-reset.svg";
import resetIconBlue from "../../assets/img/icon-reset-blue.svg";
import "../../assets/scss/components.scss";

const SearchLabel = ({ labelsArray, resetBtn1, resetBtn2, handleRemoveLabels, handleResetLabels }) => {
    return (
        <div className="filter-labels d-flex flex-row flex-wrap align-items-center">
            {/* Labels */}
            {labelsArray.length > 0 && labelsArray.map((label, index) => (
                <div key={index} className="labels d-flex">
                    <span>{label.name}</span>
                    <img onClick={() => handleRemoveLabels(label.type, label.name)} src={closeIconWhite} alt="close icon" />
                </div>
            ))}

            {/* Reset Btn */}
            <img ref={resetBtn1}
                onMouseEnter={() => { resetBtn1.current.style.display = 'none'; resetBtn2.current.style.display = 'flex'; }}
                src={resetIcon} alt="reset icon"
                className="reset-btn"
                style={{ visibility: labelsArray.length > 0 ? 'visible' : 'hidden' }} />

            <div ref={resetBtn2}
                onClick={() => {
                    handleResetLabels();
                    resetBtn2.current.style.display = "none";
                    resetBtn1.current.style.display = "none"
                }}
                onMouseLeave={() => {
                    resetBtn2.current.style.display = "none";
                    resetBtn1.current.style.display = 'flex'
                }}
                className='reset-btn-on-hover flex-row'
            >
                <span>全部清除</span>
                <img src={resetIconBlue} alt="blue reset icon" />
            </div>
        </div>
    );
}

export default SearchLabel;