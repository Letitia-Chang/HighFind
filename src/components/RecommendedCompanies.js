import diamondIcon from "../assets/img/icon-diamond.svg"
import personIconPink from "../assets/img/icon-person-pink.svg"
import doubleArrowRightIconGray from "../assets/img/icon-double-arrow-right-gray.svg"

const RecommendedCompanies = () => {
    return (
        <div style={{ backgroundColor: '#F9CCCC', padding: '40px 360px 170px 360px' }}>
            <div className="d-flex flex-row align-items-center justify-content-center" style={{ marginBottom: '8px' }}>
                <img src={diamondIcon} alt="diamond icon" style={{ width: '28px', height: '28px' }} />
                <p className="mb-0" style={{ color: '#2D2D2D', fontSize: '28px', fontWeight: '700', marginLeft: '6px' }}>特選企業 </p>
            </div>

            {/* Row 1 */}
            <div className="d-flex flex-row justify-content-between" style={{ marginTop: '16px' }}>
                {/* Item 1-1 */}
                <div style={{ backgroundColor: 'white', boxShadow: '1px 2px 3px 0px rgba(0, 0, 0, 0.15)', borderRadius: '10px', padding: '16px', width: '590px', height: '250px', position: 'relative' }}>
                    <div className="d-flex flex-row" style={{ paddingBottom: '16px', borderBottom: '1px solid #CCCCCC', marginBottom: '8px' }}>
                        <div style={{ width: '170px', height: '100px', backgroundColor: '#F6F6F6' }}></div>
                        <div className="d-flex flex-column" style={{ marginLeft: '18px' }}>
                            <p style={{ color: '#2D2D2D', fontSize: '18px', fontWeight: '400', marginBottom: '4px' }}>大潤發流通事業股份有限公司</p>
                            <p style={{ color: '#909090', fontSize: '16px', fontWeight: '400', marginBottom: '16px' }}>台北市內湖區 | 量販流通相關</p>
                            <div className="d-flex flex-row">
                                <div style={{ fontSize: '16px', fontWeight: '400', borderRadius: '100px', border: '1px solid #CCCCCC', padding: '2px 16px', marginRight: '12px' }}>員工在職教育訓練</div>
                                <div style={{ fontSize: '16px', fontWeight: '400', borderRadius: '100px', border: '1px solid #CCCCCC', padding: '2px 16px', marginRight: '12px' }}>員工餐廳</div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row align-items-center" style={{ marginTop: '8px' }}>
                            <img src={personIconPink} alt="pink person icon" style={{ width: '20px', height: '20px' }} />
                            <p className="mb-0" style={{ color: '#4B4B4B', fontSize: '16px', fontWeight: '400', marginLeft: '6px' }}>大潤發中和店 - 正職 - 長期賣場服務員 (歡迎新鮮人)</p>
                        </div>
                        <div className="d-flex flex-row align-items-center" style={{ marginTop: '8px' }}>
                            <img src={personIconPink} alt="pink person icon" style={{ width: '20px', height: '20px' }} />
                            <p className="mb-0" style={{ color: '#4B4B4B', fontSize: '16px', fontWeight: '400', marginLeft: '6px' }}>大潤發中和店 - 正職 - 長期賣場服務員 (歡迎新鮮人)</p>
                        </div>
                    </div>

                    <button className="d-flex align-items-center" style={{ color: '#909090', fontSize: '14px', fontWeight: '400', backgroundColor: 'transparent', border: 'none', position: 'absolute', right: '16px', bottom: '16px' }}>
                        看更多
                        <img src={doubleArrowRightIconGray} alt="gray double arrow right icon" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>
                {/* Item 1-2 */}
                <div style={{ backgroundColor: 'white', boxShadow: '1px 2px 3px 0px rgba(0, 0, 0, 0.15)', borderRadius: '10px', padding: '16px', width: '590px', height: '250px', position: 'relative' }}>
                    <div className="d-flex flex-row" style={{ paddingBottom: '16px', borderBottom: '1px solid #CCCCCC', marginBottom: '8px' }}>
                        <div style={{ width: '170px', height: '100px', backgroundColor: '#F6F6F6' }}></div>
                        <div className="d-flex flex-column" style={{ marginLeft: '18px' }}>
                            <p style={{ color: '#2D2D2D', fontSize: '18px', fontWeight: '400', marginBottom: '4px' }}>大潤發流通事業股份有限公司</p>
                            <p style={{ color: '#909090', fontSize: '16px', fontWeight: '400', marginBottom: '16px' }}>台北市內湖區 | 量販流通相關</p>
                            <div className="d-flex flex-row">
                                <div style={{ fontSize: '16px', fontWeight: '400', borderRadius: '100px', border: '1px solid #CCCCCC', padding: '2px 16px', marginRight: '12px' }}>員工在職教育訓練</div>
                                <div style={{ fontSize: '16px', fontWeight: '400', borderRadius: '100px', border: '1px solid #CCCCCC', padding: '2px 16px', marginRight: '12px' }}>員工餐廳</div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row align-items-center" style={{ marginTop: '8px' }}>
                            <img src={personIconPink} alt="pink person icon" style={{ width: '20px', height: '20px' }} />
                            <p className="mb-0" style={{ color: '#4B4B4B', fontSize: '16px', fontWeight: '400', marginLeft: '6px' }}>大潤發中和店 - 正職 - 長期賣場服務員 (歡迎新鮮人)</p>
                        </div>
                        <div className="d-flex flex-row align-items-center" style={{ marginTop: '8px' }}>
                            <img src={personIconPink} alt="pink person icon" style={{ width: '20px', height: '20px' }} />
                            <p className="mb-0" style={{ color: '#4B4B4B', fontSize: '16px', fontWeight: '400', marginLeft: '6px' }}>大潤發中和店 - 正職 - 長期賣場服務員 (歡迎新鮮人)</p>
                        </div>
                    </div>

                    <button className="d-flex align-items-center" style={{ color: '#909090', fontSize: '14px', fontWeight: '400', backgroundColor: 'transparent', border: 'none', position: 'absolute', right: '16px', bottom: '16px' }}>
                        看更多
                        <img src={doubleArrowRightIconGray} alt="gray double arrow right icon" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>
            </div>

            {/* Row 2 */}
            <div className="d-flex flex-row justify-content-between" style={{ marginTop: '16px' }}>
                {/* Item 2-1 */}
                <div style={{ backgroundColor: 'white', boxShadow: '1px 2px 3px 0px rgba(0, 0, 0, 0.15)', borderRadius: '10px', padding: '16px', width: '590px', height: '250px', position: 'relative' }}>
                    <div className="d-flex flex-row" style={{ paddingBottom: '16px', borderBottom: '1px solid #CCCCCC', marginBottom: '8px' }}>
                        <div style={{ width: '170px', height: '100px', backgroundColor: '#F6F6F6' }}></div>
                        <div className="d-flex flex-column" style={{ marginLeft: '18px' }}>
                            <p style={{ color: '#2D2D2D', fontSize: '18px', fontWeight: '400', marginBottom: '4px' }}>大潤發流通事業股份有限公司</p>
                            <p style={{ color: '#909090', fontSize: '16px', fontWeight: '400', marginBottom: '16px' }}>台北市內湖區 | 量販流通相關</p>
                            <div className="d-flex flex-row">
                                <div style={{ fontSize: '16px', fontWeight: '400', borderRadius: '100px', border: '1px solid #CCCCCC', padding: '2px 16px', marginRight: '12px' }}>員工在職教育訓練</div>
                                <div style={{ fontSize: '16px', fontWeight: '400', borderRadius: '100px', border: '1px solid #CCCCCC', padding: '2px 16px', marginRight: '12px' }}>員工餐廳</div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row align-items-center" style={{ marginTop: '8px' }}>
                            <img src={personIconPink} alt="pink person icon" style={{ width: '20px', height: '20px' }} />
                            <p className="mb-0" style={{ color: '#4B4B4B', fontSize: '16px', fontWeight: '400', marginLeft: '6px' }}>大潤發中和店 - 正職 - 長期賣場服務員 (歡迎新鮮人)</p>
                        </div>
                        <div className="d-flex flex-row align-items-center" style={{ marginTop: '8px' }}>
                            <img src={personIconPink} alt="pink person icon" style={{ width: '20px', height: '20px' }} />
                            <p className="mb-0" style={{ color: '#4B4B4B', fontSize: '16px', fontWeight: '400', marginLeft: '6px' }}>大潤發中和店 - 正職 - 長期賣場服務員 (歡迎新鮮人)</p>
                        </div>
                    </div>

                    <button className="d-flex align-items-center" style={{ color: '#909090', fontSize: '14px', fontWeight: '400', backgroundColor: 'transparent', border: 'none', position: 'absolute', right: '16px', bottom: '16px' }}>
                        看更多
                        <img src={doubleArrowRightIconGray} alt="gray double arrow right icon" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>

                {/* Item 2-2 */}
                <div style={{ backgroundColor: 'white', boxShadow: '1px 2px 3px 0px rgba(0, 0, 0, 0.15)', borderRadius: '10px', padding: '16px', width: '590px', height: '250px', position: 'relative' }}>
                    <div className="d-flex flex-row" style={{ paddingBottom: '16px', borderBottom: '1px solid #CCCCCC', marginBottom: '8px' }}>
                        <div style={{ width: '170px', height: '100px', backgroundColor: '#F6F6F6' }}></div>
                        <div className="d-flex flex-column" style={{ marginLeft: '18px' }}>
                            <p style={{ color: '#2D2D2D', fontSize: '18px', fontWeight: '400', marginBottom: '4px' }}>大潤發流通事業股份有限公司</p>
                            <p style={{ color: '#909090', fontSize: '16px', fontWeight: '400', marginBottom: '16px' }}>台北市內湖區 | 量販流通相關</p>
                            <div className="d-flex flex-row">
                                <div style={{ fontSize: '16px', fontWeight: '400', borderRadius: '100px', border: '1px solid #CCCCCC', padding: '2px 16px', marginRight: '12px' }}>員工在職教育訓練</div>
                                <div style={{ fontSize: '16px', fontWeight: '400', borderRadius: '100px', border: '1px solid #CCCCCC', padding: '2px 16px', marginRight: '12px' }}>員工餐廳</div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row align-items-center" style={{ marginTop: '8px' }}>
                            <img src={personIconPink} alt="pink person icon" style={{ width: '20px', height: '20px' }} />
                            <p className="mb-0" style={{ color: '#4B4B4B', fontSize: '16px', fontWeight: '400', marginLeft: '6px' }}>大潤發中和店 - 正職 - 長期賣場服務員 (歡迎新鮮人)</p>
                        </div>
                        <div className="d-flex flex-row align-items-center" style={{ marginTop: '8px' }}>
                            <img src={personIconPink} alt="pink person icon" style={{ width: '20px', height: '20px' }} />
                            <p className="mb-0" style={{ color: '#4B4B4B', fontSize: '16px', fontWeight: '400', marginLeft: '6px' }}>大潤發中和店 - 正職 - 長期賣場服務員 (歡迎新鮮人)</p>
                        </div>
                    </div>

                    <button className="d-flex align-items-center" style={{ color: '#909090', fontSize: '14px', fontWeight: '400', backgroundColor: 'transparent', border: 'none', position: 'absolute', right: '16px', bottom: '16px' }}>
                        看更多
                        <img src={doubleArrowRightIconGray} alt="gray double arrow right icon" style={{ width: '20px', height: '20px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecommendedCompanies;