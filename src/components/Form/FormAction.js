export default function FormAction({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
  isLoading = false,
}) {
  return (
    <>
      {!isLoading ? (
        <button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 "
          onSubmit={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <button
          type={action}
          disabled
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-10"
          onSubmit={handleSubmit}
        >
          Loading...
        </button>
      )}
    </>
  );
}
