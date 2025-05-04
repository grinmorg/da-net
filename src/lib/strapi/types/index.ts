type Pagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

type Meta = {
  pagination: Pagination
}

type RichBlocksContent = {
  type: string
  level?: number
  children: {
    text?: string
    type: string
    underline?: boolean
    bold?: boolean
  }[]
}
