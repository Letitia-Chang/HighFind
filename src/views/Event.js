import "../assets/scss/event.scss";
import arrowDownIconWhite from "../assets/img/icon-arrow-down-white.svg"
import landmarkIcon from "../assets/img/icon-landmark.svg"
import clockIcon from "../assets/img/icon-clock.svg"
import blocksIcon from "../assets/img/icon-blocks.svg"
import phoneIcon from "../assets/img/icon-phone.svg"
import saveIconThick from "../assets/img/icon-save-thick.svg"
import calendarIconThick from "../assets/img/icon-calendar-thick.svg"
import registerIconWhite from "../assets/img/icon-register-white.svg"

import OtherInfo from "../components/info/OtherInfo";
import CalendarSm from "../components/calendar/CalendarSm";
import RecommendedCompanies from "../components/RecommendedCompanies";

const Event = () => {

    const isPending = false;

    return (
        <div className="event">
            <div className="test-bg" style={{ paddingTop: '364px', background: 'url("https://i.postimg.cc/jS3qJVck/NTU.png"), #F6F6F6', backgroundRepeat: 'no-repeat, no-repeat', backgroundPosition: 'top center, top center', backgroundSize: '100% 534px, cover' }}>
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ padding: "0px 360px" }}>
                    {/* 上方資訊 */}
                    <div className="d-flex flex-row justify-content-between" style={{ position: 'relative', backgroundColor: 'white', borderRadius: '15px 15px 0px 0px', boxShadow: '0px -3px 5px 0px rgba(0, 0, 0, 0.15)', height: '313px', width: '1200px', borderBottom: '5px solid #EC5656', position: 'relative', padding: '92px 48px 28px 96px' }}>
                        <div className="d-flex-flex-column" style={{ position: "absolute", zIndex: '2', top: '-68px', left: '25%' }}>
                            {/* 學校名稱 */}
                            <div className="d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: '#EC5656', width: '592px', height: '136px' }}>
                                <p style={{ color: 'white', fontSize: '32px', fontWeight: '700', marginBottom: '4px' }}>國立臺灣大學</p>
                                <p className="mb-0" style={{ color: 'white', fontSize: '20px', fontWeight: '400' }}>National Taiwan University</p>
                            </div>

                            {/* 活動資訊 */}
                            <div style={{ width: '592px', marginTop: '24px' }}>
                                <p style={{ color: 'black', fontSize: '28px', fontWeight: '700', paddingBottom: '12px', borderBottom: '1px solid #ECEDEC', lineHeight: '35px', marginBottom: '4px' }}>當人生也面臨選擇障礙，你會選擇勇敢出走還是留下來 - 選擇、出走及挑戰</p>
                                <div className="d-flex flex-row justify-content-between">
                                    {/* Left */}
                                    <div className="d-flex flex-column">
                                        <p className="mb-0" style={{ marginTop: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}><span>報名日</span><span style={{ marginLeft: '12px' }}>2022 / 6 / 30  12:00</span></p>
                                        <p className="mb-0" style={{ marginTop: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}><span>截止日</span><span style={{ marginLeft: '12px' }}>2022 / 7 / 30  23:00</span></p>
                                        <p className="mb-0" style={{ marginTop: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}><span>名額</span>  <span style={{ marginLeft: '12px' }}>50人</span></p>
                                    </div>

                                    {/* Middle */}
                                    <div className="d-flex flex-column">
                                        <p className="mb-0" style={{ marginTop: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>
                                            <img src={landmarkIcon} alt="location icon" style={{ width: '24px', height: '24px' }} />
                                            <span style={{ marginLeft: '12px' }}>台中市</span>
                                        </p>
                                        <p className="mb-0" style={{ marginTop: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>
                                            <img src={clockIcon} alt="clock icon" style={{ width: '24px', height: '24px' }} />
                                            <span style={{ marginLeft: '12px' }}>18:00 - 19:30</span>
                                        </p>
                                    </div>

                                    {/* Right */}
                                    <div className="d-flex flex-column">
                                        <p className="mb-0" style={{ marginTop: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>
                                            <img src={blocksIcon} alt="blocks icon" style={{ width: '24px', height: '24px' }} />
                                            <span style={{ marginLeft: '12px' }}>職涯成長工作坊</span>
                                        </p>
                                        <p className="mb-0" style={{ marginTop: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>
                                            <img src={phoneIcon} alt="phone icon" style={{ width: '24px', height: '24px' }} />
                                            <span style={{ marginLeft: '12px' }}>線上</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 活動日期 */}
                        <div className="d-flex flex-column">
                            <CalendarSm height="96" width="96" month="6" date="30" />
                            <p style={{ marginTop: '10px', marginBottom: '0px', color: '#EC5656', fontSize: '14px', fontWeight: '700' }}>離截止尚有7天</p>
                        </div>

                        {/* 操作 */}
                        <div className="d-flex flex-column align-items-center">

                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row align-items-center">
                                    <img src={saveIconThick} alt="thick save icon" style={{ width: '20px', height: '20px' }} />
                                    <p className="mb-0" style={{ color: '#1E1E1E', fontSize: '18px', fontWeight: '700', marginLeft: '8px' }}>收藏</p>
                                </div>

                                <div className="d-flex flex-row align-items-center" style={{ marginTop: '8px' }}>
                                    <img src={calendarIconThick} alt="thick save icon" style={{ width: '20px', height: '20px' }} />
                                    <p className="mb-0" style={{ color: '#1E1E1E', fontSize: '18px', fontWeight: '700', marginLeft: '8px' }}>加入行事曆</p>
                                </div>
                            </div>

                            <button className="d-flex flex-row align-items-center" style={{ backgroundColor: '#EC5656', borderRadius: '100px', padding: '8px 37px', border: 'none', marginTop: '16px' }}>
                                <img src={registerIconWhite} alt="white register icon" />
                                <span style={{ color: 'white', fontSize: '20px', fontWeight: '700', marginLeft: '8px' }}>我要報名</span>
                            </button>
                        </div>
                    </div>

                    <p style={{ color: 'black', fontSize: '28px', fontWeight: '700', marginTop: '40px', marginBottom: '24px', textAlign: 'center' }}>活動資訊</p>

                    {/* 內容介紹 */}
                    <div style={{ backgroundColor: 'white', borderRadius: '10px 10px 0px 0px', width: '100%' }}>
                        <div className="d-flex flex-row align-items-center" style={{ borderRadius: '10px 10px 0px 0px', backgroundColor: '#F07878', padding: '24px', width: '100%', cursor: 'pointer' }}>
                            <span className="mb-0" style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>內容介紹</span>
                            <img src={arrowDownIconWhite} alt="arrow down icon" style={{ marginLeft: '10px', width: '24px', height: '24px' }} />
                        </div>

                        <div className="d-flex flex-row justify-content-between" style={{ backgroundColor: 'white', padding: '40px 70px 60px 100px' }}>
                            <div className="d-flex flex-column" style={{ width: 'calc(100% - 312px)' }}>
                                {/* 活動名稱 */}
                                <h3 style={{ color: '#2D2D2D', fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Lorem ipsum dolor sit amet</h3>
                                {/* 活動描述 */}
                                <p style={{ color: '#2D2D2D', fontSize: '18px', fontWeight: '400', marginBottom: '12px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet duis cursus lectus aenean eget. Sem fermentum, dictum mi leo ultricies. Elementum, luctus nulla consequat a quis varius enim. Diam quisque proin sed imperdiet odio faucibus scelerisque ultricies in. Sit in nibh non vitae suspendisse. Pulvinar elit, mi malesuada mauris suspendisse sapien. Tortor interdum felis, adipiscing sed tempor mauris. Lectus amet vitae sed nunc. Amet et odio et integer urna.
                                    Et integer nam morbi integer eget. Dignissim dolor vel fermentum lorem faucibus libero leo. Et cursus elementum quisque viverra lacus. Mollis urna eget elementum turpis ut amet, cras. Magna vulputate leo montes, quisque. Lorem amet .

                                    Nullam aliquet nibh adipiscing in viverra tortor dui cum. At diam penatibus ullamcorper id eget egestas ipsum, faucibus pharetra. Accumsan nulla at tortor pretium, malesuada lacus vel, sed in. Ut facilisi diam nibh at odio tincidunt est consequat eleifend. Nec pellentesque id tortor in leo, sed. Purus, volutpat et nulla id.
                                </p>

                                {/* 活動標籤 */}
                                <p style={{ color: '#1DAFAA', fontSize: '16px', fontWeight: '700', marginBottom: '18px' }}># AAAAA   # AAAAA   # BBBB   # CCCCC</p>

                                {/* 活動圖片(小) */}
                                <div className="row g-0 flex-nowrap" style={{ overflowX: 'scroll' }}>
                                    <div style={{ backgroundColor: '#CCCCCC', width: '104px', height: '104px', marginRight: '12px' }}></div>
                                    <div style={{ backgroundColor: '#CCCCCC', width: '104px', height: '104px', marginRight: '12px' }}></div>
                                    <div style={{ backgroundColor: '#CCCCCC', width: '104px', height: '104px', marginRight: '12px' }}></div>
                                    <div style={{ backgroundColor: '#CCCCCC', width: '104px', height: '104px', marginRight: '12px' }}></div>
                                    <div style={{ backgroundColor: '#CCCCCC', width: '104px', height: '104px', marginRight: '12px' }}></div>
                                    <div style={{ backgroundColor: '#CCCCCC', width: '104px', height: '104px', marginRight: '12px' }}></div>
                                    <div style={{ backgroundColor: '#CCCCCC', width: '104px', height: '104px', marginRight: '12px' }}></div>
                                </div>

                                {/* 活動連結 */}
                                <OtherInfo type="link" isPending={isPending} title="相關連結" content={isPending ? null : ["更多資訊一  http:// abcdefg.edu.tw", "更多資訊一  http:// abcdefg.edu.tw"]} />

                                {/* 講者資訊 */}
                                <div className="row g-0 flex-nowrap" style={{ overflowX: 'scroll', marginTop: '42px' }}>
                                    <div className="d-flex flex-column align-items-center" style={{ width: '160px', marginRight: '12px' }}>
                                        <div style={{ backgroundColor: '#D9D9D9', width: '160px', height: '160px', borderRadius: '50%' }}></div>
                                        <p className="mb-0" style={{ color: '#2D2D2D', fontSize: '18px', fontWeight: '400', marginTop: '12px', width: '115px' }}>Lorem ipsum dolor sit amet</p>
                                    </div>
                                    <div className="d-flex flex-column align-items-center" style={{ width: '160px', marginRight: '12px' }}>
                                        <div style={{ backgroundColor: '#D9D9D9', width: '160px', height: '160px', borderRadius: '50%' }}></div>
                                        <p className="mb-0" style={{ color: '#2D2D2D', fontSize: '18px', fontWeight: '400', marginTop: '12px', width: '115px' }}>Lorem ipsum dolor sit amet</p>
                                    </div>
                                    <div className="d-flex flex-column align-items-center" style={{ width: '160px', marginRight: '12px' }}>
                                        <div style={{ backgroundColor: '#D9D9D9', width: '160px', height: '160px', borderRadius: '50%' }}></div>
                                        <p className="mb-0" style={{ color: '#2D2D2D', fontSize: '18px', fontWeight: '400', marginTop: '12px', width: '115px' }}>Lorem ipsum dolor sit amet</p>
                                    </div>
                                </div>
                            </div>

                            {/* 活動圖片(大) */}
                            <div className="d-flex" style={{ backgroundColor: '#CCCCCC', borderRadius: '10px', width: '280px' }}></div>
                        </div>


                    </div>
                </div>

                {/* 特選企業 */}
                <RecommendedCompanies />
            </div>
        </div>
    );
}

export default Event;
