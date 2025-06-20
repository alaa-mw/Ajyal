import SchoolIcon from '@mui/icons-material/School';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ClassIcon from '@mui/icons-material/Class';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

export const SidebarData = {
    mainItems:[ // ضع عنوان مناسب  و لا تتقيد بعناوين الكود
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
    subItems:[ // ضع عنوان مناسب 
        {
            title: 'التسجيل',
            path:"/course-register",
        },
        {
            title: 'المحتوى العلمي',
            path:"/course-scientific-content",
        },
        {
            title: 'المزيد',
            path:"/course-more",
        },
    ],
}