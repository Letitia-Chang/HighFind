import bulbIconWhite from "../../assets/img/icon-bulb-white.svg";
import bulbIconYellow from "../../assets/img/icon-bulb-yellow.svg";

const SeeJobsButton = ({ btnIsHovered, setHoverStatus }) => {
    return (
        <a href="#job-list" onMouseEnter={() => setHoverStatus(true)} onMouseLeave={() => setHoverStatus(false)} className="see-jobs-btn d-flex">
            {!btnIsHovered && <img src={bulbIconWhite} alt="white rocket icon" />}
            {btnIsHovered && <img src={bulbIconYellow} alt="yellow rocket icon" />}
            <span>查看職缺</span>
        </a>
    );
}

export default SeeJobsButton;