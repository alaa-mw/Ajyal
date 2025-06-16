import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import theme from "../../styles/mainThem";
import { useState } from "react";
import logo from "../../assets/logo.png";

interface RegisterFormProps {
  onNextStep: () => void;
}

const RegisterForm = ({ onNextStep }: RegisterFormProps) => {
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

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    verifyCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for registration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    onNextStep();
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            component={motion.img}
            src={logo}
            alt="Ajyal logo"
            sx={{ width: 140 }}
            whileHover={{ scale: 1.05 }}
          />
          <Typography variant="subtitle2" sx={{ color: "gray", mb: 1 }}>
            أهلاً بك في مركز أجيال ..!
          </Typography>
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
            تسجيل معلم جديد
          </Typography>
        </Box>
      </motion.div>

      <form onSubmit={handleSubmitRegistration}>
        <TextField
          fullWidth
          label="البريد الإلكتروني"
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
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
          sx={{ mb: 2 }}
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
        <TextField
          fullWidth
          label="تأكيد كلمة المرور"
          name="confirm_password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={formData.confirm_password}
          onChange={handleChange}
          sx={{ mb: 2 }}
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
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "تسجيل"}
        </Button>

        <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
          لديك حساب بالفعل؟{" "}
          <a href="/" style={{ color: "primary.main" }}>
            سجل الدخول
          </a>
        </Typography>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
