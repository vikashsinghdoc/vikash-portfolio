import type { Profile, Experience, Education, Skill, Project } from '@/lib/types';
import { Github, GitMerge, TestTube, Code, Network, RefreshCw, FileText, Briefcase, GraduationCap, Mail, Phone, Database, Cog, BrainCircuit, Rocket } from 'lucide-react';
import { SiSpringboot, SiGatling, SiCucumber, SiPostman, SiJenkins, SiDocker, SiTypescript, SiJavascript, SiJira, SiSelenium, SiGnubash, SiGradle, SiApachemaven, SiGithubactions } from 'react-icons/si';
import { GrTest } from "react-icons/gr";
import { FaJava } from "react-icons/fa";

export const profileData: Profile = {
  name: 'Vikash Kumar Singh',
  avatar: '1',
  title: 'QA Lead | Senior Consultant',
  bio: 'With 7+ years of experience as a Quality Automation Specialist, I build scalable automation frameworks, develop backend REST APIs for test infrastructure, and drive CI/CD-enabled quality engineering practices to deliver robust, business-impacting QA solutions.',
  email: 'vikashsinghdoc@gmail.com',
  phone: '9148938628',
  social: {
    linkedin: 'https://www.linkedin.com/in/vikashsinghkaushik/',
    github: 'https://github.com/vikashsinghdoc',
  },
};

export const workExperienceData: Experience[] = [
  {
    title: 'Senior Consultant',
    company: 'Capgemini (Client: Morgan Stanley)',
    domain: 'Data - Governance',
    startDate: 'Jan 2023',
    endDate: 'Present',
    description: '• Architected and developed internal backend REST APIs using Spring Boot to fetch test data, trigger events, and validate microservice flows, accelerating automation velocity by 15–20%.\n• Designed and developed a full end-to-end automation framework using Java + Selenium + RestAssured + Spring Boot + (BDD)Cucumber, enabling unified testing across UI, API, DB, and microservices layers.\n• Developed a modern, robust automation framework using Playwright with TypeScript and JavaScript, enhancing end-to-end testing capabilities with improved performance and reliability.\n• Built a Java + Playwright automation framework integrated with Spring Boot for dependency management, offering faster, stable, and cross-browser execution.\n• Created a performance testing framework using Java + Spring Boot + Gatling, enabling load, stress, and concurrency testing for internal microservices; reduced performance regression timelines by 50%.\n• Leveraged GitHub Copilot extensively to accelerate framework development, automate repetitive coding patterns, and generate high-quality utilities, improving overall development speed and consistency across the automation suite.',
  },
  {
    title: 'Test Specialist',
    company: 'Mindtree Ltd. (Client: Deloitte)',
    domain: 'Finance - Wealth Management',
    startDate: 'Mar 2020',
    endDate: 'Jan 2023',
    description: '• Contributed extensively to UI automation using Java + Selenium + (BDD)Cucumber,, improving stability of existing frameworks by enhancing utilities, optimizing waits, and reducing flaky tests.\n• Strengthened API automation using RestAssured, covering response validations, schema checks, API chaining, authentication, and negative test scenarios.\n• Conducted integration testing covering UI testing, API validation, and DB validation, ensuring 98% end-to-end consistency.',
  },
  {
    title: 'Application Engineer (CRM)',
    company: 'I Focus Solutions India Pvt Ltd.',
    domain: 'Retail - Commerce',
    startDate: 'Mar 2017',
    endDate: 'Oct 2018',
    description: '• Conducted end-to-end manual testing for CRM modules including functional, regression, and integration testing.\n• Prepared test plans, scenarios, and detailed test cases ensuring thorough requirements coverage.\n• Logged, tracked, and followed up on defects in Jira, improving closure rates and reducing defect leakage.',
  },
];

export const educationData: Education[] = [
  {
    institution: 'Anna University, Chennai',
    degree: 'Bachelor Of Engineering, Electronics & Communications',
    startDate: '2012',
    endDate: '2016',
    description: 'Graduated with a CGPA of 6.68.',
  },
];

export const skillsData: Skill[] = [
    { name: 'Java', icon: FaJava, color: '#f89820' },
    { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    { name: 'Selenium', icon: SiSelenium, color: '#43B02A' },
    { name: 'RestAssured', icon: Rocket, color: '#E53935' },
    { name: 'Playwright', icon: Rocket, color: '#2EAD33'},
    { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
    { name: 'Microservices Testing', icon: Network, color: '#6c5ce7' },
    { name: 'CI/CD', icon: GitMerge, color: '#f05033' },
    { name: 'Gatling', icon: SiGatling, color: '#FF9E2A' },
    { name: 'Cucumber (BDD)', icon: SiCucumber, color: '#23BE23' },
    { name: 'TestNG', icon: GrTest, color: '#FFC107' },
    { name: 'JUnit', icon: GrTest, color: '#25A162' },
    { name: 'Jira', icon: SiJira, color: '#0052CC' },
    { name: 'GitHub', icon: Github, color: '#ffffff' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { name: 'Azure DevOps', icon: Cog, color: '#0078D7' },
    { name: 'Jenkins', icon: SiJenkins, color: '#D24939' },
    { name: 'Postgres', icon: Database, color: '#336791' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Git', icon: Code, color: '#f05033' },
];

export const projectsData = [
  {
    id: 'project-1',
    title: 'E2E Automation Framework',
    description: 'Designed and implemented a comprehensive end-to-end automation framework using Java, Selenium, RestAssured, and Spring Boot. This unified solution accelerated testing across UI, API, and microservices layers.',
  },
  {
    id: 'project-2',
    title: 'Performance Testing Framework',
    description: 'Built a performance testing framework with Java, Spring Boot, and Gatling to conduct load, stress, and concurrency testing on internal microservices, reducing performance regression timelines by 50%.',
  },
  {
    id: 'project-3',
    title: 'Internal Test Data Service',
    description: 'Developed a backend Spring Boot service to programmatically manage test data, trigger events, and validate microservice flows, increasing automation efficiency by over 15%.',
  },
  {
    id: 'project-4',
    title: 'CI/CD Pipeline Integration',
    description: 'Led the integration of automation suites into CI/CD pipelines using Jenkins and Azure DevOps, enabling continuous execution, automated reporting, and faster feedback cycles for development teams.',
  },
];
