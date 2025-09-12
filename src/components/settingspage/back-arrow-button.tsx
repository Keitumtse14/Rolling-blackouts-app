import Link from "next/link"

const BackArrowButton = () => {
  return (
    <Link href="." className='inline-block'>
      <img
        src="/round-arrow-left-svgrepo-com.svg"
        alt="Back Arrow"
        className="hover:scale-110"
        width={40}
        height={40}
      />
    </Link>
  )
}

export default BackArrowButton