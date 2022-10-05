const CalendarSm = ({ height, width, month, date }) => {
    return (
        <div className="d-flex flex-column" style={{ width: `${width}px`, height: `${height}px`, backgroundColor: 'white', borderRadius: '10px', marginTop: '12px' }}>
            <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#EC5656', borderRadius: '10px 10px 0px 0px', height: '40%' }}>
                <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>{month}月</span>
            </div>

            <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'white', borderRadius: '0px 0px 10px 10px', border: '1px solid #CCCCCC', height: '60%' }}>
                <span style={{ color: '#4B4B4B', fontSize: '28px', fontWeight: '700' }}>{date}</span>
            </div>
        </div>
    );
}

export default CalendarSm;