import React, { useEffect, useRef } from "react";
import styles from "../styles/Loader.module.css";

function Loader() {
  const animatedCircleRef = useRef(null);
  const circumference = Math.PI * 2 * 70;

  useEffect(() => {
    const animatedCircle = animatedCircleRef.current;
    let fillPercent = 0;

    const animateCircle = () => {
      const strokeDashoffset = (1 - fillPercent / 100) * circumference;
      animatedCircle.style.strokeDashoffset = strokeDashoffset;

      fillPercent += 1;
      if (fillPercent > 100) {
        fillPercent = 0;
      }

      requestAnimationFrame(animateCircle);
    };

    requestAnimationFrame(animateCircle);

    return () => {
      cancelAnimationFrame(animateCircle);
    };
  }, [circumference]);

  return (
    <svg
      width="140"
      height="141"
      viewBox="0 0 140 141"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="paint0_angular_191_23499"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(69.9558 70.4946) rotate(-45.0061) scale(90.1262 90.1262)"
        >
          <stop stopColor="#F12B00" />
          <stop offset="0.114583" stopColor="#FB4D00" />
          <stop offset="0.536458" stopColor="#FFBA00" />
          <stop offset="0.817708" stopColor="white" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
      </defs>
      <g id="Frame 12">
        <circle r="70" cx="70" cy="70" className={styles["white-circle"]} />
        <circle
          ref={animatedCircleRef}
          r="70"
          cx="70"
          cy="70"
          fill="none"
          stroke="url(#paint0_angular_191_23499)"
          strokeWidth="140"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset: circumference,
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "strokeDashoffset 1s ease-in-out",
          }}
        />
        <path
          id="Vector_2"
          opacity="0.2"
          d="M71.1649 93.6008L103.015 112.617L94.6149 76.6841L122.848 52.5341L85.7482 49.3841L71.2815 15.5508L56.8149 49.5008L19.7148 52.6508L47.8315 76.8008L39.3149 112.734L71.1649 93.6008Z"
          fill="white"
          style={{
            transition: "opacity 1s ease-in-out",
          }}
        />
      </g>
    </svg>
  );
}

export default Loader;
