import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 border-b z-10 bg-white">
      <div className="max-w-4xl mx-auto flex justify-between items-center h-12">
        <Link href="/">LOGO</Link>
      </div>
    </header>
  );
};

export default Header;
