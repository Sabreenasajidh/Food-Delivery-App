import React,{useEffect,useState} from 'react'
import Header from './UserHeader'
import Sidebar from './UserSidebar'
import './Userboard.css'
import {useDispatch,useSelector } from 'react-redux';
import Products from './Products'
import Cookies from '../../helpers/cookie';

function Customer() {
  const user = Cookies.getCookie('userIn')
  const [categoryName,setCategoryName] =  useState([])
  const[categoryLength,setCategoryLength] = useState(0) 
  
  const [cartcount,setcartCount] = useState(0)
  const dispatch = useDispatch()

  const [cartItems,setCartItems] = useState([])
  const [value,setValue] = useState(0)

  const [prodCount,setProdCount] = useState(0)

useEffect(()=>{
  categoryname()
  prod_count()
  //cartItems()
},[])

const categoryname = async()=>{
  const result = await dispatch.productModel.getCategoryName()  
  setCategoryName(result.data) 
  setCategoryLength(result.data.length)
}
const prod_count = async()=>{
  const result = await dispatch.cartModel.getCount()  
  console.log(result);
  setProdCount(result.count? result.count :0) 
}

const onAdd = (item)=>{
  if(item.prod_count){
    //const cc = prodCount+1;
    setProdCount(prodCount+1)
    const itemCount =item.prod_count.count+1;
    item.prod_count.count = itemCount
    setValue(itemCount)
    const params = {product_id:item.id,product_name:item.name,count:itemCount}
    updateCart(params)
  }
  else{
    setProdCount(prodCount+1)
    const count = 1;
    item.prod_count = {count:1}
    setValue(count)
    const params = {product_id:item.id,product_name:item.name,count:count}
    updateCart(params)
  }

}
const onDelete = (item)=>{
  if(item.prod_count.count  <= 1) {
    setProdCount(prodCount-1)
    item.prod_count.count = 0
    setValue(0)
    const params = {product_id:item.id,product_name:item.name,count:0}
    updateCart(params)

}
else{
  setProdCount(prodCount-1)
    const itemCount =item.prod_count.count-1;
   item.prod_count.count = itemCount
   setValue(itemCount)
    const params = {product_id:item.id,product_name:item.name,count:itemCount}
    updateCart(params)
} 
}

const updateCart = async(params)=>{
  //  const count = item.count?item.count:1
      const uid = {id:JSON.parse(user).id}
      let userid = new URLSearchParams(uid).toString();
      const op = {params,userid}
      const res = await dispatch.cartModel.addtoCart(op);      
  }
  return (
    <div className = "pr-container">
      <Header badge={prodCount} onAdd={onAdd} onDelete={onDelete}/>
      <Sidebar categoryname= {categoryName} categorylength = {categoryLength} onAdd={onAdd} onDelete={onDelete}/>
      
    </div>
  )
}

export default Customer