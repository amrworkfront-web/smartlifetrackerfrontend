export default function ProfileInfo() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">

      <h2 className="text-lg font-semibold">Profile Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="text-sm text-gray-500">Full Name</label>
          <input
            type="text"
            defaultValue="Amr mousa"
            className="w-full mt-1 p-2 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            type="email"
            defaultValue="amrmousa@gmail.com"
            className="w-full mt-1 p-2 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>


      </div>

      <div className="flex gap-3 justify-end">
        <button className="px-4 py-2 rounded-xl border">
          Cancel
        </button>
        <button className="px-4 py-2 rounded-xl bg-green-500 text-white">
          Save Changes
        </button>
      </div>

    </div>
  )
}
