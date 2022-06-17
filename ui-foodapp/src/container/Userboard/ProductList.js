import React,{useState,useEffect} from 'react'
import logo from './logo.png'
import {useDispatch,useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Stack from '@mui/material/Stack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const limit = 3




function ProductList(props) {
    const [productlist,setProductlist]=useState([])
    const [value,setValue] = useState(0)
    const list = props.data
    console.log(props.data.data);
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
      setProductlist(props.data)
      },[list])
    
      const addtoCart = async(item,index)=>{
         const count = item.count?item.count:1
          const params = {product_id:item.id,product_name:item.name,count:count}
        await dispatch.cartModel.addtoCart(params);
        }
        const buttonIncrement = (index)=>{
          const itemCount =list.data[index].count;
          list.data[index].count = itemCount ?  (itemCount +1): 1;
          setValue(itemCount)
          
        }
        const decrementButton = (index)=>{
          const itemCount =list.data[index].count;
          list.data[index].count = itemCount ?  (itemCount -1): 1;
          setValue(itemCount)
        }
        console.log(productlist);
  return (
      <div>
           {!productlist.data ? null : (
               
            <header className="container">
                <h2>{productlist.category_name}</h2>
            </header>
           )}
           <section className="container">

                {!productlist.count?  <h3>Ooops :( Nothing in your Cart</h3> : (
                <ul className="products">
                {productlist.data.map((item, index) => {
                    return (
                    <li className="row" key={index}>
                        <div className="col left">
                        <div className="thumbnail">
                            <img src={`http://localhost:9000/${item.image}`} alt={item.name} />
                        </div>
                        <div className="detail">
                            <div className="name">
                            {item.name}
                            </div>
                            <div className="description">{item.description}</div>
                            <div className="price">Rs.{item.price}</div>
                        </div>
                        </div>

                        <div className="col right">
                            <div className="quantity">
                            <ButtonGroup size="large" aria-label="large outlined button group" color="secondary">

                                
                                <Button onClick = {()=>{decrementButton(index)}}>-</Button>
                                {<Button disabled value= {item.count? item.count: 1}>{item.count? item.count: 1}</Button>}
                                <Button onClick={()=>{buttonIncrement(index)}}>+</Button>

                            </ButtonGroup>
                            </div>

                        <div className="remove"> </div>
                        <Stack direction="row" spacing={1}>
                        <Button variant="outlined" startIcon={<AddShoppingCartIcon />}  onClick={()=>{addtoCart(item,index)}}>
                            Add to cart
                        </Button>
                        </Stack>
        
                        </div>
                    </li>
                    );
                })}
                </ul>)}

            </section>

            <ToastContainer />
      </div>
      
  )
}

export default ProductList