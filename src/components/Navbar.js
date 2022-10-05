import logo from "../assets/img/logo-with-text.png"
import applicant from "../assets/img/icon-applicant.svg"
import company from "../assets/img/icon-company.svg"

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="d-flex flex-row align-items-center justify-content-between" style={{ padding: '12px 360px', boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.1)' }}>
            <div className="left d-flex flex-row align-items-center" >
                <Link to="/"> <img src={logo} alt="logo" style={{ height: '50px', marginRight: '32px' }} /></Link>
                <Link to="/events" style={{ textDecoration: 'none', color: '#2D2D2D', fontSize: '18px', fontWeight: '400', padding: '9px 16px' }}>活動板</Link>
                <Link to="/jobs" style={{ textDecoration: 'none', color: '#2D2D2D', fontSize: '18px', fontWeight: '400', padding: '9px 16px' }}>工作板</Link>
                <Link to="/" style={{ textDecoration: 'none', color: '#2D2D2D', fontSize: '18px', fontWeight: '400', padding: '9px 16px' }}>課程板</Link>
                <Link to="/" style={{ textDecoration: 'none', color: '#2D2D2D', fontSize: '18px', fontWeight: '400', padding: '9px 16px' }}>資源板</Link>
            </div>
            <div className="right d-flex flex-row align-items-center">
                <Link to="/" className="d-flex flex-row align-items-center" style={{ textDecoration: 'none', color: '#2D2D2D', fontSize: '18px', fontWeight: '400', padding: '9px 24px' }}>
                    <img src={applicant} alt="applicant icon" style={{ marginRight: '8.5px' }} />
                    求職登入</Link>
                <Link to="/" className="d-flex flex-row align-items-center" style={{ textDecoration: 'none', color: '#2D2D2D', fontSize: '18px', fontWeight: '400', padding: '9px 24px' }}>
                    <img src={company} alt="company icon" style={{ marginRight: '8.5px' }} />
                    企業登入</Link>
                <Link to="/" style={{ textDecoration: 'none', color: '#2D2D2D', fontSize: '18px', fontWeight: '400', padding: '9px 24px' }}>註冊</Link>
            </div>
        </nav>
    );
}

export default Navbar;