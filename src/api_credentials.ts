interface ThumbnailUrls {
  landscape: string
}

interface Poi {
  id: number
  name: string
  city: string
  tour_present: boolean
  thumbnail_present: boolean
  thumbnail_urls: ThumbnailUrls
}

interface ApiResponse {
  poi: Poi
  origin?: string
}

interface ApiParameters {
  id: number
  key: string
  baseUrl: string
}

class ApiCredentials {
  baseUrl: string
  key: string
  id: number
  apiResponse?: ApiResponse

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

    return new Promise((resolve, reject) => {
      try {
        if (this.isValid()) {
          resolve(true)
        } else {
          throw new Error('invalid credentials')
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  private isValid(): boolean {
    if (!this.apiResponse) {
      throw new Error('must call validate() before calling isValid().')
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

  public static get cdnUrl(): string {
    return 'https://cdn.intocities.com'
  }

  public get iframeUrl(): string {
    return `${this.baseUrl}embed/${this.id.toString()}/${this.key}`
  }

  public get imageUrl(): string | undefined {
    return this.apiResponse?.poi?.thumbnail_urls?.landscape
  }
}

export { ApiCredentials, ApiParameters }
