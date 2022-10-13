import axios from "axios";

const apiKey = "AIzaSyCcfx4-W3siKrad3OszOuKrL8n48QK1oxE";

export default async (findPoint: string, a: any) => {
  findPoint = findPoint.replaceAll(" ", "+");
  findPoint = findPoint.normalize("NFD").replace(/\p{Diacritic}/gu, "")

  let response
  try {
    response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&input=" +
        findPoint + 
        "&key=" + 
        apiKey + 
        "&fields=formatted_address,geometry"
    );
    a.num.push(response.data.candidates[0].geometry.location);
    
    return response.data.candidates[0].formatted_address
  } catch (e) {
    return response?.data ?? "a"
  }
  
};
