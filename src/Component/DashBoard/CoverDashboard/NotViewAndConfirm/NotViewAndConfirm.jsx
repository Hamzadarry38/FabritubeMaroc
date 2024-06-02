import CententDashboard from "../Content/CententDashboard"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import MyContext from "../../../../ContextStateGlobal"
import { Arabic, French, English } from "../../../../utils/Constant"
import { urlApi } from "../../../../utils/Constant"

const NotViewAndConfirm = () => {
  const { language } = useContext(MyContext)

  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get(`${urlApi}orders/not-notification-and-validated`,{ withCredentials: true }
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
    <CententDashboard title={language === 'fr' ? French.dashBoard[1] : language === 'ar' ? Arabic.dashBoard[1] : language === 'en' ? English.dashBoard[1] : ''} orders={orders} />
  )
}

export default NotViewAndConfirm
