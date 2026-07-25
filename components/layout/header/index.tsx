import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const navigationLists = [
    {
      title: "Games",
      link: "/games",
    },
    {
      title: "Platforms",
      link: "/platforms",
    },
  ];

  return (
    <header className="fixed z-[99999] w-full h-[60px] bg-[#192735]">
      <div className="inner flex justify-between items-center max-w-[1400px] w-full h-full mx-auto">
        <div className="flex gap-x-10">
          <Link className="flex items-center justify-center" href="/">
            <Image src="/assets/logos/header-logo.png" alt="헤더 로고" width={60} height={60} />
          </Link>
          <nav>
            <ul className="flex items-center gap-x-5">
              {navigationLists.map((list) => (
                <li key={list.title}>
                  <Link className="text-white" href={list.link}>
                    {list.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
