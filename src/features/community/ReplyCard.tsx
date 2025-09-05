import { Box, Typography, Button, alpha } from "@mui/material";
import getImageUrl from "../../services/image-url";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Reply } from "../../interfaces/Community";
import { useState } from "react";
import theme from "../../styles/mainThem";

interface ReplyCardProps {
  reply: Reply;
}

const getBgColor = (authorType: string) => {
  return authorType === "App\\Models\\Teacher"
    ? alpha(theme.palette.secondary.main, 0.1)
    : alpha(theme.palette.primary.main, 0.1);
};
const getAlignSelf = (authorType: string) => {
  return authorType === "App\\Models\\Teacher" ? "end" : "start";
};

const ReplyCard = ({ reply }: ReplyCardProps) => {
  const [showImage, setShowImage] = useState(false);
  return (
    <Box
      key={reply.id}
      sx={{
        alignSelf: getAlignSelf(reply.author_type),
        width: "80%",
        p: 1.5,
        borderRadius: 2,
        bgcolor: getBgColor(reply.author_type),
        boxShadow: 1,
      }}
    >
      {showImage && reply?.image?.path && (
        <Box
          component="img"
          sx={{
            width: 120,
            height: "auto",
            borderRadius: 1,
            mb: 1,
          }}
          src={getImageUrl(reply.image.path)}
        />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" sx={{ pl: 6 }}>
          {reply.body}
        </Typography>
        {reply?.image?.path && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mb: 1,
            }}
          >
            <Button
              size="small"
              onClick={() => setShowImage(!showImage)}
              startIcon={showImage ? <VisibilityOff /> : <Visibility />}
              sx={{
                textTransform: "none",
                fontSize: "0.75rem",
              }}
            >
              {showImage ? "إخفاء الصورة" : "عرض الصورة"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ReplyCard;
