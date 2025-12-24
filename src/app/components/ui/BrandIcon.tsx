import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaMediumM, FaEnvelope } from "react-icons/fa";

interface BrandIconProps {
  brand: "linkedin" | "github" | "twitter" | "medium" | "email";
  link?: string;
  size?: number;
}

export default function BrandIcon({ brand, link, size = 20 }: BrandIconProps) {
  function getIcon() {
    switch (brand) {
      case "linkedin": return <FaLinkedin size={size} />;
      case "github": return <FaGithub size={size} />;
      case "twitter": return <FaTwitter size={size} />;
      case "medium": return <FaMediumM size={size} />;
      case "email": return <FaEnvelope size={size} />;
    }
  }

  const content = (
    <div className="p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300">
      {getIcon()}
    </div>
  );

  if (link) {
    return (
      <Link href={link} target="_blank">
        {content}
      </Link>
    );
  }

  return content;
}
