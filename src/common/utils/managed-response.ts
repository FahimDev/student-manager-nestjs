export default class ManagedResponse {
  private status: string;
  private messages: string[];
  private data?: unknown;

  constructor({ status, messages, data }: Iresponse) {
    this.status = status;
    this.messages = messages;
    this.data = data;
  }

  public success(param: string) {
    this.status = 'success';
  }

  public failed(param: string) {
    this.status = 'failed';
  }

  public get(): Iresponse {
    let res: Iresponse = {
      status: this.status,
      messages: this.messages,
    };

    if (this.data) res.data = this.data;
    
    return res;
  }
}
