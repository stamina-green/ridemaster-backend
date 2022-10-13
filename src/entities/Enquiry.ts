import { defaultCarInfo } from "../config";
import Car from "./Car";
import Direction from "./Direction";
import Finance from "./Finance";
import Place from "./Place";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class Enquiry {
    start: Place;
    end: Place;
    direction: Direction;
    car: Car;
    finance: Finance;
    id: number;

    constructor(id: number, start: Place, end: Place, direction: Direction, car: Car, finance: Finance) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.direction = direction;
        this.car = car;
        this.finance = finance;
    }
    public static async fromAddress(start: string, end: string) {
        const startPlace = await Place.fromAddress(start);
        const endPlace = await Place.fromAddress(end);
        const direction = await Direction.fromPlaces(startPlace, endPlace);
        const car = new Car(defaultCarInfo.company, defaultCarInfo.model, defaultCarInfo.consumption);
        const finance = new Finance(direction.distance, 3, car);

        console.log(JSON.stringify(startPlace));
        const result = await prisma.enquiry.create({
            data: {
                start: startPlace.address,
                end: endPlace.address,
                length: direction.distance,
                consumed: finance.consumed,
                cost: finance.cost,
                price: finance.price,
            }
        });
        
        return new Enquiry(result.id, startPlace, endPlace, direction, car, finance);
        
    }
}