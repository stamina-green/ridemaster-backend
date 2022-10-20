import { defaultCarInfo } from "../config";

export default class Car {
    company: string;
    model: string;
    consumption: number;
    
    constructor () {
        this.company = defaultCarInfo.company;
        this.model = defaultCarInfo.model;
        this.consumption = defaultCarInfo.consumption;
    }
    
}