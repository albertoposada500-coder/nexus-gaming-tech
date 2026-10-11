import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, CreditCard, ArrowLeft, Check, Lock, Download } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCOP, buildWhatsAppMessage } from '@/lib/utils';

const WHATSAPP_NUMBER = '573146856422';

type CheckoutView = 'cart' | 'checkout' | 'success';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalQuantity, clearCart } = useCart();
  const [view, setView] = useState<CheckoutView>('cart');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const message = buildWhatsAppMessage(items, subtotal);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleCheckout = () => {
    setView('checkout');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setView('success');
    }, 2000);
  };

  const handleClose = () => {
    closeCart();
    setTimeout(() => {
      setView('cart');
      setCardData({ number: '', name: '', expiry: '', cvv: '' });
    }, 300);
  };

  const handleFinish = () => {
    clearCart();
    handleClose();
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fade-in"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[460px] bg-nexus-dark border-l border-nexus-border z-50 flex flex-col animate-slide-in-right shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-nexus-border shrink-0">
          <div className="flex items-center gap-2">
            {view !== 'cart' && (
              <button
                onClick={() => setView(view === 'success' ? 'checkout' : 'cart')}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-nexus-surface text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <ShoppingBag className="w-5 h-5 text-nexus-red" />
            <h2 className="text-lg font-bold text-white">
              {view === 'cart' && `Carrito (${totalQuantity})`}
              {view === 'checkout' && 'Pago Seguro'}
              {view === 'success' && 'Compra Aprobada'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-nexus-surface text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {view === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-nexus-surface border border-nexus-border flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-neutral-600" />
                  </div>
                  <p className="text-neutral-400 text-lg font-medium">Tu carrito está vacío</p>
                  <p className="text-neutral-600 text-sm mt-1">Agrega productos para continuar</p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 gradient-red text-white rounded-lg font-medium hover:scale-105 transition-transform"
                  >
                    Explorar catálogo
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 bg-nexus-card border border-nexus-border rounded-xl p-3 animate-fade-in"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-nexus-red font-medium">{item.product.brand}</p>
                        <h3 className="text-sm text-white font-medium leading-snug line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="text-sm font-bold text-white mt-1">{formatCOP(item.product.price)}</p>
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity */}
                          <div className="flex items-center gap-1 bg-nexus-surface rounded-lg border border-nexus-border">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm text-white font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-neutral-500 hover:text-nexus-red transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {view === 'checkout' && (
            <form onSubmit={handlePayment} className="p-4 space-y-4">
              {/* Security badge */}
              <div className="flex items-center gap-2 bg-nexus-card border border-nexus-border rounded-lg p-3">
                <Lock className="w-5 h-5 text-green-500 shrink-0" />
                <p className="text-xs text-neutral-300">
                  Pago procesado con cifrado SSL 256-bit. Tus datos están protegidos.
                </p>
              </div>

              {/* Card preview */}
              <div className="relative h-48 rounded-xl gradient-dark border border-nexus-border-bright p-5 overflow-hidden neon-border">
                <div className="absolute top-4 right-4 text-xs font-bold text-neutral-400 tracking-wider">NEXUS PAY</div>
                <div className="absolute top-12 left-5 w-12 h-9 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600" />
                <p className="absolute bottom-14 left-5 text-lg sm:text-xl font-mono tracking-widest text-white">
                  {cardData.number || '•••• •••• •••• ••••'}
                </p>
                <div className="absolute bottom-4 left-5">
                  <p className="text-[10px] text-neutral-500 uppercase">Titular</p>
                  <p className="text-sm text-white font-medium uppercase">{cardData.name || 'NOMBRE APELLIDO'}</p>
                </div>
                <div className="absolute bottom-4 right-5">
                  <p className="text-[10px] text-neutral-500 uppercase">Vence</p>
                  <p className="text-sm text-white font-medium">{cardData.expiry || 'MM/AA'}</p>
                </div>
              </div>

              {/* Form fields */}
              <div>
                <label className="text-xs text-neutral-400 block mb-1.5">Número de tarjeta</label>
                <input
                  type="text"
                  required
                  value={cardData.number}
                  onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
                  placeholder="4111 1111 1111 1111"
                  className="w-full bg-nexus-surface border border-nexus-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-nexus-red focus:outline-none transition-colors font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 block mb-1.5">Nombre del titular</label>
                <input
                  type="text"
                  required
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                  placeholder="COMO APARECE EN LA TARJETA"
                  className="w-full bg-nexus-surface border border-nexus-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-nexus-red focus:outline-none transition-colors uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1.5">Vencimiento</label>
                  <input
                    type="text"
                    required
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                    placeholder="MM/AA"
                    className="w-full bg-nexus-surface border border-nexus-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-nexus-red focus:outline-none transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 block mb-1.5">CVV</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={cardData.cvv}
                    onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                    placeholder="123"
                    className="w-full bg-nexus-surface border border-nexus-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-nexus-red focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Order summary */}
              <div className="bg-nexus-card border border-nexus-border rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span>{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>Envío</span>
                  <span className="text-green-500 font-medium">GRATIS</span>
                </div>
                <div className="border-t border-nexus-border pt-2 flex justify-between text-base font-bold text-white">
                  <span>Total</span>
                  <span>{formatCOP(subtotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full py-3.5 gradient-red text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-wait"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Pagar {formatCOP(subtotal)}
                  </>
                )}
              </button>
            </form>
          )}

          {view === 'success' && (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mb-5 animate-fade-in">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white">¡Pago Aprobado!</h3>
              <p className="text-neutral-400 text-sm mt-2 max-w-xs">
                Tu compra ha sido procesada exitosamente. Recibirás un correo con la confirmación y el número de guía.
              </p>

              <div className="mt-6 w-full max-w-xs bg-nexus-card border border-nexus-border rounded-xl p-4 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">N° Orden</span>
                  <span className="text-white font-mono">NX-{Date.now().toString().slice(-8)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Total pagado</span>
                  <span className="text-white font-bold">{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Método</span>
                  <span className="text-white">Tarjeta •••• {cardData.number.slice(-4) || '0000'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Estado</span>
                  <span className="text-green-500 font-medium">Aprobado</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="mt-6 w-full max-w-xs py-3 gradient-red text-white rounded-lg font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Finalizar
              </button>
            </div>
          )}
        </div>

        {/* Footer with actions */}
        {view === 'cart' && items.length > 0 && (
          <div className="border-t border-nexus-border p-4 space-y-3 shrink-0 bg-nexus-dark">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-neutral-400">Subtotal</span>
              <span className="text-xl font-extrabold text-white">{formatCOP(subtotal)}</span>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3 bg-[#25D366] text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Pedir por WhatsApp
            </button>

            <button
              onClick={handleCheckout}
              className="w-full py-3 gradient-red text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <CreditCard className="w-5 h-5" />
              Pagar con Tarjeta
            </button>
          </div>
        )}
      </div>
    </>
  );
}
