import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../../../ContextStateGlobal';
import { Arabic, French, English } from '../../../utils/Constant';
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const HeaderDashbord = () => {
  const { language } = useContext(MyContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);


  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (path) => {
    setActivePath(path);
  };

  const linkStyle = (path) => ({
    backgroundColor: activePath === path ? '#007bff' : 'transparent',
    color: activePath === path ? '#fff' : 'inherit',
    textDecoration: 'none',
    display: 'block',
  });

  const handleRedirect = (scrollY) => {
    if (window.location.pathname !== "/" && window.innerWidth <= 768) {
      navigate("/", { replace: true });
      setTimeout(() => {
        window.scrollTo({
          top: scrollY,
          behavior: 'smooth'
        });
      }, 100);
    }
  }

  return (
    <div className="sidebar">
      <h2><TbLayoutDashboardFilled className='iconDashboard' />Dashboard</h2>
      <ul>
          <Link
            className='li'
            to="/adminDashboard/new-orders"
            onClick={() => {handleLinkClick("/adminDashboard/new-orders"); handleRedirect(400)}}
            style={linkStyle("/adminDashboard/new-orders")}
          >
            <span className='lineIl'></span>{language === 'fr' ? French.dashBoard[0] : language === 'ar' ? Arabic.dashBoard[0] : language === 'en' ? English.dashBoard[0] : ''}
          </Link>
          <Link
            className='li'
            to="/adminDashboard/orders-view-not-validate"
            onClick={() => {handleLinkClick("/adminDashboard/orders-view-not-validate"); handleRedirect(400)}}
            style={linkStyle("/adminDashboard/orders-view-not-validate")}
            >
            <span className='lineIl'></span>{language === 'fr' ? French.dashBoard[1] : language === 'ar' ? Arabic.dashBoard[1] : language === 'en' ? English.dashBoard[1] : ''}
          </Link>
          <Link
            className='li'
            to="/adminDashboard/orders-confirmedOrders"
            onClick={() => {handleLinkClick("/adminDashboard/orders-confirmedOrders"); handleRedirect(400)}}
            style={linkStyle("/adminDashboard/orders-confirmedOrders")}
            >
            <span className='lineIl'></span>{language === 'fr' ? French.dashBoard[2] : language === 'ar' ? Arabic.dashBoard[2] : language === 'en' ? English.dashBoard[2] : ''}
          </Link>
          <Link
            className='li'
            to="/adminDashboard/orders-not-confirmed"
            onClick={() => {handleLinkClick("/adminDashboard/orders-not-confirmed"); handleRedirect(400)}}
            style={linkStyle("/adminDashboard/orders-not-confirmed")}
          >
            <span className='lineIl'></span>{language === 'fr' ? French.dashBoard[3] : language === 'ar' ? Arabic.dashBoard[3] : language === 'en' ? English.dashBoard[3] : ''}
          </Link>
          <Link
            className='li'
            to="/adminDashboard/contacts"
            onClick={() => {handleLinkClick("/adminDashboard/contacts"); handleRedirect(400)}}
            style={linkStyle("/adminDashboard/contacts")}
          >
            <span className='lineIl'></span>{language === 'fr' ? French.dashBoard[4] : language === 'ar' ? Arabic.dashBoard[4] : language === 'en' ? English.dashBoard[4] : ''}
          </Link>
      </ul>
    </div>
  );
}

export default HeaderDashbord;
