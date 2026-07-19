export class ApiResponse<T = any> {
  public success: boolean;
  public data?: T;
  public meta?: any;

  constructor(data?: T, meta?: any) {
    this.success = true;
    if (data !== undefined) this.data = data;
    if (meta !== undefined) this.meta = meta;
  }
}
