import FooterClient from './footer-client'
import { getCategories, getSiteSettings } from '@/lib/api'

export default async function Footer() {
  const site = await getSiteSettings()
  const categories = await getCategories()

  // "uncategorized" dışındakileri filtrele
  const filteredCategories = categories.filter(
    (cat: any) => cat.slug !== 'uncategorized'
  )

  return <FooterClient site={site} categories={filteredCategories} />
}