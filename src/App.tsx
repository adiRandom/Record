import { NativeRouter, Route, Switch } from "react-router-native"
import React from 'react'
import Home from "./routes/Home/Home";
import { View } from "react-native";
import CreateActivity from "./routes/CreateActivity/CreateActivity";
// TODO: Add components


const App = () => {

	return (
		<View>

			<NativeRouter>
				<Switch>
					<Route exact strict path="/" component={Home}></Route>
					{/* Activity rotue */}
					<Route exact strict path="/activity/:id" />
					<Route exact strict path="/add/activity" component={CreateActivity} />
					<Route exact strict path="/add/record"></Route>
					<Route exact strict path="/activity/:id/history" />
				</Switch>
			</NativeRouter>
		</View>
	)


}

export default App;