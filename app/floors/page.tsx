import Image from "next/image"

export default function Floors() {
  return (
    <div className="mt-6">
      <p className=" mb-6 text-3xl text-center font-semibold text-gray-900 ">
        House Floors
      </p>
      <Image
        src="/house_floors.jpg"
        alt="House Floors"
        width={500}
        height={500}
        className="rounded-full mb-4"
      ></Image>
    </div>
  )
}
