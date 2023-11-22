import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800">
      <Link className="text-2xl font-bold text-black dark:text-white" href="#">
        BlaBlaCar
      </Link>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Link className="text-black dark:text-white" href="#">
              Home
            </Link>
          </li>
          <li>
            <Button className="text-blue-500 border-blue-500 dark:text-blue-300 dark:border-blue-300" variant="outline">
              Login
            </Button>
          </li>
          <li>
            <Button className="text-white bg-blue-500 dark:bg-blue-300">Register</Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}