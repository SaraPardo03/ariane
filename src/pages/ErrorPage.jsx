import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError()
  console.log(error);
  
  return <>
    <h1>An error occured</h1>
    <p>{ error?.error?.toString() ?? error?.toString() }</p>
  </>
}