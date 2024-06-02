import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./DashBoard.css";
import HeaderDashbord from "./HeaderDashbord/HeaderDashbord";
import ConfirmedOrders from "./CoverDashboard/ConfirmedOrders/ConfirmedOrders";
import NewOrders from "./CoverDashboard/NewOrders/NewOrders";
import OrdersNotconfirmed from './CoverDashboard/OrdersNotconfirmed/OrdersNotconfirmed';
import NotViewAndConfirm from './CoverDashboard/NotViewAndConfirm/NotViewAndConfirm';
import Contact from './CoverDashboard/Contact/Contacts';
import { animateScroll as scroll } from "react-scroll";
import SingleContent from './CoverDashboard/Content/SingleContent/SingleContent';

const DashBoard = () => {

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div className="dashBoard">
      <HeaderDashbord />
      <Routes>
        <Route path="new-orders" element={<NewOrders />} />
        <Route path="orders-view-not-validate" element={<NotViewAndConfirm />} />
        <Route path="orders-confirmedOrders" element={<ConfirmedOrders />} />
        <Route path="orders-not-confirmed" element={<OrdersNotconfirmed />} />
        <Route path="single-order/:id" element={<SingleContent />} />
        <Route path="contacts" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default DashBoard;
