import React, { useState } from 'react'

export interface HeadSearchContextState {
  isActive: boolean,
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>
}
export interface HeadSearchProviderProps {
  children?: React.ReactNode
}

export const HeadSearchContext = React.createContext<HeadSearchContextState>({
  isActive: false
})

export const useHeadSearch = () => React.useContext(HeadSearchContext)

function HeadSearchProvider({ children }: HeadSearchProviderProps) {
  const [isActive, setIsActive] = useState(false)
  return (
    <HeadSearchContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </HeadSearchContext.Provider>
  )
}

export default HeadSearchProvider