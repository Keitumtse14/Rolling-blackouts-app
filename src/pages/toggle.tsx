const Toggle = () => {

  return (
    <>
      <div className="bg-gray-900 h-screen grid place-items-center">
        <label htmlFor="toggle-switch">
          <input
            className=" peer cursor-pointer h-32 w-64 rounded-full appearance-none bg-white bg-opacity-5 hover:border-blue-600 hover:border-2 checked:bg-gray-800 relative bottom-4 transition"

            type="checkbox"

            id="toggle-switch"
          />
          <div className="relative left-4 bottom-32 w-20 h-20 rounded-full bg-red-600 peer-checked:translate-x-36" ></div>
        </label>
      </div>


    </>
  );
};

export default Toggle;
