export default class OSError {
  constructor(code, data) {
    this.name = 'OSError'
    this.message = `OS Error '${code}'`
    this.code = code
    this.data = data
  }
}
