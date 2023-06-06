import { Notyf } from "notyf";

class Notify {
    info(arg0: string) {
        throw new Error("Method not implemented.");
    }
    //change the UI and look of our notify error or success message
    private notification = new Notyf({duration: 4000, position: {x: "center", y: "top"}});

    //success
    public success(message: string) {
        this.notification.success(message);
    }


    //error
    public error(message: string) {
        this.notification.error(message);
    }
}

const notify =  new Notify();
export default notify;