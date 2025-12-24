import Link from 'next/link'
import { FaArrowRight, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa'
import CONTACT from '@/app/config/contact'

export default function ContactFold() {
  return (
    <div className="flex flex-col gap-12 py-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">Connect</h2>
        <div className="h-1 w-12 bg-white/20 rounded-full" />
      </div>

      <div className="flex flex-col gap-8 max-w-4xl">
        <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          Let&apos;s build something <span className="text-white/40 text-blue-500">remarkable</span> together.
        </h3>
        
        <div className="flex flex-col gap-6">
          <Link 
            href={`mailto:${CONTACT.email}`} 
            className="group flex items-center justify-between p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-white/5 text-white/60 group-hover:text-white transition-colors">
                <FaEnvelope size={28} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Email</span>
                <span className="text-xl md:text-2xl font-medium text-white">{CONTACT.email}</span>
              </div>
            </div>
            <FaArrowRight className="text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all duration-500 text-2xl hidden sm:block" />
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href={CONTACT.linkedin} 
              target="_blank"
              className="group flex flex-col justify-between p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 min-h-[200px]"
            >
              <div className="p-4 w-fit rounded-2xl bg-white/5 text-white/60 group-hover:text-white transition-colors">
                <FaLinkedin size={28} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/30">LinkedIn</span>
                <span className="text-xl font-medium text-white">Yash Verma</span>
              </div>
            </Link>

            <Link 
              href={CONTACT.twitter} 
              target="_blank"
              className="group flex flex-col justify-between p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 min-h-[200px]"
            >
              <div className="p-4 w-fit rounded-2xl bg-white/5 text-white/60 group-hover:text-white transition-colors">
                <FaTwitter size={28} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Twitter</span>
                <span className="text-xl font-medium text-white">@we_chat_tech</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
