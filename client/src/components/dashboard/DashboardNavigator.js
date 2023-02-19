import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Divider, ListItemButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css';

const categories = [


  {
    id: 'Admission',
    children: [
      { id: 'Manage Category', icon: <GroupAddIcon />, route: 'manage_category' },
      { id: 'Manage Project', icon: <ManageAccountsIcon />, route: 'manage_project' },
      { id: 'Write Content', icon: <ManageAccountsIcon />, route: 'write_content' },
      { id: 'Manage Content', icon: <ManageAccountsIcon />, route: 'manage_content' },
      { id: 'User List', icon: <ManageAccountsIcon />, route: 'user_list' },



    ],
  },

];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function DashboardNavigator(props) {
  const [category, setCategory] = React.useState()
  const { ...other } = props;

  const location = useLocation()
  let uri = location.pathname
  console.log(uri)

  let auth = JSON.parse(localStorage.getItem('auth')) 
  const admin = auth?.user?.role === 'admin' 


  React.useEffect(() => {
    axios.get('http://localhost:6060/api/v1/category/all')
      .then((response) => {
        setCategory(response.data);
      });
  }, []);



  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          RISHA
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory, marginBottom: "50px" }}>
        </ListItem>

        <AccordionDetails style={{ marginBottom: "3px" }}>
          <ListItem mt={4} mb={4} disablePadding sx={{ backgroundColor: '#081627' }}>
            <Link className='linkDashboard' to={`/dashboard`}>
              <ListItemButton selected={uri === `/dashboard` ? true : false} sx={item}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </AccordionDetails>
        {category?.map(({ tittle, subCategory, _id }) => (
          <Accordion sx={{ backgroundColor: '#142436', color: "#dbdbdb" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#dbdbdb" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ fontWeight: 500, fontSize: '15px' }}>{tittle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {subCategory?.map(({ tittle: childName, avatar }, idx) => (
                <ListItem mt={4} mb={4} disablePadding key={childName} sx={{ backgroundColor: '#081627' }}>
                  <Link className='linkDashboard' to={`sub_category/${_id}/${idx}`}>
                    <ListItemButton selected={uri === `/dashboard/${idx}` ? true : false} sx={item}>
                      {/* <ListItemIcon>{avatar}</ListItemIcon> */}
                      <ListItemText>{childName}</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

        {
          admin && (
            <React.Fragment>
              {categories.map(({ id, children }) => (
                <Box key={id} sx={{ background: '#101F33' }}>
                  <ListItem sx={{ py: 2, px: 3 }}>
                    <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                  </ListItem>
                  {children.map(({ id: childId, icon, route }) => (
                    <ListItem disablePadding key={childId}>
                      <Link className='linkDashboard' to={`${route}`}>
                        <ListItemButton selected={uri === `/dashboard/${route}` ? true : false} sx={item}>
                          <ListItemIcon>{icon}</ListItemIcon>
                          <ListItemText>{childId}</ListItemText>
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </Box>
              ))}
            </React.Fragment>
          )
        }

        <AccordionDetails style={{ marginBottom: "3px" }}>
          <ListItem mt={4} mb={4} disablePadding sx={{ backgroundColor: '#081627' }}>
            <Link className='linkDashboard' to={`/dashboard/user_list/profile/:id`}>
              <ListItemButton selected={uri === `/dashboard/user_list/profile/:id` ? true : false} sx={item}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </AccordionDetails>

        <Divider sx={{ mt: 2 }} />
      </List>
    </Drawer>
  );
}