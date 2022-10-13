export default class Car {
    company: string;
    model: string;
    consumption: number;
    
    constructor (company: string, model: string, consumption: number) {
        this.company = company;
        this.model = model;
        this.consumption = consumption;
    }
    
}