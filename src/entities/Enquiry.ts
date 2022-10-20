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
        const car = new Car();
        const finance = new Finance(direction.distance, 3, car);

        console.log(JSON.stringify(startPlace));
        const result = await prisma.enquiry.create({
            data: {
                startAddress: startPlace.address,
                endAddress: endPlace.address,
                startLat: startPlace.location.lat,
                startLng: startPlace.location.lng,
                endLat: endPlace.location.lat,
                endLng: endPlace.location.lng,
                length: direction.distance,
                consumed: finance.consumed,
                cost: finance.cost,
                price: finance.price,
                multiplier: 3,
            }
        });
        
        return new Enquiry(result.id, startPlace, endPlace, direction, car, finance);
        
    }
    public static async fromId(id: number) {
        const result = await prisma.enquiry.findUnique({
            where: {
                id: id
            }
        });
        if(!result) throw Error("Enquiry not found");
        const startPlace = new Place(result.startAddress, {lat: result.startLat, lng: result.startLng});
        const endPlace = new Place(result.endAddress, {lat: result.endLat, lng: result.endLng});
        const direction = new Direction(startPlace, endPlace, result.length);
        const car = new Car();
        const finance = new Finance(direction.distance, result.multiplier, car);
        return new Enquiry(result.id, startPlace, endPlace, direction, car, finance);
    }
}