import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import HashProvider from "./components/HashProvider";
import Cards from "./pages/Cards";
import Dictionaries from "./pages/Dictionaries";
import Words from "./pages/Words";
import "./styles/styles.scss";

let router = createBrowserRouter([
	{
		path: "/",
		Component: HashProvider,
		children: [
			{
				path: "dictionaries",
				children: [
					{
						index: true,
						Component: Dictionaries,
					},
					{
						path: ":id",
						Component: Words,
					},
				],
			},
			{ path: "cards/:id", Component: Cards },
		],
	},
]);
const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
