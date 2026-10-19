'use client';
import { motion, useReducedMotion } from 'framer-motion';
export function Reveal({children,className}:{children:React.ReactNode;className?:string}){const reduced=useReducedMotion();return <motion.div className={className} initial={{y:0}} whileInView={reduced?{}:{y:[14,0]}} viewport={{once:true,amount:.12}} transition={{duration:.55,ease:[.2,.7,.2,1]}}>{children}</motion.div>;}
