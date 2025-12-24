import Link from 'next/link'
import { FaArrowRight, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa'
import CONTACT from '@/app/config/contact'

export default function ContactFold() {
  return (
    <div className="flex flex-col gap-4 md:gap-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Connect</h2>
        <div className="h-1 w-12 bg-white/30 rounded-full" />
      </div>

      <div className="flex flex-col gap-4 md:gap-8 max-w-4xl">
        <h3 className="text-2xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          Let&apos;s build something <span className="text-blue-500">remarkable</span> together.
        </h3>
        
        <div className="flex flex-col gap-3 md:gap-6">
          <Link 
            href={`mailto:${CONTACT.email}`} 
            className="group flex items-center justify-between p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 gap-4"
          >
            <div className="flex items-center gap-4 md:gap-6 min-w-0">
              <div className="p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-white/5 text-white/70 group-hover:text-white transition-colors shrink-0">
                <FaEnvelope size={20} className="md:hidden" />
                <FaEnvelope size={28} className="hidden md:block" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-white/50">Email</span>
                <span className="text-sm md:text-2xl font-medium text-white truncate">{CONTACT.email}</span>
              </div>
            </div>
            <FaArrowRight className="text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all duration-500 text-lg md:text-2xl shrink-0" />
          </Link>

          <Link 
            href={CONTACT.linkedin} 
            target="_blank"
            className="group flex items-center justify-between p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 gap-4"
          >
            <div className="flex items-center gap-4 md:gap-6 min-w-0">
              <div className="p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-white/5 text-white/70 group-hover:text-white transition-colors shrink-0">
                <FaLinkedin size={20} className="md:hidden" />
                <FaLinkedin size={28} className="hidden md:block" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-white/50">LinkedIn</span>
                <span className="text-sm md:text-xl font-medium text-white truncate">Yash Verma</span>
              </div>
            </div>
            <FaArrowRight className="text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all duration-500 text-lg md:text-xl shrink-0" />
          </Link>

          <Link 
            href={CONTACT.twitter} 
            target="_blank"
            className="group flex items-center justify-between p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 gap-4"
          >
            <div className="flex items-center gap-4 md:gap-6 min-w-0">
              <div className="p-2.5 md:p-4 rounded-xl md:rounded-2xl bg-white/5 text-white/70 group-hover:text-white transition-colors shrink-0">
                <FaTwitter size={20} className="md:hidden" />
                <FaTwitter size={28} className="hidden md:block" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-white/50">Twitter</span>
                <span className="text-sm md:text-xl font-medium text-white truncate">@we_chat_tech</span>
              </div>
            </div>
            <FaArrowRight className="text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all duration-500 text-lg md:text-xl shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  )
}
