import { Notyf } from "notyf";


export enum SccMsg {
  LOGIN_APPROVED = "Hello my master",
  COMPANY_ADD = "A new company added successfully",
}

export enum ErrMsg {
  LOGIN_ERR = "Bad username or password",
  COMPANY_EXISTS = "There is a company with that email",
  CUSTOMER_EXISTS = "There is a customer with that email",
  COUPONS_ERR = "Problem to download coupons"
}

class Notify_Advanced {
  private notification = new Notyf({
    duration: 4000,
    position: { x: "center", y: "center" },
  });
  public success(message: string) {
    this.notification.success(message);
  }

  public error(err: any) {
    const msg = this.extractMsg(err);
    this.notification.error(msg);
  }

  private extractMsg(err: any): string {
    if (typeof err === "string") {
      return err;
    }

    if (typeof err?.response?.data === "string") {
      //backhand exact error
      return err.response.data;
    }
    if (Array.isArray(err?.response?.data)) {
      //backhand exact error
      return err?.response?.data[0];
    }
    //must be last
    if (typeof err?.massage === "string") {
      return err?.message;
    }

    return "We have a problem";
  }
}

const advNotify = new Notify_Advanced();
export default advNotify;
