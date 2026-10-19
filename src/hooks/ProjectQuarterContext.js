import { createContext, useContext } from 'react'

const ProjectQuarterContext = createContext(null)

export function useProjectQuarter() {
  const context = useContext(ProjectQuarterContext)

  if (!context) {
    throw new Error('useProjectQuarter must be used within ProjectQuarterProvider.')
  }

  return context
}

export default ProjectQuarterContext
