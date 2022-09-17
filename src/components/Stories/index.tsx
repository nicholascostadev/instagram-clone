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
      <CaretRight
        size={24}
        className="absolute right-2 top-[50%] -translate-y-[50%] text-black border rounded-full bg-white"
      />
    </div>
  )
}
