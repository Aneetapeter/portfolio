import {
  FaAndroid,
  FaEnvelope,
  FaGithub,
  FaJava,
  FaLinkedin,
  FaPhoneAlt,
  FaReact,
} from 'react-icons/fa';
import {
  SiDart,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiPython,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

export const navItems = ['About', 'Projects', 'Experience', 'Skills', 'Contact', 'Resume'];

export const socials = [
  { label: 'GitHub', href: 'https://github.com', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedin },
  { label: 'Email', href: 'mailto:aneetaaaa62388@gmail.com', icon: FaEnvelope },
];

export const heroRoles = ['Flutter Developer', 'Full Stack Developer', 'AI Enthusiast'];

export const skills = [
  { name: 'React', icon: FaReact, tone: 'blue' },
  { name: 'Flutter', icon: SiFlutter, tone: 'blue' },
  { name: 'Dart', icon: SiDart, tone: 'blue' },
  { name: 'Java', icon: FaJava, tone: 'red' },
  { name: 'Python', icon: SiPython, tone: 'white' },
  { name: 'Laravel', icon: SiLaravel, tone: 'red' },
  { name: 'PHP', icon: SiPhp, tone: 'blue' },
  { name: 'MySQL', icon: SiMysql, tone: 'white' },
  { name: 'Firebase', icon: SiFirebase, tone: 'red' },
  { name: 'Git', icon: SiGit, tone: 'red' },
  { name: 'Android Studio', icon: FaAndroid, tone: 'blue' },
  { name: 'VS Code', icon: VscCode, tone: 'blue' },
];

export const projects = [
  {
    name: 'Acadence',
    type: 'Student Management System',
    summary:
      'A focused academic operations platform for student records, workflows, and clean administrative visibility.',
    stack: ['React', 'Laravel', 'MySQL'],
    accent: 'blue',
  },
  {
    name: 'Mantra',
    type: 'AI Productivity Platform',
    summary:
      'A smart productivity environment shaped around structured learning, task flow, and AI-supported focus.',
    stack: ['Laravel', 'PHP', 'AI'],
    accent: 'red',
  },
  {
    name: 'Smart Agriculture',
    type: 'Data Assisted Farming',
    summary:
      'A concept system for bringing live signals, predictions, and decision support into agriculture workflows.',
    stack: ['Python', 'IoT', 'Analytics'],
    accent: 'blue',
  },
  {
    name: 'Scanix',
    type: 'Facial Paralysis Detection',
    summary:
      'A healthcare-facing computer vision project designed to improve early detection accessibility.',
    stack: ['React', 'Python', 'Computer Vision'],
    accent: 'white',
  },
  {
    name: 'Portfolio',
    type: 'Cinematic Web Experience',
    summary:
      'A premium personal portfolio built as an immersive movie-poster inspired developer identity.',
    stack: ['React', 'Three.js', 'GSAP'],
    accent: 'red',
  },
];

export const timeline = [
  {
    year: '2026',
    title: 'Flutter Developer Internship',
    meta: 'Eduzera Technologies Pvt Ltd',
    body: 'Building mobile-first interfaces, connecting production workflows, and sharpening full-stack delivery habits.',
  },
  {
    year: '2024 - Present',
    title: 'B.Sc. Computer Science - Data Analytics',
    meta: 'Rajagiri College of Social Sciences, Kochi',
    body: 'Studying data structures, DBMS, analytics, machine learning fundamentals, and software engineering through real projects.',
  },
  {
    year: '2025',
    title: 'Research Internship',
    meta: 'ERA - Rajagiri College of Social Sciences',
    body: 'Explored research, testing, debugging, and applied development workflows in a collaborative environment.',
  },
];

export const contactCards = [
  { label: 'Email', value: 'aneetaaaa62388@gmail.com', href: 'mailto:aneetaaaa62388@gmail.com', icon: FaEnvelope },
  { label: 'Phone', value: '+91 9496600778', href: 'tel:+919496600778', icon: FaPhoneAlt },
  { label: 'GitHub', value: 'github.com', href: 'https://github.com', icon: FaGithub },
  { label: 'LinkedIn', value: 'linkedin.com', href: 'https://linkedin.com', icon: FaLinkedin },
];
