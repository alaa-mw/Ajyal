import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import RegisterStepper from "../features/auth/RegisterStepper";
import LoginForm from "../features/auth/LoginForm";
import Circle from "../components/ui/Circle";
import mainThem from "../styles/mainThem";
import logoWindows from '../assets/logoWindows.png';

const AuthPage = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";

  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          p: 3,
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
        }}
      >
        {isRegisterPage ? <RegisterStepper /> : <LoginForm />}

        <Box
          component="img"
          src={logoWindows}
          alt="Ajyal logo"
          sx={{
            position: "absolute",
            zIndex: -1,
            top: 20, // 30% of viewport height
            right: 0, // 20% of viewport width
            width: 170, // You can also use "20vw" if needed
            opacity: 0.2,
          }}
        />
        <Circle position="top-left" />
        <Circle
          position="bottom-right"
          color={mainThem.palette.tertiary.main}
          r={250}
        />
        <Circle
          position="custom"
          color={mainThem.palette.secondary.main}
          opacity={0.4}
          r={100}
        />
      </Box>
    </>
  );
};

export default AuthPage;
