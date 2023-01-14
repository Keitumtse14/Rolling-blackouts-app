const ThemeButton = () => {
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="text-xl ">Theme</div>
      <label className="mr-3" htmlFor="theme-toggle-switch">
        <input
          className=" inline-block w-10 h-5 peer rounded-full appearance-none border-black bg-gray-200 checked:bg-gray-200 transition relative"
          type="checkbox"
          id="theme-toggle-switch"
        />
        <div className="relative w-5 h-5 rounded-full outline -top-[26px] peer-checked:translate-x-5 hover:cursor hover:scale-110" ></div>
      </label>
    </div>
  )
}

export default ThemeButton