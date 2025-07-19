import logo from "../../assets/logo.png";
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
import drawerFrame from "../../assets/drawerFrame.png";
import { ArrowForwardIos, Logout, SwapHoriz } from "@mui/icons-material";
// import theme from "../../styles/mainThem";
import NavItem from "./NavItem";
import useSendData from "../../hooks/useSendData";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../features/auth/Redux/authSlice";
import { rolesConfig } from "../../rolesConfig";
import { useNavigate } from "react-router-dom";
import { useSelectedCourse } from "../../contexts/SelectedCourseContext";
interface MyDrawerProps {
  handleDrawerClose?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sidebardata: any;
}

const MyDrawer = ({ handleDrawerClose, sidebardata }: MyDrawerProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCourseId, selectedCourseName } = useSelectedCourse();

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
        {sidebardata.mainItems.map((item, index) => {
          return (
            <Box key={index}>
              <NavItem
                path={`${
                  rolesConfig[localStorage.getItem("userRole") || ""].webPrefix
                }${item.path}`}
                title={item.title}
                icon={item.icon}
              />
            </Box>
          );
        })}
      </List>

      {sidebardata.subItems.length && (
        <>
          <Divider sx={{ bgcolor: "#fff" }} />
          <List sx={{ color: "primary.contrastText", flexGrow: 1 }}>
            {/* Course Selection */}
            <Box
              onClick={() => {
                handleDrawerClose?.();
                navigate(
                  `${
                    rolesConfig[localStorage.getItem("userRole") || ""]
                      .webPrefix
                  }/courses/select`
                );
              }}
              sx={{
                border: "1px solid white",
                borderRadius: "0px 50px 50px 0px",
                p: 1.5,
                cursor: "pointer",
                my: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SwapHoriz sx={{ color: "white", ml: 1 }} /> {/* Change icon */}
                <Typography
                  sx={{
                    color: "white",
                    textAlign: "right",
                    fontWeight: "medium",
                  }}
                >
                  {selectedCourseName || "اختر الدورة"}
                </Typography>
              </Box>
              <ArrowForwardIos sx={{ color: "white", fontSize: "small" }} />{" "}
              {/* Optional arrow */}
            </Box>

            {/* Submenu */}
            {sidebardata.subItems?.map((item, index) => (
              <Box key={index}>
                <NavItem
                  path={`${
                    rolesConfig[localStorage.getItem("userRole") || ""]
                      .webPrefix
                  }${item.path}`}
                  title={item.title}
                  selectedCourse={!!selectedCourseId}
                  variant="withIndicator"
                />
              </Box>
            ))}
          </List>
        </>
      )}
      <Divider sx={{ bgcolor: "#fff" }} />
      {/* Secondary Navigation */}
      <List sx={{ justifySelf: "flex-end" }}>
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
