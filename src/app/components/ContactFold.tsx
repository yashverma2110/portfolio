import Link from 'next/link'
import Script from 'next/script'
import { FaArrowRight, FaEnvelope, FaLinkedin, FaTwitter } from 'react-icons/fa'
import CONTACT from '@/app/config/contact'

export default function ContactFold() {
  return (
    <div className="py-20 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-neutral-500">Socials 💬</h2>

      <section className="w-full text-white flex flex-col gap-4 font-semibold">
        <div className="flex items-center gap-2">
          <FaArrowRight />
          <h3>Let&apos;s Connect on LinkedIn</h3>
          <Link href={CONTACT.linkedin} target="_blank" className="bg-slate-500 text-sm rounded p-2 w-fit flex items-center gap-2">
            <FaLinkedin />
            <h3>@yash-verma-80279b16b</h3>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <FaArrowRight />
          <h3>Follow me on X</h3>
          <Link href={CONTACT.twitter} target="_blank" className="bg-slate-500 text-sm rounded p-2 w-fit flex items-center gap-2">
            <FaTwitter />
            <h3>@we_chat_tech</h3>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <FaArrowRight />
          <h3>Email Me @</h3>
          <Link href={`mailto:${CONTACT.email}`} target="_blank" className="bg-slate-500 text-sm rounded p-2 w-fit flex items-center gap-2">
            <FaEnvelope />
            <h3>yashv.work@gmail.com</h3>
          </Link>
        </div>
      </section>

      <hr className="w-full border-neutral-500" />

      <h2 className="text-2xl font-bold text-neutral-500">Contact 📞</h2>
      <section className="w-full">
        <div data-tf-live="01JBW44150KCBMPE31QPC73Z0T"></div>
        <Script src="//embed.typeform.com/next/embed.js" />
      </section>
    </div>
  )
}
