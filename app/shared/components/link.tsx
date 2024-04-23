import { Link as RemixLink, useLocation } from "@remix-run/react";
import React from "react";

interface Props {
  href: string;
  "aria-current"?: false;
  preventScrollReset?: boolean;
  children?: React.ReactNode;
}

export default function Link({
  "aria-current": ariaCurrent,
  preventScrollReset = false,
  href,
  ...props
}: Props) {
  const { pathname } = useLocation();
  const isExternalLink = href ? href.startsWith("http") : false;
  const isCurrent =
    (pathname === href && ariaCurrent !== false) ||
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
