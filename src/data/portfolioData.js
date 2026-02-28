export const personalInfo = {
  name: "Atin Mondal",
  title: "AWS Certified DevOps Engineer",
  tagline:
    "Architecting scalable infrastructure and automating CI/CD pipelines. Turning complex cloud problems into reliable, self-healing systems.",
  email: "atincse@outlook.com",
  resumePath: "/Atin_Resume.pdf",
  profileImage: "/images/atin.jpg",
  social: {
    github: "https://github.com/atinmondal",
    linkedin: "https://www.linkedin.com/in/atin-mondal/",
  },
};

export const experiences = [
  {
    id: "globallogic",
    company: "GlobalLogic",
    role: "Senior Software Engineer",
    period: "Aug 2024 - Present",
    logo: "/images/globallogic.png",
    bullets: [
      "Developing AIOps solutions using AWS Bedrock & Lambda to automate Jira ticket resolution.",
      "Built a custom SlackBot for Confluence automation, reducing search time by 40%.",
      "Managing EKS upgrades and implementing CMDB automation.",
    ],
    tags: ["AWS Bedrock", "Lambda", "Python"],
  },
  {
    id: "wipro",
    company: "Wipro",
    role: "DevOps Engineer",
    period: "Oct 2021 - Aug 2024",
    logo: "/images/wipro.png",
    bullets: [
      "Managed containerized deployments (Docker/K8s), reducing deployment time by 45%.",
      "Maintained high-availability CI/CD pipelines using Jenkins.",
      "Awarded Intel Star Award (Aug 2023).",
    ],
    tags: ["Docker", "Kubernetes", "Jenkins"],
  },
];

export const projects = [
  {
    id: "eks-nodejs",
    title: "EKS Node.js Automation",
    icon: "/images/eks.png",
    description:
      "Designed a multi-stage Jenkins pipeline for CI/CD. Orchestrated EKS cluster provisioning using Terraform to ensure zero-downtime deployments.",
    tags: ["EKS", "Terraform", "Jenkins"],
  },
  {
    id: "ecs-autoscaling",
    title: "ECS Auto-Scaling",
    icon: "/images/ecs.png",
    description:
      "Automated image building and ECS task definition updates using GitHub Actions. Implemented auto-scaling policies based on traffic load.",
    tags: ["ECS", "GitHub Actions", "Docker"],
  },
];

export const certifications = [
  {
    id: "aws-dev",
    title: "AWS Certified Developer",
    subtitle: "Associate Level",
    image: "/images/aws-developer.png",
    credentialId: "2HVJ62RKWN441RKV",
    issued: "May 2023",
    tags: ["Serverless", "Lambda", "DynamoDB"],
  },
  {
    id: "aws-cp",
    title: "AWS Cloud Practitioner",
    subtitle: "Foundational",
    image: "/images/aws-cp.png",
    credentialId: "4GP9CQWKSM1115GH",
    issued: "July 2022",
    tags: ["Cloud Basics", "Billing", "Security"],
  },
];

export const education = {
  degree: "B.Tech (CSE)",
  institution: "College Of Eng. & Mgmt.",
  logo: "/images/college.png",
  graduated: "2021",
  cgpa: "8.82",
  tags: ["Algorithms", "System Design"],
};

export const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certs" },
  { label: "Contact", href: "#contact" },
];

export const skills = [
  "AWS",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Jenkins",
  "GitHub Actions",
  "Python",
  "Linux",
  "Git",
  "Lambda",
  "ECS",
  "EKS",
  "Ansible",
  "Bash",
  "CI/CD",
];
