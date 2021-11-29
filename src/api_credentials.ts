interface Overlay {
  for_scene_id: string
  for_scene_name: string
  scene_id: string
  scene_name: string
}

interface Scene {
  id: string
  name: string
  lat?: number
  lng?: number
  kind?: string
}
interface Tour {
  identifier: string
  radar: boolean
  radar_offset: number
  start_scene: string
  lookat_h?: number
  lookat_v?: number
  overlays: Overlay[]
  scenes: { [index: string]: Scene[] }
  floorplan_url: string
  tour_xml: string
  back_to_city_url: string
}

interface ThumbnailUrls {
  landscape: string
}

interface Poi {
  id: number
  name: string
  city: string
  videos_count: number
  canonical_url: string
  videos_url: string
  tour_present: boolean
  tours: Tour[]
  features: { [index: string]: string }
  thumbnail_present: boolean
  thumbnail_urls: ThumbnailUrls
}

interface ApiResponse {
  poi: Poi
  origin?: string
}

class ApiCredentials {
  baseUrl: string
  key: string
  id: number
  apiResponse: ApiResponse

  constructor(id: number, key: string, baseUrl: string) {
    if (!id || !key || !baseUrl) {
      throw new TypeError('id, key and baseUrl are required')
    }

    this.id = id
    this.key = key
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  }

  async validate(): Promise<boolean> {
    if (!this.apiResponse) {
      this.apiResponse = await this.request()
    }

    return this.isValid()
  }

  private isValid(): boolean {
    if (!this.apiResponse?.poi) {
      return false
    }

    if (typeof this.apiResponse.origin === 'string' && this.apiResponse.origin !== window.location.origin) {
      throw new Error("Can't be used on this origin!")
    }

    return this.apiResponse.poi.tour_present && this.apiResponse.poi.id === this.id
  }

  private request(): Promise<ApiResponse> {
    return fetch(`${this.baseUrl}api/pois/${this.id}/embed/${this.key}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      referrer: 'origin'
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error(`unsuccessful data request with status: ${response.status}`)
      })
      .catch((error) => {
        throw error
      })
  }

  public get cdnUrl(): string {
    return 'https://cdn.intocities.com'
  }

  public iframeUrl(): string {
    return `${this.baseUrl}/embed/${this.id.toString()}/${this.key}`
  }
}

export = ApiCredentials
