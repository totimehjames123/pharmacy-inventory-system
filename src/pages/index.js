import Hero from "@/Components/Hero";
import checkIsLoggedInAndNavigate from './../../utils/checkIsLoggedInAndNavigate'

export default function Home() {
  checkIsLoggedInAndNavigate("/dashboard", "/")

  return (
    <>
      <Hero />
    </>
  )
}
