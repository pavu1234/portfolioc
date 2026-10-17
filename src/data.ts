export type Project = {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  category: string;
  tags: string[];
  description: string;
  repo: string;
  demo: string;
};

export const profile = {
  name: 'ALUR PRAVEEN',
  email: 'alurpraveen4217@gmail.com',
  phone: '+91 9606077008',
  location: 'Hosapete, Karnataka, India',
  github: 'https://github.com/pavu1234/',
  linkedin: 'https://www.linkedin.com/in/alur-praveen-607899269'
};

export const projects: Project[] = [
  {
    id: 'footprintcheck',
    index: '01',
    name: 'FootprintCheck',
    subtitle: 'Digital footprint awareness',
    category: 'Web Security',
    tags: ['Footprint', 'Awareness', 'Web'],
    description: 'A consent-oriented project exploring how public information can contribute to digital exposure awareness.',
    repo: 'https://github.com/pavu1234/FootprintCheck',
    demo: 'https://pavu1234.github.io/FootprintCheck/'
  },
  {
    id: 'network-traffic',
    index: '02',
    name: 'Network Traffic Triage',
    subtitle: 'Observe. Filter. Investigate.',
    category: 'Network Security',
    tags: ['Traffic', 'CSV', 'SOC'],
    description: 'A browser-based investigation workspace for exported traffic analysis and rule-based anomaly review.',
    repo: 'https://github.com/pavu1234/Network-traffic',
    demo: 'https://pavu1234.github.io/Network-traffic/'
  },
  {
    id: 'soc-homelab',
    index: '03',
    name: 'SOC Homelab Tracker',
    subtitle: 'Document the investigation',
    category: 'SOC / Blue Team',
    tags: ['SOC', 'Homelab', 'Documentation'],
    description: 'A structured workspace to record security lab progress, observations, detections, and investigation notes.',
    repo: 'https://github.com/pavu1234/SOC-Homelab-Tracker',
    demo: 'https://pavu1234.github.io/SOC-Homelab-Tracker/'
  },
  {
    id: 'stegovault',
    index: '04',
    name: 'StegoVault',
    subtitle: 'Information within information',
    category: 'Cryptography',
    tags: ['Steganography', 'Security', 'Images'],
    description: 'An educational project exploring hidden-message workflows in images and awareness of information hiding limits.',
    repo: 'https://github.com/pavu1234/StegoVault',
    demo: 'https://pavu1234.github.io/StegoVault/'
  }
];

export const skills = [
  {
    title: 'Security & Analysis',
    items: ['Network Security', 'Threat Analysis', 'Vulnerability Assessment', 'SOC Fundamentals', 'Incident Response Fundamentals']
  },
  {
    title: 'Tools',
    items: ['Wireshark', 'Nmap', 'Burp Suite', 'Kali Linux', 'Metasploit']
  },
  {
    title: 'Development',
    items: ['Java', 'Frontend Development', 'Tailwind CSS', 'JSON']
  },
  {
    title: 'Foundations',
    items: ['Computer Networks', 'Operating Systems', 'Security Basics', 'SIEM Concepts']
  }
];

export const certifications = [
  'Java for Artificial Intelligence',
  'Cyber Crimes and Computer Forensics',
  'Mastercard Cybersecurity Job Simulation — Forage',
  'Tata Cybersecurity Job Simulation — Forage',
  'Certified LLM Security Professional (CLLMSP)'
];
