import clsx from "clsx"
import { Loader } from "lucide-react"

type Props = {
  isLoading: boolean
  children: any
  className?: string
}

const AppLoader = ({ isLoading, children, className }: Props) => {
  if (isLoading)
    return (
      <Loader
        className={clsx(`${className} `, {
          "animate-spin": isLoading,
        })}
      />
    )
  return children
}
export default AppLoader
