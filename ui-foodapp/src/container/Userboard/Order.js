import React, { useEffect,useState} from 'react'
import Header from './UserHeader'
import {useDispatch } from 'react-redux';

function Order() {
    const [order,setOrder] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        listOrder()
    },[])
    const listOrder = async()=>{
        const order_det = await dispatch.cartModel.listOrder()
        console.log(order_det.data);
       setOrder(order_det.data.data)
    }

  return (
    <div className ="order-div">
    <Header />
    <h1>YOUR ORDERS</h1>
    <div>
    {order.length === 0? <h3>No Orders Yet</h3> : (
     <table className="order-table">
     <thead>
         <tr>
             
             <th>Item</th>
             <th>Price</th>
             <th>quantity</th>
             <th>Reference_id</th>
         </tr>
     </thead>
     <tbody>
     {order.map((item, index) =>
        <tr>
                        
        <td>{item.product.name}</td>
        <td>{item.product.price}</td>
        <td>{item.item_count}</td>
        <td>{item.reference_id}</td>
    </tr>
     )}
     </tbody>
    
     </table>
    
    
    )}
    </div>
    </div>
  )
}

export default Order