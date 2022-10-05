import lightningIcon from "../../assets/img/icon-lightning.svg"
import "../../assets/scss/components.scss";

const Recruiting = () => {
    return (
        <div className="recruiting-badge d-flex align-items-center justify-content-center">
            <img src={lightningIcon} alt="lightning icon" />
            積極招募
        </div>
    );
}

export default Recruiting;