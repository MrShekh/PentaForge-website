export type TeamMember = {
  id: string;
  name: string;
  /** Provisional owner-supplied title; edit here when confirmed. */
  role: string;
  portrait: { src: `/team/${string}`; position: string } | null;
};

// Names map to the owner's supplied filenames, not inferred facial identities.
// Set portrait to null for an intentional neutral placeholder, never a stock person.
export const team: TeamMember[] = [
  { id: 'asif', name: 'Asif', role: 'Full-Stack Development', portrait: { src: '/team/asif.webp', position: '50% 45%' } },
  { id: 'kavya', name: 'Kavya', role: 'Frontend & Backend Development', portrait: { src: '/team/kavya.webp', position: '50% 40%' } },
  { id: 'abhishek', name: 'Abhishek Vishwakarma', role: 'Security & Backend Development', portrait: { src: '/team/abhishek.webp', position: '50% 55%' } },
];
