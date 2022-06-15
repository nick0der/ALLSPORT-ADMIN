import { useEffect, useState } from "react";
import { userRequest } from "../../requests";
import "./widgetLg.css";
 import {format} from "timeago.js"

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("order");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Останні замовлення</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Замовник</th>
          <th className="widgetLgTh">Дата</th>
          <th className="widgetLgTh">Кількість</th>
          <th className="widgetLgTh">Статус</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.name + " " + order.lastName}</span>
            </td>
             <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">{order.total} грн.</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
