export class ContactModel
{
    name:string;
    telephone:string;
    email:string;
    date:string;
    CityAndState:string;
    constructor(){
        this.name = '';
        this.email = '';
        this.telephone = '';
        this.date = '';
        this.CityAndState = '';
    }
}