import Link from 'next/link'
import React from 'react'
import Icons from '@/components/icons/icons.jsx'
import { Container } from '@/components/Container'

export function Footer() {
  const navigation = []

  const legal = [
    { label: 'Terms', route: '/' },
    { label: 'Privacy', route: '/' },
    { label: 'Legal', route: '/' },
  ]

  const socialMedia = [
    { label: 'twitter', route: 'https://twitter.com/web3templates' },
    { label: 'facebook', route: 'https://facebook.com/web3templates' },
    { label: 'instagram', route: 'https://instagram.com/web3templates' },
    { label: 'linkedin', route: 'https://linkedin.com/' },
  ]

  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-3 gap-10 pt-10 mx-auto mt-5 border-t border-gray-100 dark:border-trueGray-700">
          <div className="flex flex-col space-y-2">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.route}
                className="text-gray-500 dark:text-gray-300 hover:text-indigo-500"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="text-center">
            <div className="mb-2">Follow us</div>
            <div className="flex justify-center space-x-5 text-gray-400 dark:text-gray-500">
              {socialMedia.map((item, index) => (
                <a key={index} href={item.route} target="_blank" rel="noopener">
                  <Icons name={item.label} size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            {legal.map((item, index) => (
              <Link
                key={index}
                href={item.route}
                className="text-gray-500 dark:text-gray-300 hover:text-indigo-500"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Made with ♥ by Roman for
          Kevych
        </div>
      </Container>
    </div>
  )
}
