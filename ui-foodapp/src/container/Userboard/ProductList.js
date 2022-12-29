import React,{useState,useEffect} from 'react'
import logo from './logo.png'
import { ToastContainer } from 'react-toastify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
function ProductList(props) {
    const {onAdd,onDelete,productlist} = props
    
    
  return (
      <div>
                {!productlist.count?  <h3>Ooops :( Nothing in your Cart</h3> : (
                    <div className="wrapper">
                        <div className="title">
                        
                        <h4>Fresh food for good Health{!productlist.category_name?<span>All Menu</span>:<span>{productlist.category_name} Menu</span>}</h4>
                        </div>
                        <div className="menu">
                        {productlist.data.map((item, index) => {
                            return(
                            <div className="single-menu">
                                <div className="menu-content">
                                    <h4>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</h4>
                                    <span>${item.price}</span>
                                    <p>{item.description}</p>
                                
                                </div>
                                <div className="menu-button">
                                <img src ={logo}/>
                                 <ButtonGroup size="large" aria-label="large outlined button group" color="secondary" >

                                 {(item.prod_count && item.prod_count.count > 0)?(
                                    <div className="menubut">
                                    <Button onClick = {()=>{onDelete(item)}}>-</Button>
                                    <Button disabled value= {item.prod_count.count}> {item.prod_count.count}</Button>
                                    <Button onClick={()=>{onAdd(item)}}>+</Button>
                                    </div>
                                ):
                                (
                                <div className="menubut">
                                <Button variant="outlined" startIcon={<AddShoppingCartIcon />}  onClick={()=>{onAdd(item)}}>
                                    Add to cart
                                </Button>
                                </div>
                                )}
                                </ButtonGroup>

                                </div>
                            </div>
                            
                            )})}
                        </div>
                    </div>
                
                )}

            

            <ToastContainer />
      </div>
      
  )
}

export default ProductList