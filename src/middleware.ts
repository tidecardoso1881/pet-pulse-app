import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  /*
   * Inclui SOMENTE as rotas que precisam de auth.
   * / e /clinica-parceiro são públicas — não entram aqui.
   */
  matcher: [
    "/dashboard/:path*",
    "/pets/:path*",
    "/appointments/:path*",
    "/vaccines/:path*",
    "/vets/:path*",
    "/settings/:path*",
    "/medical-records/:path*",
    "/exams/:path*",
    "/health-monitoring/:path*",
    "/gps/:path*",
    "/routine/:path*",
    "/marketplace/:path*",
    "/notifications/:path*",
    "/login",
    "/cadastro",
    "/verificar",
    "/recuperar",
    "/nova-senha",
  ],
}
