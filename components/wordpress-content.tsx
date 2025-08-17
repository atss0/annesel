// components/wordpress-content.tsx
'use client'

import React from 'react'
import styles from '@/styles/wordpress-content.module.css'

export default function WordPressContent({ html }: { html: string }) {
  return (
    <div
      className={`${styles.wordpressContent} prose max-w-none break-words overflow-hidden`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}