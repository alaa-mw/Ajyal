import { TextField, Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import theme from "../../styles/mainThem";

const VerificationForm = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    // const { name, value } = e.target;
    // setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Verification submitted:", formData);
    // Add your verification logic here
  };
  const handleResendCode = () => {
    console.log("Resend verification code");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ pt: 6, pb: 2 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
            التحقق من البريد الالكتروني
          </Typography>
        </Box>
        <form onSubmit={handleSubmitVerification}>
          <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
            تم إرسال رمز التحقق إلى
            <Box component="span" sx={{ color: "primary.light" }}>
              {/* {formData.email} */} email
            </Box>
          </Typography>

          <TextField
            fullWidth
            label="رمز التحقق"
            name="verifyCode"
            variant="outlined"
            // value={formData.verifyCode}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
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
            تأكيد
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            لم تستلم الرمز؟{" "}
            <Button variant="text" size="small" onClick={handleResendCode}>
              إعادة إرسال
            </Button>
          </Typography>
        </form>
      </Box>
    </motion.div>
  );
};

export default VerificationForm;
