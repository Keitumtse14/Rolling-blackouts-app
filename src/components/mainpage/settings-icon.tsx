import Link from "next/link"


const SettingsIcon = () => {
  return (
    <div className="flex justify-end mr-2">
      <Link href="/settings">
        <img
          src="/settings-svgrepo-com.svg"
          alt="Settings"
          className="hover:scale-110"
          width={40}
          height={40}
        />
      </Link>
    </div>
  )
}

export default SettingsIcon