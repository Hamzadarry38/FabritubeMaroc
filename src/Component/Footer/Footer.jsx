import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import MyContext from '../../ContextStateGlobal';
import { Arabic, French, English } from '../../utils/Constant';
import { useState, useContext } from 'react';
import { IoIosPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { urlApi } from '../../utils/Constant';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Footer.css';

function Footer() {
    const { language } = useContext(MyContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        if(name === '' || email === '' || message === '') {
            toast.error('All fields are required');
            return;
        }
        axios.post(`${urlApi}contacts/create`, {name, email, message})
            .then(res => {
                toast.success(res.data.message);
                setName('');
                setEmail('');
                setMessage('');
            })
            .catch(err => {
                console.log(err.response.data.error)
                toast.error(err.response.data.error);
            })
    }

  return (
    <div className='footer_global'>
        <div className='footer'>
            <div className='footerOne'>
                <h1>{language === 'ar' ? Arabic.footer[0] : language === 'fr' ? French.footer[0] : language === 'en' ? English.footer[0] : ''}</h1>
                <p>{language === 'ar' ? Arabic.footer[1] : language === 'fr' ? French.footer[1] : language === 'en' ? English.footer[1] : ''}</p>
            </div>
            <div className='footerTwo'>
                <h1>{language === 'ar' ? Arabic.footer[2] : language === 'fr' ? French.footer[2] : language === 'en' ? English.footer[2] : ''}</h1>
                <MdLocationOn className='icons_footer' /> <p>{language === 'ar' ? Arabic.footer[3] : language === 'fr' ? French.footer[3] : language === 'en' ? English.footer[3] : ''}</p>
                <IoIosPhonePortrait className='icons_footer' /> <p>{language === 'ar' ? Arabic.footer[4] : language === 'fr' ? French.footer[4] : language === 'en' ? English.footer[4] : ''}</p>
                <MdEmail className='icons_footer' /><p>{language === 'ar' ? Arabic.footer[5] : language === 'fr' ? French.footer[5] : language === 'en' ? English.footer[5] : ''}</p>
                <MdAccessTime className='icons_footer' /><p>{language === 'ar' ? Arabic.footer[6] : language === 'fr' ? French.footer[6] : language === 'en' ? English.footer[6] : ''}</p>
            </div>
            <div className='footerContact' id='contact'>
                <h1>{language === 'ar' ? Arabic.footer[7] : language === 'fr' ? French.footer[7] : language === 'en' ? English.footer[7] : ''}</h1>
                <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
                <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <textarea placeholder='Message' onChange={(e) => setMessage(e.target.value)} value={message} ></textarea>
                <button onClick={handleSubmit}>
                    Send
                </button>
            </div>
        </div>
        <div className='footerBottom'>
            <p>{language === 'ar' ? Arabic.footer[8] : language === 'fr' ? French.footer[8] : language === 'en' ? English.footer[8] : ''}</p>
            <nav>
                <a href='https://www.facebook.com/people/Fabritube-Maroc/61550787339746/?mibextid=rS40aB7S9Ucbxw6v'><FaFacebook /></a>
                <a href='https://www.instagram.com/'><FaInstagram /></a>
                <a href='https://www.linkedin.com/'><FaLinkedin /></a>
                <a href='https://twitter.com/'><FaTwitter /></a>
            </nav>
        </div>
    </div>
  )
}

export default Footer