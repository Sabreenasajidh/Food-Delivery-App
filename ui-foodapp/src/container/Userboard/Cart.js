import React,{useEffect,useState} from 'react'
import {useDispatch } from 'react-redux';
import {useNavigate } from 'react-router';
import './Prodctss.css'
import Header from './UserHeader'
import Cookies from '../../helpers/cookie';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Popup from 'reactjs-popup'
import cart from './cart.png'

function Cart() {
    const user = Cookies.getCookie('userIn')
    const [CartList,setCartList] = useState([])
    const [prodCount,setProdCount] = useState(0)
    const [value,setValue] = useState(0)
    const [amount,setAmount] = useState(0)
    const [isOpen, setIsOpen] = useState(false);
    const dispatch= useDispatch()
    const nav = useNavigate()

    useEffect(()=>{
        cartlist()
        prod_count()
      
    },[])
    const handleOpen = (index) => {
        const status =CartList[index].status;
        console.log(status);
        CartList[index].status = isOpen ?  isOpen: false;
        //     setValue(itemCount)
        setIsOpen(status );
    }
    
    
    const cartlist  = async()=>{
        const list = await dispatch.cartModel.getlist();
        setCartList(list.data.data)
        console.log(list.data.data);
        setAmount(list.data.data.reduce((totalHolder,item) => totalHolder + (item.count*item.product.price),0))
    }  
    const prod_count = async()=>{
        const result = await dispatch.cartModel.getCount()  
        console.log(result);
        setProdCount(!result.count? 0 :result.count) 
    }
    const onAdd = (item)=>{
        setProdCount(prodCount+1)
        const itemCount =item.count+1;
        item.count = itemCount
        setValue(itemCount)
        setAmount(amount+item.product.price)
        const params = {product_id:item.product_id,product_name:item.product_name,count:item.count}
        updateCart(params)  
    }
    const onDelete = async(item)=>{
        setProdCount(prodCount-1)
        if((item.count-1) < 0 || (item.count-1) == 0){
            setAmount(amount-((item.count - 1)*item.product.price))
            setValue(0)
            const params = {product_id:item.product_id,product_name:item.product_name,count:0}
            await updateCart(params)
            cartlist()
        }else{
            const itemCount =item.count-1;
            item.count = itemCount
            setValue(itemCount)
            setAmount(amount-item.product.price)
            const params = {product_id:item.product_id,product_name:item.product_name,count:item.count}
            updateCart(params) 
        }
    }
    const  deleteOrder = async(item) => {
        setIsOpen(false );
        if(item){
            const amt = amount - (item.count*item.product.price)
            setAmount(amt)
    
            setProdCount(prodCount-item.count)
            const params = {user_id:item.user_id,product_id:item.product_id}
            await dispatch.cartModel.deleteOrder(params) 
            cartlist()

        }else{
          setProdCount(0);
            const uid = {user_id:JSON.parse(user).id}
            let userid = new URLSearchParams(uid).toString();
            
            await dispatch.cartModel.deleteOrder(userid) 
            cartlist()
        }
      }


    const updateCart = async(params)=>{
        const uid = {id:JSON.parse(user).id}
        let userid = new URLSearchParams(uid).toString();
        const op = {params,userid}
        const res = await dispatch.cartModel.addtoCart(op);      
    }
    const proceedButton = async(e)=>{
        const randomPassword =Math.random().toString(36).slice(-8);
        const res = CartList.map((item, index) =>{
            return {
                product_id:item.product.id,
                item_count:item.count,
                amount:item.product.price*item.count,
                user_id:JSON.parse(user).id,
                reference_id : randomPassword    
            }
          })
          await dispatch.cartModel.addorder(res)
          nav('/customer/order')
      }
      const home = ()=>{
        nav('/customer')
       }
  return (
    <div>
    <Header badge={prodCount}/>
    <div class="CartContainer">
         {!CartList.length?  (
         <div className= "h">
            <h3 className="h">Ooops :( Nothing in your Cart</h3>
            <button className="cart-empty" onClick = {home}>Continue Shopping</button>
            <img src ={cart} />
         </div>
       ) : (
        <div>
   	   <div class="Header">
   	   	<h3 class="Heading">Shopping Cart</h3>
            <Stack direction="row" spacing={4}>
                <Popup
                    trigger= {<h5 class="Action" >Remove all</h5>}
                    open={isOpen}
                    
                    position="right center"
                >
                <button onClick={()=>{deleteOrder()}}>Confirm</button>
                </Popup>
            </Stack>
   	   </div>
          {CartList.map((item, index) => {
              return (
                <div class="Cart-Items">
                    {/* <div class="image-box">
                    <img src={`http://localhost:9000/${item.product.image}`} alt={item.name} height="70px" />
                    </div> */}
                    <div class="about">
                        <h1 class="title">{item.product.name}</h1>
                        <h3 class="subtitle">{item.product.description}</h3>
                    </div>
                    <div class="counter">
                        <div className="btn" onClick={()=>{onDelete(item)}}>-</div>
                        <div className="count" value = {item.count}>{item.count}</div>
                        <div className="btn" onClick = {()=>{onAdd(item)}}>+</div>
                    </div>
                    <div class="prices">
                        <div class="amount">${item.count*item.product.price}</div>
                        {/* <div class="remove" ><u><DeleteIcon /></u></div> */}
                        <Stack direction="row" spacing={4}>
                            <Popup
                                trigger= {<DeleteIcon />}
                                open={isOpen}
                                onOpen={()=>{handleOpen(index)}}
                                position="right center"
                            >
                            <button onClick={()=>{deleteOrder(item)}}>Confirm</button>
                            </Popup>
                        </Stack>
                    </div>
                </div>

              )})}
          <hr /> 
   	 <div class="checkout">
   	 <div class="total">
   	 	<div>
   	 		<div class="Subtotal">Sub-Total</div>
   	 		<div class="items">{prodCount} items</div>
   	 	</div>
   	 	<div class="total-amount">${amount}</div>
   	 </div>
   	 <button class="button" onClick = {proceedButton}>Checkout</button></div>
          </div>
       )}
   	 
   </div>
   </div>
  )
}

export default Cart