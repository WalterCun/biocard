import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Hero */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Tu Link in Bio
            <span className="block text-amber-400">y Tarjeta Digital</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            La plataforma todo-en-uno para creadores y negocios en Latinoamérica
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-full transition-all"
            >
              Comenzar Gratis
            </Link>
            <Link 
              href="#features"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10"
            >
              Ver Features
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Todo lo que necesitas</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-2xl">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4 flex items-center justify-center text-2xl">🔗</div>
              <h3 className="text-xl font-semibold text-white mb-2">Links Ilimitados</h3>
              <p className="text-gray-400">Crea todos los enlaces que necesites</p>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-2xl">
              <div className="w-12 h-12 bg-amber-500 rounded-lg mb-4 flex items-center justify-center text-2xl">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-2">Temas Personalizados</h3>
              <p className="text-gray-400">Elige o crea tu propio tema</p>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-2xl">
              <div className="w-12 h-12 bg-pink-500 rounded-lg mb-4 flex items-center justify-center text-2xl">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
              <p className="text-gray-400">Conoce tu audiencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Precios simples</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Free</h3>
              <div className="text-3xl font-bold text-white mb-4">$0<span className="text-sm text-gray-400">/mes</span></div>
              <ul className="space-y-2 text-gray-400 text-sm mb-4">
                <li>✅ 5 links</li>
                <li>✅ Temas básicos</li>
                <li>✅ QR Code</li>
              </ul>
              <Link href="/register" className="block text-center py-2 bg-gray-700 text-white rounded-lg">Comenzar</Link>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-2xl border border-purple-500">
              <div className="text-xs text-purple-400 mb-1">MÁS VENDIDO</div>
              <h3 className="text-lg font-semibold text-white mb-2">Basic</h3>
              <div className="text-3xl font-bold text-white mb-4">$3.99<span className="text-sm text-gray-400">/mes</span></div>
              <ul className="space-y-2 text-gray-400 text-sm mb-4">
                <li>✅ 25 links</li>
                <li>✅ Todos los temas</li>
                <li>✅ Analytics</li>
                <li>✅ Custom domain</li>
              </ul>
              <Link href="/register" className="block text-center py-2 bg-purple-600 text-white rounded-lg">Comenzar</Link>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Pro</h3>
              <div className="text-3xl font-bold text-white mb-4">$7.99<span className="text-sm text-gray-400">/mes</span></div>
              <ul className="space-y-2 text-gray-400 text-sm mb-4">
                <li>✅ Links ilimitados</li>
                <li>✅ Ecommerce</li>
                <li>✅ Donations</li>
              </ul>
              <Link href="/register" className="block text-center py-2 bg-gray-700 text-white rounded-lg">Comenzar</Link>
            </div>
            
            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-white mb-4">$19.99<span className="text-sm text-gray-400">/mes</span></div>
              <ul className="space-y-2 text-gray-400 text-sm mb-4">
                <li>✅ Todo Pro</li>
                <li>✅ Team</li>
                <li>✅ API</li>
              </ul>
              <Link href="/register" className="block text-center py-2 bg-gray-700 text-white rounded-lg">Comenzar</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}