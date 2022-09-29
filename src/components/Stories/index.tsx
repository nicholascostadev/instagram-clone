import { CaretRight } from 'phosphor-react'

import { Storie } from './Storie'

export const Stories = () => {
  return (
    <div className="scrollbar-hide relative flex gap-4 overflow-x-scroll rounded-lg border bg-white py-2 pl-2">
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
      <div className="sticky right-2 flex cursor-pointer items-center justify-center">
        <CaretRight
          size={24}
          className="rounded-full border bg-white text-black"
        />
      </div>
    </div>
  )
}
