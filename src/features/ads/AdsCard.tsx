import { Card, Typography, Box } from "@mui/material";
import theme from "../../styles/mainThem";
import { Advertisement } from "../../interfaces/Advertisement ";
import getImageUrl from "../../services/image-url";
import { Image } from "../../interfaces/Image";
import { formattedDate } from "../../utils/formatedDate";

interface AdsCardProps {
  advertisement: Advertisement;
}

const AdsCard = ({ advertisement }: AdsCardProps) => {
  const mainImage = getImageUrl(advertisement.images[0].path);
  const otherImages: Image[] =
    advertisement.images?.length > 1 ? advertisement.images.slice(1) : [];

  return (
    <Card
      sx={{
        position: "relative",
        width: 270,
        height: 540,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      {/* Main background image */}
      {mainImage && (
        <Box
          component="img"
          src={mainImage}
          alt="Ad background"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "50%",
            objectFit: "cover",
            zIndex: 1,
            p: 1,
            borderRadius: 5,
          }}
        />
      )}

      {/* Gray overlay at bottom */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60%",
          background: `linear-gradient(to top, ${theme.palette.primary.main} 90%, transparent  )`,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        {/* Type badge */}
        <Box
          sx={{
            position: "absolute",
            top: -15,
            right: 16,
            bgcolor: theme.palette.secondary.main,
            color: "white",
            borderRadius: 1,
            px: 1.5,
            py: 0.5,
            zIndex: 3,
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {advertisement?.advertisable_type?.split("\\").pop()}
        </Box>

        {/* Title and body */}
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontWeight: "bold",
            mb: 1,
            zIndex: 3,
          }}
        >
          {advertisement.title}
        </Typography>

        <Typography
          variant="body2"
          color="rgba(255,255,255,0.8)"
          sx={{
            mb: 2,
            zIndex: 3,
          }}
        >
          {advertisement.body}
        </Typography>

        {/* Additional images row */}
        {otherImages.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 1,
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {otherImages.map((image) => (
              <Box
                key={image.id}
                component="img"
                src={getImageUrl(image.path)}
                alt="Additional ad content"
                sx={{
                  height: 60,
                  width: 60,
                  borderRadius: 1,
                  objectFit: "cover",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
            ))}
          </Box>
        )}

        {/* Date */}
        <Typography
          variant="caption"
          color="rgba(255,255,255,0.6)"
          sx={{
            alignSelf: "flex-end",
            mt: 1,
            zIndex: 3,
          }}
        >
          {formattedDate(advertisement.created_at)}
        </Typography>
      </Box>
    </Card>
  );
};

export default AdsCard;
