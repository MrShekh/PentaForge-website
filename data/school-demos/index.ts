export const schoolIds = ['littlebloom', 'horizon', 'nextgen'] as const;
export type SchoolId = typeof schoolIds[number];
export type SchoolProgram = { title: string; ages: string; text: string; subjects: string[] };
export type SchoolEvent = { day: string; month: string; title: string; category: string; text: string };
export type SchoolPage = { slug: string; label: string; eyebrow: string; heading: string; introduction: string; kind: 'about' | 'programs' | 'teachers' | 'campus' | 'gallery' | 'admissions' | 'contact' | 'life' | 'achievements' | 'events' | 'student-portal' | 'parent-portal' };
export type SchoolDemo = {
  id: SchoolId; name: string; shortName: string; category: string; description: string; motto: string; area: string;
  hero: string; heroAlt: string; programs: SchoolProgram[]; pages: SchoolPage[]; events: SchoolEvent[];
  teachers: { name: string; role: string; focus: string }[];
};
const page = (slug: string, label: string, kind: SchoolPage['kind'], heading: string, introduction: string, eyebrow = label): SchoolPage => ({ slug, label, kind, heading, introduction, eyebrow });
export const schools: Record<SchoolId, SchoolDemo> = {
 littlebloom: {
  id: 'littlebloom', name: 'LittleBloom Academy', shortName: 'LittleBloom', category: 'Preschool & Kindergarten', description: 'Playful, welcoming digital experiences for early education.', motto: 'Small steps. Wonderful possibilities.', area: 'Rajkot concept campus', hero: 'preschool.webp', heroAlt: 'Teacher sharing a learning activity with young children — illustrative stock photograph',
  programs: [
   { title: 'Nursery', ages: 'Ages 3–4', text: 'A gentle first chapter, with familiar routines, sensory exploration and plenty of time to find a friend.', subjects: ['Story circles', 'Sensory play', 'Movement & music', 'Everyday independence'] },
   { title: 'Junior Kindergarten', ages: 'Ages 4–5', text: 'Big questions meet small discoveries. Children make, count, listen and learn to express what they notice.', subjects: ['Early language', 'Number stories', 'Creative discovery', 'Learning together'] },
   { title: 'Senior Kindergarten', ages: 'Ages 5–6', text: 'Growing confidence for the next adventure, through hands-on literacy, playful mathematics and shared projects.', subjects: ['Reading readiness', 'Patterns & numbers', 'Nature projects', 'Communication'] },
   { title: 'Primary Years', ages: 'Grades 1–4', text: 'A thoughtful bridge from play to purposeful learning, with room for curiosity in every subject.', subjects: ['Language & literature', 'Mathematics', 'Our living world', 'Art & wellbeing'] },
  ],
  pages: [
   page('about','About us','about','A little wonder goes a long way.','Our fictional school imagines childhood as a time to explore, belong and become. This is what a warm, family-centred school website can feel like.'),
   page('programs','Our programs','programs','A happy place for every growing stage.','From a first morning away from home to confident primary learning, each sample programme follows the pace of childhood.'),
   page('teachers','Our teachers','teachers','Kind hearts. Curious minds.','Meet the illustrative educators in our demo community. These sample profiles show how a school can introduce its teaching approach.'),
   page('campus-life','Campus life','campus','A day full of little discoveries.','A reading nook, a garden corner, a splash of paint: explore an imagined environment designed around young learners.'),
   page('gallery','Gallery','gallery','The joy is in the everyday.','Browse illustrative stock photographs of learning, making and playing. These are not photographs of an actual LittleBloom campus.'),
   page('admissions','Admissions','admissions','Their next adventure starts with hello.','Explore a sample admissions journey, ask the questions that matter and try the enquiry experience. No real admissions are being accepted.'),
   page('contact','Contact','contact','Let’s start a lovely conversation.','Preview how a family could arrange a school visit. Use sample details only; enquiries on this fictional school website are not sent.'),
  ],
  events: [
   { day: '08', month: 'NOV', title: 'A morning of muddy discovery', category: 'Outdoor learning', text: 'A sample garden day for planting seeds, noticing insects and getting happily muddy.' },
   { day: '15', month: 'NOV', title: 'Stories under the sunshine', category: 'Family morning', text: 'An illustrative family reading picnic with favourite books and gentle storytelling.' },
   { day: '22', month: 'NOV', title: 'Small hands, big creations', category: 'Art & making', text: 'An example showcase of colourful clay work, paper sculptures and imaginative play.' },
  ],
  teachers: [ { name: 'Mira Shah', role: 'Early Years Guide', focus: 'Turning everyday questions into sensory learning.' }, { name: 'Rohan Mehta', role: 'Primary Years Educator', focus: 'Building language and number confidence through stories.' }, { name: 'Anaya Patel', role: 'Creative Learning Guide', focus: 'Making space for art, movement and self-expression.' } ],
 },
 horizon: {
  id: 'horizon', name: 'Horizon International School', shortName: 'Horizon', category: 'Premium Private School', description: 'An elegant digital identity for excellence-focused institutions.', motto: 'An education for a wider world.', area: 'Ahmedabad concept campus', hero: 'campus.webp', heroAlt: 'Contemporary educational courtyard with open communal space — illustrative stock photograph',
  programs: [
   { title: 'Early Years', ages: 'Kindergarten', text: 'An inviting introduction to learning, where language, exploration and belonging come before formal milestones.', subjects: ['Inquiry through play', 'Early literacy', 'Creative expression', 'Social development'] },
   { title: 'Primary School', ages: 'Grades 1–5', text: 'A connected foundation in language, mathematics and the world, supported by thoughtful projects and reflection.', subjects: ['Literacy & languages', 'Mathematical thinking', 'Environmental inquiry', 'Arts & physical education'] },
   { title: 'Middle & Secondary', ages: 'Grades 6–10', text: 'Deeper subject understanding, growing independence and meaningful opportunities to collaborate beyond the classroom.', subjects: ['Science & humanities', 'Languages', 'Mathematics', 'Design & research'] },
   { title: 'Senior Secondary', ages: 'Grades 11–12', text: 'An illustrative pathway for focused study, personal direction and preparation for the choices after school.', subjects: ['Subject specialisation', 'Independent research', 'Career exploration', 'Community engagement'] },
  ],
  pages: [
   page('about','About the school','about','Perspective begins with possibility.','Horizon is a fictional school identity created to show how thoughtful digital design can express an institution’s character. No board affiliation or accreditation is claimed.'),
   page('academics','Academics','programs','Depth of knowledge. Breadth of perspective.','Explore an illustrative academic journey from early years to senior secondary. Curriculum and board details would be confirmed for a real institution.'),
   page('admissions','Admissions','admissions','The beginning of a considered journey.','A clear, welcoming admissions experience for families considering their next chapter. All dates and steps shown here are illustrative.'),
   page('facilities','Campus & facilities','campus','Spaces that invite greater thinking.','Explore a concept campus through stock imagery: places to investigate, collaborate, create and take a breath.'),
   page('student-life','Student life','life','Beyond a timetable. Into a wider world.','Our sample student-life programme brings together sport, creative expression, clubs and service.'),
   page('achievements','Achievements','achievements','Progress worth recognising.','This demonstration celebrates sample learning projects and participation. It does not claim real awards, examination results or rankings.'),
   page('news','News & events','events','From the life of the school.','A sample editorial desk for campus stories, upcoming events and family notices. The calendar is illustrative, not a live schedule.'),
   page('gallery','Campus tour','gallery','Walk through the possibilities.','An interactive collection of illustrative campus and learning photographs, licensed for this design demonstration.'),
   page('contact','Contact','contact','An open invitation to discover more.','Preview a thoughtful first conversation with a school. This demo has no operating campus, admissions office or real contact address.'),
  ],
  events: [
   { day: '07', month: 'NOV', title: 'The inquiry exhibition', category: 'Academics', text: 'A sample exhibition bringing science questions, research journals and student presentations into one conversation.' },
   { day: '14', month: 'NOV', title: 'An open campus morning', category: 'Admissions', text: 'An illustrative opportunity for families to explore the learning spaces and admissions journey.' },
   { day: '21', month: 'NOV', title: 'Voices on the horizon', category: 'Arts & culture', text: 'A concept evening of music, theatre and student storytelling.' },
  ],
  teachers: [ { name: 'Drishti Rao', role: 'Academic Coordinator', focus: 'Connecting subject learning with inquiry and reflection.' }, { name: 'Kabir Desai', role: 'Science Educator', focus: 'Helping students turn an observation into a testable question.' }, { name: 'Leena Thomas', role: 'Humanities Educator', focus: 'Developing perspective through evidence, discussion and writing.' } ],
 },
 nextgen: {
  id: 'nextgen', name: 'NextGen Public School', shortName: 'NextGen', category: 'Smart School & Digital Campus', description: 'Modern school websites with previews of connected school management experiences.', motto: 'Human curiosity. Modern possibilities.', area: 'Gujarat concept campus', hero: 'students.webp', heroAlt: 'Students working together with books in a library — illustrative stock photograph',
  programs: [
   { title: 'Primary', ages: 'Grades 1–5', text: 'Strong foundations through clear explanations, practical activities and everyday feedback.', subjects: ['Reading & expression', 'Numeracy', 'Discovery projects', 'Digital awareness'] },
   { title: 'Secondary', ages: 'Grades 6–10', text: 'Connect subject knowledge to real questions through experiments, making and collaborative work.', subjects: ['Science & mathematics', 'Languages & humanities', 'Design thinking', 'Responsible technology'] },
   { title: 'Higher Secondary', ages: 'Grades 11–12', text: 'A sample pathway that combines focused academic study with the skills to plan the next step.', subjects: ['Specialist subjects', 'Research projects', 'Study planning', 'Future pathways'] },
  ],
  pages: [
   page('about','About','about','Built around the way students learn.','NextGen is a fictional school concept that pairs human teaching with useful digital tools. The website and portal are working frontend demonstrations, not an operational school system.'),
   page('academics','Academics','programs','Learn it. Build it. Understand it.','Explore sample programmes that balance strong foundations, guided practice and practical application.'),
   page('admissions','Admissions','admissions','A clearer start to the next school year.','A straightforward admissions journey with visible steps and useful answers. This is a preview; no applications are processed.'),
   page('facilities','Facilities','campus','The right spaces for what comes next.','From a library table to a science bench, this concept connects teaching spaces with purposeful technology.'),
   page('events','Events','events','Stay connected to school life.','Sample academic updates, family events and project showcases, gathered in one easy-to-follow space.'),
   page('gallery','Gallery','gallery','A look inside learning.','Explore licensed stock photography illustrating a modern learning environment, not a real NextGen campus.'),
   page('contact','Contact','contact','Clear answers start with a conversation.','Try a sample family enquiry. To commission a real website or school system, use the PentaForge project link.'),
   page('student-portal','Student portal demo','student-portal','Your learning, in one place.','A frontend-only student workspace with clearly marked sample records.'),
   page('parent-portal','Parent portal demo','parent-portal','A clearer picture of the school day.','A frontend-only family workspace. No authentication, real student records or fee processing.'),
  ],
  events: [
   { day: '06', month: 'NOV', title: 'Build / Test / Learn', category: 'STEM', text: 'A sample student project showcase exploring useful prototypes and the questions behind them.' },
   { day: '13', month: 'NOV', title: 'Family learning check-in', category: 'For parents', text: 'An illustrative conversation about learning habits, progress and the next small step.' },
   { day: '20', month: 'NOV', title: 'Beyond the screen', category: 'Student life', text: 'A concept day of outdoor games, collaborative challenges and creative expression.' },
  ],
  teachers: [ { name: 'Nidhi Joshi', role: 'Learning Coordinator', focus: 'Keeping feedback clear, useful and connected to the next lesson.' }, { name: 'Arjun Shah', role: 'STEM Educator', focus: 'Guiding experiments, prototypes and responsible digital exploration.' }, { name: 'Sara Fernandes', role: 'Language Educator', focus: 'Helping students communicate ideas with care and confidence.' } ],
 },
};
export function getSchool(id: string): SchoolDemo | undefined { return (schoolIds as readonly string[]).includes(id) ? schools[id as SchoolId] : undefined; }
export function demoEnquiryHref(id: SchoolId) { return `/industries/education?demo=${id}#school-enquiry`; }
export const demoRoutes = schoolIds.flatMap(id => [`/demos/${id}`, ...schools[id].pages.map(p => `/demos/${id}/${p.slug}`)]);
export const schoolPhoto = (file: string) => `/school-demos/photos/${file}`;
export const galleryPhotos = [
 { file: 'preschool.webp', category: 'Learning', title: 'Learning through play', alt: 'A teacher and young children sharing a learning activity' },
 { file: 'campus.webp', category: 'Campus', title: 'Room to discover', alt: 'An open courtyard within a contemporary educational building' },
 { file: 'science.webp', category: 'Learning', title: 'A closer look', alt: 'A student exploring science with a microscope' },
 { file: 'art.webp', category: 'Creative life', title: 'A world of colour', alt: 'Children making colourful drawings during an art activity' },
 { file: 'sports.webp', category: 'Creative life', title: 'Learning as a team', alt: 'Children participating in a basketball activity' },
 { file: 'library.webp', category: 'Campus', title: 'One more chapter', alt: 'Books arranged on library shelves' },
];
