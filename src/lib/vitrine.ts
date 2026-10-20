/** Subconjunto mínimo do JSON público GET /api/site-vitrine/:slug */
export type Vitrine = {
  tenant?: { slug?: string; nome?: string; url?: string }
  identidade?: {
    nomeDoSite?: string
    primeiroNome?: string
    fotografo?: string
  }
  inicio?: {
    especialidade?: string
    frase?: string
  }
  contato?: {
    whatsapp?: { numero?: string; mensagem?: string }
  }
}

const fallback: Vitrine = {
  identidade: { nomeDoSite: 'Seu site', primeiroNome: 'Olá' },
  inicio: {
    especialidade: 'Site em preparação',
    frase: 'Personalize este repositório — textos e preços vêm do painel.',
  },
}

/**
 * Busca a vitrine ao vivo. Se falhar (build local sem env, painel fora), usa fallback.
 */
export async function buscarVitrine(): Promise<Vitrine> {
  const url = typeof import.meta.env.SITE_VITRINE_URL === 'string' ? import.meta.env.SITE_VITRINE_URL : ''
  if (!url) return fallback
  try {
    const resposta = await fetch(url, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(2_500),
    })
    if (!resposta.ok) return fallback
    return (await resposta.json()) as Vitrine
  } catch {
    return fallback
  }
}

export function linkWhatsapp(vitrine: Vitrine): string | null {
  const numero = vitrine.contato?.whatsapp?.numero?.replace(/\D/g, '')
  if (!numero) return null
  const mensagem = encodeURIComponent(vitrine.contato?.whatsapp?.mensagem?.trim() || 'Olá!')
  return `https://wa.me/${numero}?text=${mensagem}`
}
