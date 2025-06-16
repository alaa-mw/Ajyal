import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import logo from "../../assets/logo.png";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import theme from "../../styles/mainThem";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your authentication logic here
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
        mx: "auto",
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
          <Box sx={{ textAlign: "center", mb: 4 }}>
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
                    {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
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
            دخول
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
