import Button from "./Button";

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4 flex flex-col items-center">
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
