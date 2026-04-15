import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Aplica middleware apenas em rotas autenticadas.
     * Exclui:
     *  - Rotas públicas: / e /clinica-parceiro
     *  - Assets estáticos do Next.js
     *  - Arquivos de imagem/fonte
     */
    "/((?!$|clinica-parceiro|_next/static|_next/image|favicon\\.ico|images/|fonts/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2)$).*)",
  ],
}
