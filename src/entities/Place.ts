import { apiKey } from "../config";
import axios from "axios";

export default class Place {
  address: string;
  location: any = undefined;
  constructor(address: string, location: any) {
    this.address = address;
    this.location = location;
  }

  public static async fromAddress(search: string) {
    search = search.replaceAll(" ", "+");
    search = search.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    let response;
    try {
      response = await axios
        .get(
          "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&input=" +
            search +
            "&key=" +
            apiKey +
            "&fields=formatted_address,geometry&locationbias=point:50,14"
        )
        console.log(response.data.candidates[0]);
        
        return new Place(response.data.candidates[0].formatted_address, response.data.candidates[0].geometry.location);
    } catch (e) {
      throw new Error("Place search problem");
    }
  }  
}

