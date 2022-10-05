// disable export button
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../assets/scss/job.scss";

import companyLogo1 from "../assets/img/img-company-logo-1.png"
import companyMain1 from "../assets/img/img-company-main-1.png"

import landmarkIconGreen from "../assets/img/icon-landmark-green.svg"
import mapIconGreen from "../assets/img/icon-map-green.svg"
import billIconGreen from "../assets/img/icon-bill-green.svg"
import clockIconGreen from "../assets/img/icon-clock-green.svg"
import exportIconGreen from "../assets/img/icon-export-green.svg"
import labelIconGreen from "../assets/img/icon-label-green.svg"

import fbIconActive from "../assets/img/icon-fb-active.svg"
import fbIconInactive from "../assets/img/icon-fb-inactive.svg"
import igIconActive from "../assets/img/icon-ig-active.svg"
import igIconInactive from "../assets/img/icon-ig-inactive.svg"
import ytIconActive from "../assets/img/icon-yt-active.svg"
import ytIconInactive from "../assets/img/icon-yt-inactive.svg"

import workEnv1 from "../assets/img/img-company-env-1.jpg"
import workEnv2 from "../assets/img/img-company-env-2.jpg"
import workEnv3 from "../assets/img/img-company-env-3.jpg"
import workEnv4 from "../assets/img/img-company-env-4.jpg"
import workEnv5 from "../assets/img/img-company-env-5.jpg"
import workEnv6 from "../assets/img/img-company-env-6.jpg"
import workEnv7 from "../assets/img/img-company-env-7.jpg"
import workEnv8 from "../assets/img/img-company-env-8.jpg"
import workEnv9 from "../assets/img/img-company-env-9.jpg"
import workEnv10 from "../assets/img/img-company-env-10.jpg"

import Recruiting from "../components/badge/Recruiting";
import CompanyMainImage from "../components/image/CompanyMainImage";
import Info from "../components/info/Info";
import OtherInfo from "../components/info/OtherInfo";
import SocialLink from "../components/link/SocialLink";
import SaveJobButton from "../components/button/SaveJobButton";
import ApplyButton from "../components/button/ApplyButton";

const Job = () => {
    const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [googleMapLink, setGoogleMapLink] = useState(null);
    const OpenGoogleMap = () => {
        window.open(googleMapLink);
    }

    useEffect(() => {
        console.log('use effect')
        const abortCont = new AbortController();
        // 取得職缺資料
        fetch(`http://localhost:8000/jobDetail/${id}`, { signal: abortCont.signal })
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
                setError(null)
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
    const authentication = true; // $$ TEST DATA $$
    const handleHoverStatus = (status) => {
        setHoverStatus(status)
    }
    const handleApply = () => {
        if (authentication) {
            navigate(`/?job=${data.jobTitle}&company=${data.company}&jid=${id}`)
        } else {
            window.alert('false')
        }
    }

    // 收藏職缺
    const [isSaved, setSavedStatus] = useState(false)
    const handleSavedStatus = (status) => {
        console.log('PATCH request');

        fetch(`http://localhost:8000/jobDetail/${id}`, {
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

    return (
        <div className="job d-flex flex-column w-100">
            {/* 職缺名稱 */}
            <div className="job-title d-flex flex-row align-items-center">
                {!isPending && <h2 className="mb-0">{data.jobTitle}</h2>}
                {isPending && <div className="no-data"></div>}
                {!isPending && data.isActive && <Recruiting />}
            </div>

            {/* 公司名稱 */}
            <div className="company-name d-flex flex-row align-items-center">
                {!isPending && <img src={companyLogo1} alt="company logo" />}
                {isPending && <div className="no-data-1"></div>}
                {!isPending && <span>{data.company}</span>}
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
                            <div className="company-info-item main d-flex flex-row align-items-center w-100">
                                <img src={mapIconGreen} alt="map icon" />
                                <p className="mb-0">{data.location[0]}</p>
                            </div>

                            <div className="company-info-item main d-flex flex-row align-items-center w-100" >
                                <img src={landmarkIconGreen} alt="landmark icon" />
                                <p className="mb-0" >
                                    {data.location[1]}
                                    <img className="export-btn" onClick={OpenGoogleMap} src={exportIconGreen} alt="export icon" />
                                </p>
                            </div>

                            <div className="company-info-item main d-flex flex-row align-items-center w-100">
                                <img src={billIconGreen} alt="salary icon" />
                                <p className="mb-0" >{data.salary}</p>
                            </div>

                            {data.workTime.length > 0 &&
                                <div className="company-info-item main d-flex flex-row align-items-center w-100" >
                                    <img src={clockIconGreen} alt="clock icon" />
                                    <p className="mb-0" >
                                        {data.workTime.map((time, index) => (<span key={index} style={{ marginRight: '10px' }}>{time}</span>))}
                                    </p>
                                </div>}

                            {data.labels.length > 0 && <div className="company-info-item sub d-flex flex-row align-items-center w-100">
                                <img src={labelIconGreen} alt="job label icon" />
                                <p className="mb-0" >
                                    {data.labels.map((label, index) => (<span key={index}>{label}</span>))}
                                </p>
                            </div>}

                            <p className="last-update mb-0">最近更新於 2022-07-14</p>
                        </div>

                        <div className="buttons d-flex flex-column w-100">
                            {/* 立即應徵 */}
                            <ApplyButton btnIsHovered={btnIsHovered} handleHoverStatus={handleHoverStatus} handleApply={handleApply} />

                            {/* 收藏職缺 */}
                            <SaveJobButton isSaved={isSaved} handleClick={handleSavedStatus} />
                        </div>
                    </div>}
                </div>
            </div>

            {/* 公司環境圖 */}
            {!isPending && <div className="company-env row g-0 w-100 flex-nowrap">
                <div style={{ backgroundImage: `url(${workEnv1})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
                <div style={{ backgroundImage: `url(${workEnv4})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
                <div style={{ backgroundImage: `url(${workEnv5})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
                <div style={{ backgroundImage: `url(${workEnv9})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
                <div style={{ backgroundImage: `url(${workEnv10})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
                <div style={{ backgroundImage: `url(${workEnv2})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
                <div style={{ backgroundImage: `url(${workEnv3})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
                <div style={{ backgroundImage: `url(${workEnv6})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
                <div style={{ backgroundImage: `url(${workEnv7})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
                <div style={{ backgroundImage: `url(${workEnv8})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
            </div>}

            {isPending && <div className="company-env row g-0 w-100 flex-nowrap">
                <div style={{ backgroundImage: `url(${workEnv4})`, filter: 'blur(5px)' }}></div>
                <div style={{ backgroundImage: `url(${workEnv1})`, filter: 'blur(5px)' }}></div>
                <div style={{ backgroundImage: `url(${workEnv5})`, filter: 'blur(5px)' }}></div>
                <div style={{ backgroundImage: `url(${workEnv10})`, filter: 'blur(5px)' }}></div>
                <div style={{ backgroundImage: `url(${workEnv4})`, filter: 'blur(5px)' }}></div>
            </div>}

            {/* 更多公司資訊 */}
            <div className="d-flex flex-row" style={{ marginTop: '32px' }}>
                {/* Left */}
                <div className="company-detail d-flex flex-row flex-wrap" style={{ width: '70%', paddingRight: '70px' }}>
                    <Info fullWidth={true} title="工作說明" data={isPending ? null : data.jobContent} isPending={isPending} />
                    <Info fullWidth={false} title="工作時段" data={isPending ? null : data.workTime} isPending={isPending} />
                    <Info fullWidth={false} title="休假制度" data={isPending ? null : data.leavePolicy} isPending={isPending} />
                    <Info fullWidth={true} title="薪資範圍" data={isPending ? null : data.salary} isPending={isPending} />
                    <Info fullWidth={true} title="條件要求" data={isPending ? null : data.requirement} isPending={isPending} />
                    <Info fullWidth={true} title="加分條件" data={isPending ? null : data.extra} isPending={isPending} />
                    <Info fullWidth={true} title="員工福利" data={isPending ? null : data.benefit} isPending={isPending} />
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
                        <OtherInfo type="titleText" isPending={isPending} title="投遞方式" content={isPending ? null : data.resumeDeliver} />
                        <OtherInfo type="titleText" isPending={isPending} title="面試地點" content={isPending ? null : data.interviewLocation} />
                        <OtherInfo type="titleText" isPending={isPending} title="注意事項" content={isPending ? null : data.notice} />
                        <OtherInfo type="text" isPending={isPending} title="聯絡人" content={isPending ? null : data.contact} />
                    </div>

                    <div className="buttons d-flex flex-column w-100" style={{ marginTop: '32px' }}>
                        {/* 立即應徵 */}
                        <ApplyButton btnIsHovered={btnIsHovered} handleHoverStatus={handleHoverStatus} handleApply={handleApply} />

                        {/* 收藏職缺 */}
                        <SaveJobButton isSaved={isSaved} handleClick={handleSavedStatus} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Job;