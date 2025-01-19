// routes/+page.server.ts
import { redirect} from "@sveltejs/kit";
import type { LayoutServerLoad} from "./$types";

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user && event.url.pathname !== "/login") {
		return redirect(302, "/login");
	} else if (event.locals.user && event.url.pathname === "/login") {
		return redirect(302, "/");
	}
	let user = event.locals.user
	return {
		user
	};
};

