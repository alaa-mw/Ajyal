import React from "react";
import logo from "../../assets/logo.png";
import { SidebarData } from "../../data/sidebarData";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import drawerFrame from "../../assets/drawerFrame.png";

const MyDrawer = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        height: "100vh",
        display: "flex",
        flexDirection: "column",

        backgroundImage: `url(${drawerFrame})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <Toolbar sx={{ fontWeight: "bold" }}>
        <Avatar
          src={logo}
          alt="Ajyal logo"
          sx={{
            bgcolor: "#fff",
            ml: 2,
          }}
        />
        <Typography
          variant="h6"
          fontWeight={"bold"}
          color="primary.contrastText"
        >
          أجيال التعليمي
        </Typography>
      </Toolbar>

      <Divider sx={{ bgcolor: "#fff" }} />

      {/* Main Navigation */}
      <List sx={{ flexGrow: 1 }}>
        {SidebarData.map((item, index) => {
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={`/manager${item.path}`}
                selected={location.pathname.includes(item.path)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "secondary.main",
                    borderRadius: "0px 50px 50px 0px ",
                  },
                }}
              >
                <ListItemIcon>
                  <Box component={item.icon} sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ color: "primary.contrastText" }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ bgcolor: "#fff" }} />

      {/* Secondary Navigation */}
      <List>
        {["All mail", "Trash", "Spam"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "primary.contrastText" }}>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ color: "primary.contrastText" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyDrawer;
