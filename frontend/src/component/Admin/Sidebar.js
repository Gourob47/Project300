import React from 'react'

import { Link } from 'react-router-dom'

import { TreeView, TreeItem } from '@material-ui/lab';

import LaunchIcon from "../../../node_modules/@mui/icons-material/Launch";
import ExpandmoreIcon from "../../../node_modules/@mui/icons-material/Expand";
import ImportExportIcon from "../../../node_modules/@mui/icons-material/ImportExport"
import ListAltIcon from "../../../node_modules/@mui/icons-material/ListAlt";
import AddIcon from "../../../node_modules/@mui/icons-material/Add";
import DashboardIcon from "../../../node_modules/@mui/icons-material/Dashboard";
import PeopleIcon from "../../../node_modules/@mui/icons-material/People";
import RateReviewIcon from "../../../node_modules/@mui/icons-material/RateReview";
import PostAddIcon from "../../../node_modules/@mui/icons-material/PostAdd";


import "./Sidebar.css";
const Sidebar = () => {
    return (
        <div className='sidebar'>

            <Link to="/admin/dashboard">
              <p><DashboardIcon/>
              Dashboard</p>
                
            </Link>

            {/*<Link>
            <TreeView
            defaultCollapseIcon={<ExpandmoreIcon/>}
            defaultExpandIcon={<ImportExportIcon/>}
            >
                <TreeItem  
                nodeId='1' label='Services'>
                    <Link to="/admin/services">
                       <TreeItem nodeId='2' label='All' icon={<PostAddIcon/>}/> 
                    </Link>

                    <Link to="/admin/service">
                       <TreeItem nodeId='3' label='Create' icon={<AddIcon/>}/> 
                    </Link>

                </TreeItem>
                

            </TreeView>
            </Link>*/}

            <Link to='/admin/services'>
            <p><PostAddIcon/>
              Services</p>
            </Link>


          <Link to='/admin/service'>
            <p><AddIcon/>
              Create</p>
            </Link>

            <Link to='/admin/orders'>
            <p><ListAltIcon/>
              Orders</p>
            </Link>

            <Link to='/admin/users'>
            <p><PeopleIcon/>
              Users</p>
            </Link>


            <Link to='/admin/reviews'>
            <p><RateReviewIcon/>
              Reviews</p>
            </Link>

        
        </div>
    )
}

export default Sidebar
