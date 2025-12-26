// amplify-app/frontend/src/pages/AdminUpload.jsx

// frontend/src/pages/AdminUpload.jsx

const AdminUpload = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="w-full max-w-xl bg-slate-800 p-6 rounded-xl shadow-lg space-y-4">
        <h1 className="text-2xl font-semibold">Admin Upload</h1>
        <p className="text-slate-300 text-sm">
          Here you&apos;ll be able to upload tracks and podcasts for Amplify.
        </p>

        <div className="space-y-2 border border-dashed border-slate-600 rounded-lg p-4 text-sm text-slate-400">
          <p>Upload form coming in later days of the plan (Day 10).</p>
          <p>For now this page only proves protected routing works.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;
