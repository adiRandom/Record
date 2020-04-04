import { NativeRouter, Route, Switch, BackButton } from "react-router-native"
import React, { useEffect, useState } from 'react'
import Home from "./routes/Home/Home";
import { View } from "react-native";
import CreateActivity from "./routes/CreateActivity/CreateActivity";
import Activity from "./routes/Activity/Activity";
import History from "./routes/History/History";
import CreateRecord from "./routes/CreateRecord/CreateRecord";
import useTheme from "./utils/hooks/UseTheme";
import startObserveTheme, { getPreferedTheme } from "./services/Theme";
import { themeObservable, Colors } from "./assets/style/Theme";
import { Provider, DefaultTheme } from 'react-native-paper'


// export const ThemeContext = React.createContext("light")

// function renderRouteWithContext(props: any, component: any, theme: "light" | "dark") {
// 	const Component = component;
// 	return (
// 		<ThemeContext.Provider value={theme}>
// 			<Component {...props}></Component>
// 		</ThemeContext.Provider>
// 	)
// }


const App = () => {

	const theme = useTheme();
	const [paperTheme, setPaperTheme] = useState(DefaultTheme)

	useEffect(() => {
		const newTheme = DefaultTheme;
		if (theme === "dark") {
			newTheme.colors.surface = Colors.backgroundDark;
			newTheme.colors.text = "white"
		}
		else {
			newTheme.colors.surface = Colors.backgroundLight;
			newTheme.colors.text = "black"
		}
		setPaperTheme(newTheme)
	}, [theme])

	// Start the theme observing service and get the last theme saved
	useEffect(() => {
		getPreferedTheme().then(val => themeObservable.next(val)).then(_ => startObserveTheme())
	}, [])
	return (
		<Provider theme={paperTheme}>
			<NativeRouter>
				<BackButton>
					<Route exact strict path="/" component={Home}></Route>
					{/* Activity rotue */}
					<Route exact strict path="/activity/:id" component={Activity} />
					<Route exact strict path="/add/activity" component={CreateActivity} />
					<Route exact strict path="/add/record" component={CreateRecord}></Route>
					<Route exact strict path="/activity/:id/history" component={History} />
				</BackButton>
			</NativeRouter>
		</Provider>
	)



}

export default App;