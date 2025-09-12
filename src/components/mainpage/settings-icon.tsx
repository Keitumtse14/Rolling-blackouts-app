import Link from "next/link"


const SettingsIcon = () => {
  return (
    <div className="settings-bar" style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
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