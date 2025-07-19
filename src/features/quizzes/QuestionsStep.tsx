import { Box, Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import QuestionSelected from "./QuestionSelected";
import { useEffect, useState } from "react";

export const QuestionsStep = () => {
  const quiz = useSelector((state: RootState) => state.quiz);
  const [selectedPath, setSelectedPath] = useState<number[]>([0]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        const currentIndex = selectedPath[0];
        const nextIndex = (currentIndex + 1) % quiz.questions.length;
        setSelectedPath([nextIndex]);
      } else if (e.ctrlKey && e.key === "ArrowUp") {
        e.preventDefault();
        const currentIndex = selectedPath[0];
        const prevIndex =
          (currentIndex - 1 + quiz.questions.length) % quiz.questions.length;
        setSelectedPath([prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPath, quiz.questions.length]);

  return (
    <Box
      display="flex"
      sx={{ height: "100%" }}
      gap={{ xs: 0.2, md: 2 }}
      px={{ md: 4 }}
    >
      <Stack direction="column" spacing={1} sx={{ width: "10%" }}>
        {quiz.questions.map((_, index) => (
          <Button
            key={index}
            variant={selectedPath[0] === index ? "contained" : "outlined"}
            onClick={() => setSelectedPath([index])}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              transform:
                selectedPath[0] === index ? "scaleX(1.1)" : "scaleX(1)",
              transition: "transform 0.2s ease-in-out",
              // Mobile styles
              minWidth: "auto",
              px: { xs: 1, md: 2 },
              "&::before": {
                content: { xs: `"${index + 1}"`, md: `"السؤال ${index + 1}"` },
                display: "inline-block",
              },
            }}
          />
        ))}
      </Stack>

      <Box sx={{ width: "85%" }}>
        {selectedPath.length > 0 && <QuestionSelected path={selectedPath} />}
      </Box>
    </Box>
  );
};
