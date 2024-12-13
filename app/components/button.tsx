export default function Button() {
  return (
    <div>
      <button
        className="
        btn glass 
        px-6 py-3
        w-40
       bg-cyan-800
        text-white 
        font-semibold text-lg 
        rounded-lg shadow-md
        border-cyan-950
         hover:bg-cyan-600 hover:shadow-lg
          active:bg-cyan-500 focus:outline-none
           focus:ring-blue-300 transition-all duration-300"
      >
        <p>Enter</p>
      </button>
    </div>
  )
}
