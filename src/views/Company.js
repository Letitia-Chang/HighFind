// deal with all buttons 
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { setFakeData } from "../utils/index";

import "../assets/scss/company.scss";

import landmarkIcon from "../assets/img/icon-landmark.svg"
import billIcon from "../assets/img/icon-bill.svg"
import blocksIcon from "../assets/img/icon-blocks.svg"
import labelIcon from "../assets/img/icon-label.svg"

import companyLogo1 from "../assets/img/img-company-logo-1.png"
import companyMain1 from "../assets/img/img-company-main-1.png"

import landmarkIconGreen from "../assets/img/icon-landmark-green.svg"
import mapIconGreen from "../assets/img/icon-map-green.svg"
import peopleIconGreen from "../assets/img/icon-people-green.svg"
import assetIconGreen from "../assets/img/icon-asset-green.svg"
import exportIconGreen from "../assets/img/icon-export-green.svg"
import labelIconGreen from "../assets/img/icon-label-green.svg"

import fbIconActive from "../assets/img/icon-fb-active.svg"
import fbIconInactive from "../assets/img/icon-fb-inactive.svg"
import igIconActive from "../assets/img/icon-ig-active.svg"
import igIconInactive from "../assets/img/icon-ig-inactive.svg"
import ytIconActive from "../assets/img/icon-yt-active.svg"
import ytIconInactive from "../assets/img/icon-yt-inactive.svg"

import CompanyMainImage from "../components/image/CompanyMainImage";
import Info from "../components/info/Info";
import PressInfo from "../components/info/PressInfo";
import OtherInfo from "../components/info/OtherInfo";
import SocialLink from "../components/link/SocialLink";
import SaveCompanyButton from "../components/button/SaveCompanyButton";
import SaveButtonSm from "../components/button/SaveButtonSm";
import SeeJobsButton from "../components/button/SeeJobsButton";
import useFetchUpdate from "../hooks/useFetchUpdate";

const Company = () => {
    // const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    // const navigate = useNavigate();
    const { id } = useParams();

    // 取得目前職缺
    // eslint-disable-next-line
    const { data: jobList, isPending: jobListIsPending, error: jobListError, updateData: updateJobList, setIsPending: setJobListIsPending } = useFetchUpdate(`http://localhost:8000/jobList?cid=${id}`);


    // 取得該公司資料
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const [googleMapLink, setGoogleMapLink] = useState(null);
    const OpenGoogleMap = () => {
        window.open(googleMapLink);
    }

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(`http://localhost:8000/companyDetail/${id}`, { signal: abortCont.signal })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw Error('Could not fetch data');
                }
            })
            .then(data => {
                setData(data);
                setSavedStatus(data.isLiked);
                setGoogleMapLink(`https://www.google.com/maps/search/?api=1&query=${data.location[0]}${data.location[1]}`)

                // 取得地址座標(Google Map)
                // fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + data.location[0] + data.location[1] + '&key=' + API_KEY)
                //     .then(response => {
                //         if (response.ok) {
                //             return response.json()
                //         } else {
                //             throw Error('Could not fetch data');
                //             // disable export button;
                //         }
                //     })
                //     .then(datas => {
                //         const latitude = datas.results[0].geometry.location.lat;
                //         const longitude = datas.results[0].geometry.location.lng;
                //         console.log({ latitude, longitude })
                //         setGoogleMapLink(`https://maps.google.com?q=${latitude},${longitude}`)
                //         console.log(googleMapLink)
                //     })

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

    // 立即應徵
    const [btnIsHovered, setHoverStatus] = useState(false)

    // 收藏公司
    const [isSaved, setSavedStatus] = useState(false)
    const handleSavedStatus = (status) => {
        fetch(`http://localhost:8000/companyDetail/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ isLiked: status })
        }).then((res) => {
            setSavedStatus(status)
        })
    }

    // Social Link
    const [fbIsActive, setFbActive] = useState(false)
    const [igIsActive, setIgActive] = useState(false)
    const [ytIsActive, setYtActive] = useState(false)

    const handleFbStatus = (status) => {
        setFbActive(status)
    }
    const handleIgStatus = (status) => {
        setIgActive(status)
    }
    const handleYtStatus = (status) => {
        setYtActive(status)
    }


    // 收藏職缺
    const handleJobSavedStatus = (id, status) => {
        setJobListIsPending(true);
        fetch(`http://localhost:8000/jobList/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ isLiked: status })
        }).then((res) => {
            return res.json();
        }).then((response) => {
            setJobListIsPending(false);
        })
    }

    return (
        <div className="company d-flex flex-column w-100">
            {/* 公司名稱 */}
            <div className="company-name d-flex flex-row align-items-center">
                {!isPending && <div className="company-logo" style={{ backgroundImage: `url(${companyLogo1})` }}></div>}
                {isPending && <div className="no-data-1"></div>}
                {!isPending && <span>{data.name}</span>}
                {isPending && <div className="no-data-2"></div>}
            </div>

            {/* 公司圖片 + 公司資訊 */}
            <div className="d-flex flex-row">
                {/* 公司圖片 */}
                <CompanyMainImage url={companyMain1} isPending={isPending} />

                {/* 公司資訊 */}
                <div className="company-info">
                    {!isPending && <div className="d-flex flex-column justify-content-between" style={{ height: '360px' }}>
                        <div className="d-flex flex-column w-100">
                            {/* 縣市 */}
                            <div className="company-info-item main d-flex flex-row align-items-center w-100">
                                <img src={mapIconGreen} alt="map icon" />
                                <p className="mb-0">{data.location[0]}</p>
                            </div>

                            {/* 地址 */}
                            <div className="company-info-item main d-flex flex-row align-items-center w-100" >
                                <img src={landmarkIconGreen} alt="landmark icon" />
                                <p className="mb-0" >
                                    {data.location[1]}
                                    <img className="export-btn" onClick={OpenGoogleMap} src={exportIconGreen} alt="export icon" />
                                </p>
                            </div>

                            {/* 員工人數 */}
                            <div className="company-info-item main d-flex flex-row align-items-center w-100">
                                <img src={peopleIconGreen} alt="salary icon" />
                                <p className="mb-0" >{data.employees}</p>
                            </div>

                            {/* 資本額 */}
                            <div className="company-info-item main d-flex flex-row align-items-center w-100">
                                <img src={assetIconGreen} alt="asset icon" />
                                <p className="mb-0" >{data.capital}</p>
                            </div>

                            {data.labels.length > 0 && <div className="company-info-item sub d-flex flex-row align-items-center w-100">
                                <img src={labelIconGreen} alt="job label icon" />
                                <p className="mb-0" >
                                    {data.labels.map((label, index) => (<span key={index}>{label}</span>))}
                                </p>
                            </div>}
                        </div>

                        <div className="buttons d-flex flex-column w-100">
                            {/* 查看職缺 */}
                            <SeeJobsButton btnIsHovered={btnIsHovered} setHoverStatus={setHoverStatus} />

                            {/* 收藏公司 */}
                            <SaveCompanyButton isSaved={isSaved} handleClick={handleSavedStatus} />
                        </div>
                    </div>}
                </div>
            </div>

            {/* 公司環境圖 */}
            {!isPending && <div className="company-env row g-0 w-100 flex-nowrap">
                {data.env.map((item, index) => (
                    <div key={index} style={{ backgroundImage: `url(${item})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
                ))}
            </div>}

            {isPending &&
                <div className="company-env row g-0 w-100 flex-nowrap">
                    {setFakeData(10).map((item, index) => (
                        <div key={index} style={{ backgroundColor: '#d9d9d9' }}></div>
                    ))}
                </div>
            }

            {/* 更多公司資訊 */}
            <div className="d-flex flex-row" style={{ marginTop: '32px' }}>
                {/* Left  */}
                <div className="company-detail d-flex flex-row flex-wrap" style={{ width: '70%', paddingRight: '70px' }}>
                    <Info fullWidth={true} title="公司介紹" data={isPending ? null : data.aboutUs} isPending={isPending} />
                    <Info fullWidth={true} title="公司理念" data={isPending ? null : data.philosophy} isPending={isPending} />
                    <Info fullWidth={true} title="公司福利" data={isPending ? null : data.benefit} isPending={isPending} />
                    <PressInfo data={isPending ? null : data.press} isPending={isPending} />
                </div>

                {/* Right */}
                <div className="d-flex flex-column" style={{ width: '30%', paddingRight: '30px' }}>
                    {/* Data Fetched */}
                    <div className="other-info d-flex flex-column w-100" style={{ paddingLeft: '24px', borderLeft: '1px solid #CCCCCC' }}>
                        <OtherInfo type="socialLink" isPending={isPending} title="相關連結" content={isPending ? null : { social: data.socialLinks, other: data.links }}
                            children={
                                {
                                    fb: <SocialLink isActive={fbIsActive} link={isPending ? null : data.socialLinks.fb} handleHover={handleFbStatus} srcActive={fbIconActive} srcInactive={fbIconInactive} altActive="active fb icon" altInactive="inactive fb icon" />,
                                    ig: <SocialLink isActive={igIsActive} link={isPending ? null : data.socialLinks.ig} handleHover={handleIgStatus} srcActive={igIconActive} srcInactive={igIconInactive} altActive="active ig icon" altInactive="inactive ig icon" />,
                                    yt: <SocialLink isActive={ytIsActive} link={isPending ? null : data.socialLinks.yt} handleHover={handleYtStatus} srcActive={ytIconActive} srcInactive={ytIconInactive} altActive="active yt icon" altInactive="inactive yt icon" />
                                }
                            }
                        />
                    </div>
                </div>
            </div>

            {/* 目前職缺 */}
            <div id="job-list" className="job-list">
                <p className="job-list-title">目前職缺</p>

                <div className="row g-0">
                    {!isPending && jobList.length > 0 && jobList.map((item, index) => (
                        <div key={index} className="job-items col-4">
                            <div className="job-item">
                                <p className="job-title">{item.title}</p>
                                <p className="job-description">{item.description}</p>
                                <div className="d-flex flex-column align-items-start w-100">
                                    <div className="job-info d-flex flex-row">
                                        <img src={landmarkIcon} alt="location icon" />
                                        <span>{item.location[0]} {item.location[1]}</span>
                                    </div>
                                    <div className="job-info d-flex flex-row">
                                        <img src={billIcon} alt="bill icon" />
                                        <span>{item.salary === null ? '薪資面議' : `NT$ ${item.salary[1].toLocaleString()} - ${item.salary[2].toLocaleString()} ( ${item.salary[0]})`}</span>
                                    </div>
                                    <div className="job-info d-flex flex-row">
                                        <img src={blocksIcon} alt="industry icon" />
                                        <span>{item.content}</span>
                                    </div>

                                    {item.labels.length > 0 && <div className="job-labels d-flex flex-row">
                                        <img src={labelIcon} alt="job label icon" />
                                        {item.labels.map((label, index) => (
                                            <span key={index}>{label}</span>
                                        ))}

                                    </div>}
                                </div>

                                <SaveButtonSm item={item} handleSavedStatus={handleJobSavedStatus} />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Company;