import Layout from '../../../Components/Layout/Layout'
import './User.css'
import { useNavigate } from 'react-router';
import {useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const limit = 4

const statusfield = [
    { value: 'active' },
    { value: 'inactive' }
  ];

function ListUsers() {
  const [offset,setOffset] = useState(0)
  //const [itemsPerPage,setItemsPerPage] = useState(4)
  const [data,setData] = useState([])
  const [role,setRole] = useState()
  const [pageCount, setpageCount] = useState(0);
  const [status,setStatus] = useState('active')
  const[params,setParams] = useState({offset:offset,limit:limit})
  const[roleName,setRoleName]= useState([])
  //let params = {offset:offset,limit:limit}
 const dispatch = useDispatch()
 const nav = useNavigate()

 
 useEffect(()=>{
     getRoleName(); 
     listUsers(params); 
     
 },[])
 async function listUsers(params) {
     console.log(params,"params");
     const users = await dispatch.userModel.getUsers(params);
     setData(users.data)
     console.log(users.data);
     const total = users.count;
     setpageCount(Math.ceil(total / limit));
 }
 const getRoleName = async()=>{
     const res = await dispatch.userModel.getRoleName()
     setRoleName(res.data)
 }


const addUser = ()=>{
 nav('./newUser')
 
}
const onChangedata = async(e)=>{
 const role =  e.target.value
 setRole( e.target.value)
 params.role = role
 setParams(params)
 setOffset(0)
 params.offset = offset
 console.log(params,"params");
 await listUsers(params)
}
const handlePageClick = async(data)=>{
 let offset =   data.selected * limit
 setOffset(offset)
 params.offset = offset
 params.limit = limit
 setParams(params)
 await listUsers(params)

}
const onChangestatus = (e)=>{
 console.log("status");
 const status =  e.target.value
 setStatus( e.target.value)
 params.status = status
 setParams(params)
 setOffset(0)
 params.offset = offset
  listUsers(params)
}
const getSearchValue = async(event)=>{
 const searchdata = event.target.value 
 params.searchdata = searchdata
 setParams(params)
 setOffset(0)
 params.offset = offset
 console.log(params);
 await listUsers(params)
}
const editUser = (val)=>{
console.log({params:val});
nav('./edit/'+val.id,{state:val});

}

const deleteUser = async (val)=>{
 console.log(val);
 await dispatch.userModel.deleteUser(val.id)

}
    return (
      <div>
      <Layout />
      <div>
            <div className = "search">
                <input type="text" className="search" placeholder='search item here'  onChange={getSearchValue}/>
            </div>
            <div className = "filter">
                <select onChange={onChangedata}>
                    <option value="0">All</option>
                    {roleName.map((item, index) =>
                        <option value={item.id}>{item.role_name.charAt(0).toUpperCase() + item.role_name.slice(1).toLowerCase()}</option>)} 
                </select>

                <select onChange={onChangestatus}>
                    <option value="0">All</option>
                    {statusfield.map((item, index) =>
                        item.value != 'trash'
                        ? <option value={item.value}>{item.value.charAt(0).toUpperCase() + item.value.slice(1).toLowerCase()}</option> 
                        : null
                    
                        
                        )}
                </select>

                <button onClick = {addUser}>Add User</button>
                
            </div>
        
            <div className = "usertable">
                {data.length === 0? 

                <h2>No data to display</h2>:
                (
                <div className = "user-table">
                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    
                    {data.map((val, key) => {
                    return (
                    <tr key={key}>
                        <td>{val.first_name}</td>
                        <td>{val.last_name}</td>
                        <td>{val.email}</td>
                        <td>{val.phone_number}</td>
                        <td>{val.role}</td>
                        <td>{val.status}</td>
                        <td>
                        <button className="edit" onClick={() => { editUser(val) }}>Edit</button>
                        <button className="delete" onClick = {() => { deleteUser(val) }}>Delete</button>
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
                </div>
                )
                }
            </div>
        </div>
      </div>
    )
}

export default ListUsers