import Button from "./components/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h2 className="text-5xl text-center text-slate-800 italic">
        Welcome to Home Settings
      </h2>
      <Button />
    </div>
  )
}
