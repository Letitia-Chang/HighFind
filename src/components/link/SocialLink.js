import "../../assets/scss/components.scss"

const SocialLink = ({ isActive, link, handleHover, srcActive, srcInactive, altActive, altInactive }) => {

    return (
        <div className="social-link">
            {/* Active */}
            {isActive &&
                <a href={link}>
                    <img onMouseLeave={() => handleHover(false)} onMouseEnter={() => handleHover(true)} src={srcActive} alt={altActive} />
                </a>
            }

            {/* Inactive */}
            {!isActive &&
                <a href={link}>
                    <img onMouseEnter={() => handleHover(true)}  onMouseLeave={() => handleHover(false)}  src={srcInactive} alt={altInactive} />
                </a>
            }
        </div>
    );

}

export default SocialLink;