import { jwtDecode } from 'jwt-decode';
import { SECONDS } from '@constants/times';

class Token {
  readonly token: string | null = null;
  readonly decoded: Record<string, any>;
  readonly expiry: number;

  constructor(token: string | null) {
    this.token = token;
    this.decoded = token ? jwtDecode(token) : {};
    this.expiry = this.decoded.exp * SECONDS;
  }

  public get(): string | null {
    return this.token;
  }

  public getBearerToken(): string {
    return `Bearer ${this.token}`;
  }

  public hasValue(): boolean {
    return this.token !== null;
  }

  public isExpired(): boolean {
    return Date.now() >= this.expiry;
  }
}

export default Token;
