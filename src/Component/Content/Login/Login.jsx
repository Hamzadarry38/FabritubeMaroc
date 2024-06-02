import React from 'react';
import './Login.css';
import { animateScroll as scroll } from "react-scroll";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { urlApi } from '../../../utils/Constant';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../../ContextStateGlobal';



const Login = () => {
    const { setAuthToken, language } = useContext(MyContext);

    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if (email === '' || password === '') {
            toast.error('Veuillez remplir tous les champs');
        }
        
        axios.post(`${urlApi}auth/login`, { email, password }, { withCredentials: true })
        .then(res => {
            toast.success(res.data.message);
            setAuthToken(true);
            localStorage.setItem('auth_token', res.data.token);
    
            setTimeout(() => {
                navigate("/adminDashboard/new-orders", { replace: true });
            }, 2000);
        })
        .catch(err => {
            toast.error(err.response?.data?.error || 'An error occurred');
            console.log(err);
        });
    }

    useEffect(() => {
        scroll.scrollToTop();
    }, []);


  return (
    <div className="login-cover">
      <div className="login-container">
        <h1>{language === 'fr' ? 'Connexion' : language === 'ar' ? 'تسجيل الدخول' : language === 'en' ? 'Login' : ''}</h1>
          <label>E-mail :</label>
          <input type="text" placeholder={language === 'fr' ? 'Entrer E-mail' : language === 'ar' ? 'أدخل البريد الإلكتروني' : language === 'en' ? 'Enter E-mail' : ''} name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          
          <label>Mot de passe :</label>
          <input type="password" placeholder={language === 'fr' ? 'Entrer Mot de passe' : language === 'ar' ? 'أدخل كلمة المرور' : language === 'en' ? 'Enter Password' : ''} name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          
          <button type="submit" className="login-button" onClick={handleSubmit}>{language === 'fr' ? 'Connexion' : language === 'ar' ? 'تسجيل الدخول' : language === 'en' ? 'Login' : ''}</button>
      </div>
    </div>
  );
}

export default Login;