import Image from 'next/image';
import { team } from '@/data/team';
import { TextLink } from '@/components/ui';
import styles from './team-preview.module.css';

export function TeamPreview() {
  return <section className={`container ${styles.preview}`} aria-labelledby="team-preview-heading">
    <div><span className="eyebrow">The people behind the work</span><h2 id="team-preview-heading">Meet your team at PentaForge.</h2><TextLink href="/company#team">Meet the team</TextLink></div>
    <div className={styles.portraits} aria-hidden="true">{team.map(member => <div className={styles.portrait} key={member.id}>{member.portrait ? <Image src={member.portrait.src} alt="" fill sizes="(max-width: 600px) 16vw, 88px" loading="lazy" style={{ objectPosition: member.portrait.position }} /> : <span>{member.name[0]}</span>}</div>)}</div>
  </section>;
}
