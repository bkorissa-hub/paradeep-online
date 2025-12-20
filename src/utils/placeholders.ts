export const placeholders = {
  product: 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Product+Image',
  service: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Service+Image',
  blog: 'https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=Blog+Post',
  user: 'https://via.placeholder.com/150/6B7280/FFFFFF?text=User'
}

export const getImageUrl = (url: string | null | undefined, type: 'product' | 'service' | 'blog' | 'user') => {
  return url && url.trim() !== '' ? url : placeholders[type]
}
