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
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'https://admin.da-net.fun'
  const url = new URL(`/api${endpoint}`, baseUrl)

  // Добавляем параметры пагинации
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

  // Добавляем параметры populate
  if (options.populate) {
    const populateValue = Array.isArray(options.populate)
      ? options.populate.join(',')
      : options.populate
    url.searchParams.append('populate', populateValue)
  }

  // Добавляем фильтры
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      url.searchParams.append(`filters[${key}]`, String(value))
    })
  }

  // Добавляем сортировку
  if (options.sort) {
    const sortValue = Array.isArray(options.sort)
      ? options.sort.join(',')
      : options.sort
    url.searchParams.append('sort', sortValue)
  }

  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`)
  }

  return await res.json()
}
