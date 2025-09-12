import Link from "next/link"


const SettingsIcon = () => {
  return (
  <div className="settings-bar" style={{ position: 'absolute', top: 0, right: 0, zIndex: 10, padding: '0.5rem' }}>
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