import { createContext, useContext, useState } from "react";

type TabbarPositionContext = {
  hidden: boolean;
  showTabbar: () => void;
  hideTabbar: () => void;
};

export const TabbarContext = createContext<TabbarPositionContext>({
  hidden: true,
  showTabbar: () => {},
  hideTabbar: () => {},
});

const TabbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [hidden, setHidden] = useState(true);

  const showTabbar = () => {
    setHidden(false);
  };

  const hideTabbar = () => {
    setHidden(true);
  };

  return (
    <TabbarContext.Provider value={{ hidden, showTabbar, hideTabbar }}>
      {children}
    </TabbarContext.Provider>
  );
};

export default TabbarProvider;

export const useTabbarVisibility = () => {
  const values = useContext(TabbarContext);

  return values;
};
