import type { ArsenalGroup } from "@/types/arsenal";

export const arsenalGroups: ArsenalGroup[] = [
  {
    family: "frontend",
    title: "Frontend",
    items: [
      { id: "react", label: "React" },
      { id: "nextjs", label: "Next.js" },
      { id: "tailwindcss", label: "Tailwind CSS" },
    ],
  },
  {
    family: "backend",
    title: "Backend",
    items: [
      { id: "nodejs", label: "Node.js" },
      { id: "postgresql", label: "PostgreSQL" },
      { id: "supabase", label: "Supabase" },
    ],
  },
  {
    family: "devops",
    title: "DevOps",
    items: [
      { id: "github-actions", label: "GitHub Actions" },
      { id: "docker", label: "Docker" },
      { id: "vercel", label: "Vercel" },
    ],
  },
];

export const arsenalTags: string[] = [
  "TypeScript",
  "Accessibility",
  "Performance",
  "Testing",
  "DX",
];
