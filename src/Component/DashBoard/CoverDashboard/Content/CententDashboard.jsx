import React, { useState, useContext } from 'react';
import MyContext from '../../../../ContextStateGlobal';
import axios from 'axios';
import { urlApi } from '../../../../utils/Constant';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { Arabic, French, English } from '../../../../utils/Constant';

const CententDashboard = ({ title, orders }) => {
  const { language } = useContext(MyContext);

  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const ordersPerPage = 8;
  const pagesVisited = pageNumber * ordersPerPage;
  const isMobile = window.innerWidth <= 768;

  const marginPagesDisplayed = isMobile ? 1 : 5;
  const pageRangeDisplayed = isMobile ? 1 : 5;



  const displayOrders = orders
    .slice(pagesVisited, pagesVisited + ordersPerPage)
    .map((order, index) => (
      <ul className="order_list_body" key={index + pagesVisited}>
        <li style={{ textAlign: 'left' }}># {index + 1 + pagesVisited}</li>
        <li style={{ textAlign: 'left' }}>
          {new Date(order.createdAt).toLocaleDateString('fr-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </li>
        <li style={{ textAlign: 'left' }}>{order.firstName} {order.lastName}</li>
        <li style={{ textAlign: 'left' }}>{order.email}</li>
        <li style={{ textAlign: 'left' }}>{order.telephone}</li>
        <li style={{ textAlign: 'left' }}>
          <button onClick={() => handleView(order._id, index)}>{language === 'fr' ? French.dashBoard[5] : language === 'ar' ? Arabic.dashBoard[5] : language === 'en' ? English.dashBoard[5] : ''}</button>
        </li>
      </ul>
    ));

  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleView = (id, index) => {
    axios.put(`${urlApi}orders/notification/${id}`, {}, {
      withCredentials: true
    })
      .then(res => {
        console.log(res.data);
        console.log("clicked");
        navigate(`/adminDashboard/single-order/${id}-${index + 1 + pagesVisited}`);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="content">
      <div className="content_dashboard">
        <h1>{title}</h1>
        <ul className="order_list_header">
          {[
            2, 3, 4, 5, 6, 8
          ].map(index => (
            <li style={{ textAlign: 'left' }} key={index}>
              {language === 'fr' ? French.dashBoardMenu[index] :
              language === 'ar' ? Arabic.dashBoardMenu[index] :
              language === 'en' ? English.dashBoardMenu[index] :
              ''}
            </li>
          ))}
        </ul>
        {displayOrders.length !== 0 ? displayOrders : <h1 style={{ textAlign: "center", color: "#c7b9b9", margin: "50px 0 50px 0" }}>No orders</h1>}
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={marginPagesDisplayed}
          pageRangeDisplayed={pageRangeDisplayed}
          onPageChange={changePage}
          containerClassName={'pagination'}
          pageClassName={'page'}
          activeClassName={'active'}
          previousClassName={'previous'}
          nextClassName={'next'}
          disabledClassName={'disabled'}
          breakLinkClassName={'break-link'}
        />
      </div>
    </div>
  );
}

export default CententDashboard;
