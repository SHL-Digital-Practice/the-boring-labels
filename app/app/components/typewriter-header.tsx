"use client";
import Typewriter from "typewriter-effect";

export default function TypeWriterHeader() {
  return (
    <Typewriter
      options={{
        strings: [
          "Labelling is boring.",
          "Tagging is boring.",
          "Categorizing is boring.",
        ],
        autoStart: true,
        loop: true,
        wrapperClassName: "font-bold text-3xl",
        cursorClassName: "text-3xl text-primary",
        delay: 50,
      }}
    />
  );
}
