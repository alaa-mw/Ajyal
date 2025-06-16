import React from "react";
import { useTheme } from "@mui/material/styles";

interface CircleProps {
  position?: "top-left" | "bottom-right" | "custom";
  color?: string;
  opacity?: number;
  r?: number;
}
const Circle: React.FC<CircleProps> = ({
  position = "top-left",
  color,
  opacity = 1,
  r = 200,
}) => {
  const theme = useTheme();

  // Determine styles based on position
  const positionStyles = {
    "top-left": {
      top: -100,
      left: -50,
    },
    
    "bottom-right": {
      bottom: -100,
      right: -50,
    },
    custom: {
      top: 50,
      left: -50,
    },
  };

  return (
    <div
      style={{
        position: "absolute",
        width: r,
        height: r,
        backgroundColor: color || theme.palette.primary.main,
        boxShadow: " 1px 1px 10px 5px rgba(0,0,0,0.2)",
        opacity: opacity,
        ...positionStyles[position],
        transformOrigin: "center",
        borderRadius: "100%",
        zIndex: -1,
      }}
    />
  );
};

export default Circle;
