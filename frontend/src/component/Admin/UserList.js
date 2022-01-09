import React, { Fragment, useEffect} from 'react'

import { Link } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid'

import './ServiceList.css';

import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import EditIcon from "../../../node_modules/@mui/icons-material/Edit";
import DeleteIcon from "../../../node_modules/@mui/icons-material/Delete"
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert';



import { deleteUser, getAllUser, clearErrors } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';




const UserList = ({history}) => {

    const dispatch = useDispatch();

    const alert= useAlert();


    

    const {users, error, loading }= useSelector((state)=>state.allUsers);

     const{error:deleteError, isDeleted, message}= useSelector((state)=>state.profile)

    const deleteUserHandler=(id)=>{
      dispatch(deleteUser(id));
     }
   
     useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
      
        alert.success(message);
       
        history.push("/admin/users");
        dispatch({ type: DELETE_USER_RESET });

      
       
      }
  
      dispatch(getAllUser());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);
   
    const colums=[
        {field: "id", headerName:'User ID', minWidth: 200, flex: 0.5},

        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 1,
          },

          {
            field: "email",
            headerName: "Email",
            type: "number",
            minWidth: 100,
            flex: 0.5,
          },
          {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 100,
            flex: 0.3,
         
          },


          {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params) => {
              return (
                <Fragment>
                  <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                    <EditIcon />
                  </Link>
      
                  <Button
                onClick={()=>
                  deleteUserHandler(params.getValue(params.id, "id"))
                }
                  >
                    <DeleteIcon />
                  </Button>
                </Fragment>
              );
            },
          },

    ];

    const rows=[];

  

    users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
      
        role: item.role,
        name: item.name,
        email: item.email,
      });
    });

    return (
        <div>
            
            <div className='heading'>Users</div>

            <div className='serviceTableContainer'>

    
            <DataGrid
            
            rows={rows}
            columns={colums}
            pageSize={10}
            disableSelectionOnClick
            className='serviceListTable'
            autoHeight
            
            />
            </div>
        
        </div>
    )
}

export default UserList
