import { Link } from 'react-router-dom';
import { setFakeData } from "../utils/index";

import "../assets/scss/components/pagination.scss"

import arrowLeftIconGray from "../assets/img/icon-arrow-left-gray.svg"
import arrowRightIconGray from "../assets/img/icon-arrow-right-gray.svg"

const Pagination = ({ pages, activePage }) => {
    return (
        <div className="pagination d-flex flex-row">
            <span>共 {pages} 頁</span>

            <button disabled={pages !== 1 && activePage !== 1 ? false : true}>
                <img src={arrowLeftIconGray} alt="arrow left icon" />
            </button>


            {pages > 0 && pages <= 10 && setFakeData(pages).map((page, index) => (
                <Link key={index} className={`${page + 1 === activePage ? 'active' : 'inactive'}`} to='/'>{page + 1}</Link>
            ))}

            {pages > 10 && activePage > 4 && activePage < pages - 4 &&
                < div className="d-flex flex-row">
                    <Link className='inactive' to="/">1</Link>
                    ...
                    <Link className='inactive' to="/">{activePage - 3}</Link>
                    <Link className='inactive' to="/">{activePage - 2}</Link>
                    <Link className='inactive' to="/">{activePage - 1}</Link>
                    <Link className='active' to="/">{activePage}</Link>
                    <Link className='inactive' to="/">{activePage + 1}</Link>
                    <Link className='inactive' to="/">{activePage + 2}</Link>
                    <Link className='inactive' to="/">{activePage + 3}</Link>
                    ...
                    <Link className='inactive' to="/">{pages}</Link>
                </div>
            }

            {pages > 10 && activePage <= 4 &&
                < div className="d-flex flex-row">
                    {setFakeData(10).map((item, index) => (
                        <Link key={index} to="/" className={activePage === index + 1 ? 'active' : 'inactive'}>{index + 1}</Link>
                    ))}
                    ...
                    <Link className='inactive' to="/">{pages}</Link>
                </div>
            }

            {pages > 10 && activePage >= pages - 4 &&
                < div className="d-flex flex-row">
                    <Link className='inactive' to="/">1</Link>
                    ...
                    {setFakeData(10).map((item, index) => (
                        <Link key={index} to="/" className={activePage === pages - 9 +  index ? 'active' : 'inactive'}>{pages - 9 +  index}</Link>
                    ))}
                </div>
            }

            <button disabled={pages !== 1 && activePage !== pages ? false : true}>
                <img src={arrowRightIconGray} alt="arrow right icon" />
            </button>
        </div >
    );
}

export default Pagination;