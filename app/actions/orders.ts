'use server'

import { cookies } from 'next/headers';

export async function fetchOrdersAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('halcon_token')?.value;

    if (!token) {
      return { success: false, status: 401, message: "No autenticado" };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data: Array.isArray(data) ? data : data.data || [] };
    }
    return { success: false, status: response.status };
  } catch (error: any) {
    console.error("Fetch Orders Action Error:", error);
    return { success: false, message: "Error fetching orders: " + (error.message || String(error)) };
  }
}

export async function updateOrderStatusAction(id: string, formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('halcon_token')?.value;

    if (!token) {
      return { success: false, status: 401, message: "No autenticado" };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/status`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (response.ok) {
      return { success: true };
    }
    
    const data = await response.json();
    return { success: false, message: data.message || "Error al actualizar" };
  } catch (error: any) {
    console.error("Update Order Status Action Error:", error);
    return { success: false, message: "Error de conexión: " + (error.message || String(error)) };
  }
}
