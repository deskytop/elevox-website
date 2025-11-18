/* ===================================
   PROJETO ELEVOX - CONFIGURAÇÃO TAILWIND
   =================================== */

// Configuração do Tailwind com TEMA CLARO e AZUL VIBRANTE
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                'brand-blue': '#281dc2',
                'brand-blue-dark': '#201799', // Tom mais escuro para hover
                'text-primary': '#0f172a', // slate-900 (Textos principais)
                'text-secondary': '#475569', // slate-600 (Textos de parágrafo)
                'text-menu': '#fafafa',
                'bg-light': '#ffffff', // Fundo principal
                'bg-soft': '#f8fafc', // slate-50 (Fundo de seções)
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
        },
    },
};
