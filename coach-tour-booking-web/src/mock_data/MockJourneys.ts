import IRouteCard from "../components/JourneyRoutes/IRouteCard";
import img1 from "../mock_data/images/germany_1.jpg"
import img2 from '../mock_data/images/germany_2.jpg'
import img3 from '../mock_data/images/germany_3.jpg'

const mockRouteInfo: IRouteCard[] = [
	{
		routeId: "1",
		startCity: "Vienna",
		endCity: "Salzburg",
		routeName: "Alpine Symphony Route",
		distance: 765,
		distanceUnit: "km",
		journeyImgUrl: img1,
		travelTime: "3 hr 52 min",
		waypoints: [
			{
				location: {
					lat: 48.0424786,
					lng: 15.7388747
				},
				stopover: false
			},
			{
				location: {
					lat: 47.9565405,
					lng: 15.2741084
				},
				stopover: false
			},
			{
				location: {
					lat: 48.00951828016254,
					lng: 15.0405714590851
				},
				stopover: false
			},
			{
				location: {
					lat: 48.05383579999999,
					lng: 14.7763332
				},
				stopover: false
			},
			{
				location: {
					lat: 48.0500949,
					lng: 14.4182691
				},
				stopover: false
			},
			{
				location: {
					lat: 47.9713309,
					lng: 13.8986643
				},
				stopover: false
			},
			{
				location: {
					lat: 47.8926728,
					lng: 13.4378568
				},
				stopover: false
			}
		]
	},
    {
		routeId: "2",
		startCity: "Vienna",
		endCity: "Salzburg",
		routeName: "Imperial Heritage Trail",
		distance: 765,
		distanceUnit: "km",
		journeyImgUrl: img2,
		travelTime: "3 hr 52 min",
		waypoints: [
			{
				location: {
					lat: 47.62919135037608,
					lng: 13.66422759500499
				},
				stopover: false
			}
		]
	},
    {
		routeId: "3",
		startCity: "Vienna",
		endCity: "Salzburg",
		routeName: "Baroque Bliss Expedition",
		distance: 765,
		distanceUnit: "km",
		journeyImgUrl: img3,
		travelTime: "3 hr 52 min",
		waypoints: [
			{
				location: {
					lat: 47.7971727,
					lng: 13.5222487
				},
				stopover: false
			},
			{
				location: {
					lat: 48.044224,
					lng: 14.4038769
				},
				stopover: false
			},
			{
				location: {
					lat: 47.6774195,
					lng: 15.1678331
				},
				stopover: false
			},
			{
				location: {
					lat: 48.04827316998495,
					lng: 16.114393802076318
				},
				stopover: false
			}
		]
	},
]

export default mockRouteInfo;