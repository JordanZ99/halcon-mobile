'use server'

export async function trackOrderAction(invoiceNumber: string, customerNumber: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        invoice_number: invoiceNumber,
        customer_number: customerNumber
      })
    });

    const data = await response.json();

    if (response.ok && data.found) {
      return {
        success: true,
        found: true,
        data: {
          invoice_number: data.data.invoice_number,
          customer_name: data.data.customer_name,
          status: data.data.status,
          delivery_address: data.data.delivery_address,
          products: data.data.products,
          created_at: data.data.created_at,
          updated_at: data.data.updated_at
        }
      };
    }

    return {
      success: false,
      found: false,
      message: data.message || 'Pedido no encontrado. Verifica tu número de factura y cliente.'
    };
  } catch (error: any) {
    console.error("Track Order Action Error:", error);
    return {
      success: false,
      message: "Error de conexión: " + (error.message || String(error))
    };
  }
}