import { getSiteSettings, getCategories } from '@/lib/api'
import HeaderClient from './header-client'

export default async function Header() {
  const site = await getSiteSettings()
  const categories = await getCategories()

  return <HeaderClient site={site} categories={categories} />
}