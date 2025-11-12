"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = React.useState("es");
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: ""
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  React.useEffect(() => {
    params.then(p => setLocale(p.locale || "es"));
  }, [params]);

  const getContent = (locale: string) => {
    if (locale === 'en') return {
      title: 'Shopping Cart',
      emptyCart: 'Your cart is empty',
      continueShopping: 'Continue Shopping',
      orderSummary: 'Order Summary',
      product: 'Product',
      price: 'Price',
      quantity: 'Quantity',
      total: 'Total',
      remove: 'Remove',
      shippingInfo: 'Shipping Information',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      postalCode: 'Postal Code',
      notes: 'Additional Notes',
      placeOrder: 'Place Order',
      subtotal: 'Subtotal',
      installation: 'Installation',
      orderTotal: 'Order Total',
      successTitle: 'Order Placed Successfully!',
      successMessage: 'Thank you for your purchase. We will contact you soon to confirm your order and schedule the installation.',
      backToShop: 'Back to Shop'
    };
    if (locale === 'ca') return {
      title: 'Carret de Compra',
      emptyCart: 'El teu carret està buit',
      continueShopping: 'Continuar Comprant',
      orderSummary: 'Resum de la Comanda',
      product: 'Producte',
      price: 'Preu',
      quantity: 'Quantitat',
      total: 'Total',
      remove: 'Eliminar',
      shippingInfo: 'Informació d\'Enviament',
      name: 'Nom Complet',
      email: 'Correu Electrònic',
      phone: 'Telèfon',
      address: 'Adreça',
      city: 'Ciutat',
      postalCode: 'Codi Postal',
      notes: 'Notes Addicionals',
      placeOrder: 'Fer Comanda',
      subtotal: 'Subtotal',
      installation: 'Instal·lació',
      orderTotal: 'Total Comanda',
      successTitle: 'Comanda Realitzada amb Èxit!',
      successMessage: 'Gràcies per la teva compra. Ens posarem en contacte aviat per confirmar la comanda i programar la instal·lació.',
      backToShop: 'Tornar a la Botiga'
    };
    return {
      title: 'Carrito de Compra',
      emptyCart: 'Tu carrito está vacío',
      continueShopping: 'Continuar Comprando',
      orderSummary: 'Resumen del Pedido',
      product: 'Producto',
      price: 'Precio',
      quantity: 'Cantidad',
      total: 'Total',
      remove: 'Eliminar',
      shippingInfo: 'Información de Envío',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      address: 'Dirección',
      city: 'Ciudad',
      postalCode: 'Código Postal',
      notes: 'Notas Adicionales',
      placeOrder: 'Finalizar Compra',
      subtotal: 'Subtotal',
      installation: 'Instalación',
      orderTotal: 'Total del Pedido',
      successTitle: '¡Pedido Realizado con Éxito!',
      successMessage: 'Gracias por tu compra. Nos pondremos en contacto pronto para confirmar tu pedido y programar la instalación.',
      backToShop: 'Volver a la Tienda'
    };
  };

  const content = getContent(locale);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el pedido al backend
    console.log('Order placed:', { items, formData, totalPrice });
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center p-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">{content.successTitle}</h1>
          <p className="text-lg text-secondary-600 mb-8">{content.successMessage}</p>
          <Link
            href={`/${locale}/tienda`}
            className="btn-primary inline-flex"
          >
            {content.backToShop}
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg max-w-md"
        >
          <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">{content.emptyCart}</h2>
          <Link
            href={`/${locale}/tienda`}
            className="btn-primary inline-flex"
          >
            {content.continueShopping}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-12">
      <div className="container-custom">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-secondary-900 mb-8 text-center"
        >
          {content.title}
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/20"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  
                  <div className="flex-grow space-y-3">
                    <h3 className="text-xl font-bold text-secondary-900">{item.name}</h3>
                    <p className="text-secondary-600 text-sm line-clamp-2">{item.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="text-lg font-bold text-primary-600">
                        €{item.price.toLocaleString()}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-secondary-100 hover:bg-secondary-200 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        {content.remove}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-secondary-900">
                      €{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary & Form */}
          <div className="space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-white/20 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">{content.orderSummary}</h2>
              
              <div className="space-y-3 border-b border-secondary-200 pb-4 mb-4">
                <div className="flex justify-between text-secondary-600">
                  <span>{content.subtotal}</span>
                  <span className="font-semibold">€{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>{content.installation}</span>
                  <span className="font-semibold">{content.installation}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-secondary-900 mb-6">
                <span>{content.orderTotal}</span>
                <span className="text-primary-600">€{totalPrice.toLocaleString()}</span>
              </div>

              {/* Shipping Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-secondary-900 mb-4">{content.shippingInfo}</h3>
                
                <input
                  type="text"
                  name="name"
                  placeholder={content.name}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-base"
                />

                <input
                  type="email"
                  name="email"
                  placeholder={content.email}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-base"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder={content.phone}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="input-base"
                />

                <input
                  type="text"
                  name="address"
                  placeholder={content.address}
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="input-base"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="city"
                    placeholder={content.city}
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="input-base"
                  />

                  <input
                    type="text"
                    name="postalCode"
                    placeholder={content.postalCode}
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="input-base"
                  />
                </div>

                <textarea
                  name="notes"
                  placeholder={content.notes}
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-base resize-none"
                />

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {content.placeOrder}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
