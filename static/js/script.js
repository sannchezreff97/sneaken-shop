/* ========================================================
   SNEAKEN. STORE - JAVASCRIPT PRINCIPAL (LÓGICA Y DATOS)
   ======================================================== */

// Base de datos de los 22 calzados exclusivos (Hombre, Mujer, Kids)
let productosData = [
    { id: 1, titulo: "Montagne trekking", categoria: "Hombre", precio_ars: 69999, cuotas_texto: "6 x $11.666 s/int.", imagen: "static/imagenes/hombre1.webp" },
    { id: 2, titulo: "Puma Park Lifestyle", categoria: "Hombre", precio_ars: 100000, cuotas_texto: "6 x $16.666 s/int.", imagen: "/static/imagenes/hombre2.webp" },
    { id: 3, titulo: "DC Shoes", categoria: "Hombre", precio_ars: 120000, cuotas_texto: "6 x $20.000 s/int.", imagen: "/static/imagenes/hombre3.webp" },
    { id: 4, titulo: "Stone Classic", categoria: "Hombre", precio_ars: 75000, cuotas_texto: "6 x $12.500 s/int.", imagen: "/static/imagenes/hombre4.jpg" },
    { id: 5, titulo: "John Foos", categoria: "Hombre", precio_ars: 95000, cuotas_texto: "6 x $15.833 s/int.", imagen: "/static/imagenes/hpmbre5.webp" },
    { id: 6, titulo: "Zapatos Britches", categoria: "Hombre", precio_ars: 115000, cuotas_texto: "6 x $19.166 s/int.", imagen: "/static/imagenes/gala1.webp" },
    { id: 7, titulo: "Zapatos Monstceler Gala", categoria: "Hombre", precio_ars: 130000, cuotas_texto: "6 x $21.666 s/int.", imagen: "/static/imagenes/gala2.jpg" },
    { id: 8, titulo: "Nike Airbag", categoria: "Mujer", precio_ars: 150000, cuotas_texto: "6 x $25.000 s/int.", imagen: "/static/imagenes/mujer4.jpg" },
    { id: 9, titulo: "Urbanas Lady", categoria: "Mujer", precio_ars: 85000, cuotas_texto: "6 x $14.166 s/int.", imagen: "static/imagenes/mujer1.webp" },
    { id: 10, titulo: "Gamusa Print", categoria: "Mujer", precio_ars: 92000, cuotas_texto: "6 x $15.333 s/int.", imagen: "/static/imagenes/mujer2.webp" },
    { id: 11, titulo: "Running Flex", categoria: "Mujer", precio_ars: 110000, cuotas_texto: "6 x $18.333 s/int.", imagen: "/static/imagenes/mujer5.webp" },
    { id: 12, titulo: "Urban Chic", categoria: "Mujer", precio_ars: 98000, cuotas_texto: "6 x $16.333 s/int.", imagen: "/static/imagenes/mujer3.webp" },
    { id: 13, titulo: "Zapatos Platform", categoria: "Mujer", precio_ars: 125000, cuotas_texto: "6 x $20.833 s/int.", imagen: "/static/imagenes/gala4.webp" },
    { id: 14, titulo: "Zapatos Soft Woman", categoria: "Mujer", precio_ars: 88000, cuotas_texto: "6 x $14.666 s/int.", imagen: "/static/imagenes/gala3.webp" },
    { id: 15, titulo: "Kids Junior Sport", categoria: "Kids", precio_ars: 62000, cuotas_texto: "6 x $10.333 s/int.", imagen: "/static/imagenes/niño1.webp" },
    { id: 16, titulo: "Infantiles Emanuel", categoria: "Kids", precio_ars: 40000, cuotas_texto: "6 x $6.666 s/int.", imagen: "/static/imagenes/niño3.webp" },
    { id: 17, titulo: "Mini Racer", categoria: "Kids", precio_ars: 55000, cuotas_texto: "6 x $9.166 s/int.", imagen: "/static/imagenes/niño2.webp" },
    { id: 18, titulo: "Kids Classic White", categoria: "Kids", precio_ars: 48000, cuotas_texto: "6 x $8.000 s/int.", imagen: "/static/imagenes/niña5.webp" },
    { id: 19, titulo: "Escarpines Recien Nacidos", categoria: "Kids", precio_ars: 59000, cuotas_texto: "6 x $9.833 s/int.", imagen: "/static/imagenes/niño7.jpeg" },
    { id: 20, titulo: "Escarpines Recien Nacidos", categoria: "Kids", precio_ars: 52000, cuotas_texto: "6 x $8.666 s/int.", imagen: "/static/imagenes/naña8.jpeg" },
    { id: 21, titulo: "Zapatillas Playtime Baby", categoria: "Kids", precio_ars: 45000, cuotas_texto: "6 x $7.500 s/int.", imagen: "/static/imagenes/niña4.webp" },
    { id: 22, titulo: "Zapatillas Outdoor Kids", categoria: "Kids", precio_ars: 67000, cuotas_texto: "6 x $11.166 s/int.", imagen: "/static/imagenes/niña6.webp" }
];

let productosFiltrados = [...productosData];
let carrito = [];
let favoritos = [];
let monedaActual = 'ARS';
let productoActualDetalle = null;

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderizarCatalogo(productosData);
    actualizarContadores();
});

// Renderizar el catálogo completo con las 22 zapatillas y etiquetas
function renderizarCatalogo(lista) {
    productosFiltrados = lista;
    const grid = document.getElementById("contenedorProductos");
    if (!grid) return;
    grid.innerHTML = "";

    if (lista.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
            <i class="fa-solid fa-shoe-prints" style="font-size: 40px; margin-bottom: 10px;"></i>
            <p>No se encontraron zapatillas con esos criterios.</p>
        </div>`;
        return;
    }

    lista.forEach(prod => {
        const esFav = favoritos.includes(prod.id);
        const precioMostrar = formatearPrecio(prod.precio_ars);

        const card = document.createElement("div");
        card.className = "producto-card";
        card.onclick = () => verDetalleProducto(prod.id);

        card.innerHTML = `
            <div class="img-contenedor">
                <span class="tag-categoria-card">${prod.categoria.toUpperCase()}</span>
                <img src="${prod.imagen}" alt="${prod.titulo}" onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80'">
                <button class="favorito-btn-card ${esFav ? 'activo' : ''}" onclick="event.stopPropagation(); toggleFavorito(${prod.id})">
                    <i class="${esFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
            </div>
            <div class="producto-info">
                <h3>${prod.titulo}</h3>
                <p class="cuotas-card">${prod.cuotas_texto}</p>
                <span class="precio-label-sm">Precio</span>
                <p class="precio-card">${precioMostrar}</p>
                <button class="btn-add-quick" onclick="event.stopPropagation(); agregarAlCarritoRapido(${prod.id})">
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function formatearPrecio(montoArs) {
    if (monedaActual === 'USD') {
        let montoUsd = Math.round(montoArs / 1250); // Tipo de cambio estimado
        return `$ ${montoUsd} USD`;
    }
    return `$ ${montoArs.toLocaleString('es-AR')}`;
}

// Filtrar por categorías (Ver Todo, Hombre, Mujer, Kids)
function filtrarCategoria(cat) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const btnNav = document.getElementById(`nav-${cat.toLowerCase()}`) || document.getElementById('nav-todas');
    if (btnNav) btnNav.classList.add('active');

    const tituloSec = document.getElementById("tituloSeccion");

    if (cat === 'todas') {
        productosFiltrados = [...productosData];
        if (tituloSec) tituloSec.innerText = "Catálogo Completo";
    } else {
        productosFiltrados = productosData.filter(p => p.categoria.toLowerCase() === cat.toLowerCase());
        if (tituloSec) tituloSec.innerText = `Calzado ${cat}`;
    }
    renderizarCatalogo(productosFiltrados);
}

// Búsqueda en tiempo real
function ejecutarBusqueda() {
    const query = document.getElementById("inputBuscador").value.toLowerCase();
    const resultados = productosData.filter(p => p.titulo.toLowerCase().includes(query) || p.categoria.toLowerCase().includes(query));
    renderizarCatalogo(resultados);
}

// Ordenar productos
function ordenarProductos(criterio) {
    let listaOrdenada = [...productosFiltrados];
    if (criterio === 'menor-precio') {
        listaOrdenada.sort((a, b) => a.precio_ars - b.precio_ars);
    } else if (criterio === 'mayor-precio') {
        listaOrdenada.sort((a, b) => b.precio_ars - a.precio_ars);
    } else if (criterio === 'nombre') {
        listaOrdenada.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }
    renderizarCatalogo(listaOrdenada);
}

// Ver detalle de producto
function verDetalleProducto(id) {
    const prod = productosData.find(p => p.id === id);
    if (!prod) return;
    productoActualDetalle = prod;

    document.getElementById("fotoPrincipal").src = prod.imagen;
    document.getElementById("detalle-categoria").innerText = prod.categoria.toUpperCase();
    document.getElementById("detalle-titulo").innerText = prod.titulo;
    document.getElementById("detalle-sku").innerText = `SKU: SNK-H0${prod.id}`;
    document.getElementById("detalle-precio").innerText = formatearPrecio(prod.precio_ars);
    document.getElementById("detalle-cuotas").innerText = prod.cuotas_texto;

    document.getElementById("vista-catalogo").style.display = "none";
    document.getElementById("vista-detalle").style.display = "block";
    window.scrollTo({ top: 300, behavior: 'smooth' });
}

function volverAlCatalogo() {
    document.getElementById("vista-detalle").style.display = "none";
    document.getElementById("vista-catalogo").style.display = "block";
}

// Carrito y Acciones
function agregarAlCarritoRapido(id) {
    const prod = productosData.find(p => p.id === id);
    if (!prod) return;
    carrito.push({ ...prod, talle: 40, cantidad: 1 });
    actualizarContadores();
    actualizarVistaCarrito();
    togglePanelCarrito();
}

function agregarAlCarritoDesdeDetalle() {
    if (!productoActualDetalle) return;
    const talleSel = document.querySelector(".talle-btn.seleccionado")?.innerText || "40";
    const cant = parseInt(document.getElementById("cantidadInput").value) || 1;
    
    carrito.push({ ...productoActualDetalle, talle: talleSel, cantidad: cant });
    actualizarContadores();
    actualizarVistaCarrito();
    volverAlCatalogo();
    togglePanelCarrito();
}

function actualizarContadores() {
    const badgeCarrito = document.getElementById("contadorCarrito");
    const panelCount = document.getElementById("panelCartCount");
    const badgeFavoritos = document.getElementById("contadorFavoritos");
    if (badgeCarrito) badgeCarrito.innerText = carrito.length;
    if (panelCount) panelCount.innerText = carrito.length;
    if (badgeFavoritos) badgeFavoritos.innerText = favoritos.length;
}

function actualizarVistaCarrito() {
    const lista = document.getElementById("listaCarrito");
    const totalTexto = document.getElementById("totalCarritoTexto");
    if (!lista) return;

    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 20px;">Tu carrito está vacío</p>`;
        if (totalTexto) totalTexto.innerText = "$ 0";
        return;
    }

    carrito.forEach((item, index) => {
        total += item.precio_ars * item.cantidad;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.imagen}" alt="${item.titulo}">
            <div class="cart-item-info">
                <p class="cart-item-title">${item.titulo}</p>
                <p class="cart-item-sub">Talle: ${item.talle} | Cant: ${item.cantidad}</p>
                <p class="cart-item-price">${formatearPrecio(item.precio_ars * item.cantidad)}</p>
            </div>
            <button onclick="eliminarDelCarrito(${index})" style="background:none; border:none; color:var(--accent-red); cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
        `;
        lista.appendChild(div);
    });

    if (totalTexto) totalTexto.innerText = formatearPrecio(total);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarContadores();
    actualizarVistaCarrito();
}

function togglePanelCarrito() {
    document.getElementById("panelCarrito")?.classList.toggle("open");
    document.getElementById("overlayCarrito")?.classList.toggle("open");
}

// Favoritos
function toggleFavorito(id) {
    const idx = favoritos.indexOf(id);
    if (idx > -1) {
        favoritos.splice(idx, 1);
    } else {
        favoritos.push(id);
    }
    
    
    actualizarContadores();
    renderizarCatalogo(productosFiltrados);

}

// Modales y Utilidades
function toggleTema() {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");
    html.setAttribute("data-theme", current === 'dark' ? 'light' : 'dark');
}

function toggleMoneda() {
    monedaActual = monedaActual === 'ARS' ? 'USD' : 'ARS';
    const btn = document.getElementById("currency-toggle-btn");
    if (btn) {
        btn.innerHTML = monedaActual === 'USD' ? 'MONEDA: ARS <strong>USD</strong>' : 'MONEDA: <strong>ARS</strong> USD';
    }
    renderizarCatalogo(productosFiltrados);
}

function abrirModalCalculadoraTalle() { document.getElementById("modalCalculadoraTalle").style.display = "flex"; }
function cerrarModalCalculadoraTalle() { document.getElementById("modalCalculadoraTalle").style.display = "none"; }
function abrirModalContactoMapa() { document.getElementById("modalMapa").style.display = "flex"; }
function cerrarModalContactoMapa() { document.getElementById("modalMapa").style.display = "none"; }
function abrirModalAuth() { document.getElementById("modalAuth").style.display = "flex"; }
function cerrarModalAuth() { document.getElementById("modalAuth").style.display = "none"; }

function calcularTalleExacto() {
    const cm = parseFloat(document.getElementById("largoPieCm").value);
    const resDiv = document.getElementById("resultadoTalle");
    if (!cm) return;
    let talleArg = Math.round(cm * 1.5 - 11);
    document.getElementById("talleCalculadoValor").innerText = talleArg;
    document.getElementById("talleUSValor").innerText = (talleArg - 3.5).toFixed(1);
    document.getElementById("talleEUValor").innerText = talleArg + 31;
    resDiv.style.display = "block";
}

function toggleChatbot() {
    const win = document.getElementById("chatbot-window");
    win.style.display = win.style.display === "none" ? "flex" : "none";
}

function enviarMensajeChat() {
    const input = document.getElementById("chatInput");
    const msgs = document.getElementById("chatMessages");
    if (!input.value.trim()) return;

    const userMsg = document.createElement("div");
    userMsg.className = "msg msg-user";
    userMsg.innerText = input.value;
    msgs.appendChild(userMsg);

    const txt = input.value.toLowerCase();
    input.value = "";

    setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "msg msg-bot";
        if (txt.includes("talle")) {
            botMsg.innerText = "Podés usar nuestra Guía de Talles interactiva ubicada en el menú superior para calcular tu talle exacto en cm.";
        } else if (txt.includes("envío") || txt.includes("envios")) {
            botMsg.innerText = "Hacemos envíos a todo el país. Gratis en compras superiores a $99.999.";
        } else if (txt.includes("cuota")) {
            botMsg.innerText = "Tenemos 3 y 6 cuotas sin interés con todas las tarjetas bancarias.";
        } else {
            botMsg.innerText = "¡Gracias por tu consulta! Un asesor de SNEAKEN te responderá a la brevedad o podés escribirnos por WhatsApp.";
        }
        msgs.appendChild(botMsg);
        msgs.scrollTop = msgs.scrollHeight;
    }, 500);
}

function evaluarEnterChat(e) {
    if (e.key === "Enter") enviarMensajeChat();
}

function enviarMensajeRapido(tipo) {
    document.getElementById("chatInput").value = `Quiero saber sobre ${tipo}`;
    enviarMensajeChat();
}

function abrirWhatsappDirecto() {
    window.open("https://wa.me/5492613735751", "_blank");
}

function iniciarCheckout() {
    togglePanelCarrito();
    document.getElementById("modalCheckout").style.display = "flex";
}
function cerrarModalCheckout() {
    document.getElementById("modalCheckout").style.display = "none";
}
function procesarPago(e) {
    e.preventDefault();
    alert("¡Pago procesado con éxito! Gracias por tu compra en Sneaken Shop.");
    cerrarModalCheckout();
    carrito = [];
    actualizarContadores();
}// Ver detalle de producto (Oculta las portadas rotativas del banner para que solo aparezca el calzado seleccionado)
function verDetalleProducto(id) {
    const prod = productosData.find(p => p.id === id);
    if (!prod) return;
    productoActualDetalle = prod;

    document.getElementById("fotoPrincipal").src = prod.imagen;
    document.getElementById("detalle-categoria").innerText = prod.categoria.toUpperCase();
    document.getElementById("detalle-titulo").innerText = prod.titulo;
    document.getElementById("detalle-sku").innerText = `SKU: SNK-H0${prod.id}`;
    document.getElementById("detalle-precio").innerText = formatearPrecio(prod.precio_ars);
    document.getElementById("detalle-cuotas").innerText = prod.cuotas_texto;

    // Ocultar el banner de portadas y el catálogo, mostrar únicamente el detalle
    const heroBanner = document.getElementById("seccionHeroBanner");
    if (heroBanner) heroBanner.style.display = "none";

    document.getElementById("vista-catalogo").style.display = "none";
    document.getElementById("vista-detalle").style.display = "block";
    window.scrollTo({ top: 100, behavior: 'smooth' });
}

// Volver al catálogo (Vuelve a mostrar las portadas rotativas y oculta el detalle)
function volverAlCatalogo() {
    const heroBanner = document.getElementById("seccionHeroBanner");
    if (heroBanner) heroBanner.style.display = "block";

    document.getElementById("vista-detalle").style.display = "none";
    document.getElementById("vista-catalogo").style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}// Selección interactiva de talle único (Evita conflictos y marca claramente el número seleccionado)
function seleccionarTalle(btnElement) {
    document.querySelectorAll(".talle-btn").forEach(btn => {
        btn.classList.remove("seleccionado");
    });
    btnElement.classList.add("seleccionado");
}

function cambiarCantidadDetalle(delta) {
    const input = document.getElementById("cantidadInput");
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
}
function abrirModalFavoritos() {
    if (favoritos.length === 0) {
        alert("Todavía no marcaste ninguna zapatilla como favorita.");
        return;
    }
    const listaFavs = productosData.filter(p => favoritos.includes(p.id))
        .map(p => `- ${p.titulo} (${formatearPrecio(p.precio_ars)})`)
        .join("\n");
    
    alert(`Tus zapatillas favoritas (${favoritos.length}):\n\n` + listaFavs);
}
// Abrir / Cerrar Panel Lateral de Favoritos (Igual al carrito)
function togglePanelFavoritos() {
    document.getElementById("panelFavoritos")?.classList.toggle("open");
    document.getElementById("overlayFavoritos")?.classList.toggle("open");
    actualizarVistaFavoritosPanel();
}

// Actualizar el contenido visual dentro del panel lateral de favoritos
function actualizarVistaFavoritosPanel() {
    const lista = document.getElementById("listaFavoritosPanel");
    const panelFavCount = document.getElementById("panelFavCount");
    if (!lista) return;

    lista.innerHTML = "";
    if (panelFavCount) panelFavCount.innerText = favoritos.length;

    if (favoritos.length === 0) {
        lista.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 30px;">No tenés zapatillas favoritas aún.</p>`;
        return;
    }

    const prodsFavs = productosData.filter(p => favoritos.includes(p.id));
    prodsFavs.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.imagen}" alt="${item.titulo}">
            <div class="cart-item-info">
                <p class="cart-item-title">${item.titulo}</p>
                <p class="cart-item-sub">${item.categoria.toUpperCase()}</p>
                <p class="cart-item-price">${formatearPrecio(item.precio_ars)}</p>
            </div>
            <button onclick="toggleFavorito(${item.id}); actualizarVistaFavoritosPanel();" style="background:none; border:none; color:var(--accent-red); cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
        `;
        lista.appendChild(div);
    });
}

// Función general para marcar/desmarcar favorito y sincronizar tarjetas y detalle
function toggleFavorito(id) {
    const idx = favoritos.indexOf(id);
    if (idx > -1) {
        favoritos.splice(idx, 1);
    } else {
        favoritos.push(id);
    }
    actualizarContadores();
    renderizarCatalogo(productosFiltrados);

    // Si estamos viendo el detalle de este producto, actualizar el icono del corazón en el detalle
    if (productoActualDetalle && productoActualDetalle.id === id) {
        actualizarCorazonDetalle();
    }
}

// Sincronizar el estado del corazón en la vista de detalle de la zapatilla
function actualizarCorazonDetalle() {
    const btnFavDetalle = document.getElementById("btnFavoritoDetalle");
    if (!btnFavDetalle || !productoActualDetalle) return;

    const esFav = favoritos.includes(productoActualDetalle.id);
    if (esFav) {
        btnFavDetalle.classList.add("activo");
        btnFavDetalle.innerHTML = '<i class="fa-solid fa-heart" style="color: #ef4444;"></i>';
    } else {
        btnFavDetalle.classList.remove("activo");
        btnFavDetalle.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }
}

// Acción del botón de favorito dentro de la vista de detalle
function toggleFavoritoDetalle() {
    if (!productoActualDetalle) return;
    toggleFavorito(productoActualDetalle.id);
}
function verDetalleProducto(id) {
    const prod = productosData.find(p => p.id === id);
    if (!prod) return;
    productoActualDetalle = prod;

    document.getElementById("fotoPrincipal").src = prod.imagen;
    document.getElementById("detalle-categoria").innerText = prod.categoria.toUpperCase();
    document.getElementById("detalle-titulo").innerText = prod.titulo;
    document.getElementById("detalle-sku").innerText = `SKU: SNK-H0${prod.id}`;
    document.getElementById("detalle-precio").innerText = formatearPrecio(prod.precio_ars);
    document.getElementById("detalle-cuotas").innerText = prod.cuotas_texto;

    // Actualizar estado del corazón en detalle
    actualizarCorazonDetalle();

    const heroBanner = document.getElementById("seccionHeroBanner");
    if (heroBanner) heroBanner.style.display = "none";

    document.getElementById("vista-catalogo").style.display = "none";
    document.getElementById("vista-detalle").style.display = "block";
    window.scrollTo({ top: 100, behavior: 'smooth' });
}