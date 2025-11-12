document.addEventListener('DOMContentLoaded', function() {
    console.log('Site de Sustentabilidade carregado com sucesso!');
    console.log('Obrigado por se interessar pelo meio ambiente!');
    
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const statItems = document.querySelectorAll('.stat-item');
    
    const animateStats = () => {
        statItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.8s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            }, index * 300);
        });
    };
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                if (entry.target.classList.contains('statistics')) {
                    animateStats();
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.hero, .main-content, .sidebar, .call-to-action, .statistics').forEach(el => {
        observer.observe(el);
    });
    
    function calcularImpactoAmbiental() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <h3 style="color: #2e7d32; margin-bottom: 1.5rem; text-align: center;">
                Calculadora de Impacto Ambiental
            </h3>
            <form id="impactForm">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
                        Quantas garrafas plásticas você descarta por semana?
                    </label>
                    <input type="number" id="plastico" min="0" max="100" 
                           style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
                        Quantas folhas de papel você descarta por semana?
                    </label>
                    <input type="number" id="papel" min="0" max="500" 
                           style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">
                        Quantas latas de alumínio você descarta por semana?
                    </label>
                    <input type="number" id="aluminio" min="0" max="50" 
                           style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;">
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button type="submit" style="
                        flex: 1;
                        background: linear-gradient(135deg, #4caf50, #2e7d32);
                        color: white;
                        border: none;
                        padding: 1rem;
                        border-radius: 8px;
                        font-size: 1rem;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">
                        Calcular
                    </button>
                    <button type="button" id="closeModal" style="
                        flex: 1;
                        background: #f44336;
                        color: white;
                        border: none;
                        padding: 1rem;
                        border-radius: 8px;
                        font-size: 1rem;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    ">
                        Fechar
                    </button>
                </div>
            </form>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.getElementById('closeModal').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
        
        document.getElementById('impactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const plastico = parseInt(document.getElementById('plastico').value) || 0;
            const papel = parseInt(document.getElementById('papel').value) || 0;
            const aluminio = parseInt(document.getElementById('aluminio').value) || 0;
            
            const impactoPlastico = plastico * 52 * 0.5;
            const impactoPapel = papel * 52 * 0.1;
            const impactoAluminio = aluminio * 52 * 0.8;
            const totalImpacto = impactoPlastico + impactoPapel + impactoAluminio;
            
            const beneficioPlastico = impactoPlastico * 0.7;
            const beneficioPapel = impactoPapel * 0.6;
            const beneficioAluminio = impactoAluminio * 0.9;
            const totalBeneficio = beneficioPlastico + beneficioPapel + beneficioAluminio;
            
            const arvoresSalvas = Math.round(papel * 52 / 17);
            const energiaEconomizada = Math.round(totalBeneficio * 2.5);
            
            modalContent.innerHTML = `
                <h3 style="color: #2e7d32; margin-bottom: 1.5rem; text-align: center;">
                    Seu Impacto Ambiental
                </h3>
                
                <div style="background: linear-gradient(135deg, #ffebee, #ffcdd2); padding: 1.5rem; border-radius: 10px; margin-bottom: 1rem;">
                    <h4 style="color: #d32f2f; margin-bottom: 1rem;">Impacto Atual (sem reciclagem)</h4>
                    <p><strong>${totalImpacto.toFixed(2)} kg de CO2</strong> emitidos por ano</p>
                    <p>Equivale a dirigir <strong>${Math.round(totalImpacto * 4.6)} km</strong> de carro</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #e8f5e8, #c8e6c8); padding: 1.5rem; border-radius: 10px; margin-bottom: 1rem;">
                    <h4 style="color: #2e7d32; margin-bottom: 1rem;">Benefícios da Reciclagem</h4>
                    <p><strong>${totalBeneficio.toFixed(2)} kg de CO2</strong> economizados por ano</p>
                    <p><strong>${arvoresSalvas}</strong> árvores salvas anualmente</p>
                    <p><strong>${energiaEconomizada} kWh</strong> de energia economizada</p>
                </div>
                
                <div style="background: linear-gradient(135deg, #e3f2fd, #bbdefb); padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
                    <h4 style="color: #1976d2; margin-bottom: 1rem;">Dicas Personalizadas</h4>
                    ${plastico > 5 ? '<p>Considere usar uma garrafa reutilizável!</p>' : ''}
                    ${papel > 20 ? '<p>Tente digitalizar mais documentos!</p>' : ''}
                    ${aluminio > 3 ? '<p>Ótimo! Continue reciclando latas de alumínio!</p>' : ''}
                    <p>Separando corretamente, você pode reduzir seu impacto em até <strong>${Math.round((totalBeneficio/totalImpacto)*100)}%</strong>!</p>
                </div>
                
                <div style="display: flex; gap: 1rem;">
                    <button onclick="window.open('dicas.html', '_blank')" style="
                        flex: 1;
                        background: linear-gradient(135deg, #4caf50, #2e7d32);
                        color: white;
                        border: none;
                        padding: 1rem;
                        border-radius: 8px;
                        font-size: 1rem;
                        font-weight: bold;
                        cursor: pointer;
                    ">
                        Ver Mais Dicas
                    </button>
                    <button id="closeResult" style="
                        flex: 1;
                        background: #2196f3;
                        color: white;
                        border: none;
                        padding: 1rem;
                        border-radius: 8px;
                        font-size: 1rem;
                        font-weight: bold;
                        cursor: pointer;
                    ">
                        Entendi!
                    </button>
                </div>
            `;
            
            document.getElementById('closeResult').addEventListener('click', () => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
        });
        
        document.getElementById('plastico').focus();
    }
    
    const calcButton = document.getElementById('calc-button');
    if (calcButton) {
        calcButton.addEventListener('click', calcularImpactoAmbiental);
    }
    

    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target > 1000) {
                element.textContent = Math.floor(current).toLocaleString('pt-BR');
            } else if (target < 1) {
                element.textContent = current.toFixed(1) + '%';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h3 = entry.target.querySelector('h3');
                const text = h3.textContent;
                
                if (text.includes('%')) {
                    const number = parseFloat(text);
                    h3.textContent = '0%';
                    animateCounter(h3, number);
                } else if (text.includes('mil')) {
                    const number = parseInt(text.replace(/\D/g, ''));
                    h3.textContent = '0';
                    setTimeout(() => {
                        animateCounter(h3, number);
                        setTimeout(() => {
                            h3.textContent = text;
                        }, 2100);
                    }, 500);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
    
    setTimeout(() => {
        if (!sessionStorage.getItem('welcomeShown')) {
            console.log('Bem-vindo ao nosso site de sustentabilidade!');
            console.log('Explore as páginas e descubra como fazer a diferença!');
            sessionStorage.setItem('welcomeShown', 'true');
        }
    }, 1000);
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Modo escuro detectado - considerando implementação futura');
    }
    
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Site carregado em ${Math.round(loadTime)}ms`);
        
        if (loadTime > 3000) {
            console.log('Carregamento lento detectado - otimizações podem ser necessárias');
        }
    });
});

function shareOnSocialMedia(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Confira este site sobre sustentabilidade e reciclagem!');
    
    const urls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        whatsapp: `https://wa.me/?text=${text}%20${url}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    
    if (urls[platform] ) {
        window.open(urls[platform], '_blank', 'width=600,height=400');
    }
}

let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        console.log('Código Konami ativado!');
        console.log('Você é um verdadeiro defensor do meio ambiente!');
        document.body.style.animation = 'pulse 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});
