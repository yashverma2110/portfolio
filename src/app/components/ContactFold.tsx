import Link from 'next/link'
import Script from 'next/script'
import { FaEnvelope, FaLinkedin } from 'react-icons/fa'
import CONTACT from '@/app/config/contact'

export default function ContactFold() {
  return (
    <div className="py-20 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-neutral-500">Socials</h2>

      <section className="w-full text-white flex gap-4 font-semibold">
        <Link href={CONTACT.linkedin} target="_blank" className="bg-slate-500 text-base md:text-xl rounded p-2 w-fit flex items-center gap-2">
          <FaLinkedin />
          <h3>Linked In</h3>
        </Link>
        <Link href={`mailto:${CONTACT.email}`} target="_blank" className="bg-slate-500 text-base md:text-xl rounded p-2 w-fit flex items-center gap-2">
          <FaEnvelope />
          <h3>Email</h3>
        </Link>
      </section>

      <hr className="w-full border-neutral-500" />

      <h2 className="text-2xl font-bold text-neutral-500">Contact directly</h2>
      <section className="w-full">
        <div data-tf-live="01JBW44150KCBMPE31QPC73Z0T"></div>
        <Script src="//embed.typeform.com/next/embed.js" />
      </section>
    </div>
  )
}
