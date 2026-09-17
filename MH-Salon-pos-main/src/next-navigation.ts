import React from "react";

export function usePathname(): string {
  const [pathname, setPathname] = React.useState(window.location.pathname);
  React.useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  return pathname;
}

export function useRouter() {
  const navigate = (url: string, replace = false) => {
    if (replace) window.history.replaceState({}, "", url);
    else window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return {
    push: (url: string) => navigate(url),
    replace: (url: string) => navigate(url, true),
    back: () => window.history.back(),
  };
}

export function useSearchParams() {
  const pathname = usePathname();
  return React.useMemo(() => new URLSearchParams(window.location.search), [pathname]);
}
