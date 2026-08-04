export const WHATSAPP_ID = '5511989864178';

export const EMAIL = 'rbs.consultoria.inteligente@gmail.com';

export const ENDERECO = 'R. Padre Anchieta, 712 — Mercês, Curitiba/PR, 80430-060';

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=R.+Padre+Anchieta,+712+-+Merc%C3%AAs,+Curitiba+-+PR,+80430-060';

export function whatsappLink(texto) {
  const base = `https://wa.me/${WHATSAPP_ID}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}
