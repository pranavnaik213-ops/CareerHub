import { Job, Application, CandidateProfile } from '@/types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer (Next.js & Node)',
    company: 'Vortex Tech',
    logo: '⚡',
    location: 'San Francisco, CA',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 140000,
    salaryMax: 180000,
    currency: '$',
    description: 'We are seeking an experienced Full Stack Engineer to lead the architecture of our cloud SaaS analytics platform. You will work closely with product designers and backend engineers to build lightning-fast web experiences using Next.js, Node.js, and PostgreSQL.',
    responsibilities: [
      'Architect scalable frontend and microservice backend systems.',
      'Optimize database queries and API response times under high concurrency.',
      'Collaborate with UX team to build accessible, high-performance UI components.',
      'Mentor junior engineers and champion CI/CD and automated testing standards.'
    ],
    requirements: [
      '5+ years of experience building web applications with React/Next.js and Node.js.',
      'Strong knowledge of TypeScript, PostgreSQL, and RESTful API / GraphQL architecture.',
      'Familiarity with Cloud Infrastructure (AWS or GCP) and Docker containerization.',
      'Excellent communication skills and experience working in distributed remote teams.'
    ],
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'GraphQL'],
    benefits: [
      'Unlimited Paid Time Off (PTO)',
      '100% Health, Dental & Vision Coverage',
      '$3,000 Annual Learning & Conference Stipend',
      'Home Office Setup Allowance ($1,500)'
    ],
    postedDate: '2026-08-28',
    status: 'Active',
    applicantsCount: 14,
    featured: true
  },
  {
    id: 'job-2',
    title: 'Lead Product Designer (UI/UX Systems)',
    company: 'Lumina Design Lab',
    logo: '✨',
    location: 'New York, NY',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Lead / Executive',
    category: 'Design',
    salaryMin: 150000,
    salaryMax: 195000,
    currency: '$',
    description: 'Lumina Design Lab is hiring a Lead Product Designer to champion our design system and shape next-generation enterprise interfaces. You will define design vision, run user research, and build interactive design prototypes.',
    responsibilities: [
      'Drive the evolution of our multi-platform Design System.',
      'Create high-fidelity interactive wireframes, user journeys, and prototypes in Figma.',
      'Conduct qualitative and quantitative user research sessions.',
      'Work alongside engineering leads to ensure design fidelity during execution.'
    ],
    requirements: [
      '6+ years of UI/UX design experience for SaaS software products.',
      'Mastery of Figma, Tokens Studio, and component-driven design systems.',
      'Demonstrated portfolio showcasing end-to-end user experience solutions.',
      'Ability to translate complex user workflows into clean, intuitive UI layouts.'
    ],
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Prototyping'],
    benefits: [
      'Competitive Salary + Equity Package',
      'Hybrid Work Schedule (2 days office / 3 days remote)',
      'Health Savings Account (HSA) Contribution',
      'Wellness Stipend ($150/month)'
    ],
    postedDate: '2026-08-29',
    status: 'Active',
    applicantsCount: 9,
    featured: true
  },
  {
    id: 'job-3',
    title: 'AI / Machine Learning Engineer',
    company: 'Cognitive AI',
    logo: '🧠',
    location: 'Austin, TX',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Data & AI',
    salaryMin: 160000,
    salaryMax: 210000,
    currency: '$',
    description: 'Cognitive AI builds specialized LLM agents for automated workflows. We are looking for an ML Engineer to fine-tune open-weight models, implement RAG architectures, and deploy high-throughput inference endpoints.',
    responsibilities: [
      'Train and fine-tune large language models for domain-specific tasks.',
      'Build vector database search indexes and RAG pipelines using LangChain / LlamaIndex.',
      'Deploy low-latency GPU inference clusters using PyTorch and TensorRT.',
      'Evaluate model output accuracy, bias, and performance metrics.'
    ],
    requirements: [
      'MS or PhD in Computer Science, AI, or quantitative discipline (or equivalent experience).',
      'Solid programming skills in Python, PyTorch, and CUDA.',
      'Hands-on experience with vector stores (Pinecone, Qdrant, Weaviate).',
      'Strong understanding of transformer architectures and attention mechanisms.'
    ],
    skills: ['Python', 'PyTorch', 'Machine Learning', 'LLMs', 'RAG', 'Vector Databases', 'LangChain'],
    benefits: [
      'Top-tier equity options',
      'Flexible remote schedule with global offsites',
      'Full healthcare insurance',
      'Gym membership & wellness allowance'
    ],
    postedDate: '2026-08-30',
    status: 'Active',
    applicantsCount: 22,
    featured: true
  },
  {
    id: 'job-4',
    title: 'Frontend Developer (React & Tailwind)',
    company: 'Pulse Digital',
    logo: '🌐',
    location: 'Seattle, WA',
    locationType: 'Remote',
    jobType: 'Contract',
    experienceLevel: 'Mid-level',
    category: 'Engineering',
    salaryMin: 90000,
    salaryMax: 120000,
    currency: '$',
    description: 'Join Pulse Digital on a 6-month renewable contract to build slick consumer landing pages, interactive dashboards, and design component libraries for top fintech clients.',
    responsibilities: [
      'Translate Figma specs into pixel-perfect, responsive React components.',
      'Integrate REST APIs and manage client state using React Query / Context.',
      'Ensure web performance optimization (Lighthouse score 90+).'
    ],
    requirements: [
      '3+ years of experience with modern React, HTML5, CSS3, and Tailwind CSS.',
      'Experience with state management tools and responsive web design.',
      'Eye for micro-animations and smooth CSS transitions.'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'Framer Motion'],
    benefits: [
      'Flexible hourly rate or retainer package',
      '100% remote flexibility',
      'Potential to convert to full-time position'
    ],
    postedDate: '2026-08-31',
    status: 'Active',
    applicantsCount: 18
  },
  {
    id: 'job-5',
    title: 'Growth Marketing Manager',
    company: 'ScaleUp Cloud',
    logo: '🚀',
    location: 'Chicago, IL',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Mid-level',
    category: 'Marketing',
    salaryMin: 95000,
    salaryMax: 130000,
    currency: '$',
    description: 'We are looking for a data-driven Growth Marketing Manager to oversee multi-channel acquisition campaigns, SEO strategies, paid media, and conversion rate optimization (CRO).',
    responsibilities: [
      'Manage user acquisition budgets across LinkedIn Ads, Google Search, and Meta.',
      'Conduct A/B tests on landing pages and pricing checkout funnels.',
      'Analyze churn rate, Customer Acquisition Cost (CAC), and Lifetime Value (LTV).'
    ],
    requirements: [
      '4+ years in B2B SaaS growth marketing or performance advertising.',
      'Proficiency in Google Analytics 4, Hubspot, Mixpanel, and SEMrush.',
      'Strong analytical mindset with track record of scaling monthly recurring revenue (MRR).'
    ],
    skills: ['Growth Marketing', 'SEO', 'PPC', 'Google Analytics', 'A/B Testing', 'Content Strategy'],
    benefits: [
      'Quarterly Performance Bonus',
      'Comprehensive Medical & Dental Coverage',
      'Commuter Benefits & Free Lunch in office'
    ],
    postedDate: '2026-08-27',
    status: 'Active',
    applicantsCount: 7
  },
  {
    id: 'job-6',
    title: 'DevOps & Site Reliability Engineer',
    company: 'CloudShield Security',
    logo: '🛡️',
    location: 'Denver, CO',
    locationType: 'On-site',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Infrastructure',
    salaryMin: 135000,
    salaryMax: 175000,
    currency: '$',
    description: 'Ensure 99.99% uptime for high-security cloud platforms. You will manage Kubernetes clusters, automate Terraform infrastructure, and maintain CI/CD pipelines.',
    responsibilities: [
      'Deploy and maintain Kubernetes clusters across AWS multi-region environments.',
      'Write Infrastructure as Code (IaC) using Terraform and Ansible.',
      'Set up proactive monitoring and alerting using Prometheus, Grafana, and Datadog.'
    ],
    requirements: [
      '5+ years in SRE or DevOps role managing high-traffic cloud environments.',
      'Deep expertise with AWS, Docker, Kubernetes, and Terraform.',
      'Proficiency in Bash and Python automation scripting.'
    ],
    skills: ['DevOps', 'Kubernetes', 'AWS', 'Terraform', 'Docker', 'Prometheus', 'CI/CD'],
    benefits: [
      'Relocation assistance package',
      'Annual profit sharing pool',
      'Comprehensive healthcare'
    ],
    postedDate: '2026-08-25',
    status: 'Active',
    applicantsCount: 11
  }
];

export const INITIAL_CANDIDATE: CandidateProfile = {
  id: 'cand-101',
  name: 'Pranav Naik',
  email: 'pranav.naik@example.com',
  phone: '+1 (555) 234-5678',
  headline: 'Full Stack Software Engineer | React, Next.js & Node.js Specialist',
  bio: 'Passionate software engineer with experience developing scalable web applications, responsive user interfaces, and robust backend systems. Deep enthusiast of clean code, accessible UI/UX, and cloud infrastructure.',
  location: 'San Francisco, CA (Open to Remote)',
  skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'GraphQL', 'Docker', 'Git'],
  experienceYears: 4,
  portfolioUrl: 'https://pranavnaik-portfolio.dev',
  githubUrl: 'https://github.com/pranavnaik213-ops',
  linkedinUrl: 'https://linkedin.com/in/pranavnaik',
  resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
  resumeLastUpdated: '2026-08-20',
  experience: [
    {
      title: 'Full Stack Developer',
      company: 'Apex Digital Solutions',
      period: '2024 - Present',
      description: 'Built high-throughput client web portals using Next.js App Router, Tailwind CSS, and Node APIs. Reduced page load speeds by 40%.'
    },
    {
      title: 'Software Developer Intern',
      company: 'Innovate Labs',
      period: '2023 - 2024',
      description: 'Developed REST endpoints in Express, implemented automated Jest testing suite, and created interactive admin analytics dashboards.'
    }
  ],
  education: [
    {
      degree: 'B.S. in Computer Science',
      school: 'University of Technology',
      year: '2020 - 2024'
    }
  ]
};

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Engineer (Next.js & Node)',
    companyName: 'Vortex Tech',
    candidateName: 'Pranav Naik',
    candidateEmail: 'pranav.naik@example.com',
    candidatePhone: '+1 (555) 234-5678',
    candidateHeadline: 'Full Stack Software Engineer',
    skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
    resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
    coverLetter: 'Dear Hiring Team,\n\nI am thrilled to submit my application for the Senior Full Stack Engineer position at Vortex Tech. Having built scalable web architectures with Next.js and Node.js for over 4 years, I am confident in my ability to immediately contribute to your analytics platform.',
    appliedDate: '2026-08-29',
    status: 'Interview Scheduled',
    interviewDate: '2026-09-04 14:00 PST',
    recruiterNotes: 'Impressive full stack portfolio and strong background in Next.js. Technical interview scheduled with Lead Architect.'
  },
  {
    id: 'app-2',
    jobId: 'job-4',
    jobTitle: 'Frontend Developer (React & Tailwind)',
    companyName: 'Pulse Digital',
    candidateName: 'Sophia Lin',
    candidateEmail: 'sophia.lin@devdomain.com',
    candidatePhone: '+1 (555) 876-5432',
    candidateHeadline: 'Frontend UI/UX Specialist',
    skills: ['React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    resumeName: 'Sophia_Lin_UI_Resume.pdf',
    coverLetter: 'I love crafting smooth interactive interfaces and pixel-perfect design systems with Tailwind CSS.',
    appliedDate: '2026-08-30',
    status: 'Under Review',
    recruiterNotes: 'Great design sense. Reviewing portfolio links.'
  },
  {
    id: 'app-3',
    jobId: 'job-2',
    jobTitle: 'Lead Product Designer (UI/UX Systems)',
    companyName: 'Lumina Design Lab',
    candidateName: 'Marcus Vance',
    candidateEmail: 'marcus.v@designcraft.io',
    candidatePhone: '+1 (555) 998-1122',
    candidateHeadline: 'Senior Design Systems Lead',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research'],
    resumeName: 'Marcus_Vance_Design_Portfolio.pdf',
    coverLetter: 'Over 7 years leading design tokens and Figma component libraries for enterprise platforms.',
    appliedDate: '2026-08-31',
    status: 'Offer Extended',
    recruiterNotes: 'Exceptional candidate. Extended initial offer letter for $175k base + equity.'
  }
];
