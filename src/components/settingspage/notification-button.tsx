
const NotificationButton = () => {
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="text-xl ">Notifications</div>
      <label className="mr-3" htmlFor="notification-toggle-switch">
        <input
          className=" inline-block w-10 h-5 peer cursor-pointer rounded-full appearance-none border-black bg-gray-200 checked:bg-gray-200 transition relative"
          type="checkbox"
          id="notification-toggle-switch"
        />
        <div className="absolute w-5 h-5 rounded-full outline top-24 peer-checked:translate-x-5 hover:cursor-pointer hover:scale-110" ></div>
      </label>
    </div>
  )
}

export default NotificationButton