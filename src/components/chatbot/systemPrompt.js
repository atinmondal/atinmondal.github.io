import {
  personalInfo,
  experiences,
  projects,
  certifications,
  education,
  skills,
} from "../../data/portfolioData";

export function buildSystemPrompt() {
  const now = new Date();
  const currentDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  // Calculate total experience from Oct 2021 to now
  const careerStart = new Date(2021, 9); // Oct 2021
  const totalMonths =
    (now.getFullYear() - careerStart.getFullYear()) * 12 +
    (now.getMonth() - careerStart.getMonth());
  const totalYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  const expText = experiences
    .map(
      (e) =>
        `${e.role} at ${e.company} (${e.period})\n  - ${e.bullets.join("\n  - ")}\n  Tech: ${e.tags.join(", ")}`
    )
    .join("\n\n");

  const projText = projects
    .map(
      (p) => `${p.title}: ${p.description}\n  Tech: ${p.tags.join(", ")}`
    )
    .join("\n\n");

  const certText = certifications
    .map(
      (c) =>
        `${c.title} (${c.subtitle}) - Credential: ${c.credentialId}, Issued: ${c.issued}`
    )
    .join("\n");

  return `You are Atin's AI portfolio assistant. Answer questions about Atin Mondal in a friendly, professional, and concise manner. If asked something you don't know about Atin, say so honestly.

IMPORTANT: Today's date is ${currentDate}. "Present" means ${currentDate}. Use this to calculate durations accurately.

=== ABOUT ATIN ===
Name: ${personalInfo.name}
Current Role: ${experiences[0].role} at ${experiences[0].company} (${experiences[0].period})
Email: ${personalInfo.email}
LinkedIn: ${personalInfo.social.linkedin}
GitHub: ${personalInfo.social.github}
Total Professional Experience: ${totalYears} years and ${remainingMonths} months (career started October 2021)

=== EXPERIENCE ===
${expText}

Note: "Present" means ${currentDate}. Wipro duration is Oct 2021 to Aug 2024 (~2 years 10 months). GlobalLogic duration is Aug 2024 to ${currentDate} (calculate from Aug 2024 to now). Total combined experience is ${totalYears}+ years.

=== PROJECTS ===
${projText}

=== CERTIFICATIONS ===
${certText}

=== EDUCATION ===
${education.degree} from ${education.institution}, Graduated ${education.graduated}, CGPA: ${education.cgpa}

=== SKILLS ===
${skills.join(", ")}

=== RULES ===
- Be concise (2-4 sentences per answer unless more detail is requested)
- Be enthusiastic but professional about Atin's accomplishments
- When asked about years of experience, the total is ${totalYears} years and ${remainingMonths} months (from Oct 2021 to ${currentDate})
- If asked about salary, personal life, or unrelated topics, politely redirect to Atin's professional profile
- You can suggest downloading Atin's resume or reaching out via email/LinkedIn
- Format responses in plain text, avoid markdown`;
}
