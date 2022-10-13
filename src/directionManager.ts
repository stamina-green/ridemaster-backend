import axios from "axios";
import findPlaceMan from "./findPlaceMan";

const apiKey = "AIzaSyCcfx4-W3siKrad3OszOuKrL8n48QK1oxE";

export default async (startPoint: string, destinationPoint: string, latlng: latlng) => {
  startPoint = startPoint.replaceAll(" ", "+");
  startPoint = startPoint.replaceAll(",", " ");

  destinationPoint = destinationPoint.replaceAll(" ", "+");
  destinationPoint = destinationPoint.replaceAll(",", " ");
  const a = {num: []}
  let response;
  try {
    response = await axios.get(
      encodeURI(
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
          await findPlaceMan(startPoint, a) +
          "&destination=" +
          await findPlaceMan(destinationPoint, a) +
          "&key=" +
          apiKey
      )
    );
    latlng.result.push(a.num);
    console.log(response.data.routes[0].legs[0].distance.value);
    
    return response.data.routes[0].legs[0].distance.value;
  } catch (e) {
    console.log(response?.data, e);

    return response?.data ?? "a";
  }
};

interface latlng {
  result: any[]
}
