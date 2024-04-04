import { createContext, useContext, ReactNode } from "react";
import {
  useMatches,
  useNavigation as useRemixNavigation,
} from "@remix-run/react";

type Props = {
  children: ReactNode;
};

type Navigation = {
  isLoading: boolean;
  locationPath: string;
  nextPageCurrentlyLoading: string | boolean;
  routePath: string;
};

const navigation: Navigation = {
  isLoading: false,
  locationPath: "",
  nextPageCurrentlyLoading: false,
  routePath: "",
};

const NavigationContext = createContext(navigation);
const useNavigation = () => useContext(NavigationContext);

const NavigationProvider = ({ children }: Props) => {
  const remixNavigation = useRemixNavigation();
  const routes = useMatches();

  let { isLoading, locationPath, nextPageCurrentlyLoading, routePath } =
    navigation;

  isLoading = remixNavigation.state === "loading";
  routePath = routes[routes.length - 1].pathname;
  locationPath = routePath.replace(/\/\s*$/, "");
  nextPageCurrentlyLoading =
    (remixNavigation.state === "loading" &&
      remixNavigation.location.pathname) ||
    false;

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
