import React, { useEffect,useState} from 'react'
import Header from './UserHeader'
import {useDispatch } from 'react-redux';
import './Prodctss.css'

function Order() {
    const [order,setOrder] = useState([])
    const [prodCount,setProdCount] = useState(0)
    const dispatch = useDispatch()
    useEffect(()=>{
        listOrder()
        prod_count()
    },[])
    const listOrder = async()=>{
        const order_det = await dispatch.cartModel.listOrder()
        console.log(order_det.data.data);
        
        const grouppedItems = order_det.data.data.reduce((acc,obj)=> {
            const {reference_id:key = 'reference_id'} = obj;
            (acc[key] = acc[key] || []).push(obj)
            return acc;
        }, {})
        
        let res = Array.from(Object.entries(grouppedItems), ([key, value,index]) => {
            //console.log(value);
            return {reference_id: key, value}
        }).flat();
        console.log(res);
        setOrder(res)

    }

    const prod_count = async()=>{
        const result = await dispatch.cartModel.getCount()  
        setProdCount(!result.count? 0 :result.count) 
    }

  return (
    <div>
        <Header badge={prodCount}/>
        {order.length === 0? <h3>No Orders Yet</h3> : (
        <div className = "yourOrders">

            <div className = "order-heading"><h1>Your Orders</h1></div>
            <div>{order.length} orders placed</div>
           
            {order.map((item, index) => 
            
            <div className = "order-cont">
                <div className="orderContainer order-header">
                    <div className="order-date">ORDER PLACED<span> {item.value[0].createdAt.split('T')[0]}</span></div>
                    <div className = "orderContainer-price">TOTAL <span>${item.value.reduce((totalHolder,item) => totalHolder +item.amount,0)}</span></div>
                    <div className = "order-reference"> <span>ORDER # {item.reference_id}</span></div>
                </div>
                {item.value.map((x)=>
                <div className="orderContainer">
                    <div className ="orderContainer-name" >{x.product.name} x {x.item_count}</div>
                    {/* <div className = "orderContainer-count">{x.item_count} *{x.product.price}</div> */}
                    <div className = "orderContainer-price"><button className= "order-button">Buy It again</button></div>  
                    
                </div>
                
                )}
            </div>
            )}
        </div>
        )}
    </div>
      )
    }
    
    export default Order
    // <div className ="order-div">
    // <Header />
    // <h1>YOUR ORDERS</h1>
    // <div>
    // {order.length === 0? <h3>No Orders Yet</h3> : (
    //  <table className="order-table">
    //  <thead>
    //      <tr>
             
    //          <th>Item</th>
    //          <th>Price</th>
    //          <th>quantity</th>
    //          <th>Reference_id</th>
    //      </tr>
    //  </thead>
    //  <tbody>
    //  {order.map((item, index) =>
    //     <tr>
                        
    //     <td>{item.product.name}</td>
    //     <td>{item.product.price}</td>
    //     <td>{item.item_count}</td>
    //     <td>{item.reference_id}</td>
    // </tr>
    //  )}
    //  </tbody>
    
    //  </table>
    
    
    // )}
    // </div>
    // </div>