import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, username } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Check if username is taken (if provided)
    if (username) {
      const existingProfile = await prisma.profile.findUnique({
        where: { username },
      });

      if (existingProfile) {
        return NextResponse.json(
          { error: 'El username ya está en uso' },
          { status: 400 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user and profile in transaction
    const user = await prisma.$transaction(async (tx) => {
      // Create user
      const newUser = await tx.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      // Create profile with default username (email part)
      const defaultUsername = username || email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');

      await tx.profile.create({
        data: {
          userId: newUser.id,
          username: defaultUsername,
          displayName: name || email.split('@')[0],
        },
      });

      return newUser;
    });

    return NextResponse.json(
      { message: 'Usuario creado exitosamente', userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    );
  }
}