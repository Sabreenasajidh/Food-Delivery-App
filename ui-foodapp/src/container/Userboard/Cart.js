import React,{useEffect,useState} from 'react'
import Header from './UserHeader'
import {useDispatch } from 'react-redux';
import {useNavigate } from 'react-router';
import logo from './logo.png'
import  Cookie from '../../helpers/cookie'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from '@mui/material/Stack';
import Popup from 'reactjs-popup'
import Grid from '@mui/material/Grid';
import { ToastContainer } from 'react-toastify';
import './cart.css'

function Cart() {
    const [CartList,setCartList] = useState([])
    //const[params,setParam] =useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [value,setValue] = useState(0)
    const dispatch= useDispatch()
    const nav = useNavigate()
    const user = Cookie.getCookie('userIn')
    console.log(user);

    useEffect(()=>{
        cartlist()
    },[])
    console.log(CartList);

    const cartlist  = async()=>{
        const list = await dispatch.cartModel.getlist();
        setCartList(list.data.data)
    }   

    const tot_amnt = ()=> {
        const dd = ! CartList? null  : CartList.reduce((totalHolder,m) => totalHolder + m.product.price,0)
        return dd

    }

    const proceedButton = async(e)=>{
        const randomPassword =Math.random().toString(36).slice(-8);
         const res = CartList.map((item, index) =>{
            return {
                product_id:item.product.id,
                item_count:item.count,
                amount:item.product.price*item.count,
                user_id:user.id,
                reference_id : randomPassword
                
            }
        })
        await dispatch.cartModel.addorder(res)
        nav('/customer/order')
            

    }
    const handleOpen = (index) => {
      const status =CartList[index].status;
      console.log(status);
      CartList[index].status = isOpen ?  isOpen: false;
      //     setValue(itemCount)
      setIsOpen(status );
    }
    
   const  deleteOrder = async(item,index) => {
      setIsOpen(false );
      const params = {user_id:item.user_id,product_id:item.product_id}
      const delete_product =await dispatch.cartModel.deleteOrder(params);
      if(delete_product){
        cartlist()
      }
    }
    const buttonIncrement = (index)=>{
      const itemCount =CartList[index].count;
      CartList[index].count = itemCount ?  (itemCount +1): 2;
      setValue(itemCount)
      
    }
    const decrementButton = (index)=>{
      const itemCount =CartList[index].count;
      CartList[index].count = itemCount ?  (itemCount -1): 1;
      setValue(itemCount)
    }
    const updateCart = async(item,index)=>{
      console.log(item);
      const count = item.count?item.count:1
       const params = {product_id:item.id,count:count,user_id:item.user_id}
     const res = await dispatch.cartModel.updateCart(params);
     console.log(res);
     }
    
    
    

  return (
  <div>
    <Header />
    <header className="container">
        <h1>Shopping Cart</h1>

        <ul className="breadcrumb">
          <li>Home</li>
          <li>Shopping Cart</li>
        </ul>

        <span className="count">{CartList.length? CartList.length:0} items in the bag</span>
    </header>

<section className="container">

{CartList.length === 0?  <h3>Ooops :( Nothing in your Cart</h3> : (
<ul className="products">
  {CartList.map((item, index) => {
    return (
      <li className="row" key={index}>
        <div className="col left">
          <div className="thumbnail">
              <img src={`http://localhost:9000/${item.product.image}`} alt={item.name} />
          </div>
          <div className="detail">
            <div className="name">
              {item.product.name}
            </div>
            <div className="description">{item.product.description}</div>
            <div className="price">Rs.{item.product.price}</div>
          </div>
        </div>

        <div className="col right">
          <div className="quantity" >
            {/* <input
              type="number"
              className="quantity"
              step="1"
               value={item.count}
            /> */}
             <ButtonGroup size="large" aria-label="large outlined button group">
             <Button onClick = {()=>{decrementButton(index)}}>-</Button>
                <Button disabled value= {item.count}>{item.count}</Button>
                <Button onClick={()=>{buttonIncrement(index)}}>+</Button>
            </ButtonGroup>
          </div>
          <div className="remove">
            <Button variant="outlined" startIcon={<AddShoppingCartIcon />} onClick={()=>{updateCart(item,index)}}>Update</Button>
            </div>

          <div className="remove">
          <Stack direction="row" spacing={2}>

          <Popup
            trigger= {<Button variant="outlined" startIcon={ <DeleteIcon />}>  Delete  </Button>} 
            open={isOpen}
            onOpen={()=>{handleOpen(index)}}
            position="right center"
          >
            <button onClick={()=>{deleteOrder(item,index)}}>Confirm</button>
            </Popup>
            </Stack>
            
          </div>
        </div>
      </li>
    );
  })}
</ul>)}

</section>
<section className="container">
    <div className="summary">
    <ul>
         
          <li className="total">
            Total <span>Rs.{tot_amnt()}</span>
          </li>
     </ul>
    </div>

      <div className="checkout">
        <button type="button" onClick = {proceedButton}>Check Out</button>
      </div>

</section>
<ToastContainer />
</div>
  )
}

export default Cart