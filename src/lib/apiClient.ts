const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const apiClient = {
  // THEME
  getTheme: async () => {
    const res = await fetch(`${API_BASE}/api/theme`)
    return (await res.json()) as ApiResponse<any>
  },

  updateTheme: async (data: any) => {
    const res = await fetch(`${API_BASE}/api/admin/theme`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return (await res.json()) as ApiResponse<any>
  },

  // PRODUCTS
  getProducts: async (filters?: { category_id?: number; featured?: boolean; search?: string }) => {
    const params = new URLSearchParams()
    if (filters?.category_id) params.append('category_id', String(filters.category_id))
    if (filters?.featured) params.append('featured', 'true')
    if (filters?.search) params.append('search', filters.search)
    
    const res = await fetch(`${API_BASE}/api/products?${params}`)
    return (await res.json()) as ApiResponse<any[]>
  },

  getProductBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE}/api/products/${slug}`)
    return (await res.json()) as ApiResponse<any>
  },

  getProductCategories: async () => {
    const res = await fetch(`${API_BASE}/api/product-categories`)
    return (await res.json()) as ApiResponse<any[]>
  },

  createProduct: async (data: any) => {
    const res = await fetch(`${API_BASE}/api/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return (await res.json()) as ApiResponse<any>
  },

  // SERVICES
  getServices: async (filters?: { category_id?: number; featured?: boolean; search?: string }) => {
    const params = new URLSearchParams()
    if (filters?.category_id) params.append('category_id', String(filters.category_id))
    if (filters?.featured) params.append('featured', 'true')
    if (filters?.search) params.append('search', filters.search)
    
    const res = await fetch(`${API_BASE}/api/services?${params}`)
    return (await res.json()) as ApiResponse<any[]>
  },

  getServiceBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE}/api/services/${slug}`)
    return (await res.json()) as ApiResponse<any>
  },

  getServiceCategories: async () => {
    const res = await fetch(`${API_BASE}/api/service-categories`)
    return (await res.json()) as ApiResponse<any[]>
  },

  // BLOG
  getBlogPosts: async (filters?: { category_id?: number; featured?: boolean; search?: string; page?: number }) => {
    const params = new URLSearchParams()
    if (filters?.category_id) params.append('category_id', String(filters.category_id))
    if (filters?.featured) params.append('featured', 'true')
    if (filters?.search) params.append('search', filters.search)
    if (filters?.page) params.append('page', String(filters.page))
    
    const res = await fetch(`${API_BASE}/api/blog?${params}`)
    return (await res.json()) as ApiResponse<any[]>
  },

  getBlogPostBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE}/api/blog/${slug}`)
    return (await res.json()) as ApiResponse<any>
  },

  getBlogCategories: async () => {
    const res = await fetch(`${API_BASE}/api/blog-categories`)
    return (await res.json()) as ApiResponse<any[]>
  },

  // CONTACT
  submitContact: async (data: any) => {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return (await res.json()) as ApiResponse<any>
  },

  // COMPANY INFO
  getCompanyInfo: async () => {
    const res = await fetch(`${API_BASE}/api/company-info`)
    return (await res.json()) as ApiResponse<any>
  },

  // HEALTH CHECK
  health: async () => {
    const res = await fetch(`${API_BASE}/api/health`)
    return (await res.json()) as ApiResponse<any>
  }
}
