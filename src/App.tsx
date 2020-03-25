import { NativeRouter, Route } from "react-router-native"

const App = () => {
	return (<NativeRouter>
		<Route exact strict path="/"></Route>
		{/* Activity rotue */}
		<Route exact strict path="/activity/:id"/>
		<Route exact strict path="/add/activity"/>
		<Route exact strict path="/add/record"></Route>
		<Route exact strict path="/activity/:id/history"/>
	</NativeRouter>)
}