const thClass =
  "text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear p-4";
const rowClass =
  "hover:bg-zinc-100 dark:hover:bg-zinc-600 font-vazir_regular text-zinc-800 dark:text-zinc-100 transition-all duration-300 ease-linear";

const DataTable = ({ columns, data, renderActions }) => {
  return (
    <div className="bg-white dark:bg-zinc-800 overflow-x-auto rounded-lg shadow-md transition-all duration-300 ease-linear">
      <table className="min-w-max w-full text-right">
        <thead>
          <tr className="bg-zinc-200 dark:bg-zinc-700 font-vazir_medium transition-all duration-300 ease-linear">
            {columns.map((column) => (
              <th key={column.key} className={thClass}>
                {column.header}
              </th>
            ))}
            {renderActions && <th className={thClass}>عملیات</th>}
          </tr>
        </thead>
        <tbody className="divide-y-2">
          {data.map((row) => (
            <tr key={row.id} className={rowClass}>
              {columns.map((column) => (
                console.log(row),
                <td key={column.key} className="p-4">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
              {renderActions && (
                <td className="p-4 flex items-center gap-x-2">{renderActions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
