const Loading = ({ message = "درحال بارگذاری ..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-zinc-700 dark:text-zinc-300 font-vazir_medium mt-2">
        {message}
      </p>
    </div>
  );
};

export default Loading;
