/** @type {import('next').NextConfig} */
const nextConfig = {  
  reactStrictMode: true,  
    
  // Configuração para servir arquivos estáticos corretamente  
  async headers() {  
    return [  
      {  
        // Aplica headers para todos os arquivos de vídeo  
        source: '/video/:path*',  
        headers: [  
          {  
            key: 'Content-Type',  
            value: 'video/mp4',  
          },  
          {  
            key: 'Accept-Ranges',  
            value: 'bytes',  
          },  
          {  
            key: 'Cache-Control',  
            value: 'public, max-age=31536000, immutable',  
          },  
          {  
            key: 'Access-Control-Allow-Origin',  
            value: '*', // Ajuste para seu domínio específico se necessário  
          },  
        ],  
      },  
    ];  
  },  
  
  // Garante que não há rewrites interferindo com /video  
  async rewrites() {  
    return [];  
  },  
  
  // Garante que não há redirects interferindo com /video  
  async redirects() {  
    return [];  
  },  
};  
  
export default nextConfig;