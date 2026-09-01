import { BookInfo, KeynoteInfo, QuizQuestion } from '../types';
import survivalCover from '../assets/images/regenesis_survival_cover_1784746793410.jpg';
import protocolCover from '../assets/images/regenesis_protocol_cover_1784746765106.jpg';
import blueprintCover from '../assets/images/regenesis_blueprint_cover_1784746779311.jpg';

export const BOOKS_DATA: BookInfo[] = [
  {
    id: 'survival-source-code',
    dropDate: 'Coming 2027',
    title: 'The Survival Source Code',
    subtitle: 'Awareness & Origin',
    tagline: 'Book One',
    description: 'Decodes the survival hardware written in your earliest years — the code shaping your behavior, identity, and drive today.',
    chapters: [
      'Awareness & Origin',
      'Decoding Survival Hardware',
      'The Hidden Architecture of Drive'
    ],
    coverColor: 'from-[#3a200b] to-[#140b03]',
    coverImage: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1785187163/book_1.2_-_Copy_op3afs.png',
    dropUrl: '#'
  },
  {
    id: 'regenesis-protocol',
    dropDate: 'To Follow',
    title: 'The REGENESIS Protocol',
    subtitle: 'Interruption & Rewrite',
    tagline: 'Book Two',
    description: 'Hands you the protocol for interrupting survival conditioning and reconfiguring the patterns quietly limiting your capacity.',
    chapters: [
      'Interruption & Rewrite',
      'Deconditioning Survival Conditioning',
      'Reconfiguring Biological Capacity'
    ],
    coverColor: 'from-[#4a2e0e] to-[#1a1005]',
    coverImage: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1785187163/book_2.2_awqfr6.png',
    dropUrl: '#'
  },
  {
    id: 'regenesis-blueprint',
    dropDate: 'To Follow',
    title: 'The REGENESIS Blueprint',
    subtitle: 'Embodiment',
    tagline: 'Book Three',
    description: 'The 365-day blueprint for living the new configuration, making it your default — and becoming The ONE.',
    chapters: [
      'Embodiment & Scaling',
      'The 365-Day Daily Blueprint',
      'Becoming The ONE'
    ],
    coverColor: 'from-[#35200a] to-[#0f0902]',
    coverImage: 'https://res.cloudinary.com/ew2ztpgz/image/upload/v1785187163/book_3.2_nptruj.png',
    dropUrl: '#'
  }
];

export const KEYNOTES_DATA: KeynoteInfo[] = [
  {
    id: 'biology-of-business-behavior',
    number: 'KEYNOTE 1',
    title: 'THE BIOLOGY OF BUSINESS BEHAVIOR',
    subtitle: 'Recoding Biological Architecture',
    category: 'Where Biology Meets Business Strategy',
    description: 'Strategy is logic, but behavior is chemistry. If you are fighting an "Internal War" between your drive to build and your urge to pull back, it isn\'t a mindset flaw. It is a hardware limitation. Discover why your Biological Architecture is the invisible ceiling on your capacity.',
    fullDetails: 'In this keynote, Thomas Ventura breaks down the neural chemistry that governs high-stakes leadership. Operators learn how survival conditioning secretly triggers delegation bottlenecks, key-person dependencies, and capacity plateaus—and how to reconfigure these automatic biological responses.',
    outcomes: [
      'Understand why standard mindset tools fail when nervous system capacity is breached.',
      'Identify the 3 subconscious trigger states that lead to operator burnout.',
      'Implement real-time biological recalibration techniques during high-stakes decisions.',
      'Eliminate the "Survival Tax" draining capacity.'
    ],
    targetAudience: 'CEOs, Founders, Enterprise Leadership Teams, Operators.'
  },
  {
    id: 'regenesis-protocol-expansion',
    number: 'KEYNOTE 2',
    title: 'REGENESIS: THE PROTOCOL FOR EXPANSION',
    subtitle: 'Architecting Biological Capacity for Sustainable Scale',
    category: 'Where Biology Meets Business Strategy',
    description: 'Motivation runs out. Coherent Biology doesn\'t. Leaders who hit a growth ceiling don\'t need more willpower—they need upgraded hardware. Learn the REGENESIS Protocol™—the blueprint for upgrading your internal hardware to sustain output without burnout.',
    fullDetails: 'Thomas delivers a battle-tested roadmap derived from two decades in commercial operations and neural architecture. This session equips organizations with the exact tools to transform leadership capacity into a durable asset.',
    outcomes: [
      'Overcome key-person dependency by aligning nervous system trust with operational delegation.',
      'Convert emergency stress overdrive into sustained executive stamina.',
      'Build organizational coherence that increases velocity across operations.',
      'Shift from reactive survival mode into systematic, sustained capacity.'
    ],
    targetAudience: 'Leadership teams, Board Members, Accelerators, Masterminds.'
  }
];

export const AUDIENCE_PROFILES = [
  {
    title: 'THE BOTTLENECK FOUNDER',
    description: '"The one doing it all." Entrepreneurs stuck in high-effort, low-return cycles—where "working harder" has stopped yielding results and started yielding burnout. Whether you run a local business or a national brand, you are the lid on your own growth.'
  },
  {
    title: 'THE "RELUCTANT" DELEGATOR',
    description: '"The one who can\'t let go." Leaders who intellectually know they need to delegate, but whose nervous system codes "trust" as "danger." This is for operators whose need for control is quietly preventing their team from stepping up.'
  },
  {
    title: 'THE CYCLE BREAKER',
    description: 'The one building without a blueprint. For the first-generation entrepreneur defying history to leave the employee mindset and enter the arena of ownership. You are building from scratch with no trust fund to catch you if you fall.'
  },
  {
    title: 'ACCELERATORS & ORGANIZATIONS',
    description: '"The systems seeking stability." From local incubator programs to corporate retention initiatives. This is for organizations seeking infrastructure-first growth—moving beyond superficial fluff to install actual biological sustainability for their leadership teams.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'When high pressure hits or demands surge, how does your body react first?',
    options: [
      { label: 'I feel tight, hyper-vigilant, micromanage details, and struggle to switch off at night.', points: 1, category: 'SOS' },
      { label: 'I experience sudden mental fog, procrastination, or fatigue despite high caffeine intake.', points: 2, category: 'SOS' },
      { label: 'I work long hours with initial focus, but experience erratic crashes and mood swings.', points: 3, category: 'TRANSITION' },
      { label: 'I maintain calm, clear strategic vision and easily delegate execution without internal anxiety.', points: 4, category: 'ONE' }
    ]
  },
  {
    id: 2,
    question: 'How does your nervous system respond to delegating critical operations?',
    options: [
      { label: 'My body feels physical anxiety or threat; I inevitably step back in and redo their work.', points: 1, category: 'SOS' },
      { label: 'I delegate on paper, but constantly hover and double-check every item due to internal distrust.', points: 2, category: 'SOS' },
      { label: 'I delegate successfully in some areas, but keep 1-2 key functions hostage as my safety blanket.', points: 3, category: 'TRANSITION' },
      { label: 'I build clear systems and empower teams smoothly with zero physiological urge to control.', points: 4, category: 'ONE' }
    ]
  },
  {
    id: 3,
    question: 'How would you describe your sleep and physical energy recovery cycles?',
    options: [
      { label: 'Waking up exhausted, racing thoughts at 3 AM, dependent on stimulants to operate.', points: 1, category: 'SOS' },
      { label: 'Inconsistent sleep quality; constant low-grade tension in jaw, neck, or shoulders.', points: 2, category: 'SOS' },
      { label: 'Good sleep on weekends, but severe weekday energy slumps around 2:00 PM.', points: 3, category: 'TRANSITION' },
      { label: 'Deep restorative sleep nightly, consistent cellular energy all day without crash.', points: 4, category: 'ONE' }
    ]
  },
  {
    id: 4,
    question: 'When you consider taking your capacity to the next order of magnitude:',
    options: [
      { label: 'A part of me feels dread or panic because my body knows it cannot survive more effort.', points: 1, category: 'SOS' },
      { label: 'I intellectualize the strategy, but repeatedly procrastinate on the crucial needle-moving moves.', points: 2, category: 'SOS' },
      { label: 'I am excited, but worried my personal health or relationships will be collateral damage.', points: 3, category: 'TRANSITION' },
      { label: 'I see a clear path through architectural capacity expansion without personal depletion.', points: 4, category: 'ONE' }
    ]
  }
];
