import { Link } from "react-router-dom";
import { FaHome, FaPlusCircle, FaSearchLocation } from "react-icons/fa";

function Sidebar() {

    return (

        <div className="w-64 bg-white shadow h-screen p-5">

            <h2 className="text-xl font-bold mb-8 text-green-700">
                Dashboard
            </h2>

            <div className="flex flex-col gap-5">

                <Link to="/dashboard">
                    🏠 Dashboard
                </Link>

                <Link to="/properties">
                    📄 Properties
                </Link>

                <Link to="/add-property">
                    ➕ Add Property
                </Link>

                <Link to="/address">
                    📍 Address Validation
                </Link>

            </div>

        </div>

    );

}

export default Sidebar;