import { Link as RemixLink } from "@remix-run/react";
import React from "react";

import { useNavigation } from "~/shared/context/navigation-provider";

interface Props {
  href: string;
  "aria-current"?: false;
  preventScrollReset?: boolean;
  children?: React.ReactNode;
}

export default function A({
  "aria-current": ariaCurrent,
  preventScrollReset = false,
  href,

  ...props
}: Props) {
  const { locationPath } = useNavigation();
  const isExternalLink = href ? href.startsWith("http") : false;
  const isCurrent =
    (locationPath === href && ariaCurrent !== false) ||
    (ariaCurrent && ariaCurrent !== false);

  return (
    <RemixLink
      to={href}
      {...(isCurrent && { "aria-current": "page" })}
      {...(isExternalLink && { target: "_blank", rel: "noopener noreferrer" })}
      preventScrollReset={preventScrollReset}
      {...props}
    >
      {props.children}
    </RemixLink>
  );
}
