import { STRAPI_BASE_URL } from '../constants'

type FetchOptions = {
  pagination?: {
    page?: number
    pageSize?: number
  }
  populate?: string | string[]
  filters?: Record<string, any>
  sort?: string | string[]
}

export async function fetchFromStrapi<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const url = new URL(`/api${endpoint}`, STRAPI_BASE_URL)

  // Улучшенная обработка populate для Strapi v5
  if (options.populate) {
    if (Array.isArray(options.populate)) {
      options.populate.forEach((field, index) => {
        url.searchParams.append(`populate[${index}]`, field)
      })
    } else if (typeof options.populate === 'string') {
      url.searchParams.append('populate', options.populate)
    }
  }

  // Фильтрация
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([operator, val]) => {
          url.searchParams.append(`filters[${key}][${operator}]`, String(val))
        })
      } else {
        url.searchParams.append(`filters[${key}]`, String(value))
      }
    })
  }

  // Остальные параметры (пагинация, сортировка)
  if (options.pagination) {
    url.searchParams.append(
      'pagination[page]',
      String(options.pagination.page ?? 1),
    )
    url.searchParams.append(
      'pagination[pageSize]',
      String(options.pagination.pageSize ?? 10),
    )
  }

  if (options.sort) {
    const sortValue = Array.isArray(options.sort)
      ? options.sort.join(',')
      : options.sort
    url.searchParams.append('sort', sortValue)
  }

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Failed to fetch ${url.toString()}`)
  return await res.json()
}
