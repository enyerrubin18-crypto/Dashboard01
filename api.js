document.addEventListener("DOMContentLoaded", () => {
    
    const datos = [
        { fecha: "2025-05-10", ingresos: 850000, egresos: 420000, neto: 430000, ciudad: "Caracas", temp: 28, clima: "Soleado" },
        { fecha: "2025-05-09", ingresos: 780000, egresos: 390000, neto: 390000, ciudad: "Maracaibo", temp: 26, clima: "Nublado" },
        { fecha: "2025-05-08", ingresos: 920000, egresos: 460000, neto: 460000, ciudad: "Valencia", temp: 29, clima: "Soleado" },
        { fecha: "2025-05-07", ingresos: 810000, egresos: 410000, neto: 400000, ciudad: "Barquisimeto", temp: 27, clima: "Lluvioso" },
        { fecha: "2025-05-06", ingresos: 760000, egresos: 380000, neto: 380000, ciudad: "Maracay", temp: 25, clima: "Nublado" },
        { fecha: "2025-05-05", ingresos: 890000, egresos: 430000, neto: 460000, ciudad: "Puerto La Cruz", temp: 27, clima: "Soleado" },
        { fecha: "2025-05-04", ingresos: 710000, egresos: 350000, neto: 360000, ciudad: "Ciudad Guayana", temp: 26, clima: "Nublado" }
    ];

    
    const hoy = datos[0];
    document.getElementById('ingresos').textContent = `$ ${hoy.ingresos.toLocaleString()}`;
    document.getElementById('egresos').textContent = `$ ${hoy.egresos.toLocaleString()}`;
    document.getElementById('neto').textContent = `$ ${hoy.neto.toLocaleString()}`;
    document.getElementById('temperatura').textContent = `${hoy.temp}°C`;

    
    const tbody = document.getElementById('tablaDatos');
    tbody.innerHTML = datos.map(item => `
        <tr>
            <td>${item.fecha}</td>
            <td>$ ${item.ingresos.toLocaleString()}</td>
            <td>$ ${item.egresos.toLocaleString()}</td>
            <td>$ ${item.neto.toLocaleString()}</td>
            <td>${item.ciudad}</td>
            <td>${item.temp}°C</td>
            <td>${item.clima}</td>
        </tr>
    `).join('');

    
    new Chart(document.getElementById('graficoLineas'), {
        type: 'line',
        data: {
            labels: datos.map(d => d.fecha).reverse(),
            datasets: [
                { label: 'Ingresos', data: datos.map(d => d.ingresos).reverse(), borderColor: '#3498db', tension: 0.1, borderWidth: 3, pointRadius: 4 },
                { label: 'Neto', data: datos.map(d => d.neto).reverse(), borderColor: '#9b59b6', tension: 0.1, borderWidth: 3, pointRadius: 4 }
            ]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, grid: { color: '#1e293b' } }, x: { grid: { display: false } } }
        }
    });

    
    function cargarResumen() {
        const totalI = datos.reduce((sum, d) => sum + d.ingresos, 0);
        const totalE = datos.reduce((sum, d) => sum + d.egresos, 0);
        const totalN = totalI - totalE;
        const avgT = (datos.reduce((sum, d) => sum + d.temp, 0) / datos.length).toFixed(1);

        document.getElementById('res-ingresos').textContent = `$${(totalI / 1000).toFixed(0)}k`;
        document.getElementById('res-egresos').textContent = `$${(totalE / 1000).toFixed(0)}k`;
        document.getElementById('res-neto').textContent = `$${(totalN / 1000).toFixed(0)}k`;
        document.getElementById('res-temp').textContent = `${avgT}°C`;
    }

    
    function cargarMetricas() {
        const ctx = document.getElementById('graficoBarras');
        if (!ctx) return;
        
        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: datos.map(d => d.ciudad),
                datasets: [{ 
                    label: 'Ingresos por Ciudad', 
                    data: datos.map(d => d.ingresos), 
                    backgroundColor: '#8b5cf6' 
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                scales: { y: { grid: { color: '#1e293b' } } }
            }
        });

        document.getElementById('total-reg').textContent = datos.length;
        const mejor = datos.reduce((prev, curr) => (prev.ingresos > curr.ingresos) ? prev : curr);
        document.getElementById('top-ciudad').textContent = `${mejor.ciudad} ($${mejor.ingresos.toLocaleString()})`;
    }

    
    document.querySelectorAll('.menu li').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.menu li').forEach(li => li.classList.remove('activo'));
            this.classList.add('activo');

            document.querySelectorAll('.view').forEach(v => v.style.display = 'none');

            const target = this.textContent.toLowerCase().trim();
            const viewElement = document.getElementById(`view-${target}`);
            
            if (viewElement) {
                viewElement.style.display = 'block';
                if (target === 'resumen') cargarResumen();
                if (target === 'métricas') cargarMetricas();
            } else {
                console.log("Sección en construcción:", target);
            }
        });
    });
});