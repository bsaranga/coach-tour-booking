export interface ICoachType {
    coachName: string,
    seatCapacity: number,
}
const coachTypes: ICoachType[] = [
    {
        coachName: 'Standard Coach',
        seatCapacity: 120
    },
    {
        coachName: 'Double Decker Coach',
        seatCapacity: 150
    },
    {
        coachName: 'Luxury Coach',
        seatCapacity: 100
    },
    {
        coachName: 'Sleeper Coach',
        seatCapacity: 80
    }
]

export default coachTypes;