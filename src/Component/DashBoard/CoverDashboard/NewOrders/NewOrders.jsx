import { useEffect, useState, useContext} from "react"
import MyContext from "../../../../ContextStateGlobal"
import { Arabic, French, English } from "../../../../utils/Constant"
import CententDashboard from "../Content/CententDashboard"
import axios from 'axios'
import { urlApi } from "../../../../utils/Constant"

const NewOrders = () => {
  const {language} = useContext(MyContext)
  console.log(English.dashBoard[0])

  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get(`${urlApi}orders/notification`,{ withCredentials: true }
    )
      .then(res => {
        setOrders(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <CententDashboard title={language === 'fr' ? French.dashBoard[0] : language === 'ar' ? Arabic.dashBoard[0] : language === 'en' ? English.dashBoard[0] : ''} orders={orders} />
  )
}

export default NewOrders
