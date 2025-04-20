import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-black font-serif">
        <BizzWizardLogo />
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>

            <Avatar size={"big"} name="Atriavo" />
        </div>
    </div>

}

export const BizzWizardLogo = () => {
    return (
      <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
        <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-1 rounded-lg shadow-md">
          Bizz
        </span>
        <span className="text-gray-800">Wizard</span>
      </div>
    );
  };