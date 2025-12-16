fetch('data/mundial2022.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('intro').textContent = data.intro;
    document.getElementById('participacion').textContent = data.participacion;

    const statsContainer = document.getElementById('stats');

    data.stats.forEach(stat => {
      const div = document.createElement('div');
      div.className = 'stat';
      div.innerHTML = `<strong>${stat.label}</strong><br>${stat.value}`;
      statsContainer.appendChild(div);
    });
  });

  const timeline = document.getElementById('timeline');

if (timeline) {
  fetch('../data/partidos.json')
    .then(res => res.json())
    .then(partidos => {
      partidos.forEach(p => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
          <span>${p.fase} · ${p.fecha}</span>
          <h4>${p.partido} (${p.resultado})</h4>
          <p>${p.detalle}</p>
        `;
        timeline.appendChild(div);
      });
    });
}

const statsGrid = document.getElementById('stats-grid');
const statsTable = document.querySelector('#stats-table tbody');

if (statsGrid && statsTable) {
  fetch('../data/estadisticas.json')
    .then(res => res.json())
    .then(data => {
      // Cards resumen
      data.resumen.forEach(item => {
        const div = document.createElement('div');
        div.className = 'stat';
        div.innerHTML = `<strong>${item.label}</strong><br>${item.value}`;
        statsGrid.appendChild(div);
      });

      // Tabla por partido
      data.partidos.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${p.nombre}</td>
          <td>${p.goles}</td>
          <td>${p.asistencias}</td>
          <td>${p.minutos}</td>
        `;
        statsTable.appendChild(tr);
      });
    });
}


const legacyGrid = document.getElementById('legacy-grid');

if (legacyGrid) {
  fetch('../data/legado.json')
    .then(res => res.json())
    .then(data => {
      document.getElementById('intro-legado').textContent = data.intro;
      document.getElementById('historico').textContent = data.historico;

      data.puntos.forEach(p => {
        const div = document.createElement('div');
        div.className = 'legacy-card';
        div.innerHTML = `
          <h4>${p.titulo}</h4>
          <p>${p.texto}</p>
        `;
        legacyGrid.appendChild(div);
      });
    });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in, .slide-in, .stat, .legacy-card, .timeline-item')
  .forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });


  document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Fallback: se oculta aunque falle algo
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }, 800);
});



