"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import SaveAsIcon from "@mui/icons-material/SaveAs";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import SimCardIcon from '@mui/icons-material/SimCard';
import CloseIcon from '@mui/icons-material/Close';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface Props {
  children: React.ReactNode;
}

export default function MiniDrawer({ children }: Props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  var empresa: any = '';
  var rol : any= '';

  try {
    empresa = localStorage.getItem('empresa');
    rol = localStorage.getItem('rol');
  } catch (error) {
    empresa = '';
    rol = 'user';
  }



  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  const closeUser = () => {
    localStorage.removeItem('empresa');
    localStorage.removeItem('rol');
    localStorage.removeItem('loggedIn');
    window.location.href = '/';
  }


  const toggleDrawer = [
    {
      label: "Nueva instalacion",
      icon: <SaveAsIcon />,
      onClick: handleDrawerOpen,
      href: "/Installation",
    },
    {
      label: "Instalaciones",
      icon: <FormatListNumberedIcon />,
      onClick: handleDrawerOpen,
      href: "/Installation_list",
    },
    {
      label: "Graficos",
      icon: <DataUsageIcon />,
      onClick: handleDrawerOpen,
      href: "/Installation_grafic",
    },
    {
      label: "Chips Instalaciones",
      icon: <SimCardIcon  sx={{color: 'red'}}/>,
      onClick: handleDrawerOpen,
      href: "/Chips_list",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Instalaciones
          </Typography>
         
         <div style={{position:'absolute' , right: 25, display: 'flex', justifyContent: 'center' , alignItems: 'center'}}>
         <Typography variant="h6" noWrap component="div">
            {empresa}
          </Typography>
         <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={closeUser}
            edge="end"
          >
            <CloseIcon />
          </IconButton>
         </div>
          

        </Toolbar>
      </AppBar>
     
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {toggleDrawer.slice((rol === "user" ? 1 : 0),(rol === "user" ? 3 : 5)).map(
            ({label, onClick, icon, href}) => (
              <ListItem key={label} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  href={href}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                <Divider />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
