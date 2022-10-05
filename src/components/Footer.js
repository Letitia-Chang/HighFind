import { useState } from "react";

import logo from "../assets/img/logo-with-text-white.svg"

import fbIconActive from "../assets/img/icon-fb-active.svg"
import lineIconActive from "../assets/img/icon-line-active.svg"
import lineIconInactive from "../assets/img/icon-line-inactive.svg"
import igIconActive from "../assets/img/icon-ig-active.svg"
import fbIconInactive from "../assets/img/icon-fb-inactive.svg"
import igIconInactive from "../assets/img/icon-ig-inactive.svg"
// import ytIconInactive from "../assets/img/icon-yt-inactive.svg"
// import ytIconActive from "../assets/img/icon-yt-active.svg"

const Footer = () => {
    const [fbIsActive, setFbIsActive] = useState(false)
    const [igIsActive, setIgIsActive] = useState(false)
    const [lineIsActive, setLineIsActive] = useState(false)

    const handleFbStatus = (status) => {
        setFbIsActive(status)
    }

    const handleIgStatus = (status) => {
        setIgIsActive(status)
    }
    const handleLineStatus = (status) => {
        setLineIsActive(status)
    }

    return (
        <div className="footer d-flex flex-row justify-content-between" style={{ padding: '40px 360px 30px 360px', backgroundColor: '#6F6F6F' }}>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column">
                        <p style={{ marginBottom: '16px', color: 'white', fontSize: '16px', fontWeight: '700' }}>活動版</p>
                        <p style={{ marginBottom: '0px', color: 'white', fontSize: '16px', fontWeight: '400', lineHeight: '28px' }}>校園講座</p>
                        <p style={{ marginBottom: '0px', color: 'white', fontSize: '16px', fontWeight: '400', lineHeight: '28px' }}>正職 X 實習說明會</p>
                        <p style={{ marginBottom: '0px', color: 'white', fontSize: '16px', fontWeight: '400', lineHeight: '28px' }}>校園徵才</p>
                    </div>

                    <div className="d-flex flex-column" style={{ marginLeft: '64px' }}>
                        <p style={{ marginBottom: '16px', color: 'white', fontSize: '16px', fontWeight: '700' }}>實習版</p>
                        <p style={{ marginBottom: '0px', color: 'white', fontSize: '16px', fontWeight: '400', lineHeight: '28px' }}>找實習</p>
                        <p style={{ marginBottom: '0px', color: 'white', fontSize: '16px', fontWeight: '400', lineHeight: '28px' }}>找企業</p>
                    </div>

                    <div className="d-flex flex-column" style={{ marginLeft: '64px' }}>
                        <p style={{ marginBottom: '16px', color: 'white', fontSize: '16px', fontWeight: '700' }}>HighFind</p>
                        <p style={{ marginBottom: '0px', color: 'white', fontSize: '16px', fontWeight: '400', lineHeight: '28px' }}>關於我們</p>
                    </div>

                    <div className="d-flex flex-column" style={{ marginLeft: '64px' }}>
                        <p style={{ marginBottom: '16px', color: 'white', fontSize: '16px', fontWeight: '700' }}>追踨我們，掌握更多職涯資訊！</p>
                        <div className="d-flex flex-row">
                            {fbIsActive && <img onMouseLeave={() => handleFbStatus(false)} src={fbIconActive} alt="active fb icon" style={{ marginRight: '10px', width: '32px', height: '32px' }} />}
                            {!fbIsActive && <img onMouseEnter={() => handleFbStatus(true)} src={fbIconInactive} alt="inactive fb icon" style={{ marginRight: '10px', width: '32px', height: '32px' }} />}
                            {lineIsActive && <img onMouseLeave={() => handleLineStatus(false)} src={lineIconActive} alt="active yt icon" style={{ marginRight: '10px', width: '32px', height: '32px' }} />}
                            {!lineIsActive && <img onMouseEnter={() => handleLineStatus(true)} src={lineIconInactive} alt="inactive yt icon" style={{ marginRight: '10px', width: '32px', height: '32px' }} />}
                            {igIsActive && <img onMouseLeave={() => handleIgStatus(false)} src={igIconActive} alt="active ig icon" style={{ marginRight: '10px', width: '32px', height: '32px' }} />}
                            {!igIsActive && <img onMouseEnter={() => handleIgStatus(true)} src={igIconInactive} alt="inactive ig icon" style={{ marginRight: '10px', width: '32px', height: '32px' }} />}
                        </div>
                    </div>
                </div>

                <p style={{ marginTop: '14px', marginBottom: '0px', color: '#CCCCCC', fontSize: '14px', fontWeight: '400' }}>Figh Find 人才媒合平台 © All Rights Reserved.</p>
            </div>

            <div className="d-flex flex-column">
                <img src={logo} alt="logo" style={{ height: '66px', marginBottom: '10px' }} />
                <p className="mb-0" style={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>E-mail：highfind@gmail.com</p>
                <p className="mb-0" style={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>求職者服務專線：0800 000 500</p>
                <p className="mb-0" style={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>企業服務專線：0800 000 800</p>
            </div>

        </div>
    );
}

export default Footer;