// components/FormField.tsx
import { Box, Typography, TextField, TextFieldProps } from "@mui/material";
import theme from "../../styles/mainThem";
import { ChangeEventHandler } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange:  ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?:string;
  placeholder?: string;
  required?: boolean;
  multiline?:boolean
  textFieldProps?: TextFieldProps;
  typographyProps?: React.ComponentProps<typeof Typography>;
}

const FormField = ({
  label,
  name,
  value,
    onChange,
    type,
  placeholder = "",
  required = false,
  multiline,
  textFieldProps = {},
  typographyProps = {},
}: FormFieldProps) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 0.4,
          color: theme.palette.primary.main ,
          fontWeight: 600,
          fontSize: "0.95rem",
          ...typographyProps.sx,
        }}
        {...typographyProps}
      >
        {label}
        {required && <span>*</span>}
      </Typography>
      <TextField
        fullWidth
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        required={required}
        multiline={multiline}
        placeholder={placeholder}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#e0e0e0",
              borderRadius: "8px",
            },
          },
          ...textFieldProps.sx,
        }}
        {...textFieldProps}
      />
    </Box>
  );
};

export default FormField;
