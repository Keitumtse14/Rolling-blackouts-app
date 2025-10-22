import Link from "next/link"
import Image from "next/image"


const SettingsIcon = () => {
  return (
    <div className="p-2">
      <Link href="/settings">
        <Image
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