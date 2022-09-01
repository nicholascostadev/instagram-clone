import Head from 'next/head'
import Image from 'next/image'
import { CaretDown } from 'phosphor-react'
import { LoginForm } from './LoginForm'

export const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex flex-col items-center justify-center max-h-min bg-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
          <div className="bg-slate-700 text-white shadow-md rounded-3xl h-[40rem] w-80 mt-[3rem] font-bold hidden md:flex justify-center items-center">
            NO MOCKUP PHONE YET
          </div>
          <div className="container w-[21.875rem] mx-auto mt-[6rem]">
            <LoginForm />
            <div className="bg-transparent md:bg-white md:border mt-2 p-5 flex justify-center gap-1 text-sm md:text-md">
              <p>Don&apos;t have an account?</p>
              <a href="#" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </div>

            <div>
              <p className="text-sm text-center m-5">Get the app.</p>
              <div className="flex justify-center gap-2">
                <Image
                  src="https://instagram.com/static/images/appstore-install-badges/badge_ios_portuguese-brazilian-pt_br.png/68006a2bb372.png"
                  alt=""
                  layout="fixed"
                  height={40}
                  width={140}
                />
                <Image
                  src="https://instagram.com/static/images/appstore-install-badges/badge_android_portuguese_brazilian-pt_BR.png/2f2a0c05b2f3.png"
                  alt=""
                  layout="fixed"
                  height={40}
                  width={140}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full md:w-1/2 mx-auto justify-center items-center text-xs text-gray-500 ">
        <div className="flex flex-wrap justify-center mt-6 [&>*]:px-1 [&>*]:mx-1 [&>*]:mb-3">
          <a href="#">Meta</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Jobs</a>
          <a href="#">Help</a>
          <a href="#">API</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Top Accounts</a>
          <a href="#">Hashtags</a>
          <a href="#">Locations</a>
          <a href="#">Instagram Lite</a>
          <a href="#">Contact Uploading & Non-Users</a>
          <a href="#">Dance</a>
          <a href="#">Food & Drink</a>
          <a href="#">Home & Garden</a>
          <a href="#">Music</a>
          <a href="#">Visual Arts</a>
        </div>
        <div className="my-4 text-gray-500 flex justify-center gap-[11px]">
          <p>
            English{' '}
            <span className="inline-flex">
              <CaretDown size={12} />
            </span>
          </p>
          <p>© 2022 Instagram from Meta</p>
        </div>
      </footer>
    </>
  )
}
