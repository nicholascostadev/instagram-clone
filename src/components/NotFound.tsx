import { Header } from './Header'

export const NotFound = () => {
  return (
    <>
      <Header />
      <div className="mx-auto flex w-[1200px] flex-col gap-8 py-8 text-center">
        <h1 className="text-2xl font-bold">
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
