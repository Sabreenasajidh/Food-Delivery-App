import React, { useEffect,useState } from 'react'
import {useDispatch,useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';
import ListProducts from './ProductList'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const limit = 3

function UserSidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [categoryName,setCategoryName] =  useState([])
    const[categoryLength,setCategoryLength] = useState(0)

     const [offset,setOffset] = useState(0)
     const[params,setParams] = useState({offset:offset,limit:limit})
     const [productlist,setProductlist]=useState([])
    const [pageCount, setpageCount] = useState(0);
    
    useEffect(()=>{
      productList()
        categoryname()
    },[])

    
    const productList = async()=>{
      const product = await dispatch.productModel.getProducts(params);
      setProductlist(product)
      const total = product.count;
      setpageCount(Math.ceil(total / limit));
    }
    
    const handlePageClick = async(data)=>{
       let offset = (data.target.textContent -1) * limit
      // let offset =   data.selected * limit
      console.log(offset);

      setOffset(offset)
      params.offset = offset
      params.limit = limit
      setParams(params)
      await productList(params)
      }
    const categoryname = async()=>{
        const result = await dispatch.productModel.getCategoryName()  
        setCategoryName(result.data) 
        setCategoryLength(result.data.length)
    }
    const categoryClick = async(e)=>{
       console.log(e.target.value);
      const category_id =  e.target.value
      params.category_id = category_id
      setParams(params)
      setOffset(0)
      params.offset = offset
      console.log(params,"params");
      await productList(params)
    }  
    
    
  return (
    <div >
        <div id="mySidenav" className="usersidebar">
        <h2>Recomended({categoryLength})</h2>
         <div className = "category">
            {categoryName.map((item, index) =>
                <li value={item.id} onClick= {categoryClick}>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</li>)} 
          </div> 
        </div>
        <ListProducts data ={productlist} count = {pageCount}/>
          <div className = "page">
          <Stack spacing={2}>
            <Pagination count={pageCount} shape="rounded"  onChange={handlePageClick} color="primary"/>
          </Stack>
          </div>
                {/* <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"prod-pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                /> */}
            
        </div>

  )
}

export default UserSidebar