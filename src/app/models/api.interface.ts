export interface ApiInterface {
  total: number
  page: number
  pages: number
  tv_shows: TvShow[]
}

export interface TvShow {
  id: number
  name: string
  permalink: string
  start_date: string
  end_date?: string
  country: string
  network: string
  status: string
  image_thumbnail_path: string
}
