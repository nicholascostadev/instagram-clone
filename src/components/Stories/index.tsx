import { CaretRight } from 'phosphor-react'

import { Storie } from './Storie'

export const Stories = () => {
  return (
    <div className="relative border pl-2 py-2 bg-white rounded-lg flex gap-4 overflow-x-scroll scrollbar-hide">
      <Storie />
      <Storie />
      <Storie />
      <Storie />
      <Storie />
      <Storie />
      <Storie />
      <Storie />
      <Storie />
      <Storie />
      <Storie />
      <div className="sticky right-2 flex justify-center items-center cursor-pointer">
        <CaretRight
          size={24}
          className="text-black border rounded-full bg-white"
        />
      </div>
    </div>
  )
}
