import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useAdmin({
  redirectTo = "",
  redirectIfFound = false,
}) {
  const { data: auth } = useSWR("/api/user");

  useEffect(() => {
    // if no redirect needed, just return
    // if auth data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !auth) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !auth?.admin) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && auth?.admin)
    ) {
      Router.push(redirectTo);
    }
  }, [auth, redirectIfFound, redirectTo]);

  return { auth };
}