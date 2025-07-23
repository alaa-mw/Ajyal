import { useRef, ChangeEvent, useEffect } from "react";
import { Box, Button, IconButton, Avatar, Stack } from "@mui/material";
import { AddCircle, Delete } from "@mui/icons-material";
import theme from "../../styles/mainThem";
import { Image } from "../../interfaces/Image";
import getImageUrl from "../../services/image-url";

interface ImageUploaderProps {
  maxImages?: number;
  selectedImages: Image[];
  setSelectedImages: (images: Image[]) => void;
}

export const ImageUploader = ({
  maxImages = 3,
  selectedImages,
  setSelectedImages,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - selectedImages.length;
    if (remainingSlots <= 0) return;

    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    const newImages: Image[] = filesToAdd.map((file, index) => {
      return {
        file: file,
        id: `temp-${Date.now()}-${index}`,
        path: URL.createObjectURL(file),
      };
    });

    const updatedImages = [...selectedImages, ...newImages];
    setSelectedImages(updatedImages);

    // Reset file input to allow selecting same files again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (id: string) => {
    const imageToRemove = selectedImages.find((img) => img.id === id);

    if (imageToRemove?.path?.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove.path);
    }

    const updatedImages = selectedImages.filter((img) => img.id !== id);
    setSelectedImages(updatedImages);
  };

  // Clean up blob URLs when component unmounts
  // useEffect(() => {
  //   return () => {
  //     internalImages.forEach(image => {
  //       if (image.path?.startsWith('blob:')) {
  //         URL.revokeObjectURL(image.path);
  //       }
  //     });
  //   };
  // }, [internalImages]);

  return (
    <Box sx={{ mt: 2 }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        multiple
        style={{ display: "none" }}
      />

      {selectedImages.length < maxImages && (
        <Button
          variant="outlined"
          startIcon={<AddCircle sx={{ ml: 1 }} />}
          onClick={() => fileInputRef.current?.click()}
          sx={{
            border: `2px dashed ${theme.palette.primary.dark}`,
            borderRadius: 2,
            mb: 2,
          }}
          fullWidth
        >
          إضافة صور ({selectedImages.length}/{maxImages})
        </Button>
      )}

      {selectedImages.length > 0 && (
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
          {selectedImages.map((image) => (
            <Box key={image.id} sx={{ position: "relative" }}>
              <Avatar
                src={
                  image.path?.startsWith("blob:")
                    ? image.path
                    : getImageUrl(image.path)
                }
                variant="rounded"
                sx={{
                  width: 100,
                  height: 100,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemoveImage(image.id)}
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
