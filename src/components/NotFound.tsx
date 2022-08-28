import { Header } from './Header'

export const NotFound = () => {
  return (
    <>
      <Header />
      <div className="w-[1200px] mx-auto text-center flex flex-col py-8 gap-8">
        <h1 className="font-bold text-2xl">
          Sorry, this page isn&apos;t available.
        </h1>
        <p>
          The link you followed may be broken, or the page may have been
          removed. Go back to Instagram.
        </p>
      </div>
    </>
  )
}
