import React, { useState, useEffect, useContext } from 'react';
import './Header.css';
import { animateScroll as scroll } from "react-scroll";
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { urlApi } from '../../utils/Constant';
import { toast } from 'react-toastify';
import axios from 'axios';
import MyContext from '../../ContextStateGlobal';
import { Arabic, French, English } from '../../utils/Constant';
import { SiGoogletranslate } from "react-icons/si";


const Header = () => {
  const { authToken, setAuthToken, language, setLanguage } = useContext(MyContext);

  const [openLanguage, setOpenLanguage] = useState(false);

  const navigate = useNavigate();

  // Function to check the screen width
  const checkScreenWidth = () => window.matchMedia('(min-width: 601px)').matches;

  // Initialize state based on the current screen width
  const [openMenu, setOpenMenu] = useState(checkScreenWidth);

  // State to keep track of the currently clicked link
  const [clickedLink, setClickedLink] = useState('home'); // Set 'home' as the default

  useEffect(() => {
    scroll.scrollToTop();

    // Handler to update the state when the screen width changes
    const handleResize = () => {
      setOpenMenu(checkScreenWidth());
    };

    // Add the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle link click
  const handleLinkClick = (link) => {
    setClickedLink(link);
  };

  const handleRedirect = (scrollY) => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        window.scrollTo({
          top: scrollY,
          behavior: 'smooth'
        });
      }, 800);
    }
  }

  const handleLogout = () => {
    axios.get(`${urlApi}auth/logout`, { withCredentials: true })
      .then(res => {
        localStorage.removeItem('auth_token');
        setAuthToken(false);
        toast.success(res.data.message);
        console.log(res.data.message);
      })
      .catch(err => {
        toast.error(err.response.data.error);
      });
  }

  const handleCloseMenu = () => {
    console.log("clicked")
    if (window.innerWidth <= 768) {
      console.log('clicked');
      setOpenMenu(false);
    }
  }

  const handleLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setOpenLanguage(false);
  }

  return (
    <header>
      <div className="header_left">
        <Link
          to="home"
          className="logo"
          spy={true}
          smooth={true}
          offset={-70}
          duration={1000}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            handleLinkClick('home');
            handleRedirect();
            handleCloseMenu();
          }}
        >
          <img 
            src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_100/12731805/459471_744675.png" 
            alt="logo" 
            />
          <h1>FabritubeMaroc</h1>
        </Link>
      </div>
      <div className="menuIcon">
        {openMenu ? (
          <MdClose onClick={() => setOpenMenu(false)} className="menu" />
        ) : (
          <HiMenu className="menu" onClick={() => setOpenMenu(true)} />
        )}
      </div>
      <div className="header_right">
        <ul
          style={{
            clipPath: openMenu 
              ? 'polygon(0 0, 100% 0, 99% 100%, 0 100%)'
              : 'polygon(0 0, 100% 0, 100% 0, 0 0)'
          }}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={1000}
            className={clickedLink === 'home' ? 'clicked' : ''}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleLinkClick('home');
              handleRedirect();
              handleCloseMenu();
            }}
          >
            {language === 'ar' ? Arabic.header[0] : language === 'fr' ? French.header[0] : language === 'en' ? English.header[0] : ''}
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={1000}
            className={clickedLink === 'about' ? 'clicked' : ''}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleLinkClick('about');
              handleRedirect(2378);
              handleCloseMenu();
            }}
          >
            {language === 'ar' ? Arabic.header[1] : language === 'fr' ? French.header[1] : language === 'en' ? English.header[1] : ''}
          </Link>
          <Link
            to="product"
            spy={true}
            smooth={true}
            offset={-70}
            duration={1000}
            className={clickedLink === 'product' ? 'clicked' : ''}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleLinkClick('product');
              handleRedirect(1649);
              handleCloseMenu();
            }}
          >
            {language === 'ar' ? Arabic.header[2] : language === 'fr' ? French.header[2] : language === 'en' ? English.header[2] : ''}
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-70}
            duration={1000}
            className={clickedLink === 'contact' ? 'clicked' : ''}
            style={{ cursor: 'pointer' }}
            onClick={() => { handleLinkClick('contact'); handleCloseMenu()}}
          >
            {language === 'ar' ? Arabic.header[3] : language === 'fr' ? French.header[3] : language === 'en' ? English.header[3] : ''}
          </Link>
          {
            authToken ? (
              <>
                <RouterLink to="/adminDashboard/new-orders" onClick={() => handleCloseMenu()} className='routeLink'>
                  <button className="dashboard-button">
                    {language === 'ar' ? Arabic.header[5] : language === 'fr' ? French.header[5] : language === 'en' ? English.header[5] : ''}
                  </button>
                </RouterLink>
                <button className="logout-button" onClick={handleLogout}>
                  {language === 'ar' ? Arabic.header[6] : language === 'fr' ? French.header[6] : language === 'en' ? English.header[6] : ''}
                </button>
              </>
            ) : (
              <RouterLink to="/login" className='routeLink'>
                <button className="login" onClick={() => handleCloseMenu()} >
                  {language === 'ar' ? Arabic.header[4] : language === 'fr' ? French.header[4] : language === 'en' ? English.header[4] : ''}
                </button>
              </RouterLink>
            )
          }
          <div className="language" onClick={() => setOpenLanguage(!openLanguage)} >
            <SiGoogletranslate />
          </div>
        </ul>
<div className="language__cover" style={{ marginRight: openLanguage ? (window.innerWidth <= 768 ? '306px' : '60px') : '-100px' }}>
            <button
              className={language === 'ar' ? 'active' : ''}
              onClick={() => handleLanguage('ar')}
            >
              AR
            </button>
            <button
              className={language === 'fr' ? 'active' : ''}
              onClick={() => handleLanguage('fr')}
            >
              FR
            </button>
            <button
              className={language === 'en' ? 'active' : ''}
              onClick={() => handleLanguage('en')}
            >
              EN
            </button>
          </div>
      </div>
    </header>
  );
};

export default Header;
