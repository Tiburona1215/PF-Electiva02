const express = require('express');
//const { version } = require('yargs');
const app = express();
const PORT = process.env.PORT || 3000;
const START_TIME = Date.now();

app.use(express.json());

// ── Función para renderizar la UI con contraste mejorado ───────────────
const renderHome = (uptime) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevOps App</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #0a0a0f; --surface: #12121a; --surface2: #1a1a26;
            --border: #ffffff12; --accent: #7c6fff; --accent2: #ff6b6b;
            --accent3: #00d4a4; --text: #f0eeff; --muted: #a1a1aa; /* Muted más claro para legibilidad */
        }
        body { font-family: 'Syne', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
        .bg-grid { position: fixed; inset: 0; background-image: linear-gradient(var(--border) 1px,transparent 1px), linear-gradient(90deg,var(--border) 1px,transparent 1px); background-size: 40px 40px; z-index: 0; }
        nav { position: relative; z-index: 10; border-bottom: 1px solid var(--border); backdrop-filter: blur(10px); }
        .logo { font-size: 18px; font-weight: 800; color: white; }
        .logo span { color: var(--accent); }
        .hero { position: relative; z-index: 5; padding: 80px 20px; text-align: center; }
        .hero h1 { font-size: clamp(40px, 8vw, 70px); font-weight: 800; letter-spacing: -2px; color: white; }
        .hero h1 em { font-style: normal; color: transparent; -webkit-text-stroke: 1px var(--accent); }
        .hero p { color: var(--muted); }
        .stats-container { position: relative; z-index: 5; max-width: 800px; margin: 0 auto; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; }
        .stat-item { padding: 20px; border-right: 1px solid var(--border); text-align: center; }
        .stat-item:last-child { border-right: none; }
        .stat-val { font-size: 24px; font-weight: 800; display: block; }
        .card-custom { background: var(--surface); border: 1px solid var(--border); padding: 25px; border-radius: 16px; height: 100%; transition: 0.3s; }
        .card-custom:hover { border-color: var(--accent); }
        .card-icon { font-size: 1.5rem; margin-bottom: 15px; color: var(--accent); }
        .card-custom h5 { color: white; font-weight: 700; }
        .card-custom p { color: #d1d1d6; } /* Gris muy claro para lectura */
        .terminal { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; font-family: 'JetBrains Mono', monospace; }
        .terminal-header { background: var(--surface2); padding: 10px 15px; display: flex; gap: 6px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        footer { margin-top: 50px; padding: 30px; border-top: 1px solid var(--border); font-size: 12px; color: var(--muted); text-align: center; }
    </style>
</head>
<body>
    <div class="bg-grid"></div>
    
    <nav class="navbar">
        <div class="container">
            <div class="logo">DEV<span>OPS</span>.APP</div>
            <span class="badge bg-dark border border-secondary text-white">
                <i class="bi bi-cpu-fill me-1 text-success"></i> v1.0.0 · STABLE
            </span>
        </div>
    </nav>

    <main class="container">
        <section class="hero">
            <p class="text-uppercase tracking-widest small mb-3" style="color:var(--accent); font-weight: 700;">
                <i class="bi bi-git me-2"></i>CI/CD Pipeline Activo
            </p>
            <h1>Hola <br><em>Mundo</em></h1>
            <p class="mx-auto" style="max-width: 550px;">Aplicación profesional desplegada con un flujo de trabajo automatizado.</p>
            <div class="d-flex justify-content-center gap-3 mt-4">
                <a href="/health" class="btn btn-primary px-4 py-2 fw-bold"><i class="bi bi-activity me-2"></i>Health Check</a>
                <a href="/info" class="btn btn-outline-light px-4 py-2"><i class="bi bi-info-circle me-2"></i>System Info</a>
            </div>
        </section>

        <div class="stats-container row g-0 mb-5 shadow-lg">
            <div class="stat-item col-md-4">
                <span class="stat-val text-success"><i class="bi bi-check-circle-fill"></i> OK</span>
                <small class="text-white-50 text-uppercase">Estado</small>
            </div>
            <div class="stat-item col-md-4">
                <span class="stat-val text-primary">${uptime}s</span>
                <small class="text-white-50 text-uppercase">Uptime</small>
            </div>
            <div class="stat-item col-md-4">
                <span class="stat-val text-danger"><i class="bi bi-shield-check"></i> 3</span>
                <small class="text-white-50 text-uppercase">Tests</small>
            </div>
        </div>

        <div class="row g-4 mb-5">
            <div class="col-md-4">
                <div class="card-custom">
                    <i class="bi bi-box-seam card-icon"></i>
                    <h5>Node.js & Express</h5>
                    <p class="small">Infraestructura robusta para APIs escalables con gestión eficiente de rutas.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card-custom">
                    <i class="bi bi-layers card-icon text-info"></i>
                    <h5>Docker Container</h5>
                    <p class="small">Imagen optimizada basada en Alpine Linux para despliegues ligeros y seguros.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card-custom">
                    <i class="bi bi-rocket-takeoff card-icon text-warning"></i>
                    <h5>GitHub Actions</h5>
                    <p class="small">Pipeline de integración continua que valida el código en cada push.</p>
                </div>
            </div>
        </div>

        <div class="terminal shadow">
            <div class="terminal-header">
                <div class="dot bg-danger"></div>
                <div class="dot bg-warning"></div>
                <div class="dot bg-success"></div>
                <span class="ms-2 small text-white-50">bash — services</span>
            </div>
            <div class="p-4 small">
                <div class="mb-1"><span class="text-success">GET</span> <span class="text-white">/health</span> <span class="text-white-50 ms-3"># Verifica disponibilidad</span></div>
                <div class="mb-1"><span class="text-success">GET</span> <span class="text-white">/info</span> <span class="text-white-50 ms-3"># Recursos del sistema</span></div>
                <div class="mt-2"><i class="bi bi-chevron-right text-primary"></i> <span class="text-white font-monospace">Servidor escuchando en puerto ${PORT}...</span></div>
            </div>
        </div>
    </main>

    <footer>
        <i class="bi bi-code-slash me-2"></i> DevOps Final Project · 2026 · <span class="text-white">Desplegado con Éxito</span>
    </footer>
</body>
</html>
`;

// ── Rutas ──────────────────────────────────────────────────────
app.get('/', (req, res) => {
    const uptime = Math.floor((Date.now() - START_TIME) / 1000);
    res.send(renderHome(uptime));
});

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: Math.floor((Date.now() - START_TIME) / 1000),
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

app.get('/info', (req, res) => {
    res.json({
        app: 'devops-final-app',
        node: process.version,
        platform: process.platform,
        memory: process.memoryUsage()
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server: http://localhost:${PORT}`);
    });
}

module.exports = app;