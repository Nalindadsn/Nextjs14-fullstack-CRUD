import Link from "next/link";
import { ModeToggle } from "./theme-toggle-button";
import { buttonVariants } from "./ui/button";

function Navbar() {
  return (
    <nav className="border-b mb-5 px-3">
      <div className="flex justify-between space-x-4 max-w-screen-lg mx-auto py-4">
        <Link href="/">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            User Management
          </h1>
        </Link>

        <div className="flex gap-x-2 items-center">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
