import "./Order.css";
import React, { useState, useEffect, useContext } from "react";
import MyContext from "../../../../ContextStateGlobal";
import { animateScroll as scroll } from "react-scroll";
import { useParams } from "react-router-dom";
import { urlApi } from "../../../../utils/Constant";
import { Arabic, French, English } from "../../../../utils/Constant";
import axios from "axios";
import { toast } from "react-toastify";


function Order() {
  const { language } = useContext(MyContext);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [comment, setComment] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    axios.get(`${urlApi}products/${id}`)
      .then(response => {
        setProduct(response.data);
        console.log(response.data);
        console.log(product.image[0])
      })
      .catch(error => {
        console.log(error);
      });
    }, [id]);
    
    const handleSubmit = async (e) => {
      console.log(product._id)
      axios.post(`${urlApi}orders/create`, {email, firstName, lastName, telephone, comment,productId : product._id })
        .then(res => {
          toast.success(res.data.message);
          setEmail("");
          setFirstName("");
          setLastName("");
          setTelephone("");
          setComment("");
        })
        .catch(err => {
          toast.error(err.response.data);
        });
  };
  
  

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div className="order">
      <div className="order__form">
        <h2>Customer information</h2>
        <label>Email Address :</label>
        <input type="text" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} value={email} />
        <label>{language === "ar" ? Arabic.order[0] : language === "fr" ? French.order[0] : language === "en" ? English.order[0] : ""}</label>
        <input type="text" placeholder="Prénom" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
        <label>{language === "ar" ? Arabic.order[1] : language === "fr" ? French.order[1] : language === "en" ? English.order[1] : ""}</label>
        <input type="text" placeholder="Nom" onChange={(e) => setLastName(e.target.value)} value={lastName} />
        <label>{language === "ar" ? Arabic.order[2] : language === "fr" ? French.order[2] : language === "en" ? English.order[2] : ""}</label>
        <input type="number" placeholder="Téléphone" onChange={(e) => setTelephone(e.target.value)} value={telephone} />
        <label>{language === "ar" ? Arabic.order[3] : language === "fr" ? French.order[3] : language === "en" ? English.order[3] : ""}</label>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          className="textarea"
          placeholder={language === "ar" ? Arabic.order[3] : language === "fr" ? French.order[3] : language === "en" ? English.order[3] : ""}
        ></textarea>
        {condition && (
          <div className="order__form__codition">
            <p>
              {language === "ar" ? Arabic.order[5] : language === "fr" ? French.order[5] : language === "en" ? English.order[5] : ""}
            </p>
          </div>
        )}
        <nav className="order__form__checkbox">
          <div className="checkbox-wrapper-30">
            <span className="checkbox">
              <input type="checkbox" onChange={() => setCheckbox(!checkbox)} />
              <svg>
                <use xlinkHref="#checkbox-30" className="checkbox"></use>
              </svg>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
              <symbol id="checkbox-30" viewBox="0 0 22 22">
                <path
                  fill="none"
                  stroke="black"
                  d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13 c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"
                />
              </symbol>
            </svg>
          </div>
          <label
            onClick={() => {
              setCondition(!condition);
              scroll.scrollTo(400);
              scroll.scrollTo(100);
            }}
          >
            {language === "ar" ? Arabic.order[4] : language === "fr" ? French.order[4] : language === "en" ? English.order[4] : ""}
          </label>
        </nav>
        <button onClick={handleSubmit} style={{cursor: checkbox ? 'pointer' : 'not-allowed'}}
        disabled={!checkbox}>
          {language === "ar" ? Arabic.order[6] : language === "fr" ? French.order[6] : language === "en" ? English.order[6] : ""}
        </button>
      </div>
      <div className="order-summary">
        {
          <div className="order-summary__card">
            <div className="order-summary__image">
              <img src={(product.image)} alt={product.title} />
            </div>
            <h2 className="order-summary__title">{product.title}</h2>
            <p className="order-summary__description">
              {product.description}
            </p>
          </div>
        }
      </div>
    </div>
  );
}

export default Order;
