# PentaForge team showcase

Roster updated October 20, 2026: only Asif, Kavya and Abhishek Vishwakarma are displayed. Both the homepage preview and Company showcase use `data/team.ts`. The carousel shows three visible portraits with invisible edge buffers. Removed members' original image files remain unused in the asset folder.

## Implementation

The full `TeamShowcase` appears on `/company#team`, between the engineering principles and the existing process section. The old generic team placeholder is replaced. The homepage has a compact, static portrait preview after the real-work section, linking to the full showcase. Navigation, typography, colors and unrelated pages are preserved.

New files:

- `data/team.ts`: the three current names, provisional display roles, portrait paths and crop positions.
- `components/team-showcase.tsx` and `components/team-showcase.module.css`: reusable interactive showcase and scoped styling.
- `components/team-preview.tsx` and `components/team-preview.module.css`: lightweight server-rendered homepage preview.
- `lib/team-navigation.ts`: keyboard, direct-selection and gesture navigation helpers.
- `scripts/prepare-team.mjs`: repeatable portrait optimization using the existing Sharp dependency.
- `tests/team.test.ts`: navigation and portrait validation.
- `scripts/verify-team.mjs`: local HTTP, rendered markup and image optimization audit.
- `public/team/*.webp`: optimized real portraits; three are currently displayed.

Modified pages: `app/company/page.tsx` and `components/sections/home-content.tsx`.

## Motion and controls

The existing Framer Motion dependency animates `translateX`, `translateZ`, `rotateY`, scale and opacity within a CSS perspective container. The active portrait is frontmost; side portraits recede and angle inward. Five stable card slots include invisible edge buffers for the three-member roster, so ordinary wraparound does not send an edge card across the active face. No autoplay, timers, scroll listeners or new animation dependency were added.

Drag or swipe horizontally to change people. A deliberate 45-pixel horizontal gesture is required; taps and predominantly vertical gestures do not navigate. Native pointer capture handles mouse/touch cancellation. Vertical page scrolling and pinch zoom remain available. The drag offset uses a motion value, avoiding per-frame React state updates.

The carousel supports Left/Right, Home/End, Previous/Next buttons and three direct-selection buttons. Active name/role updates are announced politely. Decorative portrait duplicates are hidden from screen readers; named controls expose each member. Focus outlines and minimum control target sizes are included. Reduced-motion preferences remove animated travel and drag-follow motion while retaining immediate navigation.

The entire showcase clips horizontal overflow locally. Desktop, tablet and mobile card dimensions adapt independently of the existing page container. Names and long roles wrap outside the image area.

## Photos and editing

The owner supplied all five photos. `public/Team` was normalized to lowercase `public/team` for consistent production URLs. Originals remain there unchanged; generated WebP copies are metadata-stripped and never enlarged. Grayscale is a CSS presentation, not a modification of a person's appearance.

| Member | Supplied original | Used by the website |
| --- | --- | --- |
| Asif | `Shekh Asif.jpeg` | `/team/asif.webp` |
| Kavya | `kavya .jpeg` | `/team/kavya.webp` |
| Abhishek Vishwakarma | `Abhishek.jpeg` | `/team/abhishek.webp` |

Change names and roles only in `data/team.ts`. To replace a photo, put its optimized file in `public/team/` and update its `portrait.src` and `portrait.position` there. Alternatively replace the corresponding original and run `node scripts/prepare-team.mjs`. `next/image` supplies responsive image sizes and lazy loading. No biography, credential or social link was invented.

Set `portrait: null` for a deliberately missing asset. The full showcase also replaces failed image loads with neutral initials and “Portrait forthcoming,” never a fictional person.

Asif's source is 413 × 531 pixels; the other supplied sources are larger. A higher-resolution original would improve Asif's portrait on high-density displays. Optimization cannot restore detail absent from the original.

## Verification and remaining review

Validated October 10, 2026 (Asia/Kolkata):

| Check | Result |
| --- | --- |
| TypeScript | Passed. |
| ESLint | Passed. |
| Unit/API tests | 21 passed, including three team navigation/asset tests. |
| Production build | Passed. |
| HTTP team audit | Passed: Company carousel markup and initial 3D transforms, homepage preview/anchor, all five assets and all five optimized image responses. |
| Full route audit | 42 public routes passed; 108 anchor references checked; no broken links. |
| Existing project assets | 16 screenshots and 13 share images responded successfully. |

Local evidence is saved in ignored `test-results/team.json` and `test-results/routes.json`. To repeat the HTTP audit, run `node scripts/verify-team.mjs` with the production server on port 3010, or set `TEST_BASE_URL` to another local origin.

The navigation tests cover wraparound, negative/repeated positions, first/last-member keyboard selection, direct member selection, ignored unrelated keys and tap/vertical-swipe rejection. Asset tests verify all five real paths, exact filename case, dimensions, size and removal of EXIF metadata. The HTTP audit checks initial perspective transforms, control labels, active information, the homepage anchor, all portraits and Next's image optimizer.

Interactive desktop/mobile visual QA, actual touch input, screen-reader behavior and operating-system reduced-motion switching require a browser review. No browser automation tool was available in this session; logic tests and rendered HTML checks are not substitutes for those checks.

Confirm the provisional role titles and filename-to-member mapping. All three active portraits are present. The reference video was not available in the project files, so the implementation follows the owner's written visual and behavior directions; an exact video comparison remains outstanding.

No deployment or production configuration changes are part of this task.
