const EmptyListState = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 text-center font-vazir_medium text-sm text-zinc-900 dark:text-zinc-100">
      <p>{title}</p>
      {description && <p>{description}</p>}
    </div>
  );
};

export default EmptyListState;
