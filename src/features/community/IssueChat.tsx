import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  CardHeader,
  Divider,
} from "@mui/material";
import { useState } from "react";
import useFetchDataId from "../../hooks/useFetchDataId";
import { Issue, Reply } from "../../interfaces/Community";
import useSendData from "../../hooks/useSendData";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { ImageUploader } from "../../components/common/ImageUploader";
import { Image } from "../../interfaces/Image";
import getImageUrl from "../../services/image-url";
import ReplyCard from "./ReplyCard";
import theme from "../../styles/mainThem";

interface Props {
  issue: Issue;
  onMarkFAQ?: (issueId: string) => void;
  onClose?: () => void;
}

// دالة مساعدة لتنسيق التاريخ
const formatTime = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
  };
  return date.toLocaleTimeString("ar-EG", options);
};

const IssueChat = ({ issue }: Props) => {
  const { showSnackbar } = useSnackbar();
  const [bodyReply, setBodyReply] = useState("");
  const [image, setImage] = useState<Image | undefined>(undefined);
  const { data, isLoading, refetch } = useFetchDataId<Issue>(
    `/reply/get-replies/${issue.id}`,
    issue.id
  );

  const { mutate: reply } = useSendData("/reply/add-reply");
  const { mutate: changeToFQA } = useSendData(
    `/issue/change-issue-status/${issue.id}`
  );
  const replies = data?.data?.replies;

  const handleReplySend = (fixedBoby?: string) => {
    reply(
      {
        issue_id: issue.id,
        body: fixedBoby ? fixedBoby : bodyReply,
        image: image?.file,
      },
      {
        onSuccess: (res) => {
          showSnackbar(res.message, "success");
          refetch();
          setBodyReply("");
          setImage(undefined);
        },
        onError: (error) => showSnackbar(error.message, "error"),
      }
    );
  };

  const handleChange = () => {
    changeToFQA(
      {},
      {
        onSuccess: (res) => {
          showSnackbar(res.message, "success");
          refetch();
        },
        onError: (error) => showSnackbar(error.message, "error"),
      }
    );
  };
  return (
    <Card
      sx={{
        borderTop:`20px solid ${theme.palette.primary}`,
        p: 3,
        borderRadius: 3,
        boxShadow: 3,
        // position: "fixed",
        // width: "55%",
      }}
    >
      <Typography variant="h6" fontWeight={"bold"}>
        المناقشة:
      </Typography>
      <Divider />
      <CardContent sx={{ p: 0 }}>
        {/* السؤال الأصلي - يظهر في الأعلى */}
        <Box sx={{ pb: 2, borderBottom: "1px solid #eee", mb: 2 }}>
          <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
            <Avatar />
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                {issue.author.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatTime(issue.created_at)}
              </Typography>
            </Box>
          </Stack>
          {issue?.image?.path && (
            <Box
              component="img"
              sx={{
                width: 200,
                // aspectRatio : "1/1",
                justifySelf: "center",
              }}
              src={getImageUrl(issue.image.path)}
            />
          )}
          <Typography variant="body1" sx={{ pl: 6 }}>
            {issue.body}
          </Typography>
        </Box>

        {/* قائمة الردود */}
        <Box
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            mb: 2,
            pb: 0.5,
            pr: 2,
          }}
        >
          {isLoading ? (
            <Box display="flex" justifyContent="center" py={2}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack spacing={2}>
              {replies?.map((r: Reply) => (
                <ReplyCard reply={r} />
              ))}
            </Stack>
          )}
        </Box>

        {/* حقل الإدخال للردود */}
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="اكتب ردك هنا..."
            value={bodyReply}
            onChange={(e) => setBodyReply(e.target.value)}
          />

          <Button variant="contained" onClick={() => handleReplySend()}>
            إرسال
          </Button>
        </Stack>
        <ImageUploader
          maxImages={1}
          selectedImages={image ? [image] : []}
          setSelectedImages={(images) => setImage(images[0])} // fix
        />

        {/* الأزرار الإضافية */}
        <Stack direction="row" gap={2} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleReplySend("راجع الأسئلة المتكررة")}
          >
            راجع الأسئلة المتكررة
          </Button>
          {!issue.is_fqa && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleChange}
            >
              وضع كـ FAQ
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default IssueChat;
