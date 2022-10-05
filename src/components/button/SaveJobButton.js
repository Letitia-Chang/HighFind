import "../../assets/scss/components.scss";
import heartIconGray from "../../assets/img/icon-heart-gray.svg";
import heartIconGreen from "../../assets/img/icon-heart-green.svg";

const SaveJobButton = ({ isSaved, handleClick }) => {
    return (
        <div>
            {!isSaved && <button onClick={() => handleClick(true)} className="save-btn is-saved">
                <img src={heartIconGray} alt="gray heart icon" />
                <span>收藏職缺</span>
            </button>}

            {isSaved && <button onClick={() => handleClick(false)} className="save-btn is-not-saved">
                <img src={heartIconGreen} alt="green heart icon" />
                <span >已收藏</span>
            </button>}
        </div>
    );
}

export default SaveJobButton;