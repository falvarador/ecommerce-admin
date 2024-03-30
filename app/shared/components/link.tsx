import { Link as RemixLink } from "@remix-run/react";

import { useNavigation } from "~/shared/context/navigation";

interface Props {
  to: string;
  "aria-current"?: "page" | false;
  preventScrollReset?: boolean;
}

export default function Link({
  "aria-current": ariaCurrent,
  preventScrollReset = false,
  to,
  ...props
}: Props) {
  const { locationPath } = useNavigation();
  const isExternalLink = to ? to.startsWith("http") : false;
  const isCurrent =
    (locationPath === to && ariaCurrent !== false) ||
    (ariaCurrent && ariaCurrent !== false);

  return (
    <RemixLink
      to={to}
      {...(isCurrent && { "aria-current": "page" })}
      {...(isExternalLink && { target: "_blank", rel: "noopener noreferrer" })}
      preventScrollReset={preventScrollReset}
      {...props}
    />
  );
}
