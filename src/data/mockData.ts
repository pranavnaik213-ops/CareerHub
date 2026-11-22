import { Job, Application, CandidateProfile } from '@/types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-google-swe',
    title: 'Staff Software Engineer, Google Cloud Distributed Storage',
    company: 'Google',
    logo: 'google',
    companyUrl: 'https://about.google',
    applyUrl: 'https://careers.google.com/jobs/results/?q=software%20engineer',
    location: 'Bengaluru, KA, India',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 4800000,
    salaryMax: 7800000,
    currency: '₹',
    description: 'Join the Google Cloud core infrastructure team in Bengaluru architecting planet-scale distributed storage and high-throughput query engines powering Spanner, Bigtable, and Google Cloud Storage. You will lead cross-functional technical strategy, resolve distributed concurrency bottlenecks, and mentor staff engineers across global cloud regions.',
    responsibilities: [
      'Architect and scale globally distributed storage clusters processing petabytes per second.',
      'Design consensus protocols and zero-downtime replication systems across multi-region data centers.',
      'Collaborate with Site Reliability Engineers (SRE) to ensure 99.999% availability SLAs.',
      'Champion engineering excellence, code reviews, and distributed systems design patterns.'
    ],
    requirements: [
      '8+ years of professional software engineering experience in C++, Go, or Rust.',
      'Deep domain knowledge of distributed consensus (Raft, Paxos), LSM trees, and cloud RPC architectures.',
      'Proven track record leading large-scale distributed infrastructure initiatives in India / global hubs.',
      'B.Tech, M.Tech, or Ph.D. in Computer Science or equivalent practical experience.'
    ],
    skills: ['Go', 'C++', 'Distributed Systems', 'Kubernetes', 'Spanner', 'gRPC', 'Linux'],
    benefits: [
      'Comprehensive Medical, Dental, and Vision coverage for employee & family',
      'Google Provident Fund (PF) and Gratuity matching program',
      'Annual equity grant (Google Class C GSUs) with quarterly vesting',
      'Flexible hybrid work policy with Bengaluru campus amenities'
    ],
    postedDate: '2026-08-28',
    status: 'Active',
    applicantsCount: 42,
    featured: true,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 10m ago by AI Agent'
  },
  {
    id: 'job-stripe-infra',
    title: 'Staff Infrastructure Engineer, Global Payments Core',
    company: 'Stripe',
    logo: 'stripe',
    companyUrl: 'https://stripe.com',
    applyUrl: 'https://stripe.com/jobs',
    location: 'Remote, India',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Lead / Executive',
    category: 'Engineering',
    salaryMin: 4500000,
    salaryMax: 7200000,
    currency: '₹',
    description: 'Stripe powers digital commerce for millions of global companies. In this role, you will lead the core ledger and payments routing infrastructure that moves hundreds of billions of dollars each year. You will design ultra-reliable event streaming pipelines, enforce strict idempotency guarantees, and harden APIs against network partitions.',
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
      'Competitive INR base compensation with liquid Stripe equity grants',
      '100% remote flexibility across India with home office setup allowance (₹1,25,000)',
      'Comprehensive family health insurance and monthly wellness credits',
      'Annual learning & development stipend (₹2,00,000)'
    ],
    postedDate: '2026-08-29',
    status: 'Active',
    applicantsCount: 35,
    featured: true,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 15m ago by AI Agent'
  },
  {
    id: 'job-microsoft-ai',
    title: 'Principal Software Engineer, Azure AI & Cloud Infrastructure',
    company: 'Microsoft',
    logo: 'microsoft',
    companyUrl: 'https://www.microsoft.com',
    applyUrl: 'https://careers.microsoft.com',
    location: 'Hyderabad, TS, India',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Lead / Executive',
    category: 'Data & AI',
    salaryMin: 4200000,
    salaryMax: 6800000,
    currency: '₹',
    description: 'Microsoft India Development Center (IDC) builds foundational generative AI services powering Copilot and Azure globally. As a Principal Engineer in Hyderabad, you will design the hyperscale GPU clusters and inference orchestration systems that serve enterprise frontier models with low latency.',
    responsibilities: [
      'Architect low-latency model inference pipelines across NVIDIA H100 GPU clusters.',
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
      'Comprehensive family medical coverage with outpatient & maternity cover',
      'Microsoft Employee Stock Purchase Plan (ESPP) with 15% discount',
      'Annual performance bonus and equity refresher program',
      'Flexible work schedule with state-of-the-art Hyderabad campus amenities'
    ],
    postedDate: '2026-08-30',
    status: 'Active',
    applicantsCount: 51,
    featured: true,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 25m ago by AI Agent'
  },
  {
    id: 'job-meta-frontend',
    title: 'Senior Frontend Engineer, React & Next-Gen Interfaces',
    company: 'Meta',
    logo: 'meta',
    companyUrl: 'https://about.meta.com',
    applyUrl: 'https://www.metacareers.com',
    location: 'Remote, India',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 5500000,
    salaryMax: 9500000,
    currency: '₹',
    description: 'Meta is hiring a Senior Frontend Engineer in India to build responsive, accessible web interfaces used by over 3 billion people across Instagram, Facebook, and Threads. You will pioneer next-generation React architectures, optimize critical rendering paths, and advance our web design system.',
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
      'Full comprehensive health, vision, and dental insurance for dependents',
      'Remote work allowance and home office reimbursement',
      '30 days paid time off plus national holidays'
    ],
    postedDate: '2026-08-27',
    status: 'Active',
    applicantsCount: 68,
    featured: true,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 30m ago by AI Agent'
  },
  {
    id: 'job-vercel-platform',
    title: 'Senior Platform Engineer, Next.js & Edge Runtime',
    company: 'Vercel',
    logo: 'vercel',
    companyUrl: 'https://vercel.com',
    applyUrl: 'https://vercel.com/careers',
    location: 'Remote, India',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 3600000,
    salaryMax: 6200000,
    currency: '₹',
    description: 'Vercel is the creator of Next.js and the platform for frontend developers. We are hiring a Senior Platform Engineer in India to scale our serverless Edge network and Turbopack bundler infrastructure. You will work directly with open-source maintainers to make web builds and SSR faster for millions of developers.',
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
      '₹1,50,000 annual home office budget and ₹1,20,000 learning stipend'
    ],
    postedDate: '2026-08-31',
    status: 'Active',
    applicantsCount: 46,
    featured: true,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 40m ago by AI Agent'
  },
  {
    id: 'job-aws-sre',
    title: 'Senior Cloud DevOps & Site Reliability Engineer',
    company: 'Amazon Web Services',
    logo: 'amazon',
    companyUrl: 'https://aws.amazon.com',
    applyUrl: 'https://www.amazon.jobs',
    location: 'Bengaluru, KA, India',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Infrastructure',
    salaryMin: 3500000,
    salaryMax: 5800000,
    currency: '₹',
    description: 'Join the AWS Cloud Infrastructure group in Bengaluru managing foundational container services, VPC network topologies, and automated multi-region deployment fabrics. You will write Infrastructure-as-Code, engineer self-healing cloud pipelines, and guarantee five-nines reliability.',
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
      'Full healthcare coverage including medical, dental, and vision insurance for parents',
      'Parental leave benefits and childcare assistance programs',
      'Relocation assistance package available for Bengaluru campus'
    ],
    postedDate: '2026-08-26',
    status: 'Active',
    applicantsCount: 39,
    featured: false,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 1h ago by AI Agent'
  },
  {
    id: 'job-openai-systems',
    title: 'Member of Technical Staff, Applied AI & Inference Platform',
    company: 'OpenAI',
    logo: 'openai',
    companyUrl: 'https://openai.com',
    applyUrl: 'https://openai.com/careers',
    location: 'Remote (India / Global)',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Data & AI',
    salaryMin: 7500000,
    salaryMax: 14000000,
    currency: '₹',
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
      'High-spec M3/M4 Max developer hardware and home cluster access',
      'Generous 20-week parental leave and unlimited PTO'
    ],
    postedDate: '2026-08-25',
    status: 'Active',
    applicantsCount: 84,
    featured: true,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 2h ago by AI Agent'
  },
  {
    id: 'job-airbnb-design',
    title: 'Lead Product Designer, Design Systems & Experiences',
    company: 'Airbnb',
    logo: 'airbnb',
    companyUrl: 'https://airbnb.com',
    applyUrl: 'https://careers.airbnb.com',
    location: 'Remote, India',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Lead / Executive',
    category: 'Design',
    salaryMin: 3800000,
    salaryMax: 6500000,
    currency: '₹',
    description: 'Airbnb is renowned for world-class design craftsmanship. We are seeking a Lead Product Designer in India to guide the evolution of our global Design Language System (DLS). You will define component guidelines, motion design principles, and multi-platform design tokens supporting millions of guests and hosts.',
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
      '₹1,75,000 annual Airbnb travel credit to experience listings worldwide',
      'Comprehensive medical, mental health, and wellness coverage'
    ],
    postedDate: '2026-08-24',
    status: 'Active',
    applicantsCount: 29,
    featured: false,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 3h ago by AI Agent'
  },
  {
    id: 'job-datadog-swe',
    title: 'Senior Software Engineer, Real-Time Distributed Tracing',
    company: 'Datadog',
    logo: 'datadog',
    companyUrl: 'https://www.datadoghq.com',
    applyUrl: 'https://www.datadoghq.com/careers',
    location: 'Bengaluru, KA, India',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 3600000,
    salaryMax: 5600000,
    currency: '₹',
    description: 'Datadog processes trillions of observability metrics and distributed traces daily. In this role in Bengaluru, you will develop the high-throughput ingestion pipelines and indexing engines that give thousands of enterprise companies real-time visibility into their cloud microservices.',
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
      'B.Tech / M.Tech in Computer Science or equivalent software engineering background.'
    ],
    skills: ['Go', 'Python', 'Kafka', 'Kubernetes', 'Redis', 'OpenTelemetry', 'Distributed Systems'],
    benefits: [
      'Competitive INR base salary, Datadog equity grants, and ESPP participation',
      'Comprehensive health insurance for parents and immediate family',
      'Hybrid flexible work policy with top-tier Bengaluru office perks',
      'Annual education reimbursement and continuous learning stipend'
    ],
    postedDate: '2026-08-23',
    status: 'Active',
    applicantsCount: 31,
    featured: false,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 4h ago by AI Agent'
  },
  {
    id: 'job-github-copilot',
    title: 'Senior Software Engineer, GitHub Copilot Developer Experience',
    company: 'GitHub',
    logo: 'github',
    companyUrl: 'https://github.com',
    applyUrl: 'https://github.com/about/careers',
    location: 'Remote, India',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 3800000,
    salaryMax: 6400000,
    currency: '₹',
    description: 'GitHub is the home for all developers. As an engineer on GitHub Copilot in India, you will develop the next wave of AI-assisted developer workflows: agentic coding, automated PR reviews, and conversational code navigation. You will work across IDE extensions, cloud telemetry, and model orchestration.',
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
      '100% remote company with flexible working hours across India',
      '₹1,60,000 annual hardware budget and home internet reimbursement',
      'Generous parental leave and comprehensive healthcare plans'
    ],
    postedDate: '2026-08-22',
    status: 'Active',
    applicantsCount: 47,
    featured: true,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 5h ago by AI Agent'
  },
  {
    id: 'job-uber-systems',
    title: 'Staff Systems Engineer, Distributed Infrastructure & Core Trip Platform',
    company: 'Uber',
    logo: 'uber',
    companyUrl: 'https://www.uber.com',
    applyUrl: 'https://www.uber.com/us/en/careers/list',
    location: 'Bengaluru, KA, India',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 4600000,
    salaryMax: 7400000,
    currency: '₹',
    description: 'Uber Engineering India powers global marketplace matching, real-time trip dispatch, and geo-spatial routing engines processing millions of concurrent rides and deliveries. You will architect high-throughput RPC microservices, optimize distributed event streaming, and lead resilient system design across multi-region datacenters.',
    responsibilities: [
      'Architect sub-millisecond dispatch and geolocation routing services in Go and Java.',
      'Scale Kafka event streaming clusters processing over 10 million transactions per minute.',
      'Ensure multi-region active-active disaster recovery with zero data divergence.',
      'Mentor senior engineers on distributed consensus, tracing, and high-concurrency patterns.'
    ],
    requirements: [
      '7+ years architecting high-throughput distributed backend services.',
      'Deep expertise in Go or Java with production concurrency tuning and memory profiling.',
      'Proven experience with Kafka, Cassandra, Redis, and high-performance RPC protocols (gRPC).',
      'Strong background in distributed transactions, rate-limiting algorithms, and fault tolerance.'
    ],
    skills: ['Go', 'Java', 'Distributed Systems', 'Kafka', 'Kubernetes', 'gRPC', 'Redis', 'Microservices'],
    benefits: [
      'Top-tier base INR compensation with liquid Uber RSUs and annual bonus',
      'Comprehensive health coverage for employee, spouse, children, and parents',
      'Uber ride credits and monthly meal subsidies',
      'Flexible hybrid schedule with campus wellness amenities in Bengaluru'
    ],
    postedDate: '2026-08-21',
    status: 'Active',
    applicantsCount: 38,
    featured: true,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 6h ago by AI Agent'
  },
  {
    id: 'job-atlassian-cloud',
    title: 'Principal Cloud Platform Engineer, Jira & Confluence Microservices',
    company: 'Atlassian',
    logo: 'atlassian',
    companyUrl: 'https://www.atlassian.com',
    applyUrl: 'https://www.atlassian.com/company/careers',
    location: 'Remote, India',
    locationType: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Lead / Executive',
    category: 'Engineering',
    salaryMin: 4400000,
    salaryMax: 7000000,
    currency: '₹',
    description: 'Atlassian unleashes the potential of every team. As a Principal Engineer in India working on TEAM Cloud, you will steer cloud platform architecture for Jira and Confluence, decoupling legacy monoliths into cloud-native microservices serving over 300,000 enterprise organizations worldwide.',
    responsibilities: [
      'Spearhead multi-tenant cloud service architecture on AWS with zero single-points-of-failure.',
      'Design reliable asynchronous event pipelines and real-time collaboration engines.',
      'Establish company-wide architectural standards, RFC review processes, and engineering roadmaps.',
      'Drive operational observability, synthetic testing, and cloud cost efficiency initiatives.'
    ],
    requirements: [
      '8+ years in software engineering with leadership experience on large-scale SaaS systems.',
      'Mastery of modern Java, Kotlin, or Go within event-driven AWS cloud environments.',
      'Deep domain knowledge in DynamoDB, PostgreSQL, Kafka, and Kubernetes container architectures.',
      'Outstanding cross-functional alignment and asynchronous written communication skills.'
    ],
    skills: ['Java', 'Kotlin', 'AWS', 'Kubernetes', 'DynamoDB', 'Kafka', 'Microservices', 'Docker'],
    benefits: [
      'Work from anywhere in India with our Team Anywhere remote policy',
      'Generous Atlassian equity grants (NASDAQ: TEAM) with annual refreshers',
      '₹1,50,000 annual home office ergonomic allowance and internet stipend',
      'Comprehensive medical insurance and mental wellness days'
    ],
    postedDate: '2026-08-20',
    status: 'Active',
    applicantsCount: 32,
    featured: false,
    isAgentIngested: true,
    agentVerifiedDate: 'Verified 7h ago by AI Agent'
  }
];

// Pool of real, upcoming tech jobs for the autonomous AI Agent to auto-fetch & sync into the board!
export const AI_AGENT_JOB_POOL: Omit<Job, 'id' | 'postedDate' | 'applicantsCount' | 'status'>[] = [
  {
    title: 'Senior Backend Engineer, Payments Core & UPI Infrastructure',
    company: 'Razorpay',
    logo: 'razorpay',
    companyUrl: 'https://razorpay.com',
    applyUrl: 'https://razorpay.com/jobs',
    location: 'Bengaluru, KA, India',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Engineering',
    salaryMin: 3200000,
    salaryMax: 5400000,
    currency: '₹',
    description: 'Razorpay powers digital payments for over 10 million Indian businesses. In this role, you will build and scale high-throughput UPI, Card, and Netbanking processing engines capable of handling 15,000+ transactions per second during festive flash sales.',
    responsibilities: [
      'Architect low-latency payment microservices in Go and Python.',
      'Optimize database queries and distributed lock mechanisms across PostgreSQL and Redis.',
      'Ensure 99.99% transaction success rate SLAs with automated fallback routing.'
    ],
    requirements: [
      '4+ years building high-throughput backend services in Go, Java, or Python.',
      'Strong knowledge of Kafka, Redis, PostgreSQL, and distributed payment protocols.',
      'Experience with AWS or GCP cloud architectures.'
    ],
    skills: ['Go', 'Python', 'Kafka', 'PostgreSQL', 'Redis', 'AWS', 'Microservices'],
    benefits: [
      'Comprehensive medical insurance for employee, spouse, children & parents',
      'ESOP equity grants with generous vesting',
      'Flexible hybrid work options in Koramangala Bengaluru campus'
    ],
    featured: true,
    isAgentIngested: true,
    agentVerifiedDate: 'Auto-ingested just now by AI Agent'
  },
  {
    title: 'Lead Frontend Architect (React & Design Systems)',
    company: 'Swiggy',
    logo: 'swiggy',
    companyUrl: 'https://www.swiggy.com',
    applyUrl: 'https://careers.swiggy.com',
    location: 'Bengaluru, KA, India',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Lead / Executive',
    category: 'Engineering',
    salaryMin: 4000000,
    salaryMax: 6500000,
    currency: '₹',
    description: 'Architect web and mobile web ordering experiences used by over 50 million consumers across India for Swiggy Food and Instamart. Lead web performance optimization, sub-second page loads, and modular micro-frontends.',
    responsibilities: [
      'Define web architecture across Swiggy consumer web and restaurant partner dashboards.',
      'Drive web vitals optimization (LCP < 1.2s, INP < 100ms) on low-bandwidth mobile devices.',
      'Mentor a team of 15+ frontend engineers on modern React practices.'
    ],
    requirements: [
      '7+ years building large-scale frontend applications with React, Next.js, and TypeScript.',
      'Deep expertise in bundle optimization, SSR/ISR, and web service workers.'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Web Performance', 'Micro-frontends'],
    benefits: [
      'Swiggy ESOPs with high growth potential',
      'Full healthcare coverage including mental wellness support',
      'Quarterly performance incentives'
    ],
    featured: true,
    isAgentIngested: true,
    agentVerifiedDate: 'Auto-ingested just now by AI Agent'
  },
  {
    title: 'Staff Machine Learning Engineer (Recommendation Engines)',
    company: 'Flipkart',
    logo: 'flipkart',
    companyUrl: 'https://www.flipkart.com',
    applyUrl: 'https://www.flipkartcareers.com',
    location: 'Bengaluru, KA, India',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    category: 'Data & AI',
    salaryMin: 4500000,
    salaryMax: 7500000,
    currency: '₹',
    description: 'Design deep learning recommendation algorithms and vector search pipelines for Flipkart Big Billion Days, delivering personalized product discovery to 400+ million registered users.',
    responsibilities: [
      'Train two-tower neural networks and transformer ranking models for real-time personalization.',
      'Deploy low-latency GPU inference pipelines serving 100k queries per second.'
    ],
    requirements: [
      '6+ years in machine learning with specialization in recommender systems or NLP.',
      'Hands-on expertise with PyTorch, TensorFlow, CUDA, and distributed training.'
    ],
    skills: ['Python', 'PyTorch', 'Machine Learning', 'Recommender Systems', 'Transformers', 'Spark'],
    benefits: [
      'Walmart / Flipkart equity incentives',
      'Comprehensive wellness and family medical coverage',
      'Continuous learning and conference sponsorship'
    ],
    featured: false,
    isAgentIngested: true,
    agentVerifiedDate: 'Auto-ingested just now by AI Agent'
  }
];

export const INITIAL_CANDIDATE: CandidateProfile = {
  id: 'cand-pranav',
  name: 'Pranav Naik',
  email: 'pranavnaik213@gmail.com',
  phone: '+91 98765 43210',
  headline: 'Full Stack Software Engineer | Next.js, TypeScript & Distributed Cloud Specialist',
  bio: 'Full stack software engineer passionate about high-performance web systems, accessible UI/UX, and cloud architecture. Creator of CareerHub, a modern tech recruitment and ATS platform built with Next.js App Router, TypeScript, and Tailwind CSS.',
  location: 'Bengaluru, KA, India (Open to Remote)',
  skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'GraphQL', 'Docker', 'Go', 'Git'],
  experienceYears: 4,
  portfolioUrl: 'https://github.com/pranavnaik213-ops/CareerHub',
  githubUrl: 'https://github.com/pranavnaik213-ops',
  linkedinUrl: 'https://www.linkedin.com/in/pranav-naik',
  linkedInConnected: true,
  linkedInVerified: true,
  linkedInSyncDate: '2026-11-22',
  resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
  resumeLastUpdated: '2026-08-28',
  experience: [
    {
      title: 'Full Stack Developer & Open Source Creator',
      company: 'CareerHub Platform',
      period: '2025 - Present',
      description: 'Architected and built CareerHub, an open-source Next.js 16 recruitment and candidate ATS platform featuring real-time job matching, Kanban pipeline tracking, and responsive design systems.'
    },
    {
      title: 'Software Engineer',
      company: 'CloudTech Solutions India',
      period: '2024 - 2025',
      description: 'Developed client web applications and REST microservices in Node.js and React. Optimized SQL queries in PostgreSQL and reduced Core Web Vitals LCP by 35%.'
    }
  ],
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      school: 'National Institute of Technology',
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
    candidatePhone: '+91 98765 43210',
    candidateHeadline: 'Full Stack Software Engineer',
    skills: ['Go', 'TypeScript', 'Kubernetes', 'Next.js', 'PostgreSQL'],
    resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
    coverLetter: 'Dear Google Cloud Hiring Team,\n\nI am writing to express my strong enthusiasm for the Staff Software Engineer position in Google Cloud Distributed Storage. Having built full-stack distributed web platforms with Next.js, Node.js, and cloud datastores, I am deeply fascinated by Google\'s work on Spanner and planet-scale storage architectures.\n\nThank you for considering my application.\n\nBest regards,\nPranav Naik',
    appliedDate: '2026-08-29',
    status: 'Interview Scheduled',
    interviewDate: '2026-09-08 11:00 IST (Google Meet)',
    recruiterNotes: 'Candidate screened positively on distributed systems fundamentals. Technical interview scheduled with Cloud Infrastructure Staff Lead.',
    aiScreeningScore: 94,
    aiEvaluationNotes: 'Strong profile match: 94% skills alignment (Go, TypeScript, Next.js, PostgreSQL). Recommend scheduling System Design round.',
    aiRecommendedStage: 'Interview Scheduled',
    linkedInVerified: true
  },
  {
    id: 'app-stripe-1',
    jobId: 'job-stripe-infra',
    jobTitle: 'Staff Infrastructure Engineer, Global Payments Core',
    companyName: 'Stripe',
    candidateName: 'Pranav Naik',
    candidateEmail: 'pranavnaik213@gmail.com',
    candidatePhone: '+91 98765 43210',
    candidateHeadline: 'Full Stack Software Engineer',
    skills: ['TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'AWS'],
    resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
    coverLetter: 'Dear Stripe Engineering Team,\n\nI have long admired Stripe\'s engineering standards, attention to API developer ergonomics, and rock-solid ledger infrastructure. I would welcome the opportunity to contribute to your core payments routing and reliability initiatives.\n\nSincerely,\nPranav Naik',
    appliedDate: '2026-08-30',
    status: 'Under Review',
    recruiterNotes: 'Application received. Forwarded to Payments Infrastructure engineering manager for resume review.',
    aiScreeningScore: 89,
    aiEvaluationNotes: 'High alignment with distributed payments and API design. Recommend fast-tracking to hiring manager review.',
    aiRecommendedStage: 'Under Review',
    linkedInVerified: true
  },
  {
    id: 'app-vercel-1',
    jobId: 'job-vercel-platform',
    jobTitle: 'Senior Platform Engineer, Next.js & Edge Runtime',
    companyName: 'Vercel',
    candidateName: 'Pranav Naik',
    candidateEmail: 'pranavnaik213@gmail.com',
    candidatePhone: '+91 98765 43210',
    candidateHeadline: 'Full Stack Software Engineer',
    skills: ['Next.js', 'TypeScript', 'React', 'Node.js', 'Tailwind CSS'],
    resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
    coverLetter: 'Hi Vercel Team,\n\nAs an active builder in the Next.js ecosystem who has developed full-scale applications with Next.js App Router and Turbopack, joining Vercel to work on the edge runtime and framework performance is a dream role.\n\nBest,\nPranav Naik',
    appliedDate: '2026-08-31',
    status: 'Offer Extended',
    interviewDate: 'Completed',
    recruiterNotes: 'Strong evaluation on frontend architecture and deep knowledge of Next.js internals. Offer package extended.',
    aiScreeningScore: 98,
    aiEvaluationNotes: 'Exceptional match (98%). Deep mastery of Next.js App Router, SSR runtime, and TypeScript.',
    aiRecommendedStage: 'Offer Extended',
    linkedInVerified: true
  },
  {
    id: 'app-microsoft-1',
    jobId: 'job-microsoft-ai',
    jobTitle: 'Principal Software Engineer, Azure AI & Cloud Infrastructure',
    companyName: 'Microsoft',
    candidateName: 'Pranav Naik',
    candidateEmail: 'pranavnaik213@gmail.com',
    candidatePhone: '+91 98765 43210',
    candidateHeadline: 'Full Stack Software Engineer',
    skills: ['Python', 'Distributed Systems', 'Azure', 'PyTorch', 'TypeScript'],
    resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
    coverLetter: 'Dear Microsoft IDC Recruitment Team,\n\nI am thrilled to submit my candidacy for the Principal Software Engineer role in Azure AI. Having architected complex Next.js applications and cloud microservices, I am eager to apply my systems background to hyperscale GPU inference and frontier model orchestration at Microsoft India.\n\nBest regards,\nPranav Naik',
    appliedDate: '2026-09-01',
    status: 'Under Review',
    recruiterNotes: 'Candidate resume passed initial AI screening. Forwarded to Azure AI Engineering Director for technical evaluation.',
    aiScreeningScore: 91,
    aiEvaluationNotes: 'Solid alignment (91%) across cloud infrastructure and distributed systems. Recommend scheduling recruiter phone screen.',
    aiRecommendedStage: 'Under Review',
    linkedInVerified: true
  },
  {
    id: 'app-uber-1',
    jobId: 'job-uber-systems',
    jobTitle: 'Staff Systems Engineer, Distributed Infrastructure & Core Trip Platform',
    companyName: 'Uber',
    candidateName: 'Pranav Naik',
    candidateEmail: 'pranavnaik213@gmail.com',
    candidatePhone: '+91 98765 43210',
    candidateHeadline: 'Full Stack Software Engineer',
    skills: ['Go', 'TypeScript', 'Distributed Systems', 'Redis', 'Docker'],
    resumeName: 'Pranav_Naik_FullStack_Resume.pdf',
    coverLetter: 'Dear Uber Engineering Team,\n\nUber\'s marketplace matching and real-time trip dispatch architecture are world-class benchmarks in distributed engineering. I would love to bring my systems passion to your Bengaluru infrastructure team.\n\nWarm regards,\nPranav Naik',
    appliedDate: '2026-09-02',
    status: 'Submitted',
    recruiterNotes: 'Application submitted via verified LinkedIn candidate fast-track.',
    aiScreeningScore: 88,
    aiEvaluationNotes: 'Candidate demonstrates strong competency in Go, distributed microservices, and database optimization.',
    aiRecommendedStage: 'Submitted',
    linkedInVerified: true
  }
];
