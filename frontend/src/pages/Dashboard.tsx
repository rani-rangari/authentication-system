const Dashboard = () => {
  return (
    <div className=" flex items-center justify-center p-4">
      {/* The Box */}
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl">👋</span>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome back!</h2>
        <p className="text-gray-600 text-lg mb-8">
          You've successfully authenticated. We're glad to see you here.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
