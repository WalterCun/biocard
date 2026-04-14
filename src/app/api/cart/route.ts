import { NextResponse } from "next/server";

// Simple cart storage (in production, this would be in the database or Redis)
const carts: Map<string, Array<{ productId: string; quantity: number }>> = new Map();

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id") || "anonymous";
  const cart = carts.get(userId) || [];
  return NextResponse.json(cart);
}

export async function POST(req: Request) {
  const userId = req.headers.get("x-user-id") || "anonymous";
  const { productId, quantity = 1 } = await req.json();

  if (!productId) {
    return NextResponse.json({ error: "Product ID requerido" }, { status: 400 });
  }

  const cart = carts.get(userId) || [];
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  carts.set(userId, cart);
  return NextResponse.json(cart);
}

export async function PUT(req: Request) {
  const userId = req.headers.get("x-user-id") || "anonymous";
  const { productId, quantity } = await req.json();

  if (!productId || quantity === undefined) {
    return NextResponse.json({ error: "Product ID y quantity requeridos" }, { status: 400 });
  }

  const cart = carts.get(userId) || [];
  const item = cart.find((item) => item.productId === productId);

  if (item) {
    if (quantity <= 0) {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    } else {
      item.quantity = quantity;
    }
  }

  carts.set(userId, cart);
  return NextResponse.json(cart);
}

export async function DELETE(req: Request) {
  const userId = req.headers.get("x-user-id") || "anonymous";
  const { productId } = await req.json();

  if (productId) {
    const cart = carts.get(userId) || [];
    const filtered = cart.filter((item) => item.productId !== productId);
    carts.set(userId, filtered);
  } else {
    carts.set(userId, []);
  }

  return NextResponse.json({ message: "Carrito limpiado" });
}