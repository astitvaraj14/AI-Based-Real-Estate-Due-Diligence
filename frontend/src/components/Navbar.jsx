import { FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (

        <nav className="bg-green-700 text-white px-8 py-4 flex justify-between items-center shadow">

            <div className="flex items-center gap-3">

                <FaBuilding size={28} />

                <h1 className="text-2xl font-bold">
                    Real Estate Due Diligence
                </h1>

            </div>

            <button
                onClick={logout}
                className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
                Logout
            </button>

        </nav>

    );

}

export default Navbar;