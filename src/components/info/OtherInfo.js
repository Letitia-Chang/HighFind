import "../../assets/scss/components.scss";
import { linkIcon } from "../../assets/importImage";

const OhterInfo = ({ isPending, type, title, content, children }) => {
    return (
        <div>
            {/* Title + Text */}
            {type === "titleText" && !isPending && <div className="other-info-item d-flex flex-column">
                <p className="item-title">{title}</p>
                <p className="item-content" >{content}</p>
            </div>}

            {type === "titleText" && isPending && <div className="other-info-item no-data d-flex flex-column" >
                <p className="item-title">{title}</p>
                <div></div><div></div>
            </div>}

            {/* Text */}
            {type === "text" && !isPending && <div className="other-info-item d-flex flex-column" >
                <p className="item-content">{title}</p>
                <p className="item-content mb-0">{content}</p>
            </div>}

            {type === "text" && isPending && <div className="other-info-item no-data-2 d-flex flex-column" >
                <div></div> <div></div>
            </div>}

            {/* Links */}
            {type === "link" && !isPending && <div className="other-info-item d-flex flex-column">
                {/* <p className="item-title" >{title}</p> */}
                {content.length > 0 && content.map((link, index) => (
                    <div key={index} className="other-link d-flex flex-row">
                        <img src={linkIcon} alt="link icon" />
                        <a href={link}>{link}</a>
                    </div>
                ))}

            </div>}

            {type === "link" && isPending && <div className="other-info-item no-data-3 d-flex flex-column" >
                {/* <p className="item-title">{title}</p> */}
                <div className="other-links d-flex flex-column">
                    <div></div><div></div>
                </div>
            </div>}


            {/* Social Links */}
            {type === "socialLink" && !isPending && <div className="other-info-item d-flex flex-column">
                <p className="item-title" >{title}</p>
                <div className="social-links d-flex flex-row">
                    {content.social.fb !== undefined && content.social.fb !== null && children.fb}
                    {content.social.ig !== undefined && content.social.ig !== null && children.ig}
                    {content.social.yt !== undefined && content.social.yt !== null && children.yt}
                    {content.social.line !== undefined && content.social.line !== null && children.line}
                </div>

                {content.other.length > 0 && content.other.map((link, index) => (
                    <div key={index} className="other-link d-flex flex-row">
                        <img src={linkIcon} alt="link icon" />
                        <a href={link}>{link}</a>
                    </div>
                ))}

            </div>}

            {type === "socialLink" && isPending && <div className="other-info-item no-data-3 d-flex flex-column" >
                <p className="item-title">{title}</p>
                <div className="social-links d-flex flex-row">
                    <div></div><div></div><div></div>
                </div>
                <div className="other-links d-flex flex-column">
                    <div></div><div></div>
                </div>
            </div>}
        </div>
    );
}

export default OhterInfo;