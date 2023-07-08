export default class AppSettings {
  static defaultApiKey: string;
  static environment: string;

  static init(defaultApiKey: string, environment: string): void {
    this.defaultApiKey = defaultApiKey;
    this.environment = environment;
  }
}
