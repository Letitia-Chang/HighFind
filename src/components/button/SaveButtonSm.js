import heartIcon from "../../assets/img/icon-heart.svg";
import "../../assets/scss/components.scss";

const SaveButtonSm = ({item, handleSavedStatus}) => {
    return (
        <button onClick={() => handleSavedStatus(item.id, !item.isLiked)} className="save-btn-sm d-flex" style={{ backgroundColor: item.isLiked ? '#F27072' : '#CCCCCC' }}>
            <img src={heartIcon} alt="heart icon" />
        </button>
    );
}

export default SaveButtonSm;