import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', function() {
  // Definir tema escuro por padrão
  document.body.setAttribute('data-theme', 'dark');
  
  // Remover a inicialização do slider
  // initSwiper();
  
  // Renderizar cards de serviços
  renderServiceCards();
  
  // Remover configuração de alternância de tema
  // setupThemeToggle();
  
  // Animações ao scroll
  setupScrollAnimations();
  
  // Remover inicialização do slider de vídeos
  // setupVideoSlider();
  
  // Remover o logo container
  const logoContainer = document.querySelector('.logo-container');
  if (logoContainer) {
    logoContainer.remove();
  }
  
  // Adicionar suporte para melhor responsividade
  setupResponsiveSupport();
});

// Otimização da animação durante rolagem
let scrollTimeout;
window.addEventListener('scroll', () => {
    document.body.classList.add('scrolling');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
    }, 150);
}, { passive: true });

// Função de tema removida - sempre escuro
function initTheme() {
  document.body.setAttribute('data-theme', 'dark');
}

// Função de alternância de tema removida
// function setupThemeToggle() {
//   const themeToggle = document.getElementById('theme-toggle');
//   
//   themeToggle.addEventListener('click', () => {
//     const currentTheme = document.body.getAttribute('data-theme');
//     const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
//     
//     document.body.setAttribute('data-theme', newTheme);
//   });
// }

// Inicialização do slider Swiper
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    }
  });
}

// Dados dos serviços
const services = [
  {
    title: 'Construção Civil',
    description: 'Execução de obras residenciais, comerciais e industriais com excelência e garantia de qualidade. Nossa equipe altamente qualificada garante o cumprimento de prazos e orçamentos.',
    icon: 'fa-building',
    image: 'https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Projetos de Engenharia',
    description: 'Desenvolvimento de projetos personalizados com soluções inovadoras para todas as necessidades. Combinamos criatividade e técnica para entregar resultados excepcionais.',
    icon: 'fa-drafting-compass',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Execução de Obras',
    description: 'Gerenciamento completo da execução de sua obra, desde o planejamento até a entrega final. Acompanhamos cada etapa com rigor técnico e comprometimento.',
    icon: 'fa-hammer',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Projetos Residenciais e Comerciais',
    description: 'Projetos arquitetônicos e estruturais para residências e estabelecimentos comerciais de todos os portes. Aliamos estética, funcionalidade e segurança em cada projeto.',
    icon: 'fa-home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Projetos para Hotéis e Pousadas',
    description: 'Soluções especializadas para o setor hoteleiro, com foco em conforto, funcionalidade e experiência do hóspede. Projetos que maximizam o retorno do investimento.',
    icon: 'fa-hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Combate ao Incêndio e Pânico',
    description: 'Projetos de prevenção e combate a incêndios, garantindo a segurança e conformidade com as normas técnicas vigentes. Protegendo vidas e patrimônios.',
    icon: 'fa-fire-extinguisher',
    image: 'https://images.unsplash.com/photo-1595426497145-7abe57de1222?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Projetos Hidráulicos',
    description: 'Planejamento e dimensionamento de sistemas hidráulicos eficientes e sustentáveis. Soluções que otimizam o uso de recursos hídricos e garantem desempenho.',
    icon: 'fa-faucet',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Projetos Elétricos',
    description: 'Desenvolvimento de projetos elétricos seguros, econômicos e eficientes para todos os tipos de edificações. Soluções que atendem às normas técnicas e necessidades específicas.',
    icon: 'fa-bolt',
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Projeto de Saneamento',
    description: 'Soluções para tratamento de água e esgoto, visando sustentabilidade e preservação ambiental. Projetos que conciliam desenvolvimento urbano e respeito ao meio ambiente.',
    icon: 'fa-water',
    image: 'https://images.unsplash.com/photo-1617900906639-cab8c0aa1c75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Perícia Técnica',
    description: 'Avaliação técnica especializada para identificação de problemas estruturais e patologias construtivas. Laudos técnicos precisos e fundamentados para tomada de decisões.',
    icon: 'fa-search',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Cadastro de Terreno',
    description: 'Levantamento e regularização de terrenos para fins de documentação e projetos. Processos ágeis e seguros para garantir a conformidade legal de sua propriedade.',
    icon: 'fa-map-marked-alt',
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Medição de Terreno',
    description: 'Serviços de topografia e medição precisa de áreas para planejamento de construções. Utilizamos tecnologia avançada para garantir resultados exatos e confiáveis.',
    icon: 'fa-ruler-combined',
    image: 'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    title: 'Escritura Pública',
    description: 'Assessoria completa no processo de regularização e obtenção de escritura pública para seu imóvel. Facilitamos os trâmites para garantir a segurança jurídica de seu patrimônio.',
    icon: 'fa-file-contract',
    image: 'https://images.unsplash.com/photo-1568290624825-29f99e3f780e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  }
];

// Renderização dos cards de serviço
function renderServiceCards() {
  const servicesGrid = document.querySelector('.services-grid');
  if (!servicesGrid) return;
  
  servicesGrid.innerHTML = ''; // Clear existing content
  
  services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.classList.add('service-card');
    
    serviceCard.innerHTML = `
      <div class="service-image" style="background-image: url('${service.image}')">
        <div class="service-icon">
          <i class="fas ${service.icon}" aria-hidden="true"></i>
        </div>
      </div>
      <div class="service-content">
        <h3 class="service-title">${service.title}</h3>
        <p class="service-description">${service.description}</p>
        <a href="https://wa.me/5575988232914?text=Olá! Gostaria de solicitar um orçamento para ${service.title}" 
           class="service-cta" target="_blank" rel="noopener">
          Solicitar Projeto <i class="fab fa-whatsapp" aria-hidden="true"></i>
        </a>
      </div>
    `;
    
    servicesGrid.appendChild(serviceCard);
  });
}

// Animações ao scroll
function setupScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar seções para animação
  const sections = document.querySelectorAll('section:not(.hero)');
  sections.forEach(section => {
    section.style.opacity = '1'; // Alterado de 0 para 1
    section.style.transform = 'translateY(0)'; // Removido o deslocamento inicial
    section.style.transition = 'none'; // Removida a transição
    observer.observe(section);
  });
  
  // Animação para cards de serviços - removida a animação de entrada
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.opacity = '1'; // Sempre visível
    card.style.transform = 'translateY(0)'; // Sem deslocamento
    card.style.transition = 'none'; // Sem transição de entrada
    observer.observe(card);
  });
  
  // Estilo para elementos animados
  const style = document.createElement('style');
  style.textContent = `
    .animate {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

// Nova função para melhorar a responsividade
function setupResponsiveSupport() {
  // Ajustar altura de cards para serem uniformes em cada linha
  function adjustCardHeights() {
    const cards = document.querySelectorAll('.service-card');
    if (window.innerWidth >= 768) {
      // Resetar alturas
      cards.forEach(card => card.style.height = 'auto');
      
      // Agrupar cards por linhas
      const rows = {};
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const row = Math.floor(rect.top);
        if (!rows[row]) rows[row] = [];
        rows[row].push(card);
      });
      
      // Definir altura máxima para cada linha
      Object.values(rows).forEach(rowCards => {
        const maxHeight = Math.max(...rowCards.map(card => card.offsetHeight));
        rowCards.forEach(card => card.style.height = `${maxHeight}px`);
      });
    } else {
      // Em dispositivos móveis, deixar altura automática
      cards.forEach(card => card.style.height = 'auto');
    }
  }
  
  // Executar no carregamento e no redimensionamento
  adjustCardHeights();
  
  // Usar debounce para melhor performance
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustCardHeights, 250);
  }, { passive: true });
}