import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Access a comprehensive list of stars with detailed information about their properties and features.",
          "Contribute to our catalog by adding new stars and expanding our knowledge of the universe.",
          "Find out which stars are closest to a potential supernova and what makes them special.",
        ],
        autoStart: true,
        loop: true,
        delay: 40,
        deleteSpeed: 15,
        startDelay: 3000,
      }}
    />
  );
}

export default Type;
