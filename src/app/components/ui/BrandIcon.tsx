import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaMediumM } from "react-icons/fa";

interface BrandIconProps {
  brand: "linkedin" | "github" | "twitter" | "medium";
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
