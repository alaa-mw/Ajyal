import React, { useRef } from "react";
import ResponsiveDrawer, {
  drawerWidth,
} from "../components/ui/ResponsiveDrawer";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const ManagerDashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null); // Create the ref
  console.log("containerRef:", containerRef.current);
  return (
    <>
      <Box ref={containerRef}>
        <ResponsiveDrawer container={containerRef.current} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            marginRight: { sm: `${drawerWidth}px` },
          }}
        >
          <Outlet/>
        </Box>
      </Box>
    </>
  );
};

export default ManagerDashboard;
