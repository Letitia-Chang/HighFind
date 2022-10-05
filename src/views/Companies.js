// Fix button outline or box-shadow; input style; 
// option button width 
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import useFetch from "../hooks/useFetch";
import useFetchUpdate from "../hooks/useFetchUpdate";

import "../assets/scss/companies.scss";

import NewCompanyLogo1 from "../assets/img/img-new-company-logo-1.png"
import NewCompanyLogo2 from "../assets/img/img-new-company-logo-2.png"

import searchIconGreen from "../assets/img/icon-search-green.svg"
import closeIconGreen from "../assets/img/icon-close-green.svg"
import geometryIconGreen from "../assets/img/icon-geometry-green.svg"
import labelIconGreen from "../assets/img/icon-label-green.svg"
import teamIconGreen from "../assets/img/icon-team-green.svg"
import fireIconGreen from "../assets/img/icon-fire-green.svg"
import fireIconWhite from "../assets/img/icon-fire-white.svg"
import arrowDownIcon from "../assets/img/icon-arrow-down.svg"
import polygonIconWhite from "../assets/img/icon-polygon-white.svg";
import FindJob from "../components/button/FindJob";
import FindCompany from "../components/button/FindCompany";
import SearchLabel from '../components/label/SearchLabel';
import CompanyItem from "../components/Home/CompanyItem"
import CompanyItemNoData from "../components/Home/CompanyItemNoData"
import Pagination from "../components/Pagination";


const Companies = () => {
    // 網址參數
    const queryParams = new URLSearchParams(window.location.search);

    // 取得新進企業
    // eslint-disable-next-line
    const { data: nCompanies, isPending: nCompanyIsPending, error: nCompanyError } = useFetch('http://localhost:8000/nCompanies');

    // 取得搜尋結果
    // eslint-disable-next-line
    const { data: results, isPending: resultIsPending, error: resultError, updateData: setResultData, setIsPending: setResultIsPending } = useFetchUpdate('http://localhost:8000/company');

    // ======================== 標籤 ======================== 
    // 已選取標籤
    const [labelsArray, setLabelsArray] = useState([]);
    // 加入標籤列
    const handleAddLabels = (type, name) => {
        // 確認標籤未重複，未重複則加入標籤列
        var filteredArray = labelsArray.filter(e => e.type === type && e.name === name);
        if (filteredArray.length === 0) {
            var tempArray = labelsArray;
            tempArray.push({ type: type, name: name });
            setLabelsArray(tempArray);
        }

        // 將項目加進各自種類項目列
        switch (type) {
            case 'industry':
                handleSetCompanyType(name);
                break;

            case 'location':
                handleSetCompanyLocation(name);
                break;


            case 'labels':
                handleSetCompanyLabels(name);
                break;

            case 'employees':
                handleSetCompanyEmployee(name);
                break;

            default:
                break;
        }
    }
    // 移出標籤列
    const handleRemoveLabels = (type, name) => {
        //  將標籤移出標籤列
        var filteredArray = labelsArray.filter(e => e.type !== type || e.name !== name);
        setLabelsArray(filteredArray);
        if (filteredArray.length === 0) {
            resetBtn2.current.style.display = "none";
            resetBtn1.current.style.display = "none"
        }

        // 將項目移出各自種類項目列
        switch (type) {
            case 'industry':
                let tempCompanyType = companyType.filter(e => e !== name);
                setCompanyType(tempCompanyType);
                break;

            case 'location':
                let tempCompanyLocation = companyLocation.filter(e => e !== name);
                console.log(tempCompanyLocation);
                setCompanyLocation(tempCompanyLocation);
                break;

            case 'labels':
                let tempCompanyLabels = companyLabels.filter(e => e !== name);
                setCompanyLabels(tempCompanyLabels);
                break;

            case 'employees':
                let tempCompanyEmployee = companyEmployee.filter(e => e !== name);
                setCompanyEmployees(tempCompanyEmployee);
                break;

            default:
                break;
        }
    }
    // 重置標籤列
    const handleResetLabels = () => {
        setLabelsArray([]);
        setCompanyType([]);  // 企業產業類別
        setCompanyLocation([]);  // 企業總部地點
        setCompanyLabels([]);  // 企業產業標籤
        setCompanyEmployees([]);   // 企業員工人數
    }
    // 清除標籤按鈕
    const resetBtn1 = useRef(null);
    const resetBtn2 = useRef(null);
    // ======================== 標籤 ======================== 


    // ======================== 篩選 ======================== 
    // 關鍵字搜尋
    const keywordRef = useRef(null);
    const [keyword, setKeyword] = useState('');
    useEffect(() => {
        fetchWithParams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword])


    // 企業產業類別
    const companyTypeOptions = ['網路', '社會企業', '教育/線上課程', '電商/O2O', 'Fintech/區塊鍊', '行銷/媒體/廣告', '旅遊', 'VR/動畫/遊戲', '軟體開發', 'SaaS/商務服務', '實體零售', '娛樂媒體', '半導體', '金融', '生物/醫療科技', '服務/物業管理', '運動/健康', '資訊安全'];
    const [companyType, setCompanyType] = useState([]);
    const handleSetCompanyType = (name) => {
        if (companyType.includes(name) === false) {  // 不存在於陣列中
            let temp = [];
            if (companyType.length > 0) {
                companyType.forEach((ele) => {
                    temp.push(ele);
                });
            }
            temp.push(name);
            setCompanyType(temp);
        }
    }
    useEffect(() => {
        fetchWithParams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyType])

    // 企業總部地點
    const companyLocationOptions = { 'North': ['台北市', '新北市', '基隆市', '桃園市', '新竹縣', '新竹市', '苗栗縣'], 'Center': ['台中市', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '嘉義市'], 'South': ['台南市', '高雄市', '屏東縣'], 'East': ['花蓮縣', '台東縣', '離島', '海外'], }
    const [companyLocation, setCompanyLocation] = useState([]);
    const handleSetCompanyLocation = (name) => {
        if (companyLocation.includes(name) === false) {  // 不存在於陣列中
            let temp = [];
            if (companyLocation.length > 0) {
                companyLocation.forEach((ele) => {
                    temp.push(ele);
                });
            }
            temp.push(name);
            setCompanyLocation(temp);
        }
    }
    useEffect(() => {
        fetchWithParams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyLocation])

    // 企業產業標籤
    const companyLabelOptions = ["電商", "前端工程", "數位行銷", "JavaScript", "APP", "O2O", "數位內容", "新創", "Python", "HTML/CSS", "軟體開發", "AI", "資訊平台", "Java", "平台", "教育", "網路新創", "SQL", "BigData", "FinTech", "物聯網"];
    const [companyLabels, setCompanyLabels] = useState([]);
    const handleSetCompanyLabels = (name) => {
        if (companyLabels.includes(name) === false) {  // 不存在於陣列中
            let temp = [];
            if (companyLabels.length > 0) {
                companyLabels.forEach((ele) => {
                    temp.push(ele);
                });
            }
            temp.push(name);
            setCompanyLabels(temp);
        }
    }
    useEffect(() => {
        fetchWithParams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyLabels])

    // 企業員工人數
    const companyEmployeeOptions = ["4人以下", "5-9人", "10-29人", "30-49人", "50-99人", "100-249人", "250人", "499人", "500以上"];
    const [companyEmployee, setCompanyEmployees] = useState([]);
    const handleSetCompanyEmployee = (name) => {
        if (companyEmployee.includes(name) === false) {  // 不存在於陣列中
            let temp = [];
            if (companyEmployee.length > 0) {
                companyEmployee.forEach((ele) => {
                    temp.push(ele);
                });
            }
            temp.push(name);
            setCompanyEmployees(temp);
        }
    }
    useEffect(() => {
        fetchWithParams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyEmployee])

    // 熱門企業
    const [popularCompany, setPopularCompany] = useState(queryParams.get("popularCompany") == null ? false : true);
    const handlePopularCompany = (status) => {
        // 清除所有標籤 + 清除所有篩選條件
        handleResetLabels();
        // 更新熱門企業選取狀態
        setPopularCompany(status);
    }
    useEffect(() => {
        fetchWithParams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popularCompany])
    // ======================== 篩選 ======================== 


    // ======================== 重新取得資料 ======================== 
    const fetchWithParams = () => {
        console.log('updating data')
        let url = 'http://localhost:8000/company?'

        // 關鍵字
        if (keyword) {
            url += `q=${keyword}&`;
        }

        // 熱門企業
        if (popularCompany === true) {
            url += '_sort=savedCnt&_order=desc&';
        }

        // 積極招募
        if (companyRecruiting === true) {
            url += 'isActive=true&'
        }

        // 企業產業類型
        if (companyType.length > 0) {
            companyType.forEach((ele) => {
                url += `industry=${ele}&`;
            });
        }

        // 企業總部地點
        if (companyLocation.length > 0) {
            companyLocation.forEach((ele) => {
                url += `location.city=${ele}&`;
            });
        }

        // 企業員工人數
        if (companyEmployee.length > 0) {
            companyEmployee.forEach((ele) => {
                url += `employee=${ele}&`;
            });
        }

        console.log(url);

        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw Error('Could not fetch data');
                }
            })
            .then(data => {
                if (companyLabels.length > 0) {  // 企業產業標籤
                    let tempData = [];
                    data.forEach((ele) => {
                        if (ele.labels.length > 0) {
                            companyLabels.forEach((label) => {
                                if (ele.labels.includes(label)) {
                                    tempData.push(ele);
                                }
                            });
                        }
                    });

                    setResultData(tempData);
                } else {
                    setResultData(data);
                }
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    console.log(err);
                }
            })
    }
    // ======================== 重新取得資料 ======================== 


    // ======================== 展開/關閉選單 ======================== 
    const [filterDropdown1, setFilterDropdown1] = useState(false);
    const handleFilterDropdown1 = (status) => {
        if (status === true) {
            setFilterDropdown2(false);
            setFilterDropdown3(false);
            setFilterDropdown4(false);
        }
        setFilterDropdown1(status);
    }
    const [filterDropdown2, setFilterDropdown2] = useState(false);
    const handleFilterDropdown2 = (status) => {
        if (status === true) {
            setFilterDropdown1(false);
            setFilterDropdown3(false);
            setFilterDropdown4(false);
        }
        setFilterDropdown2(status);
    }
    const [filterDropdown3, setFilterDropdown3] = useState(false);
    const handleFilterDropdown3 = (status) => {
        if (status === true) {
            setFilterDropdown1(false);
            setFilterDropdown2(false);
            setFilterDropdown4(false);
        }
        setFilterDropdown3(status);
    }
    const [filterDropdown4, setFilterDropdown4] = useState(false);
    const handleFilterDropdown4 = (status) => {
        if (status === true) {
            setFilterDropdown1(false);
            setFilterDropdown2(false);
            setFilterDropdown3(false);
        }
        setFilterDropdown4(status);
    }
    // ======================== 展開/關閉選單 ======================== 


    // 收藏企業
    const handleResultSavedStatus = (id, status) => {
        setResultIsPending(true);
        fetch(`http://localhost:8000/company/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ isLiked: status })
        }).then((res) => {
            return res.json();
        }).then((response) => {
            let temp = results;
            temp.forEach((ele, index) => {
                if (ele.id === id) {
                    temp[index].isLiked = status;
                }
            });
            setResultData(temp);
        })
    }

    // 顯示正在招募的企業
    const [companyRecruiting, setCompanyRecruiting] = useState(false);
    useEffect(() => {
        fetchWithParams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyRecruiting])

    return (
        <div className='companies'>
            {/* Top: Search */}
            <div className="top-block">
                <div className="d-flex flex-column">
                    {/* Switch Buttons: Find jobs | Find Companies */}
                    <div className="d-flex flex-row w-100 justify-content-center">
                        <FindJob isActive={false} />
                        <FindCompany isActive={true} />
                    </div>

                    {/* Search Keyword */}
                    <div className="keyword">
                        <input ref={keywordRef} onKeyDown={(e) => { if (e.key === 'Enter') { setKeyword(e.target.value) } }} type="text" placeholder="輸入公司名、職務或關鍵字" />
                        <button onClick={() => setKeyword(keywordRef.current.value)} className="search-icon"><img src={searchIconGreen} alt="search icon" /></button>
                        <button onClick={(e) => { setKeyword(''); keywordRef.current.value = '' }} className="close-icon"><img src={closeIconGreen} alt="close icon" /></button>
                    </div>

                    {/* Filters */}
                    <div className="d-flex flex-row justify-content-between" style={{ width: '100%', height: '50px', marginTop: '16px' }}>
                        <div className="filter-company-type">
                            {/* 產業類別 */}
                            <button onClick={() => handleFilterDropdown1(!filterDropdown1)} className="d-flex flex-row align-items-center justify-content-between">
                                <div>
                                    <img className="filter-icon" src={geometryIconGreen} alt="job type icon" />
                                    <span className="filter-name">產業類別</span>
                                </div>
                                <img className="arrow-down" src={arrowDownIcon} alt="arrow down icon" />
                            </button>

                            {/* 產業類別 下拉選單 */}
                            <div style={{ display: filterDropdown1 ? 'flex' : 'none' }} className="dropdown-area flex-row">
                                <img className="white-polygon" src={polygonIconWhite} alt="white polygon icon" />
                                <div className="dropdown-column column-1 d-flex flex-column align-items-center">
                                    {companyTypeOptions.slice(0, 7).map((option, index) => (
                                        <div key={index} onClick={(e) => { handleFilterDropdown1(false); handleAddLabels('industry', option); }} id={option} className="category-item">{option}</div>
                                    ))}
                                </div>
                                <div className="dropdown-column column-2 d-flex flex-column align-items-center">
                                    {companyTypeOptions.slice(7, 14).map((option, index) => (
                                        <div key={index} onClick={(e) => { handleFilterDropdown1(false); handleAddLabels('industry', option); }} id={option} className="category-item">{option}</div>
                                    ))}
                                </div>
                                <div className="dropdown-column column-3 d-flex flex-column align-items-center">
                                    {companyTypeOptions.slice(14, 18).map((option, index) => (
                                        <div key={index} onClick={(e) => { handleFilterDropdown1(false); handleAddLabels('industry', option); }} id={option} className="category-item">{option}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="filter-company-location">
                            {/* 總部地點 */}
                            <button onClick={() => handleFilterDropdown2(!filterDropdown2)} className="d-flex flex-row align-items-center justify-content-between">
                                <div>
                                    <img className="filter-icon" src={geometryIconGreen} alt="job type icon" />
                                    <span className="filter-name">總部地點</span>
                                </div>
                                <img className="arrow-down" src={arrowDownIcon} alt="arrow down icon" />
                            </button>

                            {/* 總部地點 下拉選單 */}
                            <div style={{ display: filterDropdown2 ? 'flex' : 'none' }} className="dropdown-area flex-row">
                                <img className="white-polygon" src={polygonIconWhite} alt="white polygon icon" />
                                <div className="dropdown-column column-1 d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">北部</p>
                                    {companyLocationOptions.North.map((option, index) => (
                                        <div key={index} onClick={() => { handleAddLabels('location', option); handleFilterDropdown2(false); }} className="category-item">{option}</div>
                                    ))}
                                </div>

                                <div className="dropdown-column column-2 column d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">中部</p>
                                    {companyLocationOptions.Center.map((option, index) => (
                                        <div key={index} onClick={() => { handleFilterDropdown2(false); handleAddLabels('location', option); }} className="category-item">{option}</div>
                                    ))}
                                </div>

                                <div className="dropdown-column column-3 column d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">南部</p>
                                    {companyLocationOptions.South.map((option, index) => (
                                        <div key={index} onClick={() => { handleFilterDropdown2(false); handleAddLabels('location', option); }} className="category-item">{option}</div>
                                    ))}
                                </div>

                                <div className="dropdown-column column-4 column d-flex flex-column align-items-center">
                                    <p className="category-title mb-0">東部 / 離島</p>
                                    {companyLocationOptions.East.map((option, index) => (
                                        <div key={index} onClick={() => { handleFilterDropdown2(false); handleAddLabels('location', option); }} className="category-item">{option}</div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="filter-company-label">
                            {/* 企業標籤 */}
                            <button onClick={() => handleFilterDropdown3(!filterDropdown3)} className="d-flex flex-row align-items-center justify-content-between">
                                <div>
                                    <img className="filter-icon" src={labelIconGreen} alt="job type icon" />
                                    <span className="filter-name">企業標籤</span>
                                </div>
                                <img className="arrow-down" src={arrowDownIcon} alt="arrow down icon" />
                            </button>

                            {/* 企業標籤 下拉選單 */}
                            <div style={{ display: filterDropdown3 ? 'flex' : 'none' }} className="dropdown-area flex-row">
                                <img className="white-polygon" src={polygonIconWhite} alt="white polygon icon" />
                                <div className="dropdown-column column-1 d-flex flex-column align-items-center">
                                    {companyLabelOptions.slice(0, 7).map((option, index) => (
                                        <div key={index} onClick={(e) => { handleFilterDropdown3(false); handleAddLabels('labels', option); }} id={option} className="category-item">{option}</div>
                                    ))}
                                </div>
                                <div className="dropdown-column column-2 d-flex flex-column align-items-center">
                                    {companyLabelOptions.slice(7, 14).map((option, index) => (
                                        <div key={index} onClick={(e) => { handleFilterDropdown3(false); handleAddLabels('labels', option); }} id={option} className="category-item">{option}</div>
                                    ))}
                                </div>
                                <div className="dropdown-column column-3 d-flex flex-column align-items-center">
                                    {companyLabelOptions.slice(14, 21).map((option, index) => (
                                        <div key={index} onClick={(e) => { handleFilterDropdown3(false); handleAddLabels('labels', option); }} id={option} className="category-item">{option}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="filter-company-employee">
                            {/* 員工人數 */}
                            <button onClick={() => handleFilterDropdown4(!filterDropdown4)} className="d-flex flex-row align-items-center justify-content-between">
                                <div>
                                    <img className="filter-icon" src={teamIconGreen} alt="job type icon" />
                                    <span className="filter-name">員工人數</span>
                                </div>
                                <img className="arrow-down" src={arrowDownIcon} alt="arrow down icon" />
                            </button>

                            {/* 員工人數 下拉選單 */}
                            <div style={{ display: filterDropdown4 ? 'flex' : 'none' }} className="dropdown-area flex-row">
                                <img className="white-polygon" src={polygonIconWhite} alt="white polygon icon" />
                                <div className="dropdown-column column-1 d-flex flex-column align-items-center">
                                    {companyEmployeeOptions.slice(0, 5).map((option, index) => (
                                        <div key={index} onClick={(e) => { handleFilterDropdown4(false); handleAddLabels('employees', option); }} id={option} className="category-item">{option}</div>
                                    ))}
                                </div>
                                <div className="dropdown-column column-2 d-flex flex-column align-items-center">
                                    {companyEmployeeOptions.slice(7, 14).map((option, index) => (
                                        <div key={index} onClick={(e) => { handleFilterDropdown4(false); handleAddLabels('employees', option); }} id={option} className="category-item">{option}</div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* 熱門企業 */}
                        <button onClick={() => handlePopularCompany(!popularCompany)} className={`filter-popular-company d-flex flex-row ${popularCompany ? 'active' : 'inactive'}`}>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                {popularCompany && <img className="filter-icon" src={fireIconWhite} alt="job type icon" />}
                                {!popularCompany && <img className="filter-icon" src={fireIconGreen} alt="job type icon" />}
                                <span className="filter-name">熱門企業</span>
                            </div>
                        </button>
                    </div>


                    {/* Filter Labels */}
                    <SearchLabel labelsArray={labelsArray} handleRemoveLabels={handleRemoveLabels} handleResetLabels={handleResetLabels} resetBtn1={resetBtn1} resetBtn2={resetBtn2} />
                </div>
            </div>

            {/* Bottom: New Company + Search Result */}
            <div className='bottom-block'>
                <div className="new-company d-flex flex-row align-items-end">
                    {/* Logos */}
                    <div className="new-company-image  d-flex flex-row">
                        <img src={NewCompanyLogo1} alt="new company text " />
                        <img src={NewCompanyLogo2} alt="new company robot" />
                    </div>

                    {/* Items */}
                    <div className="new-company-items row g-0 flex-nowrap">
                        {!nCompanyIsPending && nCompanies.map((company, index) => (
                            <Link key={index} to={`/company/${company.id}`}>
                                <div className="new-company-item d-flex" style={{ backgroundImage: `url(${company.image})` }}>
                                    <div className='d-flex'>
                                        <span>{company.name}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Line */}
                <div className='new-company-bottom-line'><div></div></div>

                {/* Search Result */}
                <div className='search-result-container'>
                    {/* Top */}
                    <div className="search-result-top d-flex flex-row">
                        <span className='search-cnts'>你目前搜尋：共計{resultIsPending ? '0' : results.length}間企業</span>
                        <div className="search-recruiting d-flex flex-row align-items-center">
                            <span>顯示正在招募的企業</span>
                            {/* <input onChange={(e) => handleCompanyRecruiting(e)} type="checkbox" /> */}
                            <input onChange={(e) => setCompanyRecruiting(e.target.checked)} type="checkbox" />
                        </div>
                    </div>


                    {/* Bottom: Results */}
                    <div className="company-container row g-0">
                        {/* Data Fetched */}
                        {!resultIsPending &&
                            results.map((item, index) => (
                                <div key={index} className="company-items col-4">
                                    <CompanyItem handleSavedStatus={handleResultSavedStatus} item={item} index={index} />
                                </div>
                            ))
                        }

                        {/* Data Not Fetched */}
                        {resultIsPending && <CompanyItemNoData />}
                    </div>

                    {/* Pagination */}
                    {/* {!resultIsPending && results.length > 0 && <Pagination pages={24} activePage={23} />} */}
                    {!resultIsPending && <Pagination pages={Math.ceil(results.length / 12)} activePage={1} />}
                </div>
            </div>
        </div>
    );
}

export default Companies;