import React, { useEffect,useState } from 'react'
import {useDispatch,useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';
import ListProducts from './ProductList'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const limit = 3

function UserSidebar(props) {
  const {categoryname,categorylength,onAdd,onDelete} = props
    const dispatch = useDispatch()
    const navigate = useNavigate()

     const[params,setParams] = useState({})
     const [productlist,setProductlist]=useState([])
     
    useEffect(()=>{
      productList()
    },[])

    
    const productList = async()=>{
      let newparams = new URLSearchParams(params).toString();
      const product = await dispatch.productModel.getProducts(newparams);
      setProductlist(product)
    }
    
    const categoryClick = async(item)=>{
      const category_id =  item
      params.category_id = category_id
      console.log(params,"params");
      await productList(params)
    } 
     
    
    
  return (
    <div>
        <div id="mySidenav" className="usersidebar">
        <h2>Recomended({categorylength})</h2>
         <div className = "category">
         <ul><li onClick= {()=>{categoryClick(0)}}>All</li></ul>
            {categoryname.map((item, index) =>
            <ul>
                
                <li value={item.id} onClick= {()=>{categoryClick(item.id)}}>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</li>
                </ul>)} 
          </div> 
        </div>
         <ListProducts productlist ={productlist} onAdd={onAdd} onDelete={onDelete}/>
         
            
        </div>

  )
}

export default UserSidebar