import { NativeRouter, Route, BackButton, Switch } from "react-router-native"
import React, { useState } from 'react'
import Home from "./routes/Home/Home";
import Appbar, { ThemeDropdown } from "./components/Appbar/Appbar";
import { View } from "react-native";
// TODO: Add components
const App = () => {

	return (
		<View>
			
			<NativeRouter>
				<Switch>
					<Route exact strict path="/" component={Home}></Route>
					{/* Activity rotue */}
					<Route exact strict path="/activity/:id" />
					<Route exact strict path="/add/activity" />
					<Route exact strict path="/add/record"></Route>
					<Route exact strict path="/activity/:id/history" />
				</Switch>
			</NativeRouter>
		</View>
	)
}

export default App;