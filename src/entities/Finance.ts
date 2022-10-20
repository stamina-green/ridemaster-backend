import { literPrice } from "../config";
import Car from "./Car";

export default class Finance {
  distance: number;
  consumed: number;
  cost: number;
  wanted: number;
  price: number;

  constructor(distance: number, multiplier: number, car: Car) {
    this.distance = distance / 1000;
    this.consumed = Math.ceil(this.distance * car.consumption) / 100;
    this.cost = Math.ceil(this.consumed * literPrice);
    this.wanted = Math.ceil(this.consumed * multiplier * 100) / 100;
    this.price = Math.ceil(this.wanted * literPrice);
  }
}
