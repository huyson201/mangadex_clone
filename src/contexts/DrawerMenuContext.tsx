import React, { useState } from 'react'

export interface DrawerMenuContextState {
  isActive: boolean,
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>
}
export interface DrawerMenuProviderProps {
  children?: React.ReactNode
}

export const DrawerMenuContext = React.createContext<DrawerMenuContextState>({
  isActive: false
})

export const useDrawerMenu = () => React.useContext(DrawerMenuContext)

function DrawerMenuProvider({ children }: DrawerMenuProviderProps) {
  const [isActive, setIsActive] = useState(false)
  return (
    <DrawerMenuContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </DrawerMenuContext.Provider>
  )
}

export default DrawerMenuProvider