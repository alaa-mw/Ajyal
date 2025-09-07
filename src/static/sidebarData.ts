import SchoolIcon from '@mui/icons-material/School';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ClassIcon from '@mui/icons-material/Class';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import {
  Home as HomeIcon,
  Quiz as QuizIcon,
  QuestionAnswer as QuestionsIcon,
} from '@mui/icons-material';

export const SidebarData = {
    mainItems:[ 
        {
            title: 'الرئيسية',
            path:"/",
            icon: HomeIcon,
        },
        {
            title: 'الطلاب',
            path:"/students",
            icon: SchoolIcon,
        },
        {
            title: 'المعلمون',
            path:"/teachers",
            icon: ClassIcon
        },
        {
            title: 'الدورات',
            path:"/courses",
            icon: LocalLibraryIcon
        },
        {
            title: 'الإعلانات',
            path:"/ads",
            icon: AnnouncementIcon
        },
    ],
    subItems:[ 
        {
            title: 'التسجيل',
            path:"/course-register",
        },
        {
            title: 'المحتوى العلمي',
            path:"/course-scientific-content",
        },
        {
            title: 'المالية',
            path:"/course-financial",
        },
    ],
}


export const SidebarDataTeacher = {
    mainItems:[ 
        // {
        // title: 'الرئيسية',
        // path: "/",
        // icon: HomeIcon 
        // },
        {
        title: 'الاختبارات',
        path: "/quizzes",
        icon: QuizIcon
        },
        {
        title: 'الأسئلة',
        path: "/questions",
        icon: QuestionsIcon 
        },
    ],
    subItems:[ ]
}