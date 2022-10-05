import "../../assets/scss/components/home/indicators.scss";

const Indicators = ({ isPending, items, activeIndex, setActiveIndex }) => {
    return (
        <div className="event-indicators d-flex flex-row">
            {!isPending && items.map((item, index) => (
                <div key={index} onClick={() => setActiveIndex(index)} className={`event-indicator ${index === activeIndex ? 'active' : ''}`}></div>
            ))}
        </div>
    );
}

export default Indicators;