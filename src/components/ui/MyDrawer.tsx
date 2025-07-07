import { useState } from "react";
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
  Autocomplete,
  TextField,
  alpha,
} from "@mui/material";
import drawerFrame from "../../assets/drawerFrame.png";
import { Logout } from "@mui/icons-material";
import theme from "../../styles/mainThem";
import NavItem from "./NavItem";
import useSendData from "../../hooks/useSendData";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../features/auth/Redux/authSlice";
import { rolesConfig } from "../../rolesConfig";

const MyDrawer = () => {
  const dispatch = useDispatch();
  const [selectedCourse, setSelectedCourse] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { mutate: logout } = useSendData(
    `${rolesConfig[localStorage.getItem("userRole") || ""].apiPrefix}/logout`,
    undefined
  );
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        dispatch(logoutSuccess());
        window.location.href = "/";
      },
    });
  };

  // Sample data
  const courses = [
    { id: 1, name: "رياضيات الصف التاسع" },
    { id: 2, name: "فيزياء الصف العاشر" },
    { id: 3, name: "رياضيات الصف التاسع" },
    { id: 2, name: "فيزياء الصف العاشر" },
    { id: 1, name: "رياضيات الصف التاسع" },
    { id: 2, name: "فيزياء الصف العاشر" },
    { id: 1, name: "رياضيات الصف التاسع" },
    { id: 2, name: "فيزياء الصف العاشر" },
    { id: 1, name: "رياضيات الصف التاسع" },
    { id: 2, name: "فيزياء الصف العاشر" },
  ];

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
      <List>
        {SidebarData.mainItems.map((item, index) => {
          return (
            <Box key={index}>
              <NavItem
                path={`/manager${item.path}`}
                title={item.title}
                icon={item.icon}
              />
            </Box>
          );
        })}
      </List>

      <Divider sx={{ bgcolor: "#fff" }} />
      <List sx={{ color: "primary.contrastText", flexGrow: 1 }}>
        {/* Course Selection */}
        <Autocomplete
          options={courses}
          getOptionLabel={(option) => option.name}
          value={selectedCourse}
          onChange={(_, newValue) => {
            setSelectedCourse(newValue);
          }}
          sx={{
            borderLeft: `2px solid ${theme.palette.primary.main}`,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="اختر الدورة" // make label pr:2
              variant="outlined"
              fullWidth
              sx={{
                bgcolor: (theme) => alpha(theme.palette.background.default, 1),
                borderRadius: "0px 50px 50px 0px ",
                "& .MuiInputLabel-root": {
                  right: 50, // RTL support for label positioning
                },
                "& .MuiOutlinedInput-root": {
                  paddingRight: 2,
                },
              }}
            />
          )}
        />

        {/* Submenu */}
        {SidebarData.subItems.map((item, index) => (
          <Box key={index}>
            <NavItem
              path={`/manager${item.path}`}
              title={item.title}
              selectedCourse={!!selectedCourse}
              variant="withIndicator"
            />
          </Box>
        ))}
      </List>

      <Divider sx={{ bgcolor: "#fff" }} />
      {/* Secondary Navigation */}
      <List>
        {["تسجيل الخروج"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: "primary.contrastText" }}>
                <Logout />
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
