import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 });
    }

    const body = await req.json();
    const { links } = body; // Array de { id, position }

    if (!Array.isArray(links)) {
      return NextResponse.json({ error: 'Formato inválido' }, { status: 400 });
    }

    // Actualizar posiciones en batch
    await Promise.all(
      links.map(async (link: { id: string; position: number }) => {
        await prisma.link.updateMany({
          where: { 
            id: link.id,
            profileId: profile.id 
          },
          data: { position: link.position },
        });
      })
    );

    // Obtener links actualizados
    const updatedLinks = await prisma.link.findMany({
      where: { profileId: profile.id },
      orderBy: { position: 'asc' },
    });

    return NextResponse.json(updatedLinks);
  } catch (error) {
    console.error('Error reordering links:', error);
    return NextResponse.json({ error: 'Error al reordenar links' }, { status: 500 });
  }
}