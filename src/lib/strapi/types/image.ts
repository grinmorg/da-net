export type ImageFormat = {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export type ImageAttributes = {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    large: ImageFormat
    small: ImageFormat
    medium: ImageFormat
    thumbnail: ImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: null
  createdAt: string
  updatedAt: string
  publishedAt: string
}
