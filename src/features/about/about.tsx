import React from "react";
import logo from "../../assets/logo.png";
import { Box, Typography, Container, Paper, alpha } from "@mui/material";
import {
  School,
  LocationOn,
  Phone,
  Email,
  AccessTime,
} from "@mui/icons-material";
import theme from "../../styles/mainThem";

// import logo from "../../assets/logo.png";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          component="img"
          src={logo}
          alt="Ajyal logo"
      
          sx={{ width: 120, height: "auto", bgcolor:"white" , borderRadius:"50%"}}
        />
        <Typography
          variant="h4"
          component="h4"
          gutterBottom
          color="primary.main"
        >
          مدرسة أجيال
        </Typography>
        <Typography
          variant="h6"
          component="h6"
          gutterBottom
          color="text.secondary"
        >
          بالعلم ننمو و بالمحبة نرتقي
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4 , bgcolor:alpha(theme.palette.primary.main,0.1) }}>
        <Typography
          variant="h4"
          component="h3"
          gutterBottom
          sx={{ color: "primary.main", mb: 3 }}
        >
          عن مدرستنا
        </Typography>
        <Typography paragraph>
          تأسست مدرسة أجيال عام 2005 بهدف تقديم تعليم متميز يجمع بين الأصالة
          والحداثة. نحن نؤمن بأن التعليم هو أساس تقدم الأمم ونعمل على بناء جيل
          واعٍ مبدع قادر على مواجهة تحديات المستقبل.
        </Typography>
        <Typography paragraph>
          نفتخر بمنهجنا المتكامل الذي يجمع بين المناهج الدراسية المعتمدة
          والأنشطة اللاصفية المتنوعة، مما يسهم في تنمية مهارات الطلاب في مختلف
          المجالات العلمية والأدبية والفنية والرياضية.
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* رؤية المدرسة */}
        <Paper elevation={2} sx={{ p: 3  ,bgcolor:alpha(theme.palette.secondary.main,0.1) }}>
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

        {/* رسالة المدرسة */}
        <Paper elevation={2} sx={{ p: 3 ,bgcolor:alpha(theme.palette.tertiary.main,0.1) }}>
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
            بيئة تعليمية محفزة، ومناهج دراسية متطورة، ومعلمين متميزين، وشراكة
            فاعلة مع أولياء الأمور والمجتمع.
          </Typography>
        </Paper>

        {/* قيم المدرسة */}
        <Paper elevation={2} sx={{ p: 3 ,bgcolor:alpha(theme.palette.primary.main,0.1) }}>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            color="primary.main"
          >
            قيمنا
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
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

        {/* معلومات الاتصال */}
        <Paper elevation={2} sx={{ p: 3 ,bgcolor:alpha(theme.palette.secondary.main,0.1) }}>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            color="primary.main"
          >
            معلومات التواصل
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOn color="primary" sx={{ ml: 1 }} />
              <Typography>
                شارع المعرفة، حي التقدم، الرياض، المملكة العربية السعودية
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Phone color="primary" sx={{ ml: 1 }} />
              <Typography>+966112345678</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Email color="primary" sx={{ ml: 1 }} />
              <Typography>info@ajyal.edu.sa</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTime color="primary" sx={{ ml: 1 }} />
              <Typography>
                من الأحد إلى الخميس: 7:00 صباحاً - 2:00 ظهراً
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
