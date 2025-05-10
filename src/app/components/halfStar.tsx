import React from "react";

const HalfStar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <linearGradient id="halfGrad">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>

    {/* Base star for the shadow (right side) */}
    <path
      d="M12 .587l3.668 7.431L24 9.753l-6 5.854 
         1.416 8.26L12 19.896l-7.416 3.971L6 
         15.607 0 9.753l8.332-1.735z"
      fill="#e5e7eb"  // Tailwind's gray-200
    />

    {/* Top layer with left half fill */}
    <path
      d="M12 .587l3.668 7.431L24 9.753l-6 5.854 
         1.416 8.26L12 19.896l-7.416 3.971L6 
         15.607 0 9.753l8.332-1.735z"
      fill="url(#halfGrad)"
    />
  </svg>
);

export default HalfStar;
