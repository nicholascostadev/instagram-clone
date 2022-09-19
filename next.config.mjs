import { env } from "./src/env/server.mjs"

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["instagram.com","images.unsplash.com", "github.com", "lh3.googleusercontent.com", "instagram.fsdu6-1.fna.fbcdn.net", "instagram.fsdu7-1.fna.fbcdn.net", "res.cloudinary.com"],
  },
})
