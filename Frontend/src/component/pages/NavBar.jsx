import { GiChicken } from "react-icons/gi";


const NavBar = () => {
  return (
    <div className='max-w-screen flex justify-between p-2 items-center fixed top-0 left-0 right-0 h-15 bg-amber-600'>
      <p className="flex items-center text-[35px] gap-2 text-yellow-50"><GiChicken className='text-amber-100 text-[50px]' /> KG Farm</p>
      <button className="bg-amber-300 px-4 py-1 rounded-2xl font-bold">Login</button>
    </div>
  )
}

export default NavBar
