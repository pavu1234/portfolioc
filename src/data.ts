export type Station = {
  id: string;
  title: string;
  short: string;
  theme: string;
  heading: string;
  description: string;
  bullets?: string[];
};

export const profile = {
  name: 'ALUR PRAVEEN',
  role: 'CYBERSECURITY ASPIRANT / SOC ANALYST / VAPT LEARNER',
  email: 'alurpraveen4217@gmail.com',
  phone: '+91 9606077008',
  location: 'Hosapete, Karnataka, India',
  github: 'https://github.com/pavu1234/',
  linkedin: 'https://www.linkedin.com/in/alur-praveen-607899269',
  college: 'Basaveshwar Engineering College, Bagalkot',
  degree: 'B.E. Information Science & Engineering'
};

export const stations: Station[] = [
  {
    id: 'boot-gateway',
    title: 'BOOT GATEWAY',
    short: 'ENTRY',
    theme: 'Cinematic initialization and identity reveal',
    heading: 'Welcome to CYBERVERSE X9',
    description:
      'A fully redesigned, sequence-based cybersecurity portfolio experience. Visitors move through a command-center journey instead of jumping between disconnected sections.',
    bullets: ['Cinematic intro', 'Single forward route', 'View-on-arrival interaction']
  },
  {
    id: 'threat-intel',
    title: 'THREAT INTELLIGENCE HUB',
    short: 'INTEL',
    theme: 'Threat landscape, mindset, and cybersecurity focus',
    heading: 'Think Like An Analyst',
    description:
      'I focus on understanding threats, traffic behavior, defensive workflows, and practical cybersecurity learning. I enjoy structured investigation, analysis, and documentation.',
    bullets: ['Threat analysis mindset', 'Security fundamentals', 'Defensive learning path']
  },
  {
    id: 'soc-command',
    title: 'SOC COMMAND CENTER',
    short: 'SOC',
    theme: 'Skills, tools, and monitoring stack',
    heading: 'Blue-Team Oriented Skill Set',
    description:
      'My interests include SOC operations, monitoring, network investigation, and vulnerability assessment. I work with both security concepts and practical tools.',
    bullets: ['Wireshark, Nmap, Burp Suite', 'Kali Linux and Metasploit', 'Traffic triage and alert review']
  },
  {
    id: 'project-vault',
    title: 'PROJECT VAULT',
    short: 'WORK',
    theme: 'Project showcase with live demos and repositories',
    heading: 'Cybersecurity Projects',
    description:
      'My portfolio includes projects for digital footprint awareness, network traffic analysis, SOC learning, and steganography exploration.',
    bullets: ['FootprintCheck', 'Network Traffic Triage', 'SOC Homelab Tracker', 'StegoVault']
  },
  {
    id: 'forensics-archive',
    title: 'FORENSICS ARCHIVE',
    short: 'CAREER',
    theme: 'Experience, education, achievements, and certifications',
    heading: 'Learning Through Practice',
    description:
      'I build my cybersecurity profile through internships, leadership roles, certifications, and hands-on project development.',
    bullets: ['Movidu Technologies internship', 'IEEE leadership roles', 'Forage job simulations and certifications']
  },
  {
    id: 'terminal-nexus',
    title: 'TERMINAL NEXUS',
    short: 'TERM',
    theme: 'Interactive command console',
    heading: 'Portfolio Command Interface',
    description:
      'A safe interactive terminal lets visitors query the portfolio using simple commands like help, skills, projects, contact, and resume.',
    bullets: ['Command history', 'Useful shortcuts', 'Resume and contact commands']
  },
  {
    id: 'uplink',
    title: 'UPLINK STATION',
    short: 'CONTACT',
    theme: 'Final contact and resume destination',
    heading: 'Connect With Me',
    description:
      'The final destination provides direct access to my email, GitHub, LinkedIn, and updated photo-free resume.',
    bullets: ['Email and LinkedIn', 'GitHub profile', 'Updated resume PDF']
  }
];

export const skills = {
  'Security & Analysis': ['Network Security', 'Threat Analysis', 'Vulnerability Assessment', 'SOC Fundamentals', 'Incident Response Basics'],
  'Tools': ['Wireshark', 'Nmap', 'Burp Suite', 'Kali Linux', 'Metasploit'],
  'Development': ['Java', 'Frontend Development', 'Tailwind CSS', 'JSON'],
  'Foundations': ['Computer Networks', 'Operating Systems', 'Security Basics', 'SIEM Concepts']
};

export const projects = [
  {
    name: 'FootprintCheck',
    subtitle: 'Digital footprint awareness',
    desc: 'A consent-oriented project exploring how public information contributes to digital exposure awareness.',
    demo: 'https://pavu1234.github.io/FootprintCheck/',
    repo: 'https://github.com/pavu1234/FootprintCheck'
  },
  {
    name: 'Network Traffic Triage',
    subtitle: 'Observe. Filter. Investigate.',
    desc: 'A browser-based workspace for CSV traffic review, filtering, endpoint analysis, and anomaly investigation.',
    demo: 'https://pavu1234.github.io/Network-traffic/',
    repo: 'https://github.com/pavu1234/Network-traffic'
  },
  {
    name: 'SOC Homelab Tracker',
    subtitle: 'Document the investigation',
    desc: 'A structured workspace to record homelab phases, detections, investigations, and observations.',
    demo: 'https://pavu1234.github.io/SOC-Homelab-Tracker/',
    repo: 'https://github.com/pavu1234/SOC-Homelab-Tracker'
  },
  {
    name: 'StegoVault',
    subtitle: 'Information within information',
    desc: 'An educational project exploring image-based steganography and information-hiding workflows.',
    demo: 'https://pavu1234.github.io/StegoVault/',
    repo: 'https://github.com/pavu1234/StegoVault'
  }
];

export const experience = [
  {
    title: 'Cybersecurity Internship',
    org: 'Movidu Technologies Pvt. Ltd.',
    year: '2026',
    desc: 'Exposure to vulnerability assessment, network security, and incident-response concepts using Kali Linux, Nmap, Burp Suite, and Wireshark.'
  },
  {
    title: 'Frontend Development Internship',
    org: 'InternPe',
    year: '2025',
    desc: 'Worked on practical web tasks and improved frontend development fundamentals.'
  }
];

export const achievements = [
  'Outstanding Student 2025 — IEEE AESS Bangalore Chapter',
  'Operating Committee Chairperson — BEC IEEE Student Branch',
  'Secretary — IEEE AESS Chapter, Basaveshwar Engineering College'
];

export const certifications = [
  'Java for Artificial Intelligence',
  'Cyber Crimes and Computer Forensics',
  'Mastercard Cybersecurity Job Simulation — Forage',
  'Tata Cybersecurity Job Simulation — Forage',
  'Certified LLM Security Professional (CLLMSP)'
];
