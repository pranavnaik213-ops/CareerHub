/**
 * Verified Technical Interview Processes & Levels for Top Indian Tech Companies
 * Authentic round structures, difficulty ratings, focus areas, and compensation benchmarks.
 */

export interface InterviewRound {
  title: string;
  duration: string;
  format: string;
  focus: string[];
  tips: string;
}

export interface CompanyGuide {
  id: string;
  name: string;
  logo: string;
  location: string;
  engineeringLevels: { level: string; title: string; ctcRange: string }[];
  hiringBar: 'Very High' | 'High' | 'Competitive';
  rounds: InterviewRound[];
  coreTechStack: string[];
  cultureNotes: string;
}

export const COMPANY_INTERVIEW_GUIDES: CompanyGuide[] = [
  {
    id: 'google',
    name: 'Google India',
    logo: 'google',
    location: 'Bengaluru / Hyderabad',
    hiringBar: 'Very High',
    engineeringLevels: [
      { level: 'L3', title: 'Software Engineer II (Entry)', ctcRange: '₹28 LPA – ₹38 LPA' },
      { level: 'L4', title: 'Software Engineer III (Mid-Level)', ctcRange: '₹42 LPA – ₹58 LPA' },
      { level: 'L5', title: 'Senior Software Engineer', ctcRange: '₹65 LPA – ₹95 LPA' },
      { level: 'L6', title: 'Staff Software Engineer', ctcRange: '₹1.1 Cr – ₹1.6 Cr' }
    ],
    rounds: [
      {
        title: 'Recruiter Screening & Pre-Interview',
        duration: '30 mins',
        format: 'Google Meet Phone Screen',
        focus: ['Past engineering accomplishments', 'Distributed systems exposure', 'Role fitment'],
        tips: 'Highlight high-scale production systems and specific metrics of impact.'
      },
      {
        title: 'Technical Screen (Coding & DSA)',
        duration: '45 mins',
        format: 'Google Docs / CoderPad Live Pair Coding',
        focus: ['Data Structures & Algorithms', 'Time & Space Complexity', 'Clean production-grade syntax in C++/Go/Java/Python'],
        tips: 'Always communicate your thought process before writing code. Clarify edge cases.'
      },
      {
        title: 'Onsite Round 1 & 2: Advanced Coding & Algorithms',
        duration: '2x 45 mins',
        format: 'Live Pair Programming',
        focus: ['Trees, Graphs, DP, Trie', 'Concurrency & Concurrency primitives', 'Algorithmic optimization'],
        tips: 'Google tests code correctness and runtime efficiency. Avoid non-optimal brute force.'
      },
      {
        title: 'Onsite Round 3: Large-Scale System Design',
        duration: '60 mins',
        format: 'Virtual Whiteboard Architecture',
        focus: ['Distributed storage (Spanner, Bigtable)', 'Consensus (Raft/Paxos)', 'Replication & fault tolerance', 'Back-of-the-envelope estimation'],
        tips: 'Start with API signatures, data schema, then scale into caching, partitioning, and replication.'
      },
      {
        title: 'Googleyness & Leadership Fit',
        duration: '45 mins',
        format: 'Behavioral with Engineering Director',
        focus: ['Intellectual humility', 'Navigating ambiguity', 'Cross-functional collaboration'],
        tips: 'Use the STAR method. Emphasize teamwork, constructive feedback, and user empathy.'
      }
    ],
    coreTechStack: ['Go', 'C++', 'Java', 'Python', 'Spanner', 'Kubernetes', 'gRPC', 'Borg'],
    cultureNotes: 'High engineering autonomy, heavy emphasis on code review rigor, unit testing, and design document RFCs.'
  },
  {
    id: 'microsoft',
    name: 'Microsoft IDC',
    logo: 'microsoft',
    location: 'Hyderabad / Bengaluru / Noida',
    hiringBar: 'High',
    engineeringLevels: [
      { level: 'L59 - 60', title: 'Software Engineer', ctcRange: '₹22 LPA – ₹32 LPA' },
      { level: 'L61 - 62', title: 'Software Engineer II', ctcRange: '₹34 LPA – ₹48 LPA' },
      { level: 'L63 - 64', title: 'Senior Software Engineer', ctcRange: '₹55 LPA – ₹80 LPA' },
      { level: 'L65 - 66', title: 'Principal Software Engineer', ctcRange: '₹95 LPA – ₹1.4 Cr' }
    ],
    rounds: [
      {
        title: 'Technical Screening',
        duration: '45 mins',
        format: 'Teams Live Coding',
        focus: ['Data structures, Arrays, Strings, Trees', 'Object-Oriented Design'],
        tips: 'Write modular, extensible code adhering to SOLID principles.'
      },
      {
        title: 'Low-Level Design (LLD / Machine Coding)',
        duration: '60 mins',
        format: 'Object Oriented Architecture & Code Implementation',
        focus: ['Design patterns (Factory, Strategy, Observer)', 'Clean multi-threading', 'Unit test coverage'],
        tips: 'Design classes clearly with clean separation of concerns and interface contracts.'
      },
      {
        title: 'High-Level System Design (HLD)',
        duration: '60 mins',
        format: 'Cloud Architecture Whiteboarding',
        focus: ['Azure cloud services', 'Microservices resilience', 'Message brokers (Kafka/Service Bus)', 'Database sharding'],
        tips: 'Discuss trade-offs between consistency and availability (CAP theorem).'
      },
      {
        title: 'As-Appropriate (AA) Director Round',
        duration: '45 mins',
        format: 'Director / Partner Level Interview',
        focus: ['Growth mindset', 'Customer obsession', 'Technical leadership on enterprise initiatives'],
        tips: 'Show curiosity about Microsoft cloud offerings and demonstrate accountability for failures.'
      }
    ],
    coreTechStack: ['C#', '.NET Core', 'C++', 'Python', 'Azure', 'Cosmos DB', 'TypeScript', 'Kubernetes'],
    cultureNotes: 'Collaborative, customer-centric engineering with strong focus on enterprise reliability and cloud scaling.'
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    logo: 'phonepe',
    location: 'Bengaluru',
    hiringBar: 'Very High',
    engineeringLevels: [
      { level: 'SE', title: 'Software Engineer', ctcRange: '₹24 LPA – ₹36 LPA' },
      { level: 'SSE', title: 'Senior Software Engineer', ctcRange: '₹42 LPA – ₹65 LPA' },
      { level: 'Architect', title: 'Staff Architect / Lead', ctcRange: '₹75 LPA – ₹1.2 Cr' }
    ],
    rounds: [
      {
        title: 'Machine Coding Round (Signature PhonePe Round)',
        duration: '120 mins',
        format: 'Self-Contained Functional Application Implementation',
        focus: ['Designing working code from scratch', 'Clean OOP design & design patterns', 'In-memory state management & concurrency'],
        tips: 'A working executable code with test cases is mandatory. Focus on edge cases and thread safety.'
      },
      {
        title: 'Machine Coding Defense & Code Review',
        duration: '30 mins',
        format: 'In-Depth Code Walkthrough with Senior Architect',
        focus: ['Justification of design choices', 'Extensibility for future features', 'Time & space optimization'],
        tips: 'Be prepared to explain why you chose specific data structures over alternatives.'
      },
      {
        title: 'Problem Solving & Advanced DSA',
        duration: '60 mins',
        format: 'Live Algorithmic Problem Solving',
        focus: ['Graph algorithms, Heaps, Dynamic Programming', 'Complex state machines'],
        tips: 'Aim for optimal time complexity on the first attempt.'
      },
      {
        title: 'High-Throughput System Design',
        duration: '60 mins',
        format: 'Payments & UPI Scale Architecture',
        focus: ['100k+ transactions per second', 'Idempotency and double-spend prevention', 'Distributed locks (Redis/Zookeeper)', 'Dead-letter queues'],
        tips: 'Familiarize yourself with UPI architecture, NPCI gateways, and settlement ledgers.'
      },
      {
        title: 'Engineering Director / Cultural Fit',
        duration: '45 mins',
        format: 'Discussion with Engineering VP',
        focus: ['Speed of execution', 'First-principles thinking', 'Handling production outages'],
        tips: 'Show high ownership, resilience, and obsession with zero transaction failures.'
      }
    ],
    coreTechStack: ['Java', 'Go', 'Cassandra', 'Kafka', 'Redis', 'Aerospike', 'MySQL', 'Dropwizard'],
    cultureNotes: 'Fast-paced, product-first engineering where engineers own features from database schema to NPCI live monitoring.'
  },
  {
    id: 'uber',
    name: 'Uber India',
    logo: 'uber',
    location: 'Bengaluru / Hyderabad',
    hiringBar: 'Very High',
    engineeringLevels: [
      { level: 'L4', title: 'Software Engineer II', ctcRange: '₹36 LPA – ₹52 LPA' },
      { level: 'L5', title: 'Senior Software Engineer', ctcRange: '₹60 LPA – ₹88 LPA' },
      { level: 'L6', title: 'Staff Software Engineer', ctcRange: '₹1.1 Cr – ₹1.7 Cr' }
    ],
    rounds: [
      {
        title: 'Online Coding Assessment (HackerRank)',
        duration: '90 mins',
        format: 'Online Test',
        focus: ['3 algorithmic problems with strict time limits', 'Memory efficiency'],
        tips: 'Practice multi-threading and advanced graphs on LeetCode Hard.'
      },
      {
        title: 'Technical Screen (Pair Programming)',
        duration: '60 mins',
        format: 'Live Coding in Go or Java',
        focus: ['Clean distributed system logic', 'Concurrency & locks', 'Unit testing'],
        tips: 'Write modular code and handle null/empty inputs gracefully.'
      },
      {
        title: 'System Design Round 1: Distributed Core',
        duration: '60 mins',
        format: 'Real-time Geospatial Architecture',
        focus: ['Uber H3 hex indexing', 'Sub-millisecond driver-rider dispatch', 'Kafka stream processing', 'Redis caching strategies'],
        tips: 'Understand geo-sharding, proximity search, and dynamic pricing algorithms.'
      },
      {
        title: 'System Design Round 2: Architecture Depth',
        duration: '60 mins',
        format: 'End-to-End Reliability',
        focus: ['Multi-datacenter active-active failover', 'Schema evolution and backward compatibility', 'Observability and distributed tracing'],
        tips: 'Discuss how you monitor microservices using Jaeger and Prometheus.'
      },
      {
        title: 'Bar Raiser Round',
        duration: '45 mins',
        format: 'Senior Cross-Team Leader Evaluation',
        focus: ['Uber engineering values', 'Navigating trade-offs', 'Mentorship and technical vision'],
        tips: 'Bar raisers evaluate whether you raise the technical bar of the entire organization.'
      }
    ],
    coreTechStack: ['Go', 'Java', 'Kafka', 'Cassandra', 'Redis', 'Kubernetes', 'gRPC', 'Jaeger'],
    cultureNotes: 'Extreme scale, sub-millisecond latencies, and high algorithmic craftsmanship.'
  },
  {
    id: 'stripe',
    name: 'Stripe India',
    logo: 'stripe',
    location: 'Remote India',
    hiringBar: 'Very High',
    engineeringLevels: [
      { level: 'L2', title: 'Software Engineer', ctcRange: '₹32 LPA – ₹45 LPA' },
      { level: 'L3', title: 'Senior Software Engineer', ctcRange: '₹55 LPA – ₹82 LPA' },
      { level: 'L4', title: 'Staff Infrastructure Engineer', ctcRange: '₹95 LPA – ₹1.5 Cr' }
    ],
    rounds: [
      {
        title: 'Interactive Debugging Round (Unique Stripe Format)',
        duration: '60 mins',
        format: 'Live Debugging in Candidate’s Preferred IDE',
        focus: ['Debugging an open-source library codebase', 'Identifying concurrency bugs and memory leaks', 'Adding integration test cases'],
        tips: 'Stripe does not do LeetCode puzzles. You work in your own local IDE with full internet access.'
      },
      {
        title: 'Integration & API Coding Round',
        duration: '60 mins',
        format: 'Building a Real Working Service',
        focus: ['Consuming third-party APIs', 'Idempotency and retry mechanisms with exponential backoff', 'Clean error handling'],
        tips: 'Write clean, readable code with excellent naming conventions and clear error messages.'
      },
      {
        title: 'System Design & Architecture',
        duration: '60 mins',
        format: 'Financial Infrastructure Design',
        focus: ['Ledger consistency', 'Reconciliation engines', 'High availability and audit compliance'],
        tips: 'Prioritize precision, transactional semantics, and zero double-charging over raw speed.'
      },
      {
        title: 'Technical Deep Dive on Candidate’s Past Project',
        duration: '45 mins',
        format: 'Rigorous Technical Discussion',
        focus: ['Deep dive into architecture you built', 'What went wrong and what you would change today'],
        tips: 'Pick a complex project where you made decisive architectural trade-offs.'
      }
    ],
    coreTechStack: ['Ruby', 'Java', 'Go', 'Kafka', 'PostgreSQL', 'Redis', 'AWS', 'Sorbet'],
    cultureNotes: 'Rigorous written communication, developer ergonomics obsession, and deep craftsmanship.'
  }
];
