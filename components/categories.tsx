import { getCategories } from '@/lib/api'
import CategoriesClient from '@/components/categories-client'

export default async function CategoriesPage() {
  const categories = await getCategories()
  return <CategoriesClient categories={categories} />
}