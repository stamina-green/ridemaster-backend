const literPrice = 38
const consumption = 7

export default (distance: number, multiplier: number): Result => {
    distance = distance / 1000

    distance = (distance)

    const consumedLiters = ((distance / 100 * consumption))
    const cost = Math.ceil(consumedLiters * literPrice)
    const wanted = (consumedLiters * multiplier);
    return {
        distance,
        consumed: consumedLiters,
        wanted,
        price: Math.ceil(wanted * literPrice),
        cost
    }

}



interface Result {
    distance: number
    consumed: number
    wanted: number
    price: number
    cost: number
}