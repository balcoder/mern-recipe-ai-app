import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      {/* logo */}

      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Recipe</span>
            <span className="text-slate-700">App</span>
          </h1>
        </Link>
      </div>
    </header>
  );
}
