import { signIn, useSession } from "next-auth/react";

const Header = () => {
  return (
    <div>
      <header className="flex items-center justify-between px-4 py-2 bg-blue-100">
        <img
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1643004937711/k3NMskkSn.png"
          width="50"
          alt="Daily Dev Tips Logo"
        />
        <strong>This is my website</strong>
        <nav>
          <button className="px-4 py-2 m-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Click me
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
