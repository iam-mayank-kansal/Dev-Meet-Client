import { Github, Home, Linkedin, LogIn, Mail, Twitter, Video } from "lucide-react";

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

// Data for features and testimonials
export const FEATURES = [
    {
        title: "Global Community",
        desc: "Connect with scientists from every continent and collaborate in real time.",
        icon: "🌍",
    },
    {
        title: "Interactive Sessions",
        desc: "Host or attend lectures, workshops, and peer discussions effortlessly.",
        icon: "🎤",
    },
    {
        title: "Seamless Scheduling",
        desc: "Built-in calendar and reminders to synchronize meetings across time zones.",
        icon: "📅",
    },
    {
        title: "Resource Sharing",
        desc: "Upload presentations, share data, and access recorded sessions securely.",
        icon: "📂",
    },
    {
        title: "Advanced Moderation",
        desc: "Keep meetings productive with robust moderation and breakout rooms.",
        icon: "🛡️",
    },
    {
        title: "Multi-device Support",
        desc: "Join from desktop or mobile, with optimized performance everywhere.",
        icon: "📱",
    },
];

export const TESTIMONIALS = [
    {
        quote: "This platform connects me to experts across the globe. Collaboration has never been so easy!",
        name: "Dr. Ana Ribeiro",
        country: "Brazil",
        avatar: "🇧🇷",
    },
    {
        quote: "Our students gained access to global lectures and mentorship opportunities.",
        name: "Prof. Peter Li",
        country: "Singapore",
        avatar: "🇸🇬",
    },
    {
        quote: "I organized an international seminar with scientists in five countries—incredible experience.",
        name: "Dr. Tunde Afolabi",
        country: "Nigeria",
        avatar: "🇳🇬",
    },
];

export const navItems = [
    { name: "Home", path: "/", },
    { name: "Join Meeting", path: "/join" },
    { name: "Host Meeting", path: "/host", },
    { name: "Community", path: "/community", },
    { name: "Profile", path: "/profile" },
];

export const socialLinks = [
    { name: "Email", url: "mailto:contact@devmeet.com", icon: <Mail className="w-5 h-5" /> },
    { name: "GitHub", url: "https://github.com/devmeet", icon: <Github className="w-5 h-5" /> },
    { name: "Twitter", url: "https://twitter.com/devmeet", icon: <Twitter className="w-5 h-5" /> },
    { name: "LinkedIn", url: "https://linkedin.com/company/devmeet", icon: <Linkedin className="w-5 h-5" /> },
];