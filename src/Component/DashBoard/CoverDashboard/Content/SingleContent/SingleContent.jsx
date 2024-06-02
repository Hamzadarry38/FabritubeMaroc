import React from 'react';
import './SingleContent.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import MyContext from '../../../../../ContextStateGlobal';
import { Arabic, French, English } from '../../../../../utils/Constant';
import { urlApi } from '../../../../../utils/Constant';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate } from 'react-router-dom';

const SingleContent = () => {
    const { language } = useContext(MyContext);

    const { id } = useParams();
    const idUser = id.split('-')[0];
    const index = id.split('-')[1];
    const [order, setOrder] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${urlApi}orders/${idUser}`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setOrder(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleValidateOrder = () => {
      confirmAlert({
        title: 'Confirm Order Validation',
        message: 'Are you sure you want to validate this order?',
        buttons: [
          {
            label: 'Yes',
              onClick: () => {
              axios.put(`${urlApi}orders/validate/${idUser}`, {}, { withCredentials: true })
                .then(res => {
                  console.log(res.data);
                  toast.success('Order validated successfully');
                  navigate('/adminDashboard/new-orders');
                })
                .catch(err => {
                  console.log(err);
                  toast.error('Error validating order');
                });
            }
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      });
    };
    

    console.log(order.productId)

  return (
    <div className="single-content">
      <h1>{language === 'fr' ? French.dashBoardMenu[1] : language === 'ar' ? Arabic.dashBoardMenu[1] : language === 'en' ? English.dashBoardMenu[1] : ''}<span className='title_user' >{order.firstName} {order.lastName}</span></h1>
      <div className="order-details">
        <div className="order-label">{language === 'fr' ? French.dashBoardMenu[2] : language === 'ar' ? Arabic.dashBoardMenu[2] : language === 'en' ? English.dashBoardMenu[2] : ''}</div>
        <div className="order-value">{index}</div>

        <div className="order-label">{language === 'fr' ? French.dashBoardMenu[3] : language === 'ar' ? Arabic.dashBoardMenu[3] : language === 'en' ? English.dashBoardMenu[3] : ''}</div>
        <div className="order-value">
            {new Date(order.createdAt).toLocaleDateString('fr-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
        </div>

        <div className="order-label">{language === 'fr' ? French.dashBoardMenu[4] : language === 'ar' ? Arabic.dashBoardMenu[4] : language === 'en' ? English.dashBoardMenu[4] : ''}</div>
        <div className="order-value">{order.firstName} {order.lastName}</div>

        <div className="order-label">{language === 'fr' ? French.dashBoardMenu[5] : language === 'ar' ? Arabic.dashBoardMenu[5] : language === 'en' ? English.dashBoardMenu[5] : ''}</div>
        <div className="order-value">{order.email}</div>

        <div className="order-label">{language === 'fr' ? French.dashBoardMenu[6] : language === 'ar' ? Arabic.dashBoardMenu[6] : language === 'en' ? English.dashBoardMenu[6] : ''}</div>
        <div className="order-value">{order.telephone}</div>

        <div className="order-label">{language === 'fr' ? French.dashBoardMenu[7] : language === 'ar' ? Arabic.dashBoardMenu[7] : language === 'en' ? English.dashBoardMenu[7] : ''}</div>
        <div className="order-value">{order.comment}</div>

        {
          !order.validated && (
            <>
              <div className="order-label">{language === 'fr' ? French.dashBoardMenu[8] : language === 'ar' ? Arabic.dashBoardMenu[8] : language === 'en' ? English.dashBoardMenu[8] : ''}</div>
              <div className="order-value">
                <button onClick={handleValidateOrder} className="validate-button">{language === 'fr' ? French.dashBoardMenu[0] : language === 'ar' ? Arabic.dashBoardMenu[0] : language === 'en' ? English.dashBoardMenu[0] : ''}</button>
              </div>
            </>
          )
        }
      <div className="order-dashBoard">
        <div className="dashBoard-order-image">
          <img src={(order?.productId?.image)} alt={order.productId?.title} />
        </div>
        <div className="dashBoard-order-details">
          <h2>{order.productId?.title}</h2>
          <p>{order.productId?.description}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SingleContent;