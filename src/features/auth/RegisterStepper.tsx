import { Paper } from "@mui/material";
import { motion } from "framer-motion";
import theme from "../../styles/mainThem";
import VerificationForm from "./VerificationForm";
import { useState } from "react";
import RegisterForm from "./RegisterForm";

type Step = "registration" | "verification";

const RegisterStepper = () => {
  const [step, setStep] = useState<Step>("registration");
  const [key, setKey] = useState(0); // مفتاح لإجبار إعادة التصيير

  const handleNextStep = () => {
    setStep("verification");
    setKey(prev => prev + 1); // تغيير المفتاح لإعادة animation
  };


  const paperAnimation = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4 },
  };

  return (
    <motion.div key={key}> {/* إضافة مفتاح هنا لإعادة animation */}
    <Paper
      component={motion.div}
      initial={paperAnimation.initial}
      animate={paperAnimation.animate}
      transition={paperAnimation.transition}
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: "auto",
        py: 2,
        px: 4,
        mt: 1,
        backgroundColor: "white",
        borderRadius: 2,
        border: `1px solid ${theme.palette.tertiary.main}`,
      }}
    >
        {step === "registration" ? (
          <RegisterForm onNextStep={handleNextStep} />
        ) : (
          <VerificationForm /> 
        )}
    </Paper>
    </motion.div>
  );
};

export default RegisterStepper;
