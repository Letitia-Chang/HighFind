import rocketIconWhite from "../../assets/img/icon-rocket-white.svg";
import rocketIconYellow from "../../assets/img/icon-rocket-yellow.svg";

const ApplyButton = ({ btnIsHovered, handleHoverStatus, handleApply }) => {
    return (
        <button onClick={() => handleApply()} onMouseEnter={() => handleHoverStatus(true)} onMouseLeave={() => handleHoverStatus(false)} className="apply-btn">
            {!btnIsHovered && <img src={rocketIconWhite} alt="white rocket icon" />}
            {btnIsHovered && <img src={rocketIconYellow} alt="yellow rocket icon" />}
            <span>立即應徵</span>
        </button>
    );
}

export default ApplyButton;