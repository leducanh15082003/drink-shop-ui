import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar: React.FC = () => {
  const pathName = usePathname();
  const buttons = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Menu", path: "/menu" },
  ];

  return (
    <nav className="flex gap-4">
      {buttons.map(({ name, path }) => (
        <Link key={name} href={path} legacyBehavior>
          <span
            className={`px-4 py-[2px] rounded-xl cursor-pointer focus:outline-none transition-all duration-300 ease-in-out transform ${
              pathName == path ? "bg-[#DBDFD0] scale-100" : ""
            }`}
          >
            {name}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
