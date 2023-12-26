import React, {useEffect, useState} from 'react'
import ReactDOM from "react-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {styled,useTheme } from '@mui/material/styles';
import {List,Drawer, ListItem, ListItemButton, ListItemText, Divider} from '@mui/material';
import { useLocation } from 'react-router-dom';
import{setMainList, setMovieDetailList, setSeriesDetailList } from "../../redux/features/adminSidebarSice";
import { useDispatch, useSelector } from "react-redux";
import { matchPath } from 'react-router';
import AdminPanel from './AdminPanel';



const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

function Togglebtn() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);
  const [actionText, setActionText] = useState('');
  const {buttonsList} = useSelector((state)=>state.buttonsList);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(()=>{

    if(matchPath({path: "/"},location.pathname.toString())||matchPath({path: "/tv"},location.pathname.toString())||matchPath({path: "/movie"},location.pathname.toString())){
      dispatch(setMainList())
      console.log("inside the if")
    }
    else if(matchPath({path: "/movie/:id"},location.pathname.toString())){
      dispatch(setMovieDetailList())
      console.log("movie detail path match");
    }
    else if(matchPath({path: "/tv/:id"},location.pathname.toString())){
      dispatch(setSeriesDetailList())
      console.log("series detail path match");
    }
  
    // else if(location.pathname === "/movie/")

  console.log("the path match", matchPath({path: "/movie"},location.pathname.toString()));
  console.log("the current path", location.pathname);

},[location.pathname,dispatch])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemAction = (actionText) =>{
    setOpenPanel(true);
    setActionText(actionText);
    console.log("the toggle button action text", actionText);
  }
  
  return ReactDOM.createPortal(
    <div> <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={handleDrawerOpen}
    edge="start"
    // sx={{ mr: 2, ...(open && { display: 'none' }) }}
    sx={{ mr: 2, ...({ backgroundColor:'grey' }) }}
  >
    <MenuIcon />
  </IconButton>
  
  <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{paddingTop:10}} >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        <List>
          {[...buttonsList].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={()=>{handleListItemAction(text)}}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {
      openPanel && <AdminPanel actionText={actionText} openPanel={openPanel} onPanelOpen={setOpenPanel}/>
      }
  </div>,
  document.getElementById("toggleBtn")
  )
}

export default Togglebtn