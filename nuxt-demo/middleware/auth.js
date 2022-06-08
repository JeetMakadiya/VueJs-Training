export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  if (!store.getters["auth/getIsAuthenticated"]) {
    return redirect("/Login");
  }
}
