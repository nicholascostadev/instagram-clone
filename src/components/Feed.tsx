import { Header } from './Header'
import { Stories } from './Stories'

export const Feed = () => {
  return (
    <>
      <Header />
      <main className="px-96 bg-gray-100 h-screen grid grid-cols-2 pt-10">
        <div>
          <Stories />
          {/* Content */}
        </div>
        <div>{/* Other things */}</div>
      </main>
    </>
  )
}
