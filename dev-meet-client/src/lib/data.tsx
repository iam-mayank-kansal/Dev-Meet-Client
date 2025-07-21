import { Home, LogIn, Video } from "lucide-react";

export const navItemsData = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Join Meeting", path: "/join-meeting", icon: <LogIn className="w-5 h-5" /> },
    {
        name: "Host Meeting",
        icon: <Video className="w-5 h-5" />,
            dropdown: [
            { name: "Instant Meeting", path: "/host-meeting/instant" },
            { name: "Schedule Meeting", path: "/host-meeting/schedule" },
        ]
    }
];