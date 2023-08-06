import { IconType } from "react-icons"

interface AuthSocialButtonProps {
  icon: IconType
  onClick: () => void
}
const SocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className=" w-full inline-flex justify-center rounded-md bg-white
    px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 
    hover:bg-gray-50 focus:outline-offset-0">
      <Icon />
      <span className="hidden">h</span>
    </button>
  )
}

export default SocialButton