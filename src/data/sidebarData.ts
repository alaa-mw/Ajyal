import SchoolIcon from '@mui/icons-material/School';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ClassIcon from '@mui/icons-material/Class';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

export const SidebarData = [
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
]