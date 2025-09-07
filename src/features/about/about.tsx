import { Box, Typography, Paper, alpha } from "@mui/material";
import theme from "../../styles/mainThem";

const About = () => {
  return (
    <Box
      component="section"
      sx={{
        m: 2,
        display: "grid",
        placeItems: "center", //return
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          s: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
      }}
    >
      {/* About Us Box */}
      <Paper
        elevation={2}
        sx={{
          height: 210,
          p: 3,
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          flex: 1, // Add this line
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{ color: "primary.main" }}
        >
          عن معهدنا
        </Typography>
        <Typography paragraph>
          تأسس معهد أجيال عام 2005 بهدف تقديم تعليم متميز يجمع بين الأصالة
          والحداثة.
        </Typography>
        <Typography paragraph>نفتخر بمنهجنا المتكامل .</Typography>
      </Paper>

      {/* Vision, Mission, and Values Box */}
      {/* Vision Box */}
      <Paper
        elevation={2}
        sx={{
          height: 210,
          p: 3,
          bgcolor: alpha(theme.palette.secondary.main, 0.1),
          flex: 1, // Add this line
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          color="primary.main"
        >
          رؤيتنا
        </Typography>
        <Typography>
          أن تكون مدرسة أجيال بيئة تعليمية متميزة ورائدة في إعداد الطلاب
          للمستقبل من خلال تقديم تعليم عالي الجودة يعزز القيم والإبداع
          والابتكار.
        </Typography>
      </Paper>

      {/* Mission Box */}
      <Paper
        elevation={2}
        sx={{
          height: 210,
          p: 3,
          bgcolor: alpha(theme.palette.tertiary.main, 0.1),
          flex: 1, // Add this line
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          color="primary.main"
        >
          رسالتنا
        </Typography>
        <Typography>
          نسعى في مدرسة أجيال إلى تنمية شخصية الطالب بشكل متكامل من خلال توفير
          بيئة تعليمية محفزة، وشراكة فاعلة مع أولياء الأمور والمجتمع.
        </Typography>
      </Paper>

      {/* Values Box */}
      <Paper
        elevation={2}
        sx={{
          height: 210,
          p: 3,
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          flex: 1, // Add this line
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          color="primary.main"
        >
          قيمنا
        </Typography>
        <Box component="ul" sx={{ pl: 2, my: 0 }}>
          <li>
            <Typography>التعليم المتميز</Typography>
          </li>
          <li>
            <Typography>الإبداع والابتكار</Typography>
          </li>
          <li>
            <Typography>الانتماء والمواطنة</Typography>
          </li>
          <li>
            <Typography>التعلم المستمر</Typography>
          </li>
          <li>
            <Typography>التعاون والعمل الجماعي</Typography>
          </li>
        </Box>
      </Paper>
    </Box>
  );
};

export default About;
