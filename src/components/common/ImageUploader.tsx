import { useRef, ChangeEvent } from "react";
import { Box, Button, IconButton, Avatar, Stack } from "@mui/material";
import { AddCircle, Delete } from "@mui/icons-material";
import theme from "../../styles/mainThem";

interface ImageUploaderProps {
  maxImages?: number; // عدد الصور الأقصى المسموح به
  selectedImages: string[]; // الصور المحددة من المكون الأب
  setSelectedImages: (images: string[]) => void; // دالة لتحديث الصور في المكون الأب
}

export const ImageUploader = ({
  maxImages = 3,
  selectedImages,
  setSelectedImages,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];

    // حساب عدد الصور المتبقية
    const remainingSlots = maxImages - selectedImages.length;
    const filesToProcess = Math.min(files.length, remainingSlots);

    for (let i = 0; i < filesToProcess; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string);
          if (newImages.length === filesToProcess) {
            setSelectedImages([...selectedImages, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        multiple
        style={{ display: "none" }}
      />

      {/* Upload button - only show if less than max images */}
      {selectedImages.length < maxImages && (
        <Button
          variant="outlined"
          startIcon={<AddCircle sx={{ ml: 1 }} />}
          onClick={() => fileInputRef.current?.click()}
          sx={{
            border: `2px dashed ${theme.palette.secondary.dark}`,
            borderRadius: 2,
            mb: 2,
          }}
          disabled={selectedImages.length >= maxImages}
        >
          إضافة صور توضيحية ({selectedImages.length}/{maxImages})
        </Button>
      )}

      {/* Image previews */}
      {selectedImages.length > 0 && (
        <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
          {selectedImages.map((img, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <Avatar
                src={img}
                variant="rounded"
                sx={{
                  width: 100,
                  height: 100,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemoveImage(index)}
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  bgcolor: "error.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};