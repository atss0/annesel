// utils/wpSafe.ts
export function getFeaturedImage(post: any): string | null {
    return post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null
  }
  
  export function getPrimaryCategory(post: any): string {
    return post?._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'Genel'
  }
  
  export function getTitle(post: any): string {
    // title.rendered HTML entity içerir → güvenli decode için innerHTML kullanacağız (aşağıda)
    return post?.title?.rendered ?? ''
  }
  
  export function getExcerpt(post: any): string {
    const raw = post?.excerpt?.rendered ?? ''
    const text = raw.replace(/<[^>]+>/g, '') // basit strip HTML
    return text.length > 140 ? text.slice(0, 140) + '…' : text
  }