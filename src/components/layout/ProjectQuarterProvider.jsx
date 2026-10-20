import { useState, useCallback, useMemo } from 'react'
import ProjectQuarterContext from '../../hooks/ProjectQuarterContext'
import { PROJECTS_QUARTERS_DATA } from '../../data/projects'

export default function ProjectQuarterProvider({ children }) {
  const [activeQuarterIndex, setActiveQuarterIndex] = useState(0)
  const [isInProjects, setIsInProjects] = useState(false)

  const selectedQuarterId = useMemo(() => {
    return PROJECTS_QUARTERS_DATA[activeQuarterIndex]?.id || 'q1'
  }, [activeQuarterIndex])

  const setSelectedQuarterId = useCallback((id) => {
    const foundIndex = PROJECTS_QUARTERS_DATA.findIndex((q) => q.id === id)
    if (foundIndex !== -1) {
      setActiveQuarterIndex(foundIndex)
    }
  }, [])

  return (
    <ProjectQuarterContext.Provider
      value={{
        activeQuarterIndex,
        setActiveQuarterIndex,
        selectedQuarterId,
        setSelectedQuarterId,
        isInProjects,
        setIsInProjects,
        quartersData: PROJECTS_QUARTERS_DATA,
      }}
    >
      {children}
    </ProjectQuarterContext.Provider>
  )
}

