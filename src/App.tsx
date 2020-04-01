import { NativeRouter, Route, Switch } from "react-router-native"
import React from 'react'
import Home from "./routes/Home/Home";
import { View } from "react-native";
import CreateActivity from "./routes/CreateActivity/CreateActivity";
import Activity from "./routes/Activity/Activity";
import History from "./routes/History/History";
import CreateRecord from "./routes/CreateRecord/CreateRecord";
// TODO: Add components


const App = () => {

	return (
		<View>

			<NativeRouter>
				<Switch>
					<Route exact strict path="/" component={Home}></Route>
					{/* Activity rotue */}
					<Route exact strict path="/activity/:id" component={Activity} />
					<Route exact strict path="/add/activity" component={CreateActivity} />
					<Route exact strict path="/add/record" component={CreateRecord}></Route>
					<Route exact strict path="/activity/:id/history" component={History} />
				</Switch>
			</NativeRouter>
		</View>
	)


}

export default App;