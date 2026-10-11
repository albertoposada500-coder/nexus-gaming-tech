export function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildWhatsAppMessage(
  items: { product: { name: string; price: number; brand: string }; quantity: number }[],
  subtotal: number
): string {
  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.product.brand} ${item.product.name}\n   Cantidad: ${item.quantity}\n   Precio: ${formatCOP(item.product.price)}\n   Subtotal: ${formatCOP(item.product.price * item.quantity)}`
  );
  const message = `*NEXUS GAMING & TECH - NUEVO PEDIDO*\n\n${lines.join('\n\n')}\n\n*TOTAL: ${formatCOP(subtotal)}*\n\n¡Hola! Quiero confirmar este pedido.`;
  return encodeURIComponent(message);
}
