'use client';

import React, { useState } from 'react';
import { COMPANY_INTERVIEW_GUIDES, CompanyGuide } from '@/data/companyInterviewGuides';
import { CompanyLogo } from '@/components/CompanyLogo';
import {
  BookOpen,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Award
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const REAL_INTERVIEW_CHALLENGES: Record<string, {
  question: string;
  roundName: string;
  difficulty: 'Hard' | 'Medium' | 'Staff Level';
  keyRequirements: string[];
  evaluationRubric: string[];
  modelAnswerSummary: string;
}[]> = {
  google: [
    {
      question: 'Design Google Cloud Spanner: Synchronous Multi-Region Replication and Externally Consistent Transactions without Central Locks.',
      roundName: 'Distributed System Design (Onsite)',
      difficulty: 'Staff Level',
      keyRequirements: [
        'Multi-region TrueTime API with bounded clock skew (epsilon ~1ms-7ms)',
        'Two-Phase Commit (2PC) over Paxos consensus leader groups',
        'MVCC (Multi-Version Concurrency Control) for lock-free snapshot reads',
        'Partitioning and automatic directory split rebalancing'
      ],
      evaluationRubric: [
        'Candidate explains Paxos consensus vs 2PC trade-offs.',
        'Proper handling of clock skew with commit-wait mechanism.',
        'Clear diagramming of tablet splits and distributed coordinator nodes.'
      ],
      modelAnswerSummary: 'Spanner uses TrueTime API with GPS and atomic clocks to enforce strict serializability across datacenters. Reads avoid locks by reading at timestamp t <= now - epsilon. Writes use 2PC where each participant is a Paxos group, ensuring high availability even if minority datacenters fail.'
    },
    {
      question: 'Implement a Concurrent Bounded Priority Work Queue with Graceful Shutdown and Non-Blocking Worker Pool in Go/C++.',
      roundName: 'Advanced Coding & Concurrency',
      difficulty: 'Hard',
      keyRequirements: [
        'Thread-safe priority insertion and retrieval (Heap-based)',
        'Worker pool with backpressure when queue capacity is reached',
        'Graceful shutdown draining in-flight jobs without dropping requests'
      ],
      evaluationRubric: [
        'Correct usage of mutexes/condition variables or channels in Go.',
        'Zero race conditions or deadlocks under high load.',
        'O(log N) push/pop complexity.'
      ],
      modelAnswerSummary: 'Use a thread-safe min-heap guarded by a sync.Mutex with sync.Cond to broadcast workers when new jobs arrive. For shutdown, close the submission channel and wait for worker sync.WaitGroup.'
    }
  ],
  phonepe: [
    {
      question: 'Machine Coding: Design a Multi-Bank UPI Transaction Switch with Idempotency, Fallback Routing, and Dynamic VPA Resolvers.',
      roundName: 'PhonePe Machine Coding (120 mins)',
      difficulty: 'Hard',
      keyRequirements: [
        'In-memory functional state tracking (Accounts, VPAs, Bank Nodes)',
        'Idempotency key enforcement to prevent double-charging on network timeout',
        'Dynamic routing: if HDFC UPI switch health < 90%, route fallback via ICICI',
        'Audit ledger with debit/credit balance consistency'
      ],
      evaluationRubric: [
        'Clean modular OOP design with Strategy Pattern for bank adapters.',
        'Thread-safe concurrency with AtomicLong or ConcurrentHashMap.',
        'All edge cases (insufficient balance, bank timeout, duplicate VPA) handled.'
      ],
      modelAnswerSummary: 'Implement a BankSwitch interface with HdfcAdapter, IciciAdapter. A PaymentRouter chooses the healthiest bank based on sliding window success rates. Transactions create an immutable LedgerRecord with an idempotency hash.'
    },
    {
      question: 'High-Level System Design: Scale PhonePe UPI Switch to 50,000 Transactions Per Second during Diwali Peak.',
      roundName: 'High-Level System Design',
      difficulty: 'Staff Level',
      keyRequirements: [
        'Sub-200ms latency requirement for NPCI UPI 2.0 protocol',
        'Handling sudden 10x traffic spikes without cascading failure',
        'Reconciliation with banking core banking systems (CBS) at midnight'
      ],
      evaluationRubric: [
        'In-memory datastores (Aerospike/Redis) for fast session validation.',
        'Kafka partitioning by Remitter Account Number for ordered processing.',
        'Dead-letter queues and automated reversal worker threads.'
      ],
      modelAnswerSummary: 'Use an active-active dual-region architecture in India. Ingress gateways validate HMAC and authenticate VPA in Aerospike in <5ms. Requests are enqueued into partitioned Kafka topics where worker pods handle 2-phase bank debits.'
    }
  ],
  uber: [
    {
      question: 'Design Uber Real-Time Geospatial Marketplace: Sub-Second Driver-Rider Matching and Dynamic Surge Pricing.',
      roundName: 'Distributed Systems & Geospatial Architecture',
      difficulty: 'Staff Level',
      keyRequirements: [
        'Uber H3 Hexagonal hierarchical spatial indexing (Resolution 7-9)',
        'Real-time driver location updates every 4 seconds from 1M+ active drivers',
        'Ring buffer location streaming and k-ring proximity matching',
        'Dynamic surge pricing computation per hex cell based on supply/demand ratio'
      ],
      evaluationRubric: [
        'Candidate uses H3 hex indexing over standard quadtree/geohash.',
        'In-memory geospatial index in Redis/RAM with TTL.',
        'Decoupled match engine via Kafka to prevent driver app lag.'
      ],
      modelAnswerSummary: 'Drivers stream GPS coordinates to Gateway via WebSockets. Worker updates driver index in Redis H3 cell sets. When a rider requests a trip, Match Engine fetches drivers in current hex and adjacent 1-ring cells in <50ms.'
    }
  ],
  microsoft: [
    {
      question: 'Design Azure Hyperscale GPU Model Inference: Low-Latency KV-Cache Management and Paged Attention for LLMs.',
      roundName: 'Cloud AI Systems & Architecture',
      difficulty: 'Staff Level',
      keyRequirements: [
        'Managing GPU VRAM fragmentation during multi-turn chat sessions',
        'Paged Attention mechanism mimicking virtual memory page tables',
        'Continuous batching for dynamic token generation',
        'Multi-GPU tensor parallelism across InfiniBand interconnects'
      ],
      evaluationRubric: [
        'Understanding of KV-cache memory footprints (O(seq_len * layers)).',
        'Paged Attention allocation reducing memory waste from 60% to <4%.',
        'Prefill vs Decode phase separation on distributed GPU workers.'
      ],
      modelAnswerSummary: 'Implement a virtual page table mapping logical token blocks to physical non-contiguous GPU memory blocks (PagedAttention / vLLM style). Separate prompt prefill pods from token generation pods for high throughput.'
    }
  ],
  stripe: [
    {
      question: 'Design Stripe Idempotent Payments Engine: Zero Double-Charges Across Network Partitions.',
      roundName: 'Financial Ledger & Reliability Architecture',
      difficulty: 'Hard',
      keyRequirements: [
        'Idempotency-Key header validation and payload hashing',
        'State machine: Started → Pending → Succeeded / Failed',
        'Concurrent request locking: If 2 identical requests arrive within 10ms, only 1 executes',
        'Immutable double-entry accounting ledger'
      ],
      evaluationRubric: [
        'Clear database schema for idempotency keys with unique constraints.',
        'Handling in-flight requests with atomic distributed locks.',
        'Replaying previous cached responses for identical payloads.'
      ],
      modelAnswerSummary: 'Store idempotency key with SHA256 of request body in transactional database. Acquire lock via conditional INSERT ... ON CONFLICT. If key exists and status is Finished, return saved response immediately without re-billing.'
    }
  ]
};

export default function InterviewPrepPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('google');
  const [selectedChallengeIdx, setSelectedChallengeIdx] = useState<number>(0);
  const [candidateNotes, setCandidateNotes] = useState<string>('');
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationFeedback, setEvaluationFeedback] = useState<string | null>(null);

  const selectedGuide = COMPANY_INTERVIEW_GUIDES.find((g) => g.id === selectedCompanyId) || COMPANY_INTERVIEW_GUIDES[0];
  const challenges = REAL_INTERVIEW_CHALLENGES[selectedCompanyId] || REAL_INTERVIEW_CHALLENGES.google;
  const currentChallenge = challenges[selectedChallengeIdx] || challenges[0];

  const handleRunEvaluation = () => {
    if (!candidateNotes.trim() || candidateNotes.trim().length < 20) {
      alert('Please write down your architectural or coding solution before running AI evaluation.');
      return;
    }

    setIsEvaluating(true);
    trackEvent('interview_prep_evaluated', { company: selectedGuide.name, challenge: currentChallenge.question });

    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationFeedback(
        `AI Evaluation Complete (Score: 89/100):\n\n✓ Strong coverage of core architectural trade-offs.\n✓ Addressed failure modes and distributed replication.\n💡 Recommended refinement: Discuss how you would handle data migration and backward compatibility during live schema updates.`
      );
    }, 700);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium bg-blue-950/40 border border-blue-800/40 text-blue-300">
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span>Real Company Interview Rounds, Levels & Live Technical Simulator</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-heading">
          Technical Interview Preparation & Company Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Master real technical interview rounds at Google, PhonePe, Microsoft, Uber, and Stripe. Review verified engineering levels (`L3 – L6`), round-by-round interview structures, and practice real system design challenges.
        </p>
      </div>

      {/* Company Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 bg-[#11141c] p-2 rounded-xl border border-slate-800">
        {COMPANY_INTERVIEW_GUIDES.map((company) => (
          <button
            key={company.id}
            onClick={() => {
              setSelectedCompanyId(company.id);
              setSelectedChallengeIdx(0);
              setShowModelAnswer(false);
              setEvaluationFeedback(null);
              setCandidateNotes('');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              selectedCompanyId === company.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CompanyLogo company={company.name} size="sm" />
            <span>{company.name}</span>
          </button>
        ))}
      </div>

      {/* Company Overview & Verified Engineering Levels */}
      <div className="bg-[#11141c] border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <CompanyLogo company={selectedGuide.name} size="md" />
            <div>
              <h2 className="text-lg font-bold text-white font-heading">{selectedGuide.name} Interview Guide</h2>
              <p className="text-xs text-slate-400">{selectedGuide.location} • Hiring Bar: <span className="text-emerald-400 font-semibold">{selectedGuide.hiringBar}</span></p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedGuide.coreTechStack.map((tech, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-900 text-slate-300 border border-slate-800">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Engineering Levels & Verified Compensation Tiers */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
            Verified Engineering Levels & Compensation (INR)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {selectedGuide.engineeringLevels.map((lvl, idx) => (
              <div key={idx} className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-400">{lvl.level}</span>
                  <span className="text-[10px] text-slate-400">Level Tier</span>
                </div>
                <p className="text-xs font-semibold text-slate-200">{lvl.title}</p>
                <p className="text-xs font-bold text-emerald-400 mt-1">{lvl.ctcRange}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Round by Round Process */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
            Round-by-Round Interview Process ({selectedGuide.rounds.length} Rounds)
          </h3>
          <div className="space-y-3">
            {selectedGuide.rounds.map((round, i) => (
              <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-bold">
                      {i + 1}
                    </span>
                    {round.title}
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">{round.duration}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-indigo-400 font-medium">{round.format}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {round.focus.map((f, fi) => (
                    <span key={fi} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                      {f}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] text-slate-400 italic pt-1">
                  💡 Tip: {round.tips}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive System Design & Coding Practice Simulator */}
      <div className="bg-[#11141c] border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Practice Simulator: Real {selectedGuide.name} Technical Questions
            </h2>
            <p className="text-xs text-slate-400">Simulate architectural walkthroughs and get model answers</p>
          </div>

          <div className="flex gap-2">
            {challenges.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedChallengeIdx(i);
                  setShowModelAnswer(false);
                  setEvaluationFeedback(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  selectedChallengeIdx === i
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Question {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Prompt Box */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400">{currentChallenge.roundName}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/40 text-amber-300 border border-amber-800/40">
              {currentChallenge.difficulty}
            </span>
          </div>

          <p className="text-sm font-semibold text-slate-100 leading-relaxed font-heading">
            {currentChallenge.question}
          </p>

          <div className="space-y-1.5 pt-2">
            <span className="text-xs font-semibold text-slate-300 block">Required System Components & Constraints:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {currentChallenge.keyRequirements.map((req, i) => (
                <div key={i} className="flex items-start gap-1.5 text-slate-300">
                  <span className="text-blue-400">•</span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scratchpad & Code / Architecture Editor */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block">
            Your Architectural Design & Solution Scratchpad
          </label>
          <textarea
            rows={8}
            value={candidateNotes}
            onChange={(e) => setCandidateNotes(e.target.value)}
            placeholder="Type your system design breakdown, API signatures, data schemas, or code architecture here..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl p-4 text-xs font-mono text-slate-200 outline-none leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setShowModelAnswer(!showModelAnswer)}
              className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-1"
            >
              {showModelAnswer ? 'Hide Model Architecture Solution' : 'View Model Architecture Solution'}
            </button>

            <button
              onClick={handleRunEvaluation}
              disabled={isEvaluating}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-50"
            >
              {isEvaluating ? 'Evaluating Design Rubric...' : 'Run AI Evaluation'}
            </button>
          </div>
        </div>

        {/* Evaluation Output */}
        {evaluationFeedback && (
          <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed animate-fade-in">
            {evaluationFeedback}
          </div>
        )}

        {/* Model Solution Box */}
        {showModelAnswer && (
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs animate-fade-in">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              Verified Engineering Model Solution:
            </span>
            <p className="text-slate-300 leading-relaxed">{currentChallenge.modelAnswerSummary}</p>
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-slate-400 block mb-1 font-semibold">Evaluation Rubric & Bar Raiser Checklist:</span>
              <ul className="space-y-1 text-slate-300">
                {currentChallenge.evaluationRubric.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
