import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaMediumM, FaEnvelope } from "react-icons/fa";

interface BrandIconProps {
  brand: "linkedin" | "github" | "twitter" | "medium" | "email";
  link?: string;
  size?: number;
}

export default function BrandIcon({ brand, link, size = 24 }: BrandIconProps) {
  function getIcon() {
    switch (brand) {
      case "linkedin": return <FaLinkedin size={size} />;
      case "github": return <FaGithub size={size} />;
      case "twitter": return <FaTwitter size={size} />;
      case "medium": return <FaMediumM size={size} />;
      case "email": return <FaEnvelope size={size} />;
    }
  }

  if (link) {
    return (
      <Link href={link} target="_blank">
        {getIcon()}
      </Link>
    );
  }

  return getIcon();
}
