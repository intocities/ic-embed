
class ApiCredentials {
  baseUrl: string
  key: string
  id: number

  constructor(id: number, key: string, baseUrl: string) {
    this.id = id
    this.key = key
    this.baseUrl = baseUrl
  }

  // TODO: add validation for key and baseurl
  // TODO: check for valid tour embed, error when invalid

  public get cdnUrl(): string { return 'https://cdn.intocities.com' }
  public iframeUrl(): string {
    return `${this.baseUrl}/embed/${this.id.toString()}/${this.key}`
  }
}

export = ApiCredentials
