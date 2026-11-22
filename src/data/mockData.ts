import { Job, Application, CandidateProfile } from '@/types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-google-swe',
    title: 'Staff Software Engineer, Google Cloud Distributed Storage',
    company: 'Google',
    logo: 'google',
    companyUrl: 'https://about.google',
    applyUrl: 'https://careers.google.com/jobs/results/?q=software%20engineer',
    location: 'Sunnyvale, CA',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 210000,
    salaryMax: 315000,
    currency: '$',
    description: 'Join the Google Cloud core infrastructure team architecting planet-scale distributed storage and high-throughput query engines powering Spanner, Bigtable, and Google Cloud Storage. You will lead cross-functional technical strategy, resolve distributed concurrency bottlenecks, and mentor staff engineers across global cloud regions.',
    responsibilities: [
      'Architect and scale globally distributed storage clusters processing petabytes per second.',
      'Design consensus protocols and zero-downtime replication systems across multi-region data centers.',
      'Collaborate with Site Reliability Engineers (SRE) to ensure 99.999% availability SLAs.',
      'Champion engineering excellence, code reviews, and distributed systems design patterns.'
    ],
    requirements: [
      '8+ years of professional software engineering experience in C++, Go, or Rust.',
      'Deep domain knowledge of distributed consensus (Raft, Paxos), LSM trees, and cloud RPC architectures.',
      'Proven track record leading large-scale distributed infrastructure initiatives.',
      'B.S., M.S., or Ph.D. in Computer Science or equivalent practical experience.'
    ],
    skills: ['Go', 'C++', 'Distributed Systems', 'Kubernetes', 'Spanner', 'gRPC', 'Linux'],
    benefits: [
      'Comprehensive Medical, Dental, and Vision coverage with on-site wellness centers',
      '401(k) retirement plan with 50% company match up to IRS limits',
      'Annual equity grant (Google Class C GSUs) with quarterly vesting',
      'Generous parental leave (up to 24 weeks) and hybrid remote flexibility'
    ],
    postedDate: '2026-08-28',
    status: 'Active',
    applicantsCount: 38,
    featured: true
  },
  {
    id: 'job-stripe-infra',
    title: 'Staff Infrastructure Engineer, Global Payments Core',
    company: 'Stripe',
    logo: 'stripe',
    companyUrl: 'https://stripe.com',
    applyUrl: 'https://stripe.com/jobs',
    location: 'San Francisco, CA',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Lead / Executive',
    category: 'Engineering',
    salaryMin: 195000,
    salaryMax: 275000,
    currency: '$',
    description: 'Stripe powers payments for millions of businesses worldwide. In this role, you will lead the core ledger and payments routing infrastructure that moves hundreds of billions of dollars each year. You will design ultra-reliable event streaming pipelines, enforce strict idempotency guarantees, and harden APIs against regional network partitions.',
    responsibilities: [
      'Own mission-critical ledger pipelines with zero-tolerance for transaction loss or duplicate charging.',
      'Design event-driven stream processing architectures using Apache Kafka and distributed database shards.',
      'Partner with banking networks and regulatory teams to optimize cross-border payment settlement.',
      'Drive disaster recovery simulations and chaos engineering drills for financial reliability.'
    ],
    requirements: [
      '7+ years designing high-throughput transaction processing systems or distributed databases.',
      'Production expertise with Java, Go, or Ruby in high-concurrency cloud environments.',
      'Deep understanding of transactional consistency, ACID semantics, and idempotency keys.',
      'Passionate about API design, documentation, and frictionless developer ergonomics.'
    ],
    skills: ['Java', 'Go', 'Ruby', 'Kafka', 'AWS', 'PostgreSQL', 'Redis', 'Distributed Systems'],
    benefits: [
      'Competitive base compensation with liquid Stripe equity grants',
      '100% remote flexibility across North America with regional hub access',
      '$1,500 annual workspace setup stipend and monthly wellness credits',
      'Comprehensive global healthcare and mental health benefits'
    ],
    postedDate: '2026-08-29',
    status: 'Active',
    applicantsCount: 29,
    featured: true
  },
  {
    id: 'job-microsoft-ai',
    title: 'Principal Software Engineer, Azure AI & Cloud Infrastructure',
    company: 'Microsoft',
    logo: 'microsoft',
    companyUrl: 'https://www.microsoft.com',
    applyUrl: 'https://careers.microsoft.com',
    location: 'Redmond, WA',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Lead / Executive',
    category: 'Data & AI',
    salaryMin: 190000,
    salaryMax: 285000,
    currency: '$',
    description: 'Azure AI powers transformative generative AI services worldwide. As a Principal Engineer, you will build and optimize the hyperscale GPU clusters and inference orchestration systems that serve enterprise frontier models. You will work on kernel optimizations, model sharding, and latency reduction across global Azure regions.',
    responsibilities: [
      'Architect low-latency model inference pipelines across NVIDIA H100/B200 GPU clusters.',
      'Build distributed model cache and token-streaming layers for Azure OpenAI APIs.',
      'Optimize GPU memory bandwidth and networking using InfiniBand and Triton/CUDA kernels.',
      'Define SLA monitoring and capacity autoscaling policies for Tier-0 AI workloads.'
    ],
    requirements: [
      '8+ years in systems programming with C#, C++, or Python in cloud-native settings.',
      'Demonstrated experience with GPU acceleration, CUDA, Triton, or high-performance networking.',
      'Experience leading multi-disciplinary engineering initiatives from inception to global rollout.',
      'Track record designing resilient distributed systems operating at hyperscale.'
    ],
    skills: ['Python', 'C#', 'C++', 'Azure', 'CUDA', 'Triton', 'PyTorch', 'Distributed Systems'],
    benefits: [
      'Robust healthcare package, HSA match, and family medical leave',
      'Microsoft Employee Stock Purchase Plan (ESPP) with 15% discount',
      'Annual performance bonus and equity refresher program',
      'Flexible work schedule with hybrid Seattle campus amenities'
    ],
    postedDate: '2026-08-30',
    status: 'Active',
    applicantsCount: 44,
    featured: true
  },
  {
    id: 'job-meta-frontend',
    title: 'Senior Frontend Engineer, React & Next-Gen Interfaces',
    company: 'Meta',
    logo: 'meta',
    companyUrl: 'https://about.meta.com',
    applyUrl: 'https://www.metacareers.com',
    location: 'Menlo Park, CA',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 175000,
    salaryMax: 250000,
    currency: '$',
    description: 'Meta is looking for a Senior Frontend Engineer to build responsive, accessible web interfaces used by over 3 billion people across Instagram, Facebook, and Threads. You will pioneer next-generation React architectures, optimize critical rendering paths, and advance our web design system.',
    responsibilities: [
      'Build high-performance web components utilizing modern React Server Components and Relay.',
      'Profile client-side JavaScript execution, minimize Total Blocking Time, and optimize Core Web Vitals.',
      'Collaborate with product designers to implement pixel-perfect, accessible UI components.',
      'Contribute to open-source React tooling and web framework standards.'
    ],
    requirements: [
      '5+ years building complex, performance-sensitive web applications with React and TypeScript.',
      'Strong mastery of JavaScript runtime internals, CSS architectures, and browser rendering engines.',
      'Experience with GraphQL, Relay or React Query, and state management at scale.',
      'Deep commitment to web accessibility (WCAG 2.1 AA) and inclusive design.'
    ],
    skills: ['React', 'TypeScript', 'GraphQL', 'Relay', 'Tailwind CSS', 'Web Vitals', 'JavaScript'],
    benefits: [
      'Industry-leading equity packages (Meta Class A Common Stock) with quarterly vesting',
      'Full comprehensive health, vision, and dental insurance',
      'Free meals and wellness stipend or remote equivalent allowance',
      'Generous 30 days paid time off plus public holidays'
    ],
    postedDate: '2026-08-27',
    status: 'Active',
    applicantsCount: 52,
    featured: true
  },
  {
    id: 'job-vercel-platform',
    title: 'Senior Platform Engineer, Next.js & Edge Runtime',
    company: 'Vercel',
    logo: 'vercel',
    companyUrl: 'https://vercel.com',
    applyUrl: 'https://vercel.com/careers',
    location: 'San Francisco, CA',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 170000,
    salaryMax: 240000,
    currency: '$',
    description: 'Vercel is the creator of Next.js and the platform for frontend developers. We are hiring a Senior Platform Engineer to scale our serverless Edge network and Turbopack bundler infrastructure. You will work directly with open-source maintainers to make web builds and SSR faster for millions of developers.',
    responsibilities: [
      'Develop low-latency serverless routing and streaming infrastructure for the Vercel Edge Network.',
      'Contribute to Next.js open-source features, Turbopack incremental bundling, and build pipelines.',
      'Optimize edge middleware execution times and cold-start latencies in Rust and Node.js.',
      'Investigate production regressions and author developer documentation and RFCs.'
    ],
    requirements: [
      '4+ years developing web runtime systems, CLI tooling, or distributed edge services.',
      'Strong proficiency in TypeScript, Rust, or Go with deep understanding of V8/Node.js internals.',
      'Familiarity with HTTP/2, HTTP/3, WebSockets, and CDN caching topologies.',
      'Active contributor to open-source software is a strong plus.'
    ],
    skills: ['Next.js', 'Rust', 'TypeScript', 'Node.js', 'Turbopack', 'Edge Computing', 'React'],
    benefits: [
      'Work from anywhere: 100% remote-first company culture with global hubs',
      'Generous equity options with extended exercise windows',
      'Unlimited Paid Time Off (PTO) with mandatory minimums',
      '$2,000 annual home office budget and $1,500 learning stipend'
    ],
    postedDate: '2026-08-31',
    status: 'Active',
    applicantsCount: 34,
    featured: true
  },
  {
    id: 'job-aws-sre',
    title: 'Senior Cloud DevOps & Site Reliability Engineer',
    company: 'Amazon Web Services',
    logo: 'amazon',
    companyUrl: 'https://aws.amazon.com',
    applyUrl: 'https://www.amazon.jobs',
    location: 'Seattle, WA',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Infrastructure',
    salaryMin: 165000,
    salaryMax: 235000,
    currency: '$',
    description: 'Join the AWS Cloud Infrastructure group managing foundational container services, VPC network topologies, and automated multi-region deployment fabrics. You will write Infrastructure-as-Code, engineer self-healing cloud pipelines, and guarantee five-nines reliability for Fortune 500 customers.',
    responsibilities: [
      'Automate cloud infrastructure provisioning using Terraform, AWS CDK, and CloudFormation.',
      'Manage multi-tenant Kubernetes (EKS) clusters operating across high-security compliance zones.',
      'Implement real-time monitoring and anomaly detection using Prometheus, Grafana, and CloudWatch.',
      'Conduct post-mortem investigations and lead operational excellence reviews.'
    ],
    requirements: [
      '5+ years in SRE, DevOps, or cloud systems engineering managing mission-critical infrastructure.',
      'Expert-level mastery of AWS services (EC2, EKS, VPC, Route53, IAM, KMS, S3).',
      'Proficiency in Python, Go, or Bash automation scripting.',
      'Hands-on experience with CI/CD platforms (GitHub Actions, GitLab CI, ArgoCD).'
    ],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'Python', 'Prometheus', 'CI/CD', 'Linux'],
    benefits: [
      'Amazon Restricted Stock Units (RSUs) with comprehensive compensation structure',
      'Full healthcare coverage including medical, dental, and vision insurance',
      'Parental leave benefits and childcare assistance programs',
      'Relocation assistance package available for Seattle, WA campus'
    ],
    postedDate: '2026-08-26',
    status: 'Active',
    applicantsCount: 27,
    featured: false
  },
  {
    id: 'job-openai-systems',
    title: 'Member of Technical Staff, Applied AI & Inference Platform',
    company: 'OpenAI',
    logo: 'openai',
    companyUrl: 'https://openai.com',
    applyUrl: 'https://openai.com/careers',
    location: 'San Francisco, CA',
    locationType: 'On-site',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Data & AI',
    salaryMin: 230000,
    salaryMax: 370000,
    currency: '$',
    description: 'OpenAI is dedicated to ensuring artificial general intelligence benefits all of humanity. As an MTS on the Applied AI team, you will build high-throughput, low-latency inference systems serving millions of developers and enterprise users across the ChatGPT and API ecosystems.',
    responsibilities: [
      'Build distributed serving infrastructure for multi-modal and reasoning LLMs.',
      'Optimize tensor parallelization, KV-cache management, and continuous batching.',
      'Develop evaluation pipelines to ensure safety, alignment, and latency benchmarks.',
      'Scale Kubernetes GPU clusters across thousands of compute nodes with minimal jitter.'
    ],
    requirements: [
      '5+ years writing high-performance systems in Python, C++, or Rust.',
      'Hands-on experience with modern deep learning frameworks (PyTorch) and distributed serving (vLLM, TensorRT-LLM).',
      'Deep understanding of transformer architectures, attention mechanisms, and GPU memory hierarchies.',
      'Strong collaborative instincts in fast-paced research and deployment cycles.'
    ],
    skills: ['Python', 'PyTorch', 'CUDA', 'Distributed Systems', 'Kubernetes', 'Triton', 'LLMs'],
    benefits: [
      'Top-tier OpenAI Profit Participation Units (PPU) equity structure',
      '100% covered health, dental, and vision premiums for employees and dependents',
      'Daily chef-prepared lunches and dinners in San Francisco headquarters',
      'Generous 20-week parental leave and unlimited PTO'
    ],
    postedDate: '2026-08-25',
    status: 'Active',
    applicantsCount: 61,
    featured: true
  },
  {
    id: 'job-airbnb-design',
    title: 'Lead Product Designer, Design Systems & Experiences',
    company: 'Airbnb',
    logo: 'airbnb',
    companyUrl: 'https://airbnb.com',
    applyUrl: 'https://careers.airbnb.com',
    location: 'San Francisco, CA',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Lead / Executive',
    category: 'Design',
    salaryMin: 175000,
    salaryMax: 245000,
    currency: '$',
    description: 'Airbnb is renowned for world-class design craftsmanship. We are seeking a Lead Product Designer to guide the evolution of our global Design Language System (DLS). You will define component guidelines, motion design principles, and multi-platform design tokens supporting millions of guests and hosts.',
    responsibilities: [
      'Architect and curate scalable design component systems in Figma across Web, iOS, and Android.',
      'Collaborate with design engineering leads to establish rigorous token standards and accessibility criteria.',
      'Conduct generative user research and prototype high-fidelity interactions.',
      'Mentor product designers and elevate design craftsmanship across product squads.'
    ],
    requirements: [
      '7+ years designing consumer or enterprise digital products at scale.',
      'Mastery of Figma, design token governance, and accessible interaction patterns.',
      'Compelling design portfolio showcasing end-to-end design systems and craftsmanship.',
      'Exceptional storytelling, stakeholder alignment, and cross-functional leadership.'
    ],
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Design Tokens', 'User Research', 'Prototyping'],
    benefits: [
      'Competitive compensation with Airbnb RSUs and annual bonus plan',
      'Live and Work Anywhere policy with up to 90 days of international remote work per year',
      '$2,000 annual Airbnb travel credit to experience listings worldwide',
      'Comprehensive medical, mental health, and wellness coverage'
    ],
    postedDate: '2026-08-24',
    status: 'Active',
    applicantsCount: 22,
    featured: false
  },
  {
    id: 'job-datadog-swe',
    title: 'Senior Software Engineer, Real-Time Distributed Tracing',
    company: 'Datadog',
    logo: 'datadog',
    companyUrl: 'https://www.datadoghq.com',
    applyUrl: 'https://www.datadoghq.com/careers',
    location: 'New York, NY',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 160000,
    salaryMax: 225000,
    currency: '$',
    description: 'Datadog processes trillions of observability metrics and distributed traces daily. In this role, you will develop the high-throughput ingestion pipelines and indexing engines that give thousands of enterprise companies real-time visibility into their cloud microservices.',
    responsibilities: [
      'Design high-throughput ingestion microservices in Go and Python processing millions of spans per second.',
      'Optimize distributed datastores and caching tiers (Kafka, Redis, Cassandra) for minimal query latency.',
      'Work with OpenTelemetry open-source standards to advance cloud observability integrations.',
      'Collaborate with product teams to build intuitive distributed trace search and analytics features.'
    ],
    requirements: [
      '4+ years writing scalable backend code in Go, Java, or Python.',
      'Hands-on experience with high-throughput stream processing systems (Kafka, Flink).',
      'Familiarity with containerized orchestration (Docker, Kubernetes) and cloud providers.',
      'B.S. in Computer Science or equivalent software engineering background.'
    ],
    skills: ['Go', 'Python', 'Kafka', 'Kubernetes', 'Redis', 'OpenTelemetry', 'Distributed Systems'],
    benefits: [
      'Competitive base salary, Datadog equity grants, and ESPP participation',
      'Generous health, dental, and vision insurance with HSA match',
      'Hybrid flexible work policy with state-of-the-art NYC office perks',
      'Annual education reimbursement and continuous learning stipend'
    ],
    postedDate: '2026-08-23',
    status: 'Active',
    applicantsCount: 19,
    featured: false
  },
  {
    id: 'job-github-copilot',
    title: 'Senior Software Engineer, GitHub Copilot Developer Experience',
    company: 'GitHub',
    logo: 'github',
    companyUrl: 'https://github.com',
    applyUrl: 'https://github.com/about/careers',
    location: 'San Francisco, CA',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 170000,
    salaryMax: 240000,
    currency: '$',
    description: 'GitHub is the home for all developers. As an engineer on GitHub Copilot, you will develop the next wave of AI-assisted developer workflows: agentic coding, automated PR reviews, and conversational code navigation. You will work across IDE extensions, cloud telemetry, and model orchestration.',
    responsibilities: [
      'Engineer responsive, robust IDE integrations and VS Code extensions for GitHub Copilot.',
      'Build low-latency context aggregation engines that assemble relevant codebase context for LLMs.',
      'Analyze telemetry and developer feedback to optimize suggestion acceptance rates.',
      'Contribute to open standards and SDKs for AI developer tools.'
    ],
    requirements: [
      '5+ years building software using TypeScript, Node.js, and modern React.',
      'Experience developing VS Code extensions, language servers (LSP), or developer tools.',
      'Familiarity with LLM APIs, prompt architecture, and context window optimization.',
      'Deep empathy for developer workflows, Git version control, and code review practices.'
    ],
    skills: ['TypeScript', 'Node.js', 'React', 'VS Code Extensions', 'LLMs', 'Git', 'APIs'],
    benefits: [
      'Competitive salary with Microsoft/GitHub equity package',
      '100% remote company with flexible working hours worldwide',
      '$2,000 annual hardware budget and home internet reimbursement',
      'Generous parental leave and comprehensive healthcare plans'
    ],
    postedDate: '2026-08-22',
    status: 'Active',
    applicantsCount: 31,
    featured: true
  }
];

export const INITIAL_CANDIDATE: CandidateProfile = {
  id: 'cand-pranav',
  name: 'Pranav Naik',
  email: 'pranavnaik213@gmail.com',
  phone: '+1 (555) 345-6789',
  headline: 'Full Stack Software Engineer | Next.js, TypeScript & Distributed Cloud Specialist',
  bio: 'Full stack software engineer passionate about high-performance web systems, accessible UI/UX, and cloud architecture. Creator of CareerHub, a modern tech recruitment and ATS platform built with Next.js App Router, TypeScript, and Tailwind CSS.',
  location: 'San Francisco, CA (Open to Remote)',
  skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'GraphQL', 'Docker', 'Go', 'Git'],
  experienceYears: 4,
  portfolioUrl: 'https://github.com/pranavnaik213-ops/CareerHub',
  githubUrl: 'https://github.com/pranavnaik213-ops',
  linkedinUrl: 'https://linkedin.com/in/pranav-naik',
  resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
  resumeLastUpdated: '2026-08-28',
  experience: [
    {
      title: 'Full Stack Developer & Open Source Creator',
      company: 'CareerHub Project',
      period: '2025 - Present',
      description: 'Architected and built CareerHub, an open-source Next.js 16 recruitment and candidate ATS platform featuring real-time job matching, Kanban pipeline tracking, and responsive design systems.'
    },
    {
      title: 'Software Engineer',
      company: 'Digital Systems Inc.',
      period: '2024 - 2025',
      description: 'Developed client web applications and REST microservices in Node.js and React. Optimized SQL queries in PostgreSQL and reduced Core Web Vitals LCP by 35%.'
    }
  ],
  education: [
    {
      degree: 'B.S. in Computer Science',
      school: 'University of California',
      year: '2020 - 2024'
    }
  ]
};

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-google-1',
    jobId: 'job-google-swe',
    jobTitle: 'Staff Software Engineer, Google Cloud Distributed Storage',
    companyName: 'Google',
    candidateName: 'Pranav Naik',
    candidateEmail: 'pranavnaik213@gmail.com',
    candidatePhone: '+1 (555) 345-6789',
    candidateHeadline: 'Full Stack Software Engineer',
    skills: ['Go', 'TypeScript', 'Kubernetes', 'Next.js', 'PostgreSQL'],
    resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
    coverLetter: 'Dear Google Cloud Hiring Team,\n\nI am writing to express my strong enthusiasm for the Staff Software Engineer position in Google Cloud Distributed Storage. Having built full-stack distributed web platforms with Next.js, Node.js, and cloud datastores, I am deeply fascinated by Google\'s work on Spanner and planet-scale storage architectures.\n\nThank you for considering my application.\n\nBest regards,\nPranav Naik',
    appliedDate: '2026-08-29',
    status: 'Interview Scheduled',
    interviewDate: '2026-09-08 11:00 PST (Google Meet)',
    recruiterNotes: 'Candidate screened positively on distributed systems fundamentals. Technical interview scheduled with Cloud Infrastructure Staff Lead.'
  },
  {
    id: 'app-stripe-1',
    jobId: 'job-stripe-infra',
    jobTitle: 'Staff Infrastructure Engineer, Global Payments Core',
    companyName: 'Stripe',
    candidateName: 'Pranav Naik',
    candidateEmail: 'pranavnaik213@gmail.com',
    candidatePhone: '+1 (555) 345-6789',
    candidateHeadline: 'Full Stack Software Engineer',
    skills: ['TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'AWS'],
    resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
    coverLetter: 'Dear Stripe Engineering Team,\n\nI have long admired Stripe\'s engineering standards, attention to API developer ergonomics, and rock-solid ledger infrastructure. I would welcome the opportunity to contribute to your core payments routing and reliability initiatives.\n\nSincerely,\nPranav Naik',
    appliedDate: '2026-08-30',
    status: 'Under Review',
    recruiterNotes: 'Application received. Forwarded to Payments Infrastructure engineering manager for resume review.'
  },
  {
    id: 'app-vercel-1',
    jobId: 'job-vercel-platform',
    jobTitle: 'Senior Platform Engineer, Next.js & Edge Runtime',
    companyName: 'Vercel',
    candidateName: 'Pranav Naik',
    candidateEmail: 'pranavnaik213@gmail.com',
    candidatePhone: '+1 (555) 345-6789',
    candidateHeadline: 'Full Stack Software Engineer',
    skills: ['Next.js', 'TypeScript', 'React', 'Node.js', 'Tailwind CSS'],
    resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
    coverLetter: 'Hi Vercel Team,\n\nAs an active builder in the Next.js ecosystem who has developed full-scale applications with Next.js App Router and Turbopack, joining Vercel to work on the edge runtime and framework performance is a dream role.\n\nBest,\nPranav Naik',
    appliedDate: '2026-08-31',
    status: 'Offer Extended',
    interviewDate: 'Completed',
    recruiterNotes: 'Strong evaluation on frontend architecture and deep knowledge of Next.js internals. Offer package extended.'
  }
];
