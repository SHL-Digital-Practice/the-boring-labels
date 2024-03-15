"use client";

import { FrownIcon, LaughIcon, MenuIcon } from "lucide-react";
import { useHover } from "@uidotdev/usehooks";

export default function Nav() {
  const [ref, hovering] = useHover();

  return (
    <nav className="px-6 py-4 flex justify-between bg-primary rounded-2xl mt-2 mx-2">
      <MenuIcon className="text-primary-foreground" />
      <ul ref={ref}>
        {hovering ? (
          <FrownIcon className="text-primary-foreground" />
        ) : (
          <LaughIcon className="text-primary-foreground" />
        )}
      </ul>
    </nav>
  );
}
