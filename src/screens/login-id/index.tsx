import Button from "@/common/Button";

const LoginIdScreen = () => {
  return (
    <div className="p-6 mx-auto my-4 max-w-md bg-backgroundWidget rounded-lg shadow-md border">
      <h1 className="text-2xl font-bold mb-4">Enter Your Email</h1>
      {/* Add email input field here later */}
      <p className="mb-6 text-sm text-textSecondary dark:text-gray-400">
        Please enter the email address associated with your account.
      </p>
      <Button
        className="w-full bg-primary text-white px-4 py-2 text-sm rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-in-out"
        onClick={() => console.log("Continue from Login ID clicked")}
      >
        Continue
      </Button>
    </div>
  );
};

export default LoginIdScreen;
