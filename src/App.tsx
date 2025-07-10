import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import Cards from "./pages/Cards";
import Dictionaries from "./pages/Dictionaries";
import Init from "./pages/Init";
import Words from "./pages/Words";
import "./styles/styles.scss";

const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			<BrowserRouter>
				<Routes>
					<Route path="init" element={<Init />} />
					<Route path="dictionaries">
						<Route index element={<Dictionaries />} />
						<Route path=":id" element={<Words />} />
					</Route>
					<Route path="cards" element={<Cards />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
