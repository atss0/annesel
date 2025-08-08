// lib/categoryMeta.ts
import { Baby, Heart, Stethoscope, BookOpen, Users, Sparkles } from 'lucide-react'

export const getCategoryMeta = (slug: string) => {
  const map: Record<
    string,
    {
      icon: any
      description: string
      color: string
      hoverColor: string
    }
  > = {
    "hamilelik": {
      icon: Heart,
      description: "Hamilelik sürecinde bilmeniz gerekenler",
      color: "bg-pink-100 text-pink-600",
      hoverColor: "hover:bg-pink-50"
    },
    "bebek-bakimi": {
      icon: Baby,
      description: "0-2 yaş bebek bakım rehberi",
      color: "bg-blue-100 text-blue-600",
      hoverColor: "hover:bg-blue-50"
    },
    "cocuk-gelisimi": {
      icon: Sparkles,
      description: "Çocuğunuzun gelişim aşamaları",
      color: "bg-green-100 text-green-600",
      hoverColor: "hover:bg-green-50"
    },
    "anne-sagligi": {
      icon: Stethoscope,
      description: "Anne sağlığı ve wellness",
      color: "bg-purple-100 text-purple-600",
      hoverColor: "hover:bg-purple-50"
    },
    "ebeveynlik": {
      icon: Users,
      description: "Ebeveynlik deneyimleri ve tavsiyeleri",
      color: "bg-orange-100 text-orange-600",
      hoverColor: "hover:bg-orange-50"
    },
    "egitim": {
      icon: BookOpen,
      description: "Çocuk eğitimi ve öğrenme",
      color: "bg-indigo-100 text-indigo-600",
      hoverColor: "hover:bg-indigo-50"
    }
  }

  return map[slug] || {
    icon: BookOpen,
    description: "Bu kategori hakkında bilgi bulunamadı.",
    color: "bg-gray-100 text-gray-600",
    hoverColor: "hover:bg-gray-50"
  }
}