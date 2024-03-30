import { createContext, useContext, ReactNode } from "react";
import {
  useMatches,
  useNavigation as useRemixNavigation,
} from "@remix-run/react";

const NavigationContext = createContext({});
const useNavigation = () => useContext(NavigationContext);

type Props = {
  children: ReactNode;
};

interface Navigation {
  isLoading: boolean;
  locationPath: string;
  nextPageCurrentlyLoading: boolean;
  routePath: string;
}

const NavigationProvider = ({ children }: Props) => {
  const navigation = useRemixNavigation();
  const routes = useMatches();

  const isLoading = navigation.state === "loading";
  const routePath = routes[routes.length - 1].pathname;
  const locationPath = routePath.replace(/\/\s*$/, "");
  const nextPageCurrentlyLoading =
    navigation.state === "loading" && navigation.location.pathname;

  return (
    <NavigationContext.Provider
      value={
        {
          isLoading,
          locationPath,
          nextPageCurrentlyLoading,
          routePath,
        } as Navigation
      }
    >
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationProvider, useNavigation };
