export class User {
  constructor(private uid: string) {}

  get token() {
    return this.uid;
  }
}
