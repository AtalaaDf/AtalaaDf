import { useState } from 'react'
import ProjectQuarterContext from '../../hooks/ProjectQuarterContext'

export default function ProjectQuarterProvider({ children }) {
  const [selectedQuarterId, setSelectedQuarterId] = useState('q1')

  return (
    <ProjectQuarterContext.Provider
      value={{ selectedQuarterId, setSelectedQuarterId }}
    >
      {children}
    </ProjectQuarterContext.Provider>
  )
}
