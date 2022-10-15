import { CaretDown } from 'phosphor-react'

const baseLinks = [
  'Meta',
  'About',
  'Blog',
  'Jobs',
  'Help',
  'API',
  'Privacy',
  'Terms',
  'Top Accounts',
  'Hashtags',
  'Locations',
  'Instagram Lite',
  'Contact Uploading & Non-Users',
  'Dance',
  'Food & Drink',
  'Home & Garden',
  'Music',
  'Visual Arts',
]

interface FooterProps {
  links?: string[]
}

export const Footer = ({ links: propLinks }: FooterProps) => {
  const links = propLinks ?? baseLinks

  return (
    <footer className="absolute bottom-0 right-[50%] mx-auto w-full translate-x-[50%] items-center justify-center text-xs text-gray-500 md:w-1/2">
      <div className="mt-6 flex flex-wrap justify-center [&>*]:mx-1 [&>*]:mb-3 [&>*]:px-1">
        {links.map((link, index) => (
          <a href="#" key={`${link}-${index}`}>
            {link}
          </a>
        ))}
      </div>
      <div className="my-4 flex justify-center gap-[11px] text-gray-500">
        <p>
          English{' '}
          <span className="inline-flex">
            <CaretDown size={12} />
          </span>
        </p>
        <p>© 2022 Instagram from Meta</p>
      </div>
    </footer>
  )
}
