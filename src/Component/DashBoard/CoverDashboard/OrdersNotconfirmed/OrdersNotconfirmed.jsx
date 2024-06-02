import CententDashboard from "../Content/CententDashboard"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { urlApi } from "../../../../utils/Constant"
import MyContext from "../../../../ContextStateGlobal"
import { Arabic, French, English } from "../../../../utils/Constant"

const OrdersNotconfirmed = () => {
  const { language } = useContext(MyContext)

  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get(`${urlApi}orders/validated`,{ withCredentials: true }
    )
      .then(res => {
        console.log(res.data)
        setOrders(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <CententDashboard title={language === 'fr' ? French.dashBoard[3] : language === 'ar' ? Arabic.dashBoard[3] : language === 'en' ? English.dashBoard[3] : ''} orders={orders} />
  )
}

export default OrdersNotconfirmed
