const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white pt-20 dark:from-gray-900 dark:to-gray-800">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 dark:text-white text-4xl animate-spin flex items-center justify-center border-t-blue-400 dark:border-t-white rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-indigo-600 dark:text-white/50 text-2xl animate-spin flex items-center justify-center border-t-indigo-600 dark:border-t-white/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
