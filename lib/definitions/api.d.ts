export type GenericHTTPResponse<T> = {
  message: string;
  data: T;
  success: boolean;
}