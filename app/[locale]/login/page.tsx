import { setRequestLocale } from 'next-intl/server'
import LoginContent from '../components/login/LoginContent'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function LoginPage({ params }: Props) {
  const {locale} = await params
  
  // Enable static rendering
  setRequestLocale(locale)

  return <LoginContent />
}