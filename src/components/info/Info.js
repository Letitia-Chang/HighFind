const Info = ({ fullWidth, title, data, isPending }) => {
    return (
        <div className={fullWidth ? 'full-width' : 'half-width'}>
            {/* Data Fetched */}
            {!isPending && <div className='detail-info'>
                <div className="title" >{title}</div>
                <p className="mb-0" >{data}</p>
            </div>}

            {/* No Data */}
            {isPending && <div className='detail-info'>
                <div className="title" >{title}</div>
                {fullWidth &&
                    <div>
                        <div className="fake-half-content"></div>
                        <div className="fake-full-content"></div>
                        <div className="fake-full-content"></div>
                        <div className="fake-full-content"></div>
                        <div className="fake-full-content"></div>
                    </div>
                }
                {!fullWidth &&
                    <div>
                        <div className="fake-half-content"></div>
                        <div className="fake-half-content"></div>
                    </div>
                }
            </div>}
        </div>
    );
}

export default Info;