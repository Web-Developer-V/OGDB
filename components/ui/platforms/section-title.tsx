import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  icon: LucideIcon;
};

export default function SectionTitle({ title, icon: Icon }: Props) {
  return (
    <h3 className="flex items-center border-b-1 pb-3 mb-3 text-[18px] font-extrabold">
      <span className="mr-2">
        <Icon width={25} color="#4849DF" />
      </span>{" "}
      {title}
    </h3>
  );
}
