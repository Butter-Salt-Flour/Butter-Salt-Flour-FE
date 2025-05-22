import Image from "next/image";
interface Props {
  src: string;
  name?: string;
  size?: number;
}

const SvgIcon = ({ src, name = "icon", size = 24 }: Props) => {
  if (!src) return null;

  return <Image src={src} alt={name} width={size} height={size} />;
};

export const Icon = SvgIcon;
