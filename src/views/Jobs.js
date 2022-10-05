// Fix button outline or box-shadow; input style; 
// Labels too much 
// option button width 
// reset labels on hover 

import useFetch from "../hooks/useFetch";
import { Link, useResolvedPath } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import { setFakeData, setSalary } from "../utils/index";

import "../assets/scss/jobs.scss";

import checkIcon from "../assets/img/icon-check.svg"
import searchIconGreen from "../assets/img/icon-search-green.svg"
import closeIconGreen from "../assets/img/icon-close-green.svg"
import closeIconWhite from "../assets/img/icon-close-white.svg"
import closeIconGray from "../assets/img/icon-close-gray.svg"
import geometryIconGreen from "../assets/img/icon-geometry-green.svg"
import landmarkIconGreen from "../assets/img/icon-landmark-green.svg"
import billIconGreen from "../assets/img/icon-bill-green.svg"
import labelIconGreen from "../assets/img/icon-label-green.svg"
import fireIconGreen from "../assets/img/icon-fire-green.svg"
import fireIconWhite from "../assets/img/icon-fire-white.svg"
import arrowDownIcon from "../assets/img/icon-arrow-down.svg"
import resetIcon from "../assets/img/icon-reset.svg"
import resetIconGray from "../assets/img/icon-reset-gray.svg"
import verticalExpandIcon from "../assets/img/icon-vertical-expand.svg"
import lightningIcon from "../assets/img/icon-lightning.svg"
import labelIconGray from "../assets/img/icon-label-gray.svg"
import landmarkIconGray from "../assets/img/icon-landmark-gray.svg"
import blocksIconGray from "../assets/img/icon-blocks-gray.svg"
import billIconGray from "../assets/img/icon-bill-gray.svg"
import heartIcon from "../assets/img/icon-heart.svg"
import polygonIconWhite from "../assets/img/icon-polygon-white.svg";
import job1 from '../assets/img/img-job-1.png'
import advertisingBanner1 from '../assets/img/img-advertising-banner-1.png'
import FindJob from "../components/button/FindJob";
import FindCompany from "../components/button/FindCompany";
import Pagination from "../components/Pagination";

const Jobs = () => {
    // Notes - Filter Options: 
    // 職務類別 - type (前端工程, 半導體...);
    // 工作地點 - location (台北市, 台中市...);
    // 薪資待遇 - salary ();
    // 職缺標籤 - label ();
    // 熱門職缺 - popular (true, false); == 應徵人數高到低
    // 更新日期 - lastUpdated (1, 7, 14, 21, 30);
    // 上班時段 - workTime (day, ngith, midnight, weekend);
    // 休假制度 - leavePolicy ('A': '週休二日', 'B': '隔週休', 'C': '排班制', 'D': '三班制');
    // 應徵人數 - applyCnt (asc, desc);
    // 日期新舊 - date (asc, desc);
    // 薪資高低 - salary (asc, desc);

    // URL Search Params
    const queryParams = new URLSearchParams(window.location.search);
    // const [reqParams, setReqParams] = useState(
    //     {
    //         type: queryParams.get("type") == null ? null : queryParams.get("type"),
    //         location: queryParams.get("location") == null ? null : queryParams.get("location"),
    //         salary: queryParams.get("salary") == null ? null : queryParams.get("salary"),
    //         label: queryParams.get("label") == null ? null : queryParams.get("label"),
    //         popular: queryParams.get("popular") == null ? false : true,
    //         lastUpdated: queryParams.get("lastUpdated") == null ? null : queryParams.get("lastUpdated"),
    //         workTime: queryParams.get("workTime") == null ? null : queryParams.get("workTime"),
    //         leavePolicy: queryParams.get("leavePolicy") == null ? null : queryParams.get("leavePolicy"),
    //         applicantOrd: queryParams.get("applicantOrd") == null ? null : queryParams.get("applicantOrd"),
    //         dateOrd: queryParams.get("dateOrd") == null ? null : queryParams.get("dateOrd"),
    //         salaryOrd: queryParams.get("salaryOrd") == null ? null : queryParams.get("salaryOrd")
    //     }
    // );

    const [popularJob, setPopularJob] = useState(queryParams.get("popularJob") == null ? false : true);
    const handlePopularJob = (status) => {
        setPopularJob(status);
    }

    // Request Parameters
    const [reqParams, setReqParams] = useState({ type: [], location: [], salary: [], label: [], popularJob: popularJob });
    const handleReqParams = (category, data) => {
        var temReqObject = reqParams;
        switch (category) {
            case 'type':
                temReqObject.type.push(data);
                setReqParams(temReqObject);
                break;
            case 'location':
                temReqObject.location.push(data);
                setReqParams(temReqObject);
                break;
            case 'salary':
                console.log('Request Params: salary');
                break;
            case 'label':
                temReqObject.label.push(data);
                setReqParams(temReqObject);
                break;
        }
    }

    // Send Request
    const handleSendReq = () => {
        console.log('send new request')
        console.log(reqParams)
    }


    // Fetch Data
    // const { data: jobs, isPending: jobIsPending, error: jobError } = useFetch('http://localhost:8000/filteredJobs');
    const [jobs, setData] = useState(null);
    const [jobIsPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();
        fetch('http://localhost:8000/filteredJobs', { signal: abortCont.signal })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw Error('Could not fetch data');
                }
            })
            .then(data => {
                setData(data);
                // setJobs(data, reqParams);
                // filterData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    console.log(err);
                    setIsPending(false);
                    setError(err.message);
                }
            })

        return () => abortCont.abort();
    }, [])

    // const filterData = (data, reqParams) => {
    //     if (reqParams.popularJob) {
    //         setJobs(data.sort((a, b) => {
    //             return b.savedCnt - a.savedCnt;
    //         }))
    //     } else {
    //         console.log(reqParams)
    //         // Type
    //         // Location
    //         // Salary
    //         // Label
    //     }
    // }

    // JobTypeOptions
    const jobTypeOptions = {
        'A': [
            {
                id: 'A1',
                name: '前端工程'
            },
            {
                id: 'A2',
                name: '後端工程'
            },
            {
                id: 'A3',
                name: '全端工程'
            },
            {
                id: 'A4',
                name: '行動裝置開發'
            },
            {
                id: 'A5',
                name: '遊戲開發'
            },
            {
                id: 'A6',
                name: '測試工程'
            },
            {
                id: 'A7',
                name: 'DevOps / SRE'
            },
        ],
        'B': [
            {
                id: 'B1',
                name: '韌體 / 電子電路'
            },
            {
                id: 'B2',
                name: '硬體工程'
            },
            {
                id: 'B3',
                name: '半導體'
            },
            {
                id: 'B4',
                name: '光電工程'
            },
            {
                id: 'B5',
                name: 'MIS / 網路管理'
            },
            {
                id: 'B6',
                name: '通訊電信'
            },

        ],
        'C': [
            {
                id: 'C1',
                name: '資料工程 / 機器學習'
            }
        ],
        'D': [
            {
                id: 'D1',
                name: '行銷企劃 / 社群經營'
            },
            {
                id: 'D2',
                name: '編輯 / 內容經營'
            },
            {
                id: 'D3',
                name: '廣告創意 / 企劃'
            },
            {
                id: 'D4',
                name: '攝影 / 影音製作'
            },
            {
                id: 'D5',
                name: 'Growth Hacker'
            },
            {
                id: 'D6',
                name: '媒體公關 / 宣傳採買'
            },
            {
                id: 'D7',
                name: '通訊電信'
            },
        ],
        'E': [
            {
                id: 'E1',
                name: '人資'
            },
            {
                id: 'E2',
                name: '財務 / 會計'
            },
            {
                id: 'E3',
                name: '行政'
            },
            {
                id: 'E4',
                name: '營運'
            },
            {
                id: 'E5',
                name: '客戶服務'
            },
            {
                id: 'E6',
                name: '法務'
            },
        ],
        'F': [
            {
                id: 'F1',
                name: '商業開發'
            },
            {
                id: 'F2',
                name: '通路開發'
            },
            {
                id: 'F3',
                name: '實體經營'
            },
            {
                id: 'F4',
                name: '市場分析'
            },
            {
                id: 'F5',
                name: '銷售業務'
            },
        ],
        'G': [
            {
                id: 'G1',
                name: '專案 / 產品設計'
            },
            {
                id: 'G2',
                name: 'UIUX / 視覺設計'
            },
            {
                id: 'G3',
                name: '3D / 動畫設計'
            },
        ],
        'H': [
            {
                id: 'H1',
                name: '教育 / 教學'
            },
            {
                id: 'H2',
                name: '外語高手'
            },
            {
                id: 'H3',
                name: '研究人員'
            },
            {
                id: 'H4',
                name: '其它'
            },
        ],
    }

    const handleSetJobType = (id) => {
        setJobType(id);
    }

    // JobLocationOptions
    const jobLocationOptions = {
        'North': [
            {
                id: 'North1',
                name: '台北市'
            },
            {
                id: 'North2',
                name: '新北市'
            },
            {
                id: 'North3',
                name: '基隆市'
            },
            {
                id: 'North4',
                name: '桃園市'
            },
            {
                id: 'North5',
                name: '新竹縣'
            },
            {
                id: 'North6',
                name: '新竹市'
            },
            {
                id: 'North7',
                name: '苗栗縣'
            },
        ],
        'Center': [
            {
                id: 'Center1',
                name: '台中市'
            },
            {
                id: 'Center2',
                name: '彰化縣'
            },
            {
                id: 'Center3',
                name: '南投縣'
            },
            {
                id: 'Center4',
                name: '雲林縣'
            },
            {
                id: 'Center5',
                name: '嘉義縣'
            },
            {
                id: 'Center6',
                name: '嘉義市'
            },
        ],
        'South': [
            {
                id: 'South1',
                name: '台南市'
            },
            {
                id: 'South2',
                name: '高雄市'
            },
            {
                id: 'South3',
                name: '屏東縣'
            },
        ],
        'East': [
            {
                id: 'East1',
                name: '花蓮縣'
            },
            {
                id: 'East2',
                name: '台東縣'
            },
            {
                id: 'East3',
                name: '離島'
            },
            {
                id: 'East4',
                name: '海外'
            },
        ],
    }

    const handleSetJobLocation = (id) => {
        setJobLocation(id);
    }

    // JobLabelOptions
    const jobLabelOptions = [
        {
            id: 'label1',
            name: '電商'
        },
        {
            id: 'label2',
            name: '前端工程'
        },
        {
            id: 'label3',
            name: '數位行銷'
        },
        {
            id: 'label4',
            name: 'JavaScript'
        },
        {
            id: 'label5',
            name: 'APP'
        },
        {
            id: 'label6',
            name: 'O2O'
        },
        {
            id: 'label7',
            name: '數位內容'
        },
        {
            id: 'label8',
            name: '新創'
        },
        {
            id: 'label9',
            name: 'Python'
        },
        {
            id: 'label10',
            name: 'HTML/CSS'
        },
        {
            id: 'label11',
            name: '軟體開發'
        },
        {
            id: 'label12',
            name: 'AI'
        },
        {
            id: 'label13',
            name: '資訊平台'
        },
        {
            id: 'label14',
            name: 'Java'
        },
        {
            id: 'label15',
            name: '平台'
        },
        {
            id: 'label16',
            name: '教育'
        },
        {
            id: 'label17',
            name: '網路新創'
        },
        {
            id: 'label18',
            name: 'SQL'
        },
        {
            id: 'label19',
            name: 'BigData'
        },
        {
            id: 'label20',
            name: 'FinTech'
        },
        {
            id: 'label21',
            name: '物聯網'
        },
    ]

    const handleSetJobLabels = (id) => {
        setJobLabels(id);
    }

    // Select Filter
    const [jobType, setJobType] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobSalary, setJobSalary] = useState({ custom: true, type: '月薪', start: "", end: "" });
    const [jobLabels, setJobLabels] = useState("");
    // JobSalary
    const inputStart = useRef(null);  // 自訂薪資範圍
    const inputEnd = useRef(null);    // 自訂薪資範圍
    const handleSetSalary = (custom, type, start = jobSalary.start, end = jobSalary.end) => {

        if (custom === false) {
            inputStart.current.value = "";
            inputEnd.current.value = "";
        }

        var reg = /^\d+$/;
        let temp = { custom: custom, type: type, start: start && reg.test(start.trim()) ? start : "", end: end && reg.test(end.trim()) && reg.test(start.trim()) && parseInt(start) <= parseInt(end) ? end : "" };
        setJobSalary(temp);
    }
    // 自訂薪資標籤
    const [customSalary, setCustomSalary] = useState({ display: false, type: "", start: "", end: "" });
    const handleCustomSalary = (display) => {   // 送出自訂薪資條件
        let temp = { display: display, type: jobSalary.type, start: jobSalary.start, end: jobSalary.end };
        setCustomSalary(temp);
    }


    // Filter Labels (Selected)
    const [labelsArray, setLabelsArray] = useState([]);
    // 加入 Filter Label Array
    const handleAddLabels = (id, name) => {
        // console.log(`label added: id - ${id} & name - ${name}`)
        if (id === 'Salary') {
            var filteredArray = labelsArray.filter(e => e.name == name);
        } else {
            var filteredArray = labelsArray.filter(e => e.id == id);
        }

        console.log(filteredArray)
        if (filteredArray.length == 0) {
            var tempArray = labelsArray;  // Check how to write this better
            tempArray.push({ id: id, name: name })
            setLabelsArray(tempArray);
            console.log(labelsArray)
        }
    }
    // 移除 Filter Label Array
    const handleRemoveLabels = (id, name) => {
        if (id == 'Salary') {
            var filteredArray = labelsArray.filter(e => e.name !== name);
        } else {
            var filteredArray = labelsArray.filter(e => e.id !== id);
        }
        setLabelsArray(filteredArray);
    }
    // 重置 Filter Label Array
    const handleResetLabels = () => {
        setLabelsArray([]);
    }

    // Display Filter Dropdown
    const [filterDropdown1, setFilterDropdown1] = useState(false);
    const [filterDropdown2, setFilterDropdown2] = useState(false);
    const [filterDropdown3, setFilterDropdown3] = useState(false);
    const [filterDropdown3Sub, setFilterDropdown3Sub] = useState(false);
    const [filterDropdown4, setFilterDropdown4] = useState(false);
    const handleFilterDropdown1 = (status) => {
        if (status === true) {
            setFilterDropdown2(false);
            setFilterDropdown3(false);
            setFilterDropdown3Sub(false);
            setFilterDropdown4(false);
        }
        setFilterDropdown1(status);
    }
    const handleFilterDropdown2 = (status) => {
        if (status === true) {
            setFilterDropdown1(false);
            setFilterDropdown3(false);
            setFilterDropdown3Sub(false);
            setFilterDropdown4(false);
        }
        setFilterDropdown2(status);
    }
    const handleFilterDropdown3 = (status) => {
        if (status === true) {
            setFilterDropdown1(false);
            setFilterDropdown2(false);
            setFilterDropdown4(false);
        } else {
            setFilterDropdown3Sub(false);
            // setCustomSalary({ display: false, type: "", start: "", end: "" });
            // setJobSalary({ custom: true, type: '月薪', start: "", end: "" })
        }
        setFilterDropdown3(status);
    }
    const handleFilterDropdown3Sub = (status) => {
        if (status === true) {
            setFilterDropdown1(false);
            setFilterDropdown2(false);
            setFilterDropdown4(false);
        }
        setFilterDropdown3Sub(status);
    }
    const handleFilterDropdown4 = (status) => {
        if (status === true) {
            setFilterDropdown1(false);
            setFilterDropdown2(false);
            setFilterDropdown3(false);
            setFilterDropdown3Sub(false);
        }
        setFilterDropdown4(status);
    }

    return (
        <div className="jobs">
            {/* Top: Search */}
            <div className="top-block">
                <div className="d-flex flex-column">
                    {/* Switch Buttons: Find jobs | Find Companies */}
                    <div className="d-flex flex-row w-100 justify-content-center">
                        <FindJob isActive={true} />
                        <FindCompany isActive={false} />
                    </div>

                    {/* Search Keyword */}
                    <div className="keyword">
                        <input type="text" placeholder="輸入公司名、職務或關鍵字" />
                        <button className="search-icon"><img src={searchIconGreen} alt="search icon" /></button>
                        <button className="close-icon"><img src={closeIconGreen} alt="close icon" /></button>
                    </div>

                    {/* Filters */}
                    <div className="d-flex flex-row justify-content-between" style={{ width: '100%', height: '50px', marginTop: '16px' }}>
                        <div className="filter-job-type">
                            {/* 職務類別 */}
                            <button onClick={() => handleFilterDropdown1(!filterDropdown1)} className="d-flex flex-row align-items-center justify-content-between">
                                <div>
                                    <img className="filter-icon" src={geometryIconGreen} alt="job type icon" />
                                    <span className="filter-name">職務類別</span>
                                </div>
                                <img className="arrow-down" src={arrowDownIcon} alt="arrow down icon" />
                            </button>

                            {/* 職務類別 下拉選單 */}
                            <div style={{ display: filterDropdown1 ? 'flex' : 'none' }} className="dropdown-area flex-row">
                                {/* Polygon */}
                                <img className="white-polygon" src={polygonIconWhite} alt="white polygon icon" />
                                <div className="dropdown-column column-1 d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">軟體開發</p>
                                    {jobTypeOptions.A.map((option) => (
                                        <div key={option.id} onClick={(e) => { handleFilterDropdown1(false); handleSetJobType(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('type', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                    ))}
                                </div>

                                <div className="dropdown-column column-2 d-flex flex-column">
                                    <div className="d-flex flex-column align-items-center w-100">
                                        <p className="category-title mb-0">軟硬體系統整合</p>
                                        {jobTypeOptions.B.map((option) => (
                                            <div key={option.id} onClick={(e) => { handleFilterDropdown1(false); handleSetJobType(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('type', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                        ))}
                                    </div>
                                    <div className="d-flex flex-column align-items-center w-100" style={{ marginTop: '8px' }}>
                                        <p className="category-title mb-0">資料工程 / 機器學習</p>
                                        {jobTypeOptions.C.map((option) => (
                                            <div key={option.id} onClick={(e) => { handleFilterDropdown1(false); handleSetJobType(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('type', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                        ))}
                                    </div>
                                </div>

                                <div className="dropdown-column column-3 d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">行銷 / 企劃 / 內容</p>
                                    {jobTypeOptions.D.map((option) => (
                                        <div key={option.id} onClick={(e) => { handleFilterDropdown1(false); handleSetJobType(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('type', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                    ))}
                                </div>

                                <div className="dropdown-column column-4 d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">營運</p>
                                    {jobTypeOptions.E.map((option) => (
                                        <div key={option.id} onClick={(e) => { handleFilterDropdown1(false); handleSetJobType(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('type', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                    ))}
                                </div>

                                <div className="dropdown-column column-5 d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">市場開發</p>
                                    {jobTypeOptions.F.map((option) => (
                                        <div key={option.id} onClick={(e) => { handleFilterDropdown1(false); handleSetJobType(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('type', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                    ))}
                                </div>

                                <div className="dropdown-column column-6 d-flex flex-column">
                                    <div className="d-flex flex-column align-items-center w-100">
                                        <p className="category-title mb-0">產品 / 設計</p>
                                        {jobTypeOptions.G.map((option) => (
                                            <div key={option.id} onClick={(e) => { handleFilterDropdown1(false); handleSetJobType(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('type', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                        ))}
                                    </div>
                                    <div className="d-flex flex-column align-items-center w-100" style={{ marginTop: '8px' }}>
                                        <p className="category-title mb-0">其它</p>
                                        {jobTypeOptions.H.map((option) => (
                                            <div key={option.id} onClick={(e) => { handleFilterDropdown1(false); handleSetJobType(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('type', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="filter-job-location">
                            {/* 工作地點 */}
                            <button onClick={() => handleFilterDropdown2(!filterDropdown2)} className="d-flex flex-row align-items-center justify-content-between">
                                <div>
                                    <img className="filter-icon" src={landmarkIconGreen} alt="job type icon" />
                                    <span className="filter-name">工作地點</span>
                                </div>
                                <img className="arrow-down" src={arrowDownIcon} alt="arrow down icon" />
                            </button>

                            {/* 工作地點 下拉選單 */}
                            <div style={{ display: filterDropdown2 ? 'flex' : 'none' }} className="dropdown-area flex-row">
                                {/* Polygon */}
                                <img className="white-polygon" src={polygonIconWhite} alt="white polygon icon" />
                                <div className="dropdown-column column-1 d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">北部</p>
                                    {jobLocationOptions.North.map((option) => (
                                        <div key={option.id} onClick={(e) => { handleFilterDropdown2(false); handleSetJobLocation(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('location', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                    ))}
                                </div>

                                <div className="dropdown-column column-2 column d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">中部</p>
                                    {jobLocationOptions.Center.map((option) => (
                                        <div key={option.id} onClick={(e) => { handleFilterDropdown2(false); handleSetJobLocation(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('location', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                    ))}
                                </div>

                                <div className="dropdown-column column-3 column d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">南部</p>
                                    {jobLocationOptions.South.map((option) => (
                                        <div key={option.id} onClick={(e) => { handleFilterDropdown2(false); handleSetJobLocation(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('location', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                    ))}
                                </div>

                                <div className="dropdown-column column-4 column d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">東部 / 離島</p>
                                    {jobLocationOptions.East.map((option) => (
                                        <div key={option.id} onClick={(e) => { handleFilterDropdown2(false); handleSetJobLocation(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('location', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="filter-job-salary">
                            {/* 薪資待遇  */}
                            <button onClick={() => handleFilterDropdown3(!filterDropdown3)} className="d-flex flex-row align-items-center justify-content-between">
                                <div>
                                    <img className="filter-icon" src={billIconGreen} alt="job type icon" />
                                    <span className="filter-name">薪資待遇 </span>
                                </div>
                                <img className="arrow-down" src={arrowDownIcon} alt="arrow down icon" />
                            </button>

                            {/* 薪資待遇 下拉選單 */}
                            <div style={{ display: filterDropdown3 ? 'flex' : 'none' }} className="dropdown-area flex-column">
                                {/* Polygon */}
                                <img className="white-polygon" src={polygonIconWhite} alt="white polygon icon" />

                                <div className="d-flex flex-row row-1 align-items-center">
                                    <span className="category-title">薪資條件：</span>
                                    <div onClick={() => { handleSetSalary(false, "月薪", "30000", ""); handleCustomSalary(false); }} className={`option d-flex flex-row ${jobSalary.custom === false && jobSalary.start === "30000" ? 'active' : ''}`}>
                                        {jobSalary.custom === false && jobSalary.start === "30000" && <img src={checkIcon} alt="check icon" />}
                                        <span>月薪3萬up</span>
                                    </div>
                                    <div onClick={() => { handleSetSalary(false, "月薪", "40000", ""); handleCustomSalary(false); }} className={`option d-flex flex-row ${jobSalary.custom === false && jobSalary.start === "40000" ? 'active' : ''}`}>
                                        {jobSalary.custom === false && jobSalary.start === "40000" && <img src={checkIcon} alt="check icon" />}
                                        <span>月薪4萬up</span>
                                    </div>
                                    <div onClick={() => { handleSetSalary(false, "月薪", "50000", ""); handleCustomSalary(false); }} className={`option d-flex flex-row ${jobSalary.custom === false && jobSalary.start === "50000" ? 'active' : ''}`}>
                                        {jobSalary.custom === false && jobSalary.start === "50000" && <img src={checkIcon} alt="check icon" />}
                                        <span>月薪5萬up</span>
                                    </div>
                                </div>

                                <div className="d-flex flex-column row-2">
                                    <div className="d-flex flex-row align-items-center" style={{ marginBottom: '10px' }}>
                                        <span className="category-title">自訂條件：</span>
                                        {customSalary.display && customSalary.start && <div className="d-flex align-items-center" style={{ marginLeft: '12px' }}>
                                            <span style={{ color: '#1DAFAA', fontSize: '14px', fontWeight: '400' }}>{`${customSalary.type} ${parseInt(customSalary.start).toLocaleString()} ${customSalary.end ? ' ~ ' + parseInt(customSalary.end).toLocaleString() : ''}`}</span>
                                            <img onClick={() => handleCustomSalary(false)} src={closeIconGray} alt="gray close icon" style={{ marginLeft: '4px', width: '18px', height: '18px', cursor: 'pointer' }} />
                                        </div>}
                                    </div>
                                    <div className="custom-filter d-flex flex-row align-items-center">
                                        <div onMouseEnter={() => handleFilterDropdown3Sub(true)} className="salary-type d-flex flex-row align-items-center">
                                            <div>{jobSalary.type}</div>
                                            <img src={arrowDownIcon} alt="arrow down icon" />
                                        </div>

                                        <div onMouseEnter={() => handleFilterDropdown3Sub(true)} onMouseLeave={() => handleFilterDropdown3Sub(false)} style={{ display: filterDropdown3Sub ? 'block' : 'none' }} className="salary-type-options">
                                            <div onClick={() => { handleSetSalary(true, "時薪", "", ""); handleFilterDropdown3Sub(false); inputStart.current.value = ""; inputEnd.current.value = "" }} className={`salary-type-option ${(jobSalary.custom && jobSalary.type === '時薪') ? 'active' : ''}`}>時薪</div>
                                            <div onClick={() => { handleSetSalary(true, "日薪", "", ""); handleFilterDropdown3Sub(false); inputStart.current.value = ""; inputEnd.current.value = "" }} className={`salary-type-option ${(jobSalary.custom && jobSalary.type === '日薪') ? 'active' : ''}`}>日薪</div>
                                            <div onClick={() => { handleSetSalary(true, "月薪", "", ""); handleFilterDropdown3Sub(false); inputStart.current.value = ""; inputEnd.current.value = "" }} className={`salary-type-option ${(jobSalary.custom && jobSalary.type === '月薪') ? 'active' : ''}`}>月薪</div>
                                        </div>
                                        <input ref={inputStart} onBlur={(e) => handleSetSalary(true, jobSalary.type, e.target.value, undefined)} type="text" placeholder="如 28000" />
                                        <div className="dash"></div>
                                        <input ref={inputEnd} onBlur={(e) => handleSetSalary(true, jobSalary.type, undefined, e.target.value)} type="text" placeholder="可不填" />
                                    </div>
                                </div>

                                <div className="d-flex flex-row row-3 justify-content-end">
                                    <div onClick={() => handleSetSalary(false, "月薪", "", "")}>重填</div>
                                    <div onClick={() => { handleAddLabels('Salary', jobSalary.custom ? `${jobSalary.type} ${jobSalary.end ? parseInt(jobSalary.start).toLocaleString() : parseInt(jobSalary.start).toLocaleString() + '以上'} ${jobSalary.end ? ' ~ ' + parseInt(jobSalary.end).toLocaleString() : ''}` : `月薪 ${parseInt(jobSalary.start).toLocaleString()}以上`); handleCustomSalary(true); handleFilterDropdown3(false); handleFilterDropdown3Sub(false); inputStart.current.value = ""; inputEnd.current.value = ""; }}>送出</div>
                                </div>
                            </div>
                        </div>

                        <div className="filter-job-label">
                            {/* 職缺標籤 */}
                            <button onClick={() => handleFilterDropdown4(!filterDropdown4)} className="d-flex flex-row align-items-center justify-content-between">
                                <div>
                                    <img className="filter-icon" src={labelIconGreen} alt="job type icon" />
                                    <span className="filter-name" >職缺標籤</span>
                                </div>
                                <img className="arrow-down" src={arrowDownIcon} alt="arrow down icon" />
                            </button>

                            {/* 職缺標籤 下拉選單 */}
                            <div style={{ display: filterDropdown4 ? 'flex' : 'none' }} className="dropdown-area flex-row">
                                {/* Polygon */}
                                <img className="white-polygon" src={polygonIconWhite} alt="white polygon icon" />
                                <div className="dropdown-column column-1 d-flex flex-column align-items-center">
                                    {jobLabelOptions.slice(0, 7).map((option) => (
                                        <div key={option.id} onClick={(e) => { handleFilterDropdown4(false); handleSetJobLabels(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('label', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                    ))}
                                </div>
                                <div className="dropdown-column column-2 d-flex flex-column align-items-center">
                                    {jobLabelOptions.slice(7, 14).map((option) => (
                                        <div key={option.id} onClick={(e) => { handleFilterDropdown4(false); handleSetJobLabels(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('label', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                    ))}
                                </div>
                                <div className="dropdown-column column-3 d-flex flex-column align-items-center">
                                    {jobLabelOptions.slice(14, 21).map((option) => (
                                        <div key={option.id} onClick={(e) => { handleFilterDropdown4(false); handleSetJobLabels(e.target.id); handleAddLabels(option.id, option.name); handleReqParams('label', { id: option.id, name: option.name }) }} id={option.id} className="category-item">{option.name}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 熱門職缺  */}
                        <button onClick={() => handlePopularJob(!popularJob)} className={`filter-popular-job d-flex flex-row align-items-center justify-content-between ${popularJob ? 'active' : 'inactive'}`}>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                {popularJob && <img className="filter-icon" src={fireIconWhite} alt="job type icon" />}
                                {!popularJob && <img className="filter-icon" src={fireIconGreen} alt="job type icon" />}
                                <span className="filter-name">熱門職缺</span>
                            </div>
                        </button>
                    </div>

                    {/* Filter Labels */}
                    <div className="d-flex flex-row flex-wrap align-items-center" style={{ width: '100%', marginTop: '12px' }}>
                        {labelsArray.length > 0 && labelsArray.map((label, index) => (
                            <div key={index} className="d-flex align-items-center" style={{ backgroundColor: '#178C88', borderRadius: '100px', height: '30px', padding: '4px 12px', marginRight: '12px' }}>
                                <span style={{ color: 'white', fontSize: '14px', fontWeight: '400' }}>{label.name}</span>
                                <img onClick={() => handleRemoveLabels(label.id, label.name)} src={closeIconWhite} alt="close icon" style={{ width: '20px', height: '20px', cursor: 'pointer', marginLeft: '4px' }} />
                            </div>
                        ))}

                        {labelsArray.length > 0 && <img onClick={() => handleResetLabels()} src={resetIcon} alt="reset icon" style={{ cursor: 'pointer', width: '32px', height: '32px' }} />}
                    </div>
                </div>
            </div>

            {/* Bottom: Result */}
            <div className="d-flex flex-row" style={{ backgroundColor: '#FDFDF5', padding: '23px 360px' }}>
                {/* Left: Filter */}
                <div className="left-filter d-flex flex-column" style={{ width: '15%', height: 'fit-content', padding: '28px 24px', borderRadius: '10px', border: '1px solid #CCCCCC', marginTop: '37px' }}>
                    <div className="d-flex flex-row align-items-center" style={{ borderBottom: '1px solid #ECEDEC', paddingBottom: '8px', marginBottom: '10px' }} >
                        <span style={{ color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>更多篩選條件</span>
                        <img src={resetIconGray} alt="gray reset icon" style={{ width: '20px', height: '20px', marginLeft: '2px' }} />
                    </div>

                    {/* 熱門搜尋 */}
                    <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                        <p style={{ marginBottom: '10px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>熱門搜尋</p>
                        <div className="d-flex flex-column" style={{ marginLeft: '4px' }}>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>高薪四萬以上！</label></div>
                        </div>
                    </div>

                    {/* 更新日期 */}
                    <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                        <p style={{ marginBottom: '10px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>更新日期</p>
                        <div className="d-flex flex-column" style={{ marginLeft: '4px' }}>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>近一日</label></div>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>一週內</label></div>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>二週內</label></div>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>三日內</label></div>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>一個月內</label></div>
                        </div>
                    </div>

                    {/* 上班時段 */}
                    <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                        <p style={{ marginBottom: '10px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>上班時段</p>
                        <div className="d-flex flex-column" style={{ marginLeft: '4px' }}>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>日班</label></div>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>夜班</label></div>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>大夜</label></div>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>假日</label></div>
                        </div>
                    </div>

                    {/* 休假制度 */}
                    <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                        <p style={{ marginBottom: '10px', color: '#4B4B4B', fontSize: '16px', fontWeight: '400' }}>休假制度</p>
                        <div className="d-flex flex-column" style={{ marginLeft: '4px' }}>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>週休二日</label></div>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>隔週休</label></div>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>排班制</label></div>
                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '8px', color: '#4B4B4B', fontSize: '14px', fontWeight: '400' }} ><input type="checkbox" /><label style={{ marginLeft: '8px' }}>三班制</label></div>
                        </div>
                    </div>
                </div>

                {/* Right: Results */}
                <div className="results d-flex flex-column" style={{ width: '85%' }}>
                    <div style={{ paddingLeft: '14px', width: '100%' }}>
                        {/* Order Options */}
                        <div className="d-flex flex-row justify-content-between" style={{ marginBottom: '8px' }}>
                            <span>相關查詢結果：共計37個職缺</span>
                            <div className="d-flex flex-row">
                                <button style={{ backgroundColor: 'transparent', border: 'none', color: '#4B4B4B', fontSize: '14px', fontWeight: '700', padding: '2px', marginRight: '8px' }}>
                                    應徵人數
                                    <img src={verticalExpandIcon} alt="vertical expand icon" />
                                </button>
                                <button style={{ backgroundColor: 'transparent', border: 'none', color: '#4B4B4B', fontSize: '14px', fontWeight: '700', padding: '2px', marginRight: '8px' }}>
                                    日期新舊
                                    <img src={verticalExpandIcon} alt="vertical expand icon" />
                                </button>
                                <button style={{ backgroundColor: 'transparent', border: 'none', color: '#4B4B4B', fontSize: '14px', fontWeight: '700', padding: '2px', marginRight: '8px' }}>
                                    薪資高低
                                    <img src={verticalExpandIcon} alt="vertical expand icon" />
                                </button>
                            </div>
                        </div>

                        {/* Result Item: Data Fetched */}
                        {!jobIsPending &&
                            jobs.map((job, index) => (
                                <div key={job.id} className="d-flex flex-row" style={{ position: 'relative', marginBottom: '16px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '1px 2px 2px 0px rgba(0, 0, 0, 0.15)', height: '190px', width: '100%' }}>
                                    <div style={{ backgroundImage: `url(${job1})`, width: '321px', borderRadius: '8px 0px 0px 8px', backgroundPosition: 'inherit', backgroundSize: 'auto', backgroundRepeat: 'no-repeat' }}></div>
                                    <div className="d-flex flex-column justify-content-between" style={{ padding: '16px', width: 'calc(100% - 321px)' }}>

                                        <div className="d-flex flex-column">
                                            <p style={{ color: '#2D2D2D', fontSize: '24px', fontWeight: '400', marginBottom: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: 'calc(100% - 110px)' }}>{job.title}</p>
                                            <p className="mb-0" style={{ color: '#1DAFAA', fontSize: '14px', fontWeight: '700', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: 'calc(100% - 110px)' }}>{job.company}</p>
                                        </div>

                                        {/* TEST */}
                                        {/* <p>收藏入數 {job.savedCnt}</p> */}
                                        {/* TEST */}

                                        {job.isActive && <div className="d-flex align-items-center justify-content-center" style={{ position: 'absolute', top: '20px', right: '16px', backgroundColor: '#1DAFAA', borderRadius: '100px', color: 'white', fontSize: '16px', fontWeight: '400', height: '32px', padding: '0px 10px 0px 2px' }}>
                                            <img src={lightningIcon} alt="lightning icon" />
                                            積極招募
                                        </div>}

                                        <div className="d-flex flex-column">
                                            <div className="d-flex flex-row align-items-center" style={{ color: '#6F6F6F', fontSize: '14px', fontWeight: '400', marginBottom: '2px' }}>
                                                <img src={landmarkIconGray} alt="location icon" style={{ marginRight: '8px', width: '18px', height: '18px' }} />
                                                <p className="mb-0" style={{ color: '#6F6F6F', fontSize: '14px', fontWeight: '400', width: 'calc(100% - 60px)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{job.address}</p>
                                            </div>
                                            <div className="d-flex flex-row align-items-center" style={{ color: '#6F6F6F', fontSize: '14px', fontWeight: '400', marginBottom: '2px' }}>
                                                <img src={billIconGray} alt="salary icon" style={{ marginRight: '8px', width: '18px', height: '18px' }} />
                                                NT$ {job.salary[1].toLocaleString()} - {job.salary[2].toLocaleString()} ( {setSalary(job.salary[0])} )
                                            </div>
                                            <div className="d-flex flex-row align-items-center" style={{ marginBottom: '2px' }}>
                                                <img src={blocksIconGray} alt="job content icon" style={{ marginRight: '8px', width: '18px', height: '18px' }} />
                                                <p className="mb-0" style={{ color: '#6F6F6F', fontSize: '14px', fontWeight: '400', width: 'calc(100% - 60px)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{job.description}</p>
                                            </div>

                                            {job.labels.length > 0 && <div className="d-flex flex-row align-items-center" style={{ color: '#1DAFAA', fontSize: '14px', fontWeight: '700' }}>
                                                <img src={labelIconGray} alt="job label icon" style={{ marginRight: '8px', width: '18px', height: '18px' }} />
                                                <p className="mb-0" style={{ width: 'calc(100% - 60px)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{job.labels.map((label, index) => (
                                                    <span key={index} style={{ marginRight: '8px' }}>{label}</span>
                                                ))}</p>
                                            </div>}

                                            <div className="d-flex align-items-center justify-content-center" style={{ position: 'absolute', right: "16px", bottom: '16px', backgroundColor: job.isLiked ? '#F27072' : '#CCCCCC', borderRadius: '50%', width: '28px', height: '28px' }}>
                                                <img src={heartIcon} alt="heart icon" style={{ width: '18px', height: '18px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {/* Result Item: Data Not Fetched */}
                        {jobIsPending &&
                            setFakeData(5).map((job, index) => (
                                <div key={index} className="d-flex flex-row" style={{ position: 'relative', marginBottom: '16px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '1px 2px 2px 0px rgba(0, 0, 0, 0.15)', height: '190px', width: '100%' }}>
                                    <div style={{ backgroundColor: '#CCCCCC', width: '321px', borderRadius: '8px 0px 0px 8px' }}></div>
                                    <div className="d-flex flex-column justify-content-between" style={{ padding: '16px', width: 'calc(100% - 321px)' }}>

                                        <div className="d-flex flex-column">
                                            <div style={{ height: '30px', width: '300px', borderRadius: '5px', backgroundColor: '#CCCCCC', marginBottom: '2px' }}></div>
                                            <div style={{ height: '21px', width: '200px', borderRadius: '5px', backgroundColor: '#CCCCCC', marginBottom: '2px' }}></div>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-center" style={{ position: 'absolute', top: '20px', right: '16px', backgroundColor: '#1DAFAA', borderRadius: '100px', color: 'white', fontSize: '16px', fontWeight: '400', height: '32px', width: '100px' }}></div>

                                        <div className="d-flex flex-column">
                                            <div style={{ height: '21px', width: '200px', borderRadius: '5px', backgroundColor: '#CCCCCC', marginBottom: '2px' }}></div>
                                            <div style={{ height: '21px', width: '200px', borderRadius: '5px', backgroundColor: '#CCCCCC', marginBottom: '2px' }}></div>
                                            <div style={{ height: '21px', width: '200px', borderRadius: '5px', backgroundColor: '#CCCCCC', marginBottom: '2px' }}></div>

                                            <div className="d-flex align-items-center justify-content-center" style={{ position: 'absolute', right: "16px", bottom: '16px', backgroundColor: '#CCCCCC', borderRadius: '50%', width: '28px', height: '28px' }}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {/* Advertising Banner */}
                        <div style={{ backgroundImage: `url(${advertisingBanner1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '160px', width: '100%', marginBottom: '16px' }}></div>

                        {/* Pagination */}
                        {!jobIsPending && <Pagination pages={Math.ceil(jobs.length / 12)} activePage={1} />}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Jobs;