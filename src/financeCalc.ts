const literPrice = 38
const consumption = 7

export default (distance: number, multiplier: number): Result => {
    distance = distance / 1000

    distance = Math.ceil(distance)

    const consumedLiters = Math.ceil((distance / 100 * consumption))
    const cost = (consumedLiters * literPrice)

    return {
        distance,
        consumed: consumedLiters,
        wanted: Math.ceil(consumedLiters * multiplier),
        price: Math.ceil(cost * multiplier),
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