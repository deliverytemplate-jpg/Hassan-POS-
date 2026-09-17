import React from "react";
import { useRouter } from "./next-navigation";

export default function Link({ href, children, onClick, ...props }: React.ComponentProps<"a"> & { href: string }) {
  const router = useRouter();
  return <a {...props} href={href} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && href.startsWith("/")) { event.preventDefault(); router.push(href); } }}>{children}</a>;
}
