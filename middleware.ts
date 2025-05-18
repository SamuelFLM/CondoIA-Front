import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rotas que não precisam de autenticação
  const publicRoutes = ["/login", "/registro", "/recuperar-senha", "/acesso-negado", "/"]
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  // Verifica se é uma rota de API ou de assets
  const isApiRoute = pathname.startsWith("/api")
  const isAssetRoute = pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico") || pathname.includes(".")

  // Se for uma rota pública, de API ou de assets, permite o acesso
  if (isPublicRoute || isApiRoute || isAssetRoute) {
    return NextResponse.next()
  }

  // Verifica o token nos cookies
  const token = request.cookies.get("auth-token")?.value

  // Se não houver token, redireciona para o login
  if (!token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // Se houver token, permite o acesso
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
