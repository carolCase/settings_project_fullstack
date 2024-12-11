export default function Button() {
  return (
    <div>
      <button
        className="px-6 py-3
        w-40
       bg-blue-950
        text-white 
        font-semibold text-lg 
        rounded-lg shadow-md
         hover:bg-blue-900 hover:shadow-lg
          active:bg-blue-700 focus:outline-none
           focus:ring-blue-300 transition-all duration-300"
      >
        <p>Enter</p>
      </button>
    </div>
  )
}
