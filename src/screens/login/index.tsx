import Button from "@/common/Button";

const LoginScreen = () => {
  return (
    <div className="p-6 mx-auto my-4 max-w-md bg-backgroundWidget rounded-lg shadow-md border">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p className="mb-6 text-textSecondary">Welcome to the login screen!</p>
      <Button
        type="submit"
        className="w-full bg-primary text-white px-4 py-2 text-sm rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-150 ease-in-out"
      >
        Login
      </Button>
    </div>
  );
};

export default LoginScreen;
