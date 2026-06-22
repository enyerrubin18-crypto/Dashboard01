document.getElementById('btnConsultar').addEventListener('click', async () => {
    const inputNombre = document.getElementById('inputNombre');
    const inputCedula = document.getElementById('inputCedula');
    
    const nombreVal = inputNombre.value.trim();
    const cedulaVal = inputCedula.value.trim();

    
    const esNombreValido = nombreVal.length > 0;
    const esCedulaValida = cedulaVal.length > 0;

    inputNombre.className = esNombreValido ? 'input-valid' : 'input-invalid';
    inputCedula.className = esCedulaValida ? 'input-valid' : 'input-invalid';

    if (!esNombreValido || !esCedulaValida) return;

    
    if (nombreVal !== "usuario_demo" || cedulaVal !== "V12345678") {
        mostrarError("Datos inválidos");
        return;
    }

    
    const overlay = document.createElement('div');
    overlay.className = 'message-overlay text-green';
    overlay.innerHTML = `<div class="icon">⏳</div><div>Cargando...</div>`;
    document.body.appendChild(overlay);

    
    setTimeout(async () => {
        
        overlay.innerHTML = `<div class="icon">✅</div><div>Datos correctos</div>`;
        
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000); 
    }, 2000);
});


function mostrarError(mensaje) {
    const overlayExistente = document.querySelector('.message-overlay');
    if (overlayExistente) overlayExistente.remove();

    const overlay = document.createElement('div');
    overlay.className = 'message-overlay text-red';
    overlay.innerHTML = `<div class="icon">❌</div><div>${mensaje}</div>`;
    document.body.appendChild(overlay);
    
    setTimeout(() => overlay.remove(), 2000);
}