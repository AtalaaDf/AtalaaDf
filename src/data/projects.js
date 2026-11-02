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
        title: 'Project 1',
        description: 'Deskripsi project akan diisi oleh pemilik project. Menjelaskan fitur utama dan hasil yang dicapai.',
        image: '',
        technologies: ['React.Js', 'Tailwind', 'Node.Js'],
        visitUrl: 'https://github.com/AtalaaDf',
      },
      {
        id: 'q1-p2',
        title: 'Project 2',
        description: 'Deskripsi project akan diisi oleh pemilik project. Menjelaskan fitur utama dan hasil yang dicapai.',
        image: '',
        technologies: ['TypeScript', 'Express.js', 'Supabase'],
        visitUrl: 'https://github.com/AtalaaDf',
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
        title: 'Project 3',
        description: 'Deskripsi project akan diisi oleh pemilik project. Menjelaskan fitur utama dan hasil yang dicapai.',
        image: '',
        technologies: ['React.Js', 'Tailwind'],
        visitUrl: 'https://github.com/AtalaaDf',
      },
      {
        id: 'q2-p2',
        title: 'Project 4',
        description: 'Deskripsi project akan diisi oleh pemilik project. Menjelaskan fitur utama dan hasil yang dicapai.',
        image: '',
        technologies: ['Node.Js', 'Figma'],
        visitUrl: 'https://github.com/AtalaaDf',
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
        title: 'Project 5',
        description: 'Deskripsi project akan diisi oleh pemilik project. Menjelaskan fitur utama dan hasil yang dicapai.',
        image: '',
        technologies: ['TypeScript', 'Tailwind'],
        visitUrl: 'https://github.com/AtalaaDf',
      },
      {
        id: 'q3-p2',
        title: 'Project 6',
        description: 'Deskripsi project akan diisi oleh pemilik project. Menjelaskan fitur utama dan hasil yang dicapai.',
        image: '',
        technologies: ['Express.js', 'Supabase'],
        visitUrl: 'https://github.com/AtalaaDf',
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
