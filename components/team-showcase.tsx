'use client';

import Image from 'next/image';
import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { TeamMember } from '@/data/team';
import { teamIndex, teamKeyStep, teamSelectionPosition, teamSwipeStep } from '@/lib/team-navigation';
import styles from './team-showcase.module.css';

export function TeamShowcase({ members }: { members: readonly TeamMember[] }) {
  const [position, setPosition] = useState(0);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const reducedMotion = useReducedMotion();
  const dragX = useMotionValue(0);
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
  const id = useId();
  const activeIndex = teamIndex(position, members.length);
  const active = members[activeIndex];
  if (!active) return null;

  function settle() {
    if (reducedMotion) dragX.set(0);
    else animate(dragX, 0, { duration: 0.3, ease: [0.2, 0.7, 0.2, 1] });
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0 || members.length < 2) return;
    dragX.stop();
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (!reducedMotion && Math.abs(x) > Math.abs(y)) dragX.set(Math.max(-140, Math.min(140, x)));
  }
  function finishDrag(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    gesture.current = null;
    if (!cancelled) {
      const step = teamSwipeStep(event.clientX - start.x, event.clientY - start.y);
      if (step) setPosition(current => current + step);
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    settle();
  }
  function navigate(event: KeyboardEvent<HTMLElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const next = teamKeyStep(event.key, position, members.length);
    if (next !== null) { event.preventDefault(); setPosition(next); }
  }

  // Two invisible buffer cards keep wraparound movement at the edges, never across the active portrait.
  const visibleSideCards = Math.min(2, Math.floor((members.length - 1) / 2));
  const slots = members.length === 1 ? [position] : Array.from({ length: visibleSideCards * 2 + 3 }, (_, i) => position + i - visibleSideCards - 1);
  return <section id="team" className={styles.showcase} aria-labelledby={`${id}-heading`}>
    <div className="container">
      <div className={styles.heading}>
        <span className="eyebrow">The people behind PentaForge</span>
        <h2 id={`${id}-heading`}>Meet the team.</h2>
        <p>Different disciplines. One team around your business.</p>
      </div>
      <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label="PentaForge team" aria-describedby={members.length > 1 ? `${id}-help` : undefined} tabIndex={0} onKeyDown={navigate}>
        <div className={styles.viewport} aria-hidden="true" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={event => finishDrag(event)} onPointerCancel={event => finishDrag(event, true)} onLostPointerCapture={event => finishDrag(event, true)}>
          <motion.div className={styles.track} style={{ x: dragX }}>
            {slots.map(slot => {
              const member = members[teamIndex(slot, members.length)];
              const offset = slot - position;
              const distance = Math.abs(offset);
              return <motion.div className={styles.card} key={slot} data-active={offset === 0} data-offset={offset}
                initial={false}
                animate={{ x: `${offset * 72}%`, z: distance === 0 ? 48 : -distance * 105, rotateY: offset === 0 ? 0 : offset < 0 ? 22 : -22, scale: 1 - distance * 0.035, opacity: distance > visibleSideCards ? 0 : 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 0.7, 0.22, 1] }}
                style={{ zIndex: 5 - distance }}>
                {member.portrait && !failedImages.includes(member.id) ? <Image src={member.portrait.src} alt="" fill loading="lazy" draggable={false} sizes="(max-width: 600px) 66vw, (max-width: 1100px) 32vw, 360px" style={{ objectPosition: member.portrait.position }} onError={() => setFailedImages(current => current.includes(member.id) ? current : [...current, member.id])} /> : <div className={styles.placeholder}><span>{member.name.split(' ').map(part => part[0]).join('')}</span><small>Portrait forthcoming</small></div>}
              </motion.div>;
            })}
          </motion.div>
        </div>
        <div className={styles.details}>
          <div className={styles.member} id={`${id}-member`} aria-live="polite" aria-atomic="true">
            <span className={styles.counter}>{String(activeIndex + 1).padStart(2, '0')} / {String(members.length).padStart(2, '0')}</span>
            <h3>{active.name}</h3>
            <p>{active.role}</p>
          </div>
          {members.length > 1 && <>
            <div className={styles.controls}>
              <button type="button" aria-label="Previous team member" aria-controls={`${id}-member`} onClick={() => setPosition(current => current - 1)}><ArrowLeft size={20} aria-hidden="true" /></button>
              <div className={styles.pickers} role="group" aria-label="Choose a team member">{members.map((member, index) => <button type="button" key={member.id} aria-label={`Show ${member.name}, ${member.role}`} aria-pressed={activeIndex === index} aria-controls={`${id}-member`} onClick={() => setPosition(current => teamSelectionPosition(current, index, members.length))}><span aria-hidden="true" /></button>)}</div>
              <button type="button" aria-label="Next team member" aria-controls={`${id}-member`} onClick={() => setPosition(current => current + 1)}><ArrowRight size={20} aria-hidden="true" /></button>
            </div>
            <p className={styles.help} id={`${id}-help`}>Drag or swipe to explore. Use the arrow keys or controls to meet the team.</p>
          </>}
        </div>
      </div>
    </div>
  </section>;
}
