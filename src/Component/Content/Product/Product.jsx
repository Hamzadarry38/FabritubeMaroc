import { useEffect, useState, useContext } from 'react';
import { urlApi } from '../../../utils/Constant';
import "./Product.css";
import { Link } from 'react-router-dom';
import MyContext from '../../../ContextStateGlobal';
import { Arabic, French, English } from '../../../utils/Constant';
import axios from 'axios';

const Product = () => {
  const { language } = useContext(MyContext);

  const [product, setProduct] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    axios.get(`${urlApi}products`, { crossdomain: true })
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  return (
    <div className="product" id='product'>
      <h1>{language === 'ar' ? Arabic.product[0] : language === 'fr' ? French.product[0] : language === 'en' ? English.product[0] : ''}</h1>
      <div className="product__container">
        {
          product.map((product, index) => {
            return (
              <div className="product__card" key={index}>
                  <div className="product__card__img">
                    <img src={product.image} alt="product" />
                  </div>
                  <h2>{product.title}</h2>
                  <p onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded || product.description.length <= 70 ? product.description : product.description.substring(0, 70) + "..."}
                  </p>
                  <Link className='linkProduct' to={`/product/order/${product._id}`} key={index}>
                    <button>{language === 'ar' ? Arabic.product[1] : language === 'fr' ? French.product[1] : language === 'en' ? English.product[1] : ''}</button>
                  </Link>
                </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Product;
