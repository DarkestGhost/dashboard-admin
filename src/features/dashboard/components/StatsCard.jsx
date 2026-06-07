
const StatsCard = ({ title, value, description, icon, iconColorClasses, formatter }) => {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-md p-5 transition-all duration-300 ease-linear">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-vazir_medium transition-colors duration-300 ease-linear">
                        {title}
                    </p>
                    <h3 className="mt-4 text-zinc-800 dark:text-white text-xl lg:text-lg font-vazir_bold transition-colors duration-300 ease-linear">{formatter ? formatter(value) : value}</h3>
                    <p className="mt-3 text-zinc-400 dark:text-zinc-500 text-xs font-vazir_regular transition-colors duration-300 ease-linear">{description}</p>
                </div>
                <div className={`text-3xl ${iconColorClasses}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;