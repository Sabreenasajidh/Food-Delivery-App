import Layout from '../../../Components/Layout/Layout'
import './Product.css'
import { useNavigate } from 'react-router';
import {useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const limit = 2

const statusfield = [
    { value: 'active' },
    { value: 'inactive' }
  ];

function ListProducts() {
    const [offset,setOffset] = useState(0)
    const [data,setData] = useState([])
    const [category,setCategory] = useState()
    const [pageCount, setpageCount] = useState(0);
    const [status,setStatus] = useState('active')
    const[params,setParams] = useState({offset:offset,limit:limit})
    const[categoryName,setCategoryName]= useState([])
    const dispatch = useDispatch()
    const nav = useNavigate()

 
    useEffect(()=>{
        getCategoryName(); 
        listProducts(params); 
    },[])

    async function listProducts(params) {
        let newparams = new URLSearchParams(params).toString();
        console.log(newparams);
        const product = await dispatch.productModel.getProducts(newparams);
        console.log(product.data,"++++++++++++++++");
        setData(product.data)
        const total = product.count;
        setpageCount(Math.ceil(total / limit));
    }

    const getCategoryName = async()=>{
        const res = await dispatch.productModel.getCategoryName()
        setCategoryName(res.data)
    }

    const addProduct = ()=>{
    nav('./addproduct')
    }

    const onChangedata = async(e)=>{
    const category_id =  e.target.value
    params.category_id = category_id
    setParams(params)
    setOffset(0)
    params.offset = offset
    await listProducts(params)
    }

    const handlePageClick = async(data)=>{
    let offset = (data.target.textContent -1) * limit
    setOffset(offset)
    params.offset = offset
    params.limit = limit
    setParams(params)
    await listProducts(params)
    }

    const onChangestatus = (e)=>{
    console.log("status");
    const status =  e.target.value
    params.status = status
    setParams(params)
    setOffset(0)
    params.offset = offset
    listProducts(params)
    }

    const getSearchValue = async(event)=>{
        if (event.key === 'Enter') {
            const searchdata = event.target.value 
            params.searchdata = searchdata
            setParams(params)
            setOffset(0)
            params.offset = offset
            await listProducts(params)
          }
    }

    const editproduct = (val)=>{
    console.log({params:val.id});
    // nav('/admin/products/edit')
    // nav('./edit/'+val.id,{state:val});
     nav(`./edit/${val.id}`)
    }

    const deleteProduct = async (val)=>{
    await dispatch.productModel.deleteProduct(val.id)
    nav('/admin/products')
    }

    return (
      <div>
        <Layout />

        <div className = "search">
            <input type="text" className="search" placeholder='search item here'  onKeyDown={getSearchValue}/>
        </div>
        
        <div className = "filter">
            <select onChange={onChangedata}>
            {categoryName.map((item, index) =>
                <option value={item.id}>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</option>
            
                )} 
                <option value="0">All</option>
            </select>

            <select onChange={onChangestatus}>
                <option value="0">All</option>
                {statusfield.map((item, index) =>
                <option value={item.value}>{item.value.charAt(0).toUpperCase() + item.value.slice(1).toLowerCase()}</option>)}
            </select>

            <button onClick = {addProduct}>Add Product</button>
            
        </div>
    
        <div className = "prodtable">
            {data.length === 0? 

            <h2>No data to display</h2>:
            (
                <div className="prod-table">
            <table>
                <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
                </tr>
                
                    {data.map((val, key) => {
                return (
                    <tr key={key}>
                    <td>{val.name}</td>
                    <td>{val.description}</td>
                    <td>{val.status}</td>
                    <td>{val.category.name}</td>
                    <td>{val.price}</td>
                    <td>
                    <button className="edit" onClick={() => { editproduct(val) }}>Edit</button>
                    <button className="delete" onClick = {() => { deleteProduct(val) }}>Delete</button>
                    </td>
                    </tr> 
                )
                })}
            </table>      
            <div className = "page">
          <Stack spacing={2}>
            <Pagination count={pageCount} shape="rounded"  onChange={handlePageClick} color="primary"/>
          </Stack>
          </div>       
            
        
            {/* <div className='pagination'>
                <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                />
            </div> */}
            </div>
            )
            }
        </div>
      </div>
    )
}

export default ListProducts