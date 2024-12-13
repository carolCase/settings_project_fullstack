import Button from "./components/button"

export default function Home() {
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center  space-y-6 bg-cover ">
      <h2 className="text-5xl text-center text-slate-950 italic pb-6">
        Welcome to Home Settings
      </h2>
      <Button />
    </div>
  )
}
