import { Typography, Card, CardContent, Box, Chip, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useFetchData from "../../hooks/useFetchData";
import { Student } from "../../interfaces/Student";
import { formattedDate } from "../../utils/formatedDate";

export interface IComplaint {
  id: number;
  content: string;
  student_id: number;
  created_at: string;
  updated_at: string;
  student: Student;
}

const ComplaintsList = () => {
  const { data: complaints } = useFetchData<IComplaint[]>(
    "/complaint/allComplaints"
  );

  return (
    <Box>
      <Typography variant="h6" component="h6" fontWeight={"bold"}>
        الشكاوي
      </Typography>
      <Stack gap={2} direction={"row"}>
        {complaints?.data.map((complaint) => (
          <Card key={complaint.id} sx={{width:300}}>
            <CardContent>
              <Typography variant="body1" component="div" gutterBottom>
                {complaint.content}  
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccessTimeIcon
                  sx={{ color: "text.secondary", mr: 1 }}
                  fontSize="small"
                />
                <Typography variant="body2" color="text.secondary">
                  {formattedDate(complaint.created_at)}
                </Typography>
              </Box>
              <Box sx={{ borderTop: "1px solid #eee", pt: 2, mt: 2 }}>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={` ${complaint.student.first_name} ${complaint.student.last_name}`}
                    color="primary"
                    size="small"
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default ComplaintsList;
