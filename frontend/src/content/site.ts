// All site copy lives here. Edit this file to change what the page says.

export const company = {
  name: 'MVX Technologies Inc.',
  lede: 'Systems engineering across the full physics spectrum, from simulation software to flight hardware.',
  where: 'Engineering firm based in Quebec City, founded in 2025.',
  email: 'marc-andre.vigneault@mvxtechnologies.com',
  github: 'https://github.com/marcandrevigneault',
  linkedin: 'https://www.linkedin.com/in/marc-andr%C3%A9-vigneault/',
}

export interface WorkItem {
  year: number
  title: string
  category: string
  description: string
  tags: string[]
  link?: string
}

export const work: WorkItem[] = [
  {
    year: 2026,
    title: 'Satellite imagery and thermal calibration contract',
    category: 'Contract engineering',
    description:
      'Satellite imagery data processing, R&D on thermal radiance calibration, and overall technical engineering support.',
    tags: ['Python', 'Remote sensing', 'Thermal infrared', 'Radiometric calibration'],
  },
  {
    year: 2025,
    title: 'EarthDaily observation satellite constellation',
    category: 'Systems engineering, by Marc-André at ABB Space & Defense',
    description:
      'Core team member on EDOSS. Design, technical management and testing of high-resolution flight-integrated systems for an Earth-observation constellation.',
    tags: ['Python', 'Optics', 'Algorithms', 'Systems engineering'],
    link: 'https://earthdaily.com/blog/earthdaily-analytics-to-launch-its-first-satellite',
  },
  {
    year: 2022,
    title: 'PyTissueOptics',
    category: 'Scientific software',
    description:
      'Python module for 3D Monte Carlo simulation of light propagation in complex media, with GPU acceleration.',
    tags: ['Python', 'CUDA', 'C++', 'Scientific computing'],
    link: 'https://github.com/DCC-Lab/PyTissueOptics',
  },
  {
    year: 2019,
    title: 'Sounding rocket payload: fin strain sensing',
    category: 'Payload lead',
    description:
      "Fibre Bragg grating frequency-sweep strain detection on the rocket's metal fins, for high-altitude atmospheric research.",
    tags: ['ECAD', 'Signal processing', 'Fibre optics'],
    link: '/documents/FBG_grating_sweep_strain_sensor_Vigneault_Mercier.pdf',
  },
  {
    year: 2018,
    title: 'Sounding rocket payload: rotation sensing',
    category: 'Payload lead',
    description:
      'Fibred Sagnac interferometer for high-precision rotation sensing in a sounding-rocket environment.',
    tags: ['ECAD', 'Signal processing', 'Fibre optics'],
  },
]

export interface TeamMember {
  id: string
  initials: string
  name: string
  role: string
  summary: string
  span: { title: string; skills: string }[]
  experience: { when: string; title: string; description: string }[]
  cvPdf?: string
}

export const team: TeamMember[] = [
  {
    id: 'mav',
    initials: 'MV',
    name: 'Marc-André Vigneault',
    role: 'Lead engineer and administrator',
    summary:
      'Marc-André is a systems engineer who works across the full physics spectrum. He takes a system from requirements and simulation through software, electronics, optics and mechanical design, then into integration and verification of real hardware. He was a core systems engineer on the EarthDaily Earth-observation constellation at ABB Space & Defense, led two sounding-rocket payloads, and wrote PyTissueOptics, a GPU-accelerated Monte Carlo light simulator.',
    span: [
      { title: 'Simulation', skills: 'Monte Carlo light transport, ray tracing, computational physics' },
      { title: 'Software', skills: 'Python, C++, CUDA, TypeScript, CI/CD, system architecture' },
      { title: 'Electronics', skills: 'ECAD, signal processing, instrument electronics' },
      { title: 'Optics', skills: 'Photonics, spectroscopy, fibre sensors, interferometry' },
      { title: 'Mechanics', skills: '3D design, FEA, rapid prototyping, additive manufacturing' },
      { title: 'Integration and test', skills: 'Verification planning, flight-system testing, technical management' },
    ],
    experience: [
      {
        when: '2026',
        title: 'Contract engineer, satellite imagery and thermal calibration',
        description:
          'Satellite imagery data processing, R&D on thermal radiance calibration, and overall technical engineering support.',
      },
      {
        when: '2025',
        title: 'R&D systems engineer, ABB Space & Defense',
        description:
          'Core team member on the EarthDaily EDOSS constellation. Design, technical management and testing of high-resolution flight-integrated systems.',
      },
      {
        when: '2025',
        title: 'Electronics lead, snow optical-properties instrument',
        description:
          'Instrument electronics for measuring the shortwave irradiance profile in snow, published in The Cryosphere.',
      },
      {
        when: '2022',
        title: 'M.Sc. Physics, Université Laval',
        description:
          'Thesis on PyTissueOptics: 3D Monte Carlo light simulation for biophotonics with arbitrary geometries and hardware acceleration.',
      },
      {
        when: '2018–2019',
        title: 'Payload lead, GAUL sounding rockets',
        description:
          "Fibre Bragg grating strain sensing on the rocket's fins, and a fibred Sagnac interferometer for rotation sensing.",
      },
    ],
    cvPdf: '/documents/cv_marcandrevigneault_engineer_2025.pdf',
  },
]

export const services = [
  {
    title: 'Hourly work',
    rate: 'Rate on request',
    description: 'Expert help on cross-disciplinary problems.',
    features: 'Calls, code review, prototyping, research, documentation, cleanroom manufacturing',
  },
  {
    title: 'Project based',
    rate: 'Custom quote',
    description: 'The full lifecycle, from concept to deployment and handover.',
    features: 'Planning, development, testing and validation, documentation, post-deployment support',
  },
  {
    title: 'Partnership',
    rate: 'Shared risk and reward',
    description: 'Long-term collaboration on new ideas.',
    features: 'Co-development, joint research, publications, revenue sharing, equity',
  },
]

export interface Product {
  name: string
  icon: string
  description: string
  appStore?: string
  googlePlay?: string
  website?: string
  status?: string
}

export const products: Product[] = [
  {
    name: 'Inukshuk',
    icon: '/products/inukshuk.png',
    description: 'Offline trail navigation on official georeferenced PDF maps. Free, no account.',
    appStore: 'https://apps.apple.com/ca/app/inukshuk/id6797629589',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.inukshuk.app',
    website: 'https://inukshuk.mvxtechnologies.com',
  },
  {
    name: 'Trivial Tuner',
    icon: '/products/trivial-tuner.png',
    description: 'A precision tuner that shows its real ± uncertainty, with a guided piano mode.',
    status: 'Coming soon to the App Store and Google Play',
  },
]

export const publications = [
  {
    year: 2025,
    title: 'Impact of shrub branches on the shortwave vertical irradiance profile in snow',
    venue: 'The Cryosphere, 19, 1757–1774',
    link: 'https://tc.copernicus.org/articles/19/1757/2025/tc-19-1757-2025.pdf',
  },
  {
    year: 2025,
    title:
      'PyTissueOptics: a hardware-accelerated Python module for 3D Monte Carlo simulation of light propagation in complex media',
    venue: 'Journal of Biomedical Optics, forthcoming',
  },
  {
    year: 2022,
    title: "Master's thesis: a Python Monte Carlo light simulation package for biophotonics with arbitrary 3D geometries",
    venue: 'Université Laval, Physics and Engineering Physics',
    link: '/documents/master_thesis_marcandrevigneault_27_08_2024.pdf',
  },
  {
    year: 2021,
    title: 'Tools and tutorial on practical ray tracing for microscopy',
    venue: 'Neurophotonics 8 (1), 010801',
    link: 'https://www.spiedigitallibrary.org/journals/neurophotonics/volume-8/issue-1/010801/Tools-and-tutorial-on-practical-ray-tracing-for-microscopy/10.1117/1.NPh.8.1.010801.full',
  },
]
