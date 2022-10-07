import "../assets/scss/events.scss";
import face2faceiconThick from "../assets/img/icon-face2face-thick.svg";
import phoneThick from "../assets/img/icon-phone-thick.svg";
import resetIconGray from "../assets/img/icon-reset-gray.svg"
import microphoneIconWhite from "../assets/img/icon-microphone-white.svg"
import graduateIconWhite from "../assets/img/icon-graduate-white.svg"
import suitcaseIconWhite from "../assets/img/icon-suitcase-white.svg"
import verticalExpandIcon from "../assets/img/icon-vertical-expand.svg"
import searchIconPink from "../assets/img/icon-search-pink.svg"
import landmarkIconGray from "../assets/img/icon-landmark-gray.svg"
import clockIconGray from "../assets/img/icon-clock-gray.svg"
import blocksIconGray from "../assets/img/icon-blocks-gray.svg"
import suitcaseIconGray from "../assets/img/icon-suitcase-gray.svg"
import face2faceIconGray from "../assets/img/icon-face2face-gray.svg"
import arrowLeftIcon from "../assets/img/icon-arrow-left.svg"
import arrowRightIcon from "../assets/img/icon-arrow-right.svg"
import calendarIconWhite from "../assets/img/icon-calendar-white.svg"
import lookForMoreIcon from "../assets/img/icon-look-for-more.svg"
import checkIconPink from "../assets/img/icon-check-pink.svg"
import checkboxIconWhite from "../assets/img/icon-checkbox-white.svg"
import pointRightIcon from "../assets/img/icon-point-right.svg"

import CalendarXS from "../components/calendar/CalendarXS";
import RecommendedCompanies from "../components/RecommendedCompanies";

import { useEffect, useState } from 'react';
import useFetch from "../hooks/useFetch";
import { setFakeData } from "../utils";

const Events = () => {

    // ======================== 最新活動 ======================== 
    // eslint-disable-next-line
    const { data: latestEvents, isPending: latestEventsIsPending, error: latestEventsError } = useFetch('http://localhost:8000/events');

    // ======================== 最新活動 ======================== 


    // ======================== 活動搜尋 ======================== 
    // ++++++++++ 左方：活動分類篩選 ++++++++++
    // 地區
    const locationFilterOptions = ['北部', '中部', '南部', '東部/離島'];
    const [locationFilter, setLocationFilter] = useState([false, false, false, false]);
    const handleSetLocationFilter = (ind) => {
        let tmp = [];
        locationFilter.forEach((ele, index) => {
            if (index === ind) {
                tmp.push(!ele);
            } else {
                tmp.push(ele);
            }
        });
        setLocationFilter(tmp);
    }
    // 活動型態
    const venueFilterOptions = ['實體', '線上', '實體 + 線上'];
    const [venueFilter, setVenueFilter] = useState([false, false, false]);
    const handleSetVenueFilter = (ind) => {
        let tmp = [];
        venueFilter.forEach((ele, index) => {
            if (index === ind) {
                tmp.push(!ele);
            } else {
                tmp.push(ele);
            }
        });
        setVenueFilter(tmp);
    }
    // 活動日期
    const dateFilterOptions = ['近一日', '一週內', '二週內', '一個月內'];
    const [dateFilter, setDateFilter] = useState([false, false, false, false]);
    const handleSetDateFilter = (ind) => {
        let tmp = [];
        dateFilter.forEach((ele, index) => {
            if (index === ind) {
                tmp.push(!ele);
            } else {
                tmp.push(ele);
            }
        });
        setDateFilter(tmp);
    }
    // 工作類型(實習 X 企業說明會)
    const jobTypeFilterOptions = ['實習', '全職'];
    const [jobTypeFilter, setJobTypeFilter] = useState([false, false]);
    const handleSetJobTypeFilter = (ind) => {
        let tmp = [];
        jobTypeFilter.forEach((ele, index) => {
            if (index === ind) {
                tmp.push(!ele);
            } else {
                tmp.push(ele);
            }
        });
        setJobTypeFilter(tmp);
    }
    // 講座類型(校園講座)
    const topicFilterOptions = ['職能講座', '職涯講座', '職涯成長工作坊', '職能提升工作坊'];
    const [topicFilter, setTopicFilter] = useState([false, false, false, false]);
    const handleSetTopicFilter = (ind) => {
        let tmp = [];
        topicFilter.forEach((ele, index) => {
            if (index === ind) {
                tmp.push(!ele);
            } else {
                tmp.push(ele);
            }
        });
        setTopicFilter(tmp);
    }
    // ++++++++++ 左方：活動分類篩選 ++++++++++

    // ++++++++++ 右方 ++++++++++
    // 活動類型選擇
    // const searchTypeMap = { 'A': '校園徵才', 'B': '校園講座', 'C': '實習 X 企業' }
    const searchTypeOptions = ['校園徵才', '校園講座', '實習 X 企業'];
    const [searchTypeFilter, setSearchTypeFilter] = useState([true, false, false]);
    const handlesearchTypeFilter = (ind) => {
        let tmp = [];
        searchTypeFilter.forEach((ele, index) => {
            if (index === ind) {
                tmp.push(true);
            } else {
                tmp.push(false);
            }
        });
        setSearchTypeFilter(tmp);
    }
    // 右方：關鍵字搜尋
    const [keyWordSearch, setKeywordSearch] = useState('');
    console.log(keyWordSearch);

    // 最熱門
    const [sortPopular, setSortPopular] = useState(true);


    // 時間順序
    const [sortDropdown, setSortDropdown] = useState(false);
    const [sortSelected, setSortSelected] = useState([false, false]);
    // ++++++++++ 右方： ++++++++++


    // ======================== 活動搜尋 ======================== 

    // ======================== 活動行事曆 ======================== 
    // 該日日期(年月日)
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() === 11 ? 1 : today.getMonth() + 1;
    const currentDate = today.getDate();

    // 顯示日期列表
    const [datesToDisplay, setDatesToDisplay] = useState([]);

    // 被選取日期
    const [selectedDate, setSelectedDate] = useState({ year: currentYear, month: currentMonth, date: currentDate })

    // 活動類別對照
    const EventTypeMap = { 'A': '校園徵才', 'B': '校園講座', 'C': '實習 X 企業' }

    // 被選取活動類別
    const [selectedType, setSelectedType] = useState('')    // A: 校園徵才 ; B: 校園講座 ; C: 實習與正職說明會
    useEffect(() => {
        console.log('refetch data');
        // refetchData();
    }, [selectedType])

    // 取得顯示日期資訊
    const [data, setData] = useState(null);
    console.log(data);
    const [isPending, setIsPending] = useState(true)
    // const updateData = (params) => setData(params);

    // 計算顯示日期列表
    useEffect(() => {
        setDatesToDisplay([]);  // 清空陣列
        const daysInMonth = CalcDaysInMonth(currentYear, currentMonth - 1);  // 計算該月總天數
        const startWeekdayOfMonth = CalcStartWeekdayOfMonth(currentYear, currentMonth - 1);  // 計算該月從星期幾開始(0:星期日)
        const daysInLastMonth = currentMonth === 1 ? CalcDaysInMonth(currentYear - 1, 11) : CalcDaysInMonth(currentYear, currentMonth - 2);  // 計算上個月總天數
        let tempDatesToDisplay = [];  // 顯示日期列表

        // 加入上個月日期
        for (let i = 0; i < startWeekdayOfMonth; i++) {
            tempDatesToDisplay.push({
                year: currentMonth === 1 ? currentYear - 1 : currentYear,
                month: currentMonth === 1 ? 12 : currentMonth - 1,
                date: daysInLastMonth - i,
                labels: [],
                active: false
            })
        }
        tempDatesToDisplay.reverse();

        // 加入該月日期
        for (let i = 0; i < daysInMonth; i++) {
            tempDatesToDisplay.push({
                year: currentYear,
                month: currentMonth,
                date: i + 1,
                labels: [],
                active: true
            })
        }

        // 加入下個月日期
        for (let i = 0; i < (42 - (daysInMonth + startWeekdayOfMonth)); i++) {
            tempDatesToDisplay.push({
                year: currentMonth === 12 ? currentYear + 1 : currentYear,
                month: currentMonth === 12 ? 1 : currentMonth + 1,
                date: i + 1,
                labels: [],
                active: false
            })
        }

        // 取得該日期資料
        const abortCont = new AbortController();

        let url = `http://localhost:8000/eventCalendar?year=${currentYear}&month=${currentMonth}`;
        if (selectedType !== '') {
            url += `&type=${selectedType}`;
        }

        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw Error('Could not fetch data');
                }
            })
            .then(data => {
                setData(data);
                // 整理日期對應資料
                tempDatesToDisplay.forEach(element => {
                    let labels = []
                    let filteredArray = data.filter(e => e.year === element.year && e.month === element.month && e.date === element.date);
                    if (filteredArray.length > 0) {
                        filteredArray.forEach(ele => {
                            labels.push(ele.type);
                        });
                        element.labels = labels;
                    }
                });
                setIsPending(false);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    console.log(err);
                    setIsPending(false);
                }
            })


        setDatesToDisplay(tempDatesToDisplay);
    }, [isPending])
    // ======================== 活動行事曆 ======================== 

    // ======================== METHODS ======================== 
    const normalYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];    // 普通年
    const olympicYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];   // 閏年

    // 轉換月份(數字 >> 英文)
    const MonthNumToEn = (month) => {
        const map = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return map[month];
    }
    // 轉換月份(數字 >> 中文)
    const MonthNumToCn = (month) => {
        const map = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        return map[month];
    }
    // 計算當月天數
    const CalcDaysInMonth = (year, month) => {
        if (year % 4 === 0) {
            return olympicYear[month];
        } else {
            return normalYear[month];
        }
    }
    const CalcStartWeekdayOfMonth = (year, month) => {
        const tmpDate = new Date(year, month, 1);
        return tmpDate.getDay();
    }
    // ======================== METHODS ======================== 

    return (
        <div className="events">
            {/* Block 1: Latest Events */}
            <div className="latest-events d-flex flex-row justify-content-between">
                <div className="event-banners"></div>
                
                <div className="events-items d-flex flex-column align-items-center">
                    <p className="title">最新活動</p>
                    {!latestEventsIsPending && latestEvents.length > 0 && latestEvents.map((event, index) => (
                        <div key={index} className="event-item d-flex flex-row">
                            <div className="event-item-left d-flex flex-row">
                                <div className="event-item-logo" style={{ backgroundImage: `url(${event.unitLogo})` }}></div>
                                <p className="mb-0">{event.title}</p>
                            </div>
                            {event.venue !== 'virtual' && <img src={face2faceiconThick} alt="thick face-to-face icon" />}
                            {event.venue !== 'physical' && <img src={phoneThick} alt="thick mobile icon" />}
                        </div>
                    ))}

                    {/* Indicators */}
                    <div className="event-indicators d-flex flex-row justify-content-between">
                        <button className="active"></button>
                        <button className="inactive"></button>
                        <button className="inactive"></button>
                    </div>
                </div>
            </div>

            {/* Block 2: Search */}
            <div className="search-events d-flex flex-row">

                {/* Left Filter */}
                <div className="left-filter d-flex flex-column" style={{ width: '15%', height: 'fit-content', padding: '28px 24px', borderRadius: '10px', border: '1px solid #CCCCCC' }}>
                    <div className="d-flex flex-row align-items-center" style={{ borderBottom: '1px solid #ECEDEC', paddingBottom: '8px', marginBottom: '10px' }} >
                        <span style={{ color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>活動分類篩選</span>
                        <img src={resetIconGray} alt="gray reset icon" style={{ width: '20px', height: '20px', marginLeft: '2px' }} />
                    </div>

                    {/* 地區(A & B & C) */}
                    <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                        <p style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>地區</p>
                        <div className="d-flex flex-column" style={{ marginLeft: '4px' }}>
                            {locationFilterOptions.map((location, index) => (
                                <div key={index} className="d-flex flex-row align-items-center" style={{ backgroundColor: locationFilter[index] === true ? '#FFF6F5' : 'transparent', padding: '3px 4px', marginBottom: '4px' }}>
                                    {locationFilter[index] === true && <img onClick={() => handleSetLocationFilter(index)} src={checkIconPink} alt="pink checked icon" style={{ width: '20px', height: '20px' }} />}
                                    {locationFilter[index] === false && <img onClick={() => handleSetLocationFilter(index)} src={checkboxIconWhite} alt="white checkbox" style={{ width: '20px', height: '20px' }} />}
                                    {locationFilter[index] === true && <span style={{ color: '#F07878', fontSize: '14px', fontWeight: '400', marginLeft: '8px' }}>{location}</span>}
                                    {locationFilter[index] === false && <span style={{ color: '#4B4B4B', fontSize: '14px', fontWeight: '400', marginLeft: '8px' }}>{location}</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 活動型態(A & B & C) */}
                    <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                        <p style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>活動型態</p>
                        <div className="d-flex flex-column" style={{ marginLeft: '4px' }}>
                            {venueFilterOptions.map((venue, index) => (
                                <div key={index} className="d-flex flex-row align-items-center" style={{ backgroundColor: venueFilter[index] === true ? '#FFF6F5' : 'transparent', padding: '3px 4px', marginBottom: '4px' }}>
                                    {venueFilter[index] === true && <img onClick={() => handleSetVenueFilter(index)} src={checkIconPink} alt="pink checked icon" style={{ width: '20px', height: '20px' }} />}
                                    {venueFilter[index] === false && <img onClick={() => handleSetVenueFilter(index)} src={checkboxIconWhite} alt="white checkbox" style={{ width: '20px', height: '20px' }} />}
                                    {venueFilter[index] === true && <span style={{ color: '#F07878', fontSize: '14px', fontWeight: '400', marginLeft: '8px' }}>{venue}</span>}
                                    {venueFilter[index] === false && <span style={{ color: '#4B4B4B', fontSize: '14px', fontWeight: '400', marginLeft: '8px' }}>{venue}</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 工作類型(C) */}
                    {searchTypeFilter[2] === true && <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                        <p style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>工作類型</p>
                        <div className="d-flex flex-column" style={{ marginLeft: '4px' }}>
                            {jobTypeFilterOptions.map((jobType, index) => (
                                <div key={index} className="d-flex flex-row align-items-center" style={{ backgroundColor: jobTypeFilter[index] === true ? '#FFF6F5' : 'transparent', padding: '3px 4px', marginBottom: '4px' }}>
                                    {jobTypeFilter[index] === true && <img onClick={() => handleSetJobTypeFilter(index)} src={checkIconPink} alt="pink checked icon" style={{ width: '20px', height: '20px' }} />}
                                    {jobTypeFilter[index] === false && <img onClick={() => handleSetJobTypeFilter(index)} src={checkboxIconWhite} alt="white checkbox" style={{ width: '20px', height: '20px' }} />}
                                    {jobTypeFilter[index] === true && <span style={{ color: '#F07878', fontSize: '14px', fontWeight: '400', marginLeft: '8px' }}>{jobType}</span>}
                                    {jobTypeFilter[index] === false && <span style={{ color: '#4B4B4B', fontSize: '14px', fontWeight: '400', marginLeft: '8px' }}>{jobType}</span>}
                                </div>
                            ))}
                        </div>
                    </div>}

                    {/* 講座類型(B) */}
                    {searchTypeFilter[1] === true && <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                        <p style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>講座類型</p>
                        <div className="d-flex flex-column" style={{ marginLeft: '4px' }}>
                            {topicFilterOptions.map((topic, index) => (
                                <div key={index} className="d-flex flex-row align-items-center" style={{ backgroundColor: topicFilter[index] === true ? '#FFF6F5' : 'transparent', padding: '3px 4px', marginBottom: '4px' }}>
                                    {topicFilter[index] === true && <img onClick={() => handleSetTopicFilter(index)} src={checkIconPink} alt="pink checked icon" style={{ width: '20px', height: '20px' }} />}
                                    {topicFilter[index] === false && <img onClick={() => handleSetTopicFilter(index)} src={checkboxIconWhite} alt="white checkbox" style={{ width: '20px', height: '20px' }} />}
                                    {topicFilter[index] === true && <span style={{ color: '#F07878', fontSize: '14px', fontWeight: '400', marginLeft: '8px' }}>{topic}</span>}
                                    {topicFilter[index] === false && <span style={{ color: '#4B4B4B', fontSize: '14px', fontWeight: '400', marginLeft: '8px' }}>{topic}</span>}
                                </div>
                            ))}
                        </div>
                    </div>}

                    {/* 活動日期(A & B & C) */}
                    <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                        <p style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>活動日期</p>
                        <div className="d-flex flex-column" style={{ marginLeft: '4px' }}>
                            {dateFilterOptions.map((date, index) => (
                                <div key={index} className="d-flex flex-row align-items-center" style={{ backgroundColor: dateFilter[index] === true ? '#FFF6F5' : 'transparent', padding: '3px 4px', marginBottom: '4px' }}>
                                    {dateFilter[index] === true && <img onClick={() => handleSetDateFilter(index)} src={checkIconPink} alt="pink checked icon" style={{ width: '20px', height: '20px' }} />}
                                    {dateFilter[index] === false && <img onClick={() => handleSetDateFilter(index)} src={checkboxIconWhite} alt="white checkbox" style={{ width: '20px', height: '20px' }} />}
                                    {dateFilter[index] === true && <span style={{ color: '#F07878', fontSize: '14px', fontWeight: '400', marginLeft: '8px' }}>{date}</span>}
                                    {dateFilter[index] === false && <span style={{ color: '#4B4B4B', fontSize: '14px', fontWeight: '400', marginLeft: '8px' }}>{date}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Filter */}
                <div className="d-flex flex-column" style={{ paddingLeft: '16px', width: 'calc(100% - 180px)' }}>
                    <div className="right-filter d-flex flex-column">
                        {/* Switch */}
                        <div className="switch d-flex flex-row w-100">
                            {searchTypeOptions.map((option, index) => (
                                <div onClick={() => handlesearchTypeFilter(index)} key={index} className={`switch-${index + 1} ${searchTypeFilter[index] === true ? 'active' : 'inactive'} col-4 d-flex flex-row align-items-center justify-content-center`}>
                                    {index === 0 && <img src={microphoneIconWhite} alt="white microphone icon" />}
                                    {index === 1 && <img src={graduateIconWhite} alt="white graduate icon" />}
                                    {index === 2 && <img src={suitcaseIconWhite} alt="white suitcase icon" />}
                                    <span>{option}</span>
                                </div>
                            ))}
                        </div>


                        <div className="keyword d-flex flex-row align-items-end justify-content-between">
                            <img className="search-icon" src={searchIconPink} alt="pink search icon" />
                            {/* Keyword */}
                            <input onKeyDown={(e) => { if (e.key === 'Enter' && e.target.value.trim().length > 0) { setKeywordSearch(e.target.value) } }} type="text" placeholder="以學校名稱搜尋場次" />

                            {/* Sort */}
                            <div className="d-flex flex-row align-items-center">
                                {/* 最熱門 */}
                                <button onClick={() => setSortPopular(!sortPopular)} className="d-flex popular-btn" style={{ color: sortPopular === true ? '#ec5656' : '#4b4b4b' }}>最熱門</button>

                                {/* 時間順序 */}
                                <div className="sort d-flex flex-column">
                                    {/* 顯示文字 */}
                                    {sortSelected[0] === false && sortSelected[1] === false && <div onMouseEnter={() => setSortDropdown(true)} onMouseLeave={() => setSortDropdown(false)} className="sort-btn type-1 d-flex">時間順序
                                        <img src={verticalExpandIcon} alt="vertical expand icon" />
                                    </div>}

                                    {sortSelected[0] === true && sortSelected[1] === false && <div onMouseEnter={() => setSortDropdown(true)} onMouseLeave={() => setSortDropdown(false)} className="sort-btn type-2 d-flex">
                                        <div className="d-flex flex-row align-items-center">
                                            <span>新</span>
                                            <img className="arrow-icon" src={pointRightIcon} alt="point right icon" />
                                            <span>舊</span>
                                        </div>
                                        <img src={verticalExpandIcon} alt="vertical expand icon" />
                                    </div>}

                                    {sortSelected[0] === false && sortSelected[1] === true && <div onMouseEnter={() => setSortDropdown(true)} onMouseLeave={() => setSortDropdown(false)} className="sort-btn type-2 d-flex">
                                        <div className="d-flex flex-row align-items-center">
                                            <span>舊</span>
                                            <img className="arrow-icon" src={pointRightIcon} alt="point right icon" />
                                            <span>新</span>
                                        </div>
                                        <img src={verticalExpandIcon} alt="vertical expand icon" />
                                    </div>}

                                    {/* 下拉選單 */}
                                    {sortDropdown === true && <div onMouseEnter={() => setSortDropdown(true)} onMouseLeave={() => setSortDropdown(false)} className="sort-dropdown d-flex flex-column">
                                        <div onClick={() => setSortSelected([!sortSelected[0], false])} className={`${sortSelected[0] === true ? 'active' : 'inactive'} sort-option d-flex flex-row`}>
                                            <span>新</span>
                                            <img src={pointRightIcon} alt="point right icon" />
                                            <span>舊</span>
                                        </div>
                                        <div onClick={() => setSortSelected([false, !sortSelected[1]])} className={`${sortSelected[1] === true ? 'active' : 'inactive'} sort-option d-flex flex-row`}>
                                            <span>舊</span>
                                            <img src={pointRightIcon} alt="point right icon" />
                                            <span>新</span>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="search-event-results d-flex flex-column">
                            {/* Item */}
                            {setFakeData(5).map((element, index) => (
                                <div key={index} className="search-result d-flex flex-row align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        {/* Calendar */}
                                        <CalendarXS width="56" height="56" month="7" date="2" />

                                        {/* Logo */}
                                        <img className="host-logo" src="https://i.postimg.cc/kgCMmDHt/microsoft.png" alt="host logo" />

                                        {/* Event Title & Host Name */}
                                        <div className="event-info d-flex-flex-column">
                                            <p className="event-title">【2022實習─Start Up Online - 達人請上線】電子工程實習生</p>
                                            <p className="host-name">台達電子工業股份有限公司 _DELTA ELECTRONICS INC.</p>
                                        </div>

                                    </div>

                                    {/* More Info */}
                                    <div className="more-info d-flex flex-column">
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={landmarkIconGray} alt="location icon" />
                                            <span>台中工業區</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={clockIconGray} alt="time icon" />
                                            <span>18:00 - 19:30</span>
                                        </div>
                                        {searchTypeFilter[2] === true && <div className="d-flex flex-row align-items-center">
                                            <img src={suitcaseIconGray} alt="job type icon" />
                                            <span>正職</span>
                                        </div>}
                                        {searchTypeFilter[1] === true && <div className="d-flex flex-row align-items-center">
                                            <img src={blocksIconGray} alt="event topic icon" />
                                            <span>職涯成長工作坊</span>
                                        </div>}
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={face2faceIconGray} alt="event type: virtual or face-to-face" />
                                            <span>實體</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="d-flex flex-row justify-content-end">
                                <div className="see-more-event-btn d-flex flex-row align-items-center">
                                    <span>查看更多場次</span>
                                    <img src={arrowRightIcon} alt="arrow right icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Block 3: Recommended Companies */}
            <RecommendedCompanies />

            {/* Block 4: Calendar */}
            <div className="calendar">
                {/* Top */}
                <div className="calendar-title d-flex flex-row">
                    <img src={calendarIconWhite} alt="white calendar icon" />
                    <span>活動行事曆</span>
                </div>

                {/* Bottom */}
                <div className="row g-0">
                    {/* Left */}
                    <div className="left-column col-9" style={{ paddingRight: '9.5px' }}>
                        {/* Switch */}
                        <div className="calendar-switch d-flex flex-row align-items-end justify-content-between">
                            {/* Switch Month */}
                            <div className="switch-event-month d-flex flex-row align-items-end">
                                <img src={arrowLeftIcon} alt="arrow left icon" />
                                <div className="year-month d-flex flex-column align-items-center">
                                    <span>{currentYear}</span>
                                    <span>{MonthNumToEn(currentMonth - 1)} {MonthNumToCn(currentMonth - 1)}</span>
                                </div>
                                <img src={arrowRightIcon} alt="arrow right icon" />
                            </div>

                            {/* Switch Type */}
                            <div className="switch-event-type d-flex flex-row align-items-end">
                                <button onClick={() => selectedType === 'A' ? setSelectedType('') : setSelectedType('A')} className={`${selectedType === 'A' ? 'active' : 'inactive'} d-flex flex-row`}>
                                    {selectedType === 'A' && <img src={checkIconPink} alt="pink check icon" />}
                                    <span>顯示所有校園徵才</span>
                                </button>

                                <button onClick={() => selectedType === 'B' ? setSelectedType('') : setSelectedType('B')} className={`${selectedType === 'B' ? 'active' : 'inactive'} d-flex flex-row`}>
                                    {selectedType === 'B' && <img src={checkIconPink} alt="pink check icon" />}
                                    <span>顯示所有校園講座</span>
                                </button>

                                <button onClick={() => selectedType === 'C' ? setSelectedType('') : setSelectedType('C')} className={`${selectedType === 'C' ? 'active' : 'inactive'} d-flex flex-row`}>
                                    {selectedType === 'C' && <img src={checkIconPink} alt="pink check icon" />}
                                    <span>顯示所有實習與正職說明會</span>
                                </button>
                            </div>
                        </div>

                        {/* Weekday */}
                        <div className="calendar-weekday d-flex flex-row">
                            <div className="weekday weekday-dark d-flex flex-column align-items-center justify-content-center">
                                <span>日</span>
                                <span>Sun</span>
                            </div>
                            <div className="weekday weekday-light d-flex flex-column align-items-center justify-content-center">
                                <span>一</span>
                                <span>Mon</span>
                            </div>
                            <div className="weekday weekday-light d-flex flex-column align-items-center justify-content-center">
                                <span>二</span>
                                <span>Tue</span>
                            </div>
                            <div className="weekday weekday-light d-flex flex-column align-items-center justify-content-center">
                                <span>三</span>
                                <span>Wed</span>
                            </div>
                            <div className="weekday weekday-light d-flex flex-column align-items-center justify-content-center">
                                <span>四</span>
                                <span>Thu</span>
                            </div>
                            <div className="weekday weekday-light d-flex flex-column align-items-center justify-content-center">
                                <span>五</span>
                                <span>Fri</span>
                            </div>
                            <div className="weekday weekday-dark d-flex flex-column align-items-center justify-content-center">
                                <span>六</span>
                                <span>Sat</span>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="calendar-items row g-0 flex-wrap w-100">
                            {datesToDisplay.map((item, index) => (
                                <div key={index} className={`calendar-item d-flex flex-column ${item.active ? 'active' : 'inactive'} ${item.year === currentYear && item.month === currentMonth && item.date === currentDate ? 'today' : ''}  ${item.year === selectedDate.year && item.month === selectedDate.month && item.date === selectedDate.date ? 'selected' : ''} `}>
                                    <div className="top d-flex flex-row">
                                        <span>{item.date}</span>
                                    </div>

                                    <div className="bottom d-flex flex-column h-100">
                                        {item.labels.length > 0 && item.labels.slice(0, 4).map((label, index) => (
                                            <div key={index} className={`label d-flex type-${label}`}>{EventTypeMap[label]}</div>
                                        ))}
                                    </div>

                                    {item.labels.length > 4 && <img src={lookForMoreIcon} alt="white look for more icon" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right */}
                    <div className="right-column col-3" style={{ paddingLeft: '9.5px' }}>
                        <div className="daily-event-info">
                            <div className="date d-flex flex-row">7月3日 週日</div>

                            {/* 本日活動項目 */}
                            <div className="event-infos d-flex flex-column">
                                {/* Item */}
                                <div className="event-info d-flex flex-column">
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        {/* Tag */}
                                        <div className="tag">校園講座</div>
                                        {/* Status */}
                                        <span className="status active">報名中</span>
                                        {/* <span className="status inactive">已關閉</span> */}
                                    </div>
                                    {/* Title */}
                                    <p className="title">當人生也面臨選擇障礙，你會選擇勇敢出走還是留下來 - 選擇、出走及挑戰，哪個是…</p>
                                    {/* Other Info */}
                                    <div className="others d-flex flex-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={clockIconGray} alt="gray clock icon" />
                                            <span>13:00 - 14:30</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={landmarkIconGray} alt="gray location icon" />
                                            <span>台中市</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={blocksIconGray} alt="gray blocks icon" />
                                            <span>中興大學</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Item */}
                                <div className="event-info d-flex flex-column">
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        {/* Tag */}
                                        <div className="tag">校園講座</div>
                                        {/* Status */}
                                        <span className="status active">報名中</span>
                                        {/* <span className="status inactive">已關閉</span> */}
                                    </div>
                                    {/* Title */}
                                    <p className="title">當人生也面臨選擇障礙，你會選擇勇敢出走還是留下來 - 選擇、出走及挑戰，哪個是…</p>
                                    {/* Other Info */}
                                    <div className="others d-flex flex-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={clockIconGray} alt="gray clock icon" />
                                            <span>13:00 - 14:30</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={landmarkIconGray} alt="gray location icon" />
                                            <span>台中市</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={blocksIconGray} alt="gray blocks icon" />
                                            <span>中興大學</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Item */}
                                <div className="event-info d-flex flex-column">
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        {/* Tag */}
                                        <div className="tag">校園講座</div>
                                        {/* Status */}
                                        <span className="status active">報名中</span>
                                        {/* <span className="status inactive">已關閉</span> */}
                                    </div>
                                    {/* Title */}
                                    <p className="title">當人生也面臨選擇障礙，你會選擇勇敢出走還是留下來 - 選擇、出走及挑戰，哪個是…</p>
                                    {/* Other Info */}
                                    <div className="others d-flex flex-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={clockIconGray} alt="gray clock icon" />
                                            <span>13:00 - 14:30</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={landmarkIconGray} alt="gray location icon" />
                                            <span>台中市</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={blocksIconGray} alt="gray blocks icon" />
                                            <span>中興大學</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Item */}
                                <div className="event-info d-flex flex-column">
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        {/* Tag */}
                                        <div className="tag">校園講座</div>
                                        {/* Status */}
                                        <span className="status active">報名中</span>
                                        {/* <span className="status inactive">已關閉</span> */}
                                    </div>
                                    {/* Title */}
                                    <p className="title">當人生也面臨選擇障礙，你會選擇勇敢出走還是留下來 - 選擇、出走及挑戰，哪個是…</p>
                                    {/* Other Info */}
                                    <div className="others d-flex flex-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={clockIconGray} alt="gray clock icon" />
                                            <span>13:00 - 14:30</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={landmarkIconGray} alt="gray location icon" />
                                            <span>台中市</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={blocksIconGray} alt="gray blocks icon" />
                                            <span>中興大學</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Item */}
                                <div className="event-info d-flex flex-column">
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        {/* Tag */}
                                        <div className="tag">校園講座</div>
                                        {/* Status */}
                                        <span className="status active">報名中</span>
                                        {/* <span className="status inactive">已關閉</span> */}
                                    </div>
                                    {/* Title */}
                                    <p className="title">當人生也面臨選擇障礙，你會選擇勇敢出走還是留下來 - 選擇、出走及挑戰，哪個是…</p>
                                    {/* Other Info */}
                                    <div className="others d-flex flex-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={clockIconGray} alt="gray clock icon" />
                                            <span>13:00 - 14:30</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={landmarkIconGray} alt="gray location icon" />
                                            <span>台中市</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={blocksIconGray} alt="gray blocks icon" />
                                            <span>中興大學</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Item */}
                                <div className="event-info d-flex flex-column">
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        {/* Tag */}
                                        <div className="tag">校園講座</div>
                                        {/* Status */}
                                        <span className="status active">報名中</span>
                                        {/* <span className="status inactive">已關閉</span> */}
                                    </div>
                                    {/* Title */}
                                    <p className="title">當人生也面臨選擇障礙，你會選擇勇敢出走還是留下來 - 選擇、出走及挑戰，哪個是…</p>
                                    {/* Other Info */}
                                    <div className="others d-flex flex-row align-items-center justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={clockIconGray} alt="gray clock icon" />
                                            <span>13:00 - 14:30</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={landmarkIconGray} alt="gray location icon" />
                                            <span>台中市</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <img src={blocksIconGray} alt="gray blocks icon" />
                                            <span>中興大學</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 本日無任何活動 */}
                            <div className="no-event d-none flex-column">
                                <div className="event-infos d-flex flex-column">
                                    <p>本日無任何活動</p>
                                </div>
                            </div>
                        </div>

                        <p className="tips mb-0">Lorem ipsum dolor sit amet, consectetur</p>
                    </div>
                </div>

            </div>
        </div >
    );
}

export default Events;