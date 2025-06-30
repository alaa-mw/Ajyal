import {
  Toolbar,
  TextField,
  InputAdornment,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import SortIcon from "@mui/icons-material/Sort";

interface ToolbarProps {
  entityType: "student" | "teacher" | "ad" | "course";
  onSearch: (query: string) => void;
  onSortNewest?: () => void;
  onAdd?: () => void;
  selectedNewest?: boolean;
}

const entityTranslations = {
  student: "طالب",
  teacher: "معلم",
  ad: "إعلان",
  course: "دورة",
};

const EntityToolbar = ({
  entityType,
  onSearch,
  onSortNewest,
  onAdd,
  selectedNewest = false,
}: ToolbarProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Toolbar
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        p: 1,
        justifyContent: "space-between",
      }}
      disableGutters
    >
      {/* Search Bar */}
      <TextField
        placeholder={`بحث عن ${entityTranslations[entityType]}...`}
        size="small"
        onChange={(e) => onSearch(e.target.value)}
        sx={{
          width: 300,
          backgroundColor: "common.white",
          borderRadius: 20,
          "& .MuiOutlinedInput-root": {
            borderRadius: 20,
            "& fieldset": {
              borderColor: "grey.300",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Newest Button */}
        {onSortNewest && (
          <Button
            variant={selectedNewest ? "contained" : "outlined"}
            startIcon={<SortIcon sx={{ ml: 2 }} />}
            onClick={onSortNewest}
            sx={{
              fontWeight: "bold",
              px: 2,
              py: 1,
              borderRadius: "20px",
              border: "2px solid",
              borderColor: "secondary.main",
              backgroundColor: selectedNewest
                ? "secondary.main"
                : "background.paper",
            }}
          >
            {!isSmallScreen && "الأحدث"}
          </Button>
        )}

        {/* Add Entity Button */}
        {onAdd && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon sx={{ ml: 2 }} />}
            onClick={onAdd}
            sx={{
              fontWeight: "bold",
              px: 2,
              py: 1,
              borderRadius: 20,
            }}
          >
            {!isSmallScreen && `إضافة ${entityTranslations[entityType]}`}
          </Button>
        )}
      </Box>
    </Toolbar>
  );
};

export default EntityToolbar;
