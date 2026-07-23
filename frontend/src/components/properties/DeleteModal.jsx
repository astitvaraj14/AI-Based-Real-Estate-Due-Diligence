import { FaTimesCircle } from "react-icons/fa";

function DeleteModal({
  open,
  onClose,
  onDelete,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">

        <div className="flex justify-center">

          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">

            <FaTimesCircle className="text-red-600 text-4xl" />

          </div>

        </div>

        <h2 className="text-2xl font-bold text-center mt-6">
          Delete Property
        </h2>

        <p className="text-center text-slate-500 mt-4 leading-7">
          Are you sure you want to delete this property?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 border border-slate-300 py-3 rounded-xl hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;