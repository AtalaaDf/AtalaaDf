import srifoton from '../assets/project/srifoton.png';
import Midterm from '../assets/project/ProjectUTS.png';
import IGRS from '../assets/project/IGRS.png';
import Simbisnis from '../assets/project/Simbisnis.png';
import FattahWo from '../assets/project/FattahWo.png';

export const PROJECTS_QUARTERS_DATA = [
  {
    id: 'q1',
    year: '2025-2026',
    quarter: 'Quarter 1',
    title: 'Project Quarter 1',
    isProgress: false,
    projects: [
      {
        id: 'q1-p1',
        title: 'Srifoton 2025',
        description: 'A website for the annual information technology event organized by the Sriwijaya University Informatics Student Association. (NOW WEBSITE IS UPDATED)',
        image: srifoton,
        technologies: ['Next.Js', 'Tailwind'],
        visitUrl: 'https://srifoton.hmifunsri.com/',
      },
    ],
  },
  {
    id: 'q2',
    year: '2026',
    quarter: 'Quarter 2',
    title: 'Project Quarter 2',
    isProgress: false,
    projects: [
      {
        id: 'q2-p1',
        title: 'Midterm Project GDGoC',
        description: 'A movie database website that allows users to browse and search for their favorite films.',
        image: Midterm,
        technologies: ['React.Js', 'Tailwind', 'OMDB API'],
        visitUrl: 'https://bigers-movie.vercel.app/',
      },
      {
        id: 'q2-p2',
        title: 'IGRS Redesign',
        description: 'This project is a redesigned web application for the Indonesia Game Rating System (IGRS), based on the Regulation of the Minister of Communication and Informatics No. 2/2024.',
        image: IGRS,
        technologies: ['React.Js', 'Figma', 'Prisma ORM', 'MySQL', 'Tailwind'],
        visitUrl: 'https://indonesia-game-rating-system.vercel.app/',
      },
    ],
  },
  {
    id: 'q3',
    year: '2026',
    quarter: 'Quarter 3',
    title: 'Project Quarter 3',
    isProgress: false,
    projects: [
      {
        id: 'q3-p1',
        title: 'Simbisnis',
        description: 'A business decision simulation tool for UMKM. SimBisnis projects the impact of hypothetical decisions.',
        image: Simbisnis,
        technologies: ['React.js', 'Tailwind', 'Supabase'],
        visitUrl: 'https://simbisnis.vercel.app/',
      },
      {
        id: 'q3-p2',
        title: 'Fattah-Wo',
        description: 'An application designed to streamline schedule management, worker assignments, and event reservations; created to fulfill the GDGoC Front-End Development final project.',
        image: FattahWo,
        technologies: ['React.js','Tailwind', 'Supabase'],
        visitUrl: 'https://fattah-wo-app.vercel.app/',
      },
    ],
  },
  {
    id: 'q4',
    year: '2026',
    quarter: 'Quarter 4',
    title: '',
    isProgress: true,
    progressText: 'ON PROGRESS.....',
    projects: [],
  },
]

// Susun seluruh item project dari data quarters dalam bentuk array datar (flat)
export function getAllProjects(quartersData = PROJECTS_QUARTERS_DATA) {
  const all = []
  quartersData.forEach((quarter) => {
    if (quarter.isProgress) {
      all.push({
        id: quarter.id,
        quarterId: quarter.id,
        title: quarter.title || quarter.quarter,
        description: 'Project sedang dalam proses pengerjaan.',
        isProgress: true,
        progressText: quarter.progressText || 'ON PROGRESS.....',
        quarterLabel: quarter.quarter,
        quarterYear: quarter.year,
        technologies: ['Coming Soon'],
      })
    } else if (quarter.projects?.length) {
      quarter.projects.forEach((proj) => {
        all.push({
          ...proj,
          quarterId: quarter.id,
          quarterLabel: quarter.quarter,
          quarterYear: quarter.year,
        })
      })
    }
  })
  return all
}
