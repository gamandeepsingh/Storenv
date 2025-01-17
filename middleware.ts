export { default } from "next-auth/middleware"

export const config = { matcher: ["/env","/add-env"] }