import Button from "./Button";

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded relative my-4 flex flex-col items-center transition-all duration-300 ease-linear">
            <p className="font-vazir_medium mb-2">{message}</p>
            {onRetry && (
                <Button onClick={onRetry} size={"md"} variant={"danger"}>
                    تلاش دوباره
                </Button>
            )}
        </div>
    )
};

export default ErrorMessage;
