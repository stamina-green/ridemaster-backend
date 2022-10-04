import axios from "axios";
import findPlaceMan from "./findPlaceMan";

const apiKey = "AIzaSyCcfx4-W3siKrad3OszOuKrL8n48QK1oxE";

export default async (startPoint: string, destinationPoint: string) => {
  startPoint = startPoint.replaceAll(" ", "+");
  startPoint = startPoint.replaceAll(",", " ");

  destinationPoint = destinationPoint.replaceAll(" ", "+");
  destinationPoint = destinationPoint.replaceAll(",", " ");

  let response;
  try {
    response = await axios.get(
      encodeURI(
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
          await findPlaceMan(startPoint) +
          "&destination=" +
          await findPlaceMan(destinationPoint) +
          "&key=" +
          apiKey
      )
    );
    console.log(response.data.routes[0].legs[0].distance.value);
    
    return response.data.routes[0].legs[0].distance.value;
  } catch (e) {
    console.log(response?.data, e);

    return response?.data ?? "a";
  }
};
