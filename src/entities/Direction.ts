import axios from "axios";
import { apiKey } from "../config";
import Place from "./Place";

export default class Direction {
  start: Place;
  end: Place;
  distance: number;
  constructor(start: Place, end: Place, distance: number) {
    this.start = start;
    this.end = end;
    this.distance = distance;
  }
  public static async fromPlaces(start: Place, end: Place) {
    const distance = await this.getDistance(start, end);
    return new Direction(start, end, distance);
  }

  public static async getDistance(start: Place, end: Place) {
    let response;
    try {
      response = await axios.get(
        encodeURI(
          "https://maps.googleapis.com/maps/api/directions/json?origin=" +
            start.address +
            "&destination=" +
            end.address +
            "&key=" +
            apiKey
        )
      );

      return response.data.routes[0].legs[0].distance.value;
    } catch (e) {
      throw Error("Direction search problem");
    }
  }
}
