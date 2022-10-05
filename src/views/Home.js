// 職缺：公司、職缺 labels onclick 
// 建立履歷區塊
import { Link } from 'react-router-dom';
import useFetch from "../hooks/useFetch";
import useFetchUpdate from "../hooks/useFetchUpdate";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setFakeData } from "../utils/index";

import "../assets/scss/home.scss"
import "../assets/scss/global.scss"
import searchIconGreen from "../assets/img/icon-search-green.svg"
import fireIconGreen from "../assets/img/icon-fire-green.svg"
import sparkleIconGreen from "../assets/img/icon-sparkle-green.svg"
import arrowLeftIconGray from "../assets/img/icon-arrow-left-gray.svg"
import arrowRightIconGray from "../assets/img/icon-arrow-right-gray.svg"

import JobItem from "../components/Home/JobItem"
import JobItemNoData from "../components/Home/JobItemNoData"
import CompanyItem from "../components/Home/CompanyItem"
import CompanyItemNoData from "../components/Home/CompanyItemNoData"
import Indicators from "../components/Home/Indicators"
import SeeMoreButton from "../components/button/SeeMoreButton";

const Home = () => {
    const { data: tags, isPending: tagIsPending, error: tagError } = useFetch('http://localhost:8000/tags');
    const { data: pJobs, isPending: pJobIsPending, error: pJobError, updateData: setPJobData, setIsPending: setPJobIsPending } = useFetchUpdate('http://localhost:8000/pJobs');
    const { data: nJobs, isPending: nJobIsPending, error: nJobError, updateData: setNJobData, setIsPending: setNJobIsPending } = useFetchUpdate('http://localhost:8000/nJobs');
    const { data: pCompanys, isPending: pCompanyIsPending, error: pCompanyError, updateData: setPCompanyData, setIsPending: setPCompanyIsPending } = useFetchUpdate('http://localhost:8000/company');
    const { data: nCompanys, isPending: nCompanyIsPending, error: nCompanyError, updateData: setNCompanyData, setIsPending: setNCompanyIsPending } = useFetchUpdate('http://localhost:8000/company');
    const { data: aboutUs, isPending: aboutUsIsPending, error: aboutUsError } = useFetch(`http://localhost:8000/aboutUs`);
    const { data: events, isPending: eventIsPending, error: eventError } = useFetch(`http://localhost:8000/events`);

    const navigate = useNavigate();

    // 關鍵字搜尋
    const inputKeyword = useRef(null);
    const handleSearchKeyword = () => {
        let keyword = inputKeyword.current.value;
        console.log(keyword);
        if (keyword.trim().length > 0) {
            navigate(`/jobs?keyword=${keyword}`);
        }
    }

    // 活動公佈欄
    const [activeEvent, setActiveEvent] = useState(2);
    const handleActiveEvent = (index) => {
        const eventItemWidth = 810;
        const windowWidth = window.innerWidth;
        setActiveEvent(index);
        if (index === 0) {
            eventContainer.current.scrollLeft = 0;
        } else {
            eventContainer.current.scrollLeft = eventItemWidth * (index - 1) + (eventItemWidth - 0.5 * (windowWidth - eventItemWidth));
        }
    }
    const eventContainer = useRef(null);
    useEffect(() => {
        const eventItemWidth = 810;
        const windowWidth = window.innerWidth;
        eventContainer.current.scrollLeft = eventItemWidth * (activeEvent - 1) + (eventItemWidth - 0.5 * (windowWidth - eventItemWidth));
    }, [eventIsPending])

    // 熱門職缺
    const pJobsOptions = ["人資 / 營運", "社群經營", "前端工程師", "後端工程師", "UIUX / 視覺設計", "行銷企劃", "業務開發", "全端工程師", "行動裝置開發"];
    const [activePJob, setActivePJob] = useState(4);
    const pJobRef = useRef(null);
    useEffect(() => {
        pJobRef.current.scrollLeft = 1185 * activePJob;
    }, [pJobIsPending, activePJob])
    const handlePJobSavedStatus = (id, status) => {
        setPJobIsPending(true);
        fetch(`http://localhost:8000/pJobs/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ isLiked: status })
        }).then((res) => {
            return res.json();
        }).then((response) => {
            let temp = pJobs;
            temp.forEach((ele, index) => {
                if (ele.id === id) {
                    temp[index].isLiked = status;
                }
            });
            setPJobData(temp);
            setPJobIsPending(false);
        })
    }

    // 新進職缺
    const [activeNJob, setActiveNJob] = useState(0);
    const nJobRef = useRef(null);
    useEffect(() => {
        nJobRef.current.scrollLeft = 1185 * activeNJob;
    }, [nJobIsPending, activeNJob])
    const handleNJobSavedStatus = (id, status) => {
        setNJobIsPending(true);
        fetch(`http://localhost:8000/nJobs/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ isLiked: status })
        }).then((res) => {
            return res.json();
        }).then((response) => {
            let temp = nJobs;
            temp.forEach((ele, index) => {
                if (ele.id === id) {
                    temp[index].isLiked = status;
                }
            });
            setNJobData(temp);
            setNJobIsPending(false);
        })
    }

    // 熱門企業
    const [activePCompany, setActivePCompany] = useState(0);
    const pCompanyRef = useRef(null);
    useEffect(() => {
        pCompanyRef.current.scrollLeft = 1200 * activePCompany;
    }, [pCompanyIsPending, activePCompany])
    const handlePCompanySavedStatus = (id, status) => {
        setPCompanyIsPending(true);
        fetch(`http://localhost:8000/company/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ isLiked: status })
        }).then((res) => {
            return res.json();
        }).then((response) => {
            let temp = pCompanys;
            temp.forEach((ele, index) => {
                if (ele.id === id) {
                    temp[index].isLiked = status;
                }
            });
            setPCompanyData(temp);
            setPCompanyIsPending(false);
        })
    }

    // 新進企業
    const [activeNCompany, setActiveNCompany] = useState(0);
    const nCompanyRef = useRef(null);
    useEffect(() => {
        nCompanyRef.current.scrollLeft = 1200 * activeNCompany;
    }, [nCompanyIsPending, activeNCompany])
    const handleNCompanySavedStatus = (id, status) => {
        setNCompanyIsPending(true);
        fetch(`http://localhost:8000/company/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ isLiked: status })
        }).then((res) => {
            return res.json();
        }).then((response) => {
            let temp = nCompanys;
            temp.forEach((ele, index) => {
                if (ele.id === id) {
                    temp[index].isLiked = status;
                }
            });
            setNCompanyData(temp);
            setNCompanyIsPending(false);
        })
    }

    return (
        <div className="home">
            {/* <div className="d-flex flex-row justify-content-center">
                <div className="dot-flashing"></div>
            </div> */}

            {/* Block 1 */}
            {/* 搜尋關鍵字 */}
            <div className="block-1 d-flex flex-column">
                <h2 className="search-title">成功的開始，就是踏出搜尋的第一步</h2>

                <div className="search-input d-flex flex-row">
                    <img src={searchIconGreen} alt="green search icon" />
                    <input onKeyPress={e => {
                        if (e.key === 'Enter') {
                            handleSearchKeyword();
                        }
                    }} ref={inputKeyword} type="text" placeholder="輸入公司名、職務名或關鍵字" />
                </div>

                <div className="search-tags d-flex flex-row flex-wrap">
                    {!tagIsPending && tags.map((tag, index) => (<Link key={index} to={`/jobs?keyword=${tag.name}`} className="search-tag">{tag.name}</Link>))}
                    {tagIsPending && <div className="search-tag-no-data d-flex"><div className="dot-flashing"></div></div>}
                </div>
            </div>


            {/* Block 2 */}
            <div className="block-2">
                {/* 關於我們  */}
                <div className="about d-flex flex-row">
                    {!aboutUsIsPending && aboutUs.map(((about, index) => (
                        <div key={index} className="about-item d-flex flex-column align-items-start">
                            <div className="about-image d-flex" style={{ backgroundImage: `url(${about.img})` }}></div>
                            <h3 className="about-title mb-0">{about.title}</h3>
                            <p className="about-content mb-0">{about.content}</p>
                        </div>
                    )))}
                </div>

                {/* 建立履歷 */}
                <div className="build-resume" style={{ padding: '30px 360px' }}>
                    <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#FEF6BF', color: '#4B4B4B', fontSize: '20px', fontWeight: '700', borderRadius: '20px', height: "135px" }}>提示建立履歷區塊</div>
                </div>

                {/* 活動公佈欄  */}
                <div className="event">
                    <h2 className="event-title">活動公佈欄</h2>
                    <p className="event-description">Lorem ipsum dolor sit amet</p>
                    {/* 上方標籤 */}
                    <div className="event-tags row g-0 flex-nowrap">
                        {!eventIsPending && events.map((event, index) => (
                            <div key={index} onClick={() => handleActiveEvent((index))} className={`event-tag ${index === activeEvent ? 'active' : ''}`}>{event.title}</div>
                        ))}
                    </div>

                    {/* 活動項目 */}
                    <div className="event-container-mask" style={{ position: 'relative' }}>
                        <div ref={eventContainer} className="event-container row g-0 w-100 flex-nowrap">
                            {!eventIsPending && events.map((event, index) => (
                                <Link to={`/events?id=${event.id}`} key={index} className={`event-item ${index === activeEvent ? 'active' : 'inactive'}`} style={{ backgroundImage: `url(${event.image})` }}>
                                    <div className="event-type">{event.unit}</div>
                                </Link>
                            ))}

                            {eventIsPending && setFakeData(7).map((event, index) => (
                                <div key={index} className="event-item no-data">
                                    <div className="event-type"></div>
                                </div>
                            ))}
                        </div>

                        {/* Switch Left */}
                        {!eventIsPending && activeEvent !== 0 && <button onClick={() => handleActiveEvent((activeEvent - 1))} className="switch-left">
                            <img src={arrowLeftIconGray} alt="left switch icon" />
                        </button>}

                        {/* Switch Right */}
                        {!eventIsPending && activeEvent !== events.length - 1 && <button onClick={() => handleActiveEvent((activeEvent + 1))} className="switch-right">
                            <img src={arrowRightIconGray} alt="right switch icon" />
                        </button>}
                    </div>

                    {/* Indicators */}
                    <Indicators isPending={eventIsPending} items={events} activeIndex={activeEvent} setActiveIndex={handleActiveEvent} />
                </div>
            </div>


            {/* Block 3 */}
            <div className="block-3 d-flex flex-column">
                {/* 熱門職缺 */}
                <div className="jobs d-flex flex-column">
                    <h2 className="job-title d-flex flex-row"><img src={fireIconGreen} alt="popular jobs icon" />熱門職缺</h2>
                    <p className="job-description">Lorem ipsum dolor sit amet</p>

                    <div className="job-tags d-flex flex-row justify-content-center">
                        {pJobsOptions.map((job, index) => (
                            <div key={index} onClick={() => setActivePJob(index)} className={`job-tag ${index === activePJob ? 'active' : ''}`}>{job}</div>
                        ))}
                    </div>

                    <div className="job-container-mask">
                        {/* Job Item */}
                        <div className="job-container" ref={pJobRef} style={{ width: '1200px', margin: '0px auto' }}>
                            {/* Data Fetched */}
                            {!pJobIsPending &&
                                <div className="job-items d-flex flex-row" style={{ width: 'fit-content' }}>
                                    {pJobs.map((item, index) => (
                                        <JobItem handleSavedStatus={handlePJobSavedStatus} item={item} index={index} />
                                    ))}
                                </div>
                            }

                            {/* Data Not Fetched */}
                            {pJobIsPending && <div className="job-items d-flex flex-row"><JobItemNoData /></div>}
                        </div>

                        {/* Switch Left */}
                        {!pJobIsPending && activePJob !== 0 && <button onClick={() => setActivePJob(activePJob - 1)} className="switch-left">
                            <img src={arrowLeftIconGray} alt="left switch icon" />
                        </button>}

                        {/* Switch Right */}
                        {!pJobIsPending && activePJob !== Math.ceil(pJobs.length / 3) - 1 && <button onClick={() => setActivePJob(activePJob + 1)} className="switch-right">
                            <img src={arrowRightIconGray} alt="right switch icon" />
                        </button>}
                    </div>

                    {!pJobIsPending && <Indicators isPending={pJobIsPending} items={setFakeData(Math.ceil(pJobs.length / 3))} activeIndex={activePJob} setActiveIndex={setActivePJob} />}
                    <SeeMoreButton to={"/jobs"} name={"更多熱門職缺"} />
                </div>

                {/* 新進職缺 */}
                <div className="jobs d-flex flex-column">
                    <h2 className="job-title d-flex flex-row"><img src={sparkleIconGreen} alt="new jobs icon" />新進職缺</h2>
                    <p className="job-description">Lorem ipsum dolor sit amet</p>

                    <div className="job-container-mask">
                        <div className="job-container" ref={nJobRef} style={{ width: '1200px', margin: '0px auto' }}>
                            {/* Data Fetched */}
                            {!nJobIsPending &&
                                <div className="job-items d-flex flex-row" style={{ width: `${Math.ceil(nJobs.length / 3) * 1200}px` }}>
                                    {nJobs.map((item, index) => (
                                        <JobItem handleSavedStatus={handleNJobSavedStatus} item={item} index={index} />
                                    ))}
                                </div>
                            }

                            {/* Data Not Fetched */}
                            {nJobIsPending && <div className="job-items d-flex flex-row justify-content-between"><JobItemNoData /></div>}
                        </div>

                        {/* Switch Left */}
                        {!nJobIsPending && activeNJob !== 0 && <button onClick={() => setActiveNJob(activeNJob - 1)} className="switch-left">
                            <img src={arrowLeftIconGray} alt="left switch icon" />
                        </button>}

                        {/* Switch Right */}
                        {!nJobIsPending && activeNJob !== Math.ceil(nJobs.length / 3) - 1 && <button onClick={() => setActiveNJob(activeNJob + 1)} className="switch-right">
                            <img src={arrowRightIconGray} alt="right switch icon" />
                        </button>}
                    </div>

                    {!nJobIsPending && <Indicators isPending={nJobIsPending} items={setFakeData(Math.ceil(nJobs.length / 3))} activeIndex={activeNJob} setActiveIndex={setActiveNJob} />}
                    <SeeMoreButton to={"/jobs"} name={"更多新進職缺"} />
                </div>
            </div>


            {/* Block 4 */}
            <div className="block-4 d-flex flex-column">
                {/* 熱門企業 */}
                <div className="companies-home d-flex flex-column">
                    <h2 className="company-title d-flex flex-row"><img src={fireIconGreen} alt="popular jobs icon" /> 熱門企業</h2>
                    <p className="company-description">Lorem ipsum dolor sit amet</p>

                    <div className="company-container-mask">
                        <div className="company-container" ref={pCompanyRef}>
                            {/* Data Fetched */}
                            {!pCompanyIsPending &&
                                <div className="company-items d-flex flex-row align-items-center" style={{ position: 'relative', width: `${Math.ceil(pCompanys.length / 3) * 1200}px` }}>
                                    {pCompanys.map((item, index) => (
                                        <CompanyItem handleSavedStatus={handlePCompanySavedStatus} item={item} index={index} />
                                    ))}
                                </div>
                            }

                            {/* Data Not Fetched */}
                            {pCompanyIsPending && <CompanyItemNoData />}
                        </div>

                        {/* Switch Left */}
                        {!pCompanyIsPending && activePCompany !== 0 && <button onClick={() => setActivePCompany(activePCompany - 1)} className="switch-left">
                            <img src={arrowLeftIconGray} alt="left switch icon" />
                        </button>}

                        {/* Switch Right */}
                        {!pCompanyIsPending && activePCompany !== Math.ceil(pCompanys.length / 3) - 1 && <button onClick={() => setActivePCompany(activePCompany + 1)} className="switch-right">
                            <img src={arrowRightIconGray} alt="right switch icon" />
                        </button>}

                    </div>

                    {!pCompanyIsPending && <Indicators isPending={pCompanyIsPending} items={setFakeData(Math.ceil(pCompanys.length / 3))} activeIndex={activePCompany} setActiveIndex={setActivePCompany} />}
                    <SeeMoreButton to={"/companies"} name={"更多熱門企業"} />
                </div>

                {/* 新進企業 */}
                <div className="d-flex flex-column">
                    <div className="companies-home d-flex flex-column">
                        <h2 className="company-title d-flex flex-row"><img src={sparkleIconGreen} alt="popular jobs icon" />新進企業</h2>
                        <p className="company-description">Lorem ipsum dolor sit amet</p>

                        <div className="company-container-mask">
                            <div className="company-container" ref={nCompanyRef}>
                                {/* Data Fetched */}
                                {!nCompanyIsPending &&
                                    <div className="company-items d-flex flex-row align-items-center" style={{ position: 'relative', width: `${Math.ceil(nCompanys.length / 3) * 1200}px` }}>
                                        {nCompanys.map((item, index) => (
                                            <CompanyItem handleSavedStatus={handleNCompanySavedStatus} item={item} index={index} />
                                        ))}
                                    </div>
                                }

                                {/* Data Not Fetched */}
                                {nCompanyIsPending && <CompanyItemNoData />}
                            </div>

                            {/* Switch Left */}
                            {!nCompanyIsPending && activeNCompany !== 0 && <button onClick={() => setActiveNCompany(activeNCompany - 1)} className="switch-left">
                                <img src={arrowLeftIconGray} alt="left switch icon" />
                            </button>}

                            {/* Switch Right */}
                            {!nCompanyIsPending && activeNCompany !== Math.ceil(nCompanys.length / 3) - 1 && <button onClick={() => setActiveNCompany(activeNCompany + 1)} className="switch-right">
                                <img src={arrowRightIconGray} alt="right switch icon" />
                            </button>}
                        </div>

                        {!nCompanyIsPending && <Indicators isPending={nCompanyIsPending} items={setFakeData(Math.ceil(nCompanys.length / 3))} activeIndex={activeNCompany} setActiveIndex={setActiveNCompany} />}
                        <SeeMoreButton to={"/companies"} name={"更多新進企業"} />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Home;