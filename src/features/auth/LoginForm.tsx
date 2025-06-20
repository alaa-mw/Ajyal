import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
} from "@mui/material";
import logo from "../../assets/logo.png";
import React, { useEffect, useState } from "react";
import theme from "../../styles/mainThem";
import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School"; // Teacher icon
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"; // Manager icon
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useSendDataNoToken from "../../hooks/useSendDataNoToken";
import { useDispatch, useSelector } from "react-redux";
import { rolesConfig } from "../../rolesConfig";
import { useNavigate } from "react-router-dom";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  printState,
  setUserEndpoint,
} from "./Redux/authSlice";
import { RootState } from "../../store";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userEndpoint, userRole, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [finalEndpoint, setFinalEndpoint] = useState("false");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "manager",
  });

  useEffect(() => {
    const endpoint = rolesConfig[formData.role].endpoint;
    if (endpoint) {
      dispatch(setUserEndpoint(endpoint));
    }
    setFinalEndpoint(
      formData.role == "manager"
        ? `${userEndpoint}/login`
        : `${userEndpoint}/teacherLogin`
    );
  }, [formData.role, userEndpoint]);

  useEffect(() => {
    if (!isLoading && userRole) {
      navigate(`${userRole}/`);
    }
  }, [isLoading, userRole, navigate]);

  const { mutate: loginUser } = useSendDataNoToken(finalEndpoint);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    newRole: string | null
  ) => {
    if (newRole !== null) {
      setFormData((prev) => ({ ...prev, role: newRole }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    loginUser(formData, {
      onSuccess: (response) => {
        dispatch(
          loginSuccess({
            token: response.token,
            role: formData.role,
            endpoint: rolesConfig[formData.role]?.endpoint,
          })
        );
        dispatch(printState());
      },
      onError: (error) => {
        dispatch(loginFailure(error.message));
      },
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      elevation={3}
      sx={{
        maxWidth: 400,
        p: 4,
        mt: 1,
        backgroundColor: "white",
        borderRadius: 2,
        border: `1px solid ${theme.palette.tertiary.main}`,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box
              component="img"
              src={logo}
              alt="Ajyal logo"
              sx={{
                width: 170,
              }}
            />
            <Typography variant="subtitle2" sx={{ color: "gray", mb: 1 }}>
              أهلاً بك في مركز أجيال ..!
            </Typography>
            <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
              تسجيل الدخول
            </Typography>
          </Box>
        </motion.div>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <ToggleButtonGroup
              value={formData.role}
              exclusive
              onChange={handleRoleChange}
              aria-label="User role"
              sx={{
                "& .MuiToggleButton-root": {
                  px: 3,
                  py: 1,
                  border: `1px solid ${theme.palette.primary.main}`,
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main}`,
                    color: "white",
                    "& + .MuiToggleButton-root": {
                      borderLeft: `1px solid ${theme.palette.primary.main}`,
                    },
                  },
                  "&:not(.Mui-selected)": {
                    color: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  },
                },
                // RTL group container
                "&.MuiToggleButtonGroup-root": {
                  flexDirection: "row-reverse", // Reverse button order for RTL
                },
              }}
            >
              <ToggleButton
                value="teacher"
                aria-label="Teacher"
                sx={{ width: 100 }}
              >
                <SchoolIcon sx={{ mr: 1 }} />
                معلم
              </ToggleButton>
              <ToggleButton
                value="manager"
                aria-label="Manager"
                sx={{ width: 100 }}
              >
                <ManageAccountsIcon sx={{ mr: 1 }} />
                مدير
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <TextField
            fullWidth
            label="البريد الإلكتروني"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
          />

          <TextField
            fullWidth
            label="كلمة المرور"
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            sx={{
              py: 1.5,
              mb: 2,
              background: `${theme.palette.gradient.primary}`,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              " دخول"
            )}
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
            ليس لديك حساب؟{" "}
            <a href="/register" style={{ color: "primary.main" }}>
              سجل الآن
            </a>
          </Typography>
        </form>
      </motion.div>
    </Paper>
  );
};

export default LoginForm;
