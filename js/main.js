:root {
    --primary: #0f2c2c;
    --accent: #d4a017;
    --cream: #f8f5f0;
    --text: #1e1e1e;
}

* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: 'Inter', sans-serif; background: var(--cream); color: var(--text); line-height: 1.6; }
h1, h2 { font-family: 'Playfair Display', serif; font-weight: 700; }

.container { max-width: 1280px; margin: 0 auto; padding: 0 20px; }

.header { background: white; box-shadow: 0 4px 20px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
.logo h1 { font-size: 2rem; color: var(--primary); }
.tag { font-size: 0.95rem; color: var(--accent); margin-top: -8px; }

.nav ul { display: flex; gap: 2rem; list-style: none; }
.nav a { text-decoration: none; color: var(--text); font-weight: 500; }

.hamburger { display: none; font-size: 2rem; background: none; border: none; cursor: pointer; }

.btn-primary, .btn-secondary {
    padding: 14px 32px;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s;
}
.btn-primary { background: var(--accent); color: white; }
.btn-primary:hover { background: #c09015; }
.btn-secondary { border: 2px solid var(--primary); color: var(--primary); }

.hero { background: linear-gradient(135deg, var(--primary), #1a3f3f); color: white; padding: 120px 0 80px; text-align: center; }
.hero h1 { font-size: 3.2rem; margin-bottom: 1rem; }
.subtitle { font-size: 1.4rem; max-width: 700px; margin: 0 auto 2rem; }

.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.card { background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.08); text-align: center; font-size: 1.2rem; }

.masonry-grid { column-count: 3; column-gap: 20px; }
.masonry-grid .gallery-item { break-inside: avoid; margin-bottom: 20px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.12); transition: 0.3s; }
.masonry-grid .gallery-item:hover { transform: scale(1.04); }
.masonry-grid img { width: 100%; display: block; }

.lightbox { position: fixed; inset: 0; background: rgba(15,44,44,0.95); display: none; align-items: center; justify-content: center; z-index: 9999; }
.lightbox-content { max-width: 90%; max-height: 90vh; background: white; border-radius: 16px; position: relative; overflow: hidden; }
.close-btn { position: absolute; top: 15px; right: 20px; font-size: 2.5rem; background: none; border: none; color: var(--primary); cursor: pointer; }

.form-feedback.success { background: #d4edda; color: #155724; padding: 1rem; border-radius: 8px; }
.form-feedback.error { background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 8px; }

.footer { background: var(--primary); color: white; padding: 3rem 0; text-align: center; }

@media (max-width: 768px) {
    .nav ul { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: white; padding: 1rem; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
    .nav.open ul { display: flex; }
    .hamburger { display: block; }
}
