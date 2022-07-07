export default function ({ store, redirect, route }) {
  // If the user is authenticated redirect to home page
  if (store.getters["auth/getIsAuthenticated"]) {
    return redirect("/Home");
  }
}
