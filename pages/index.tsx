import { Inter } from '@next/font/google'
import Weather from '../public/Weather'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  return (
      <Weather />
  )
}
