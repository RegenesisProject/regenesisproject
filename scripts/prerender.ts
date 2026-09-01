import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

interface RouteConfig {
  path: string;
  pageKey: 'home' | 'about' | 'keynotes' | 'science' | 'mythology' | 'quiz' | 'speaker-kit' | 'waitlist';
  outPath: string;
}

const ROUTES: RouteConfig[] = [
  { path: '/', pageKey: 'home', outPath: 'index.html' },
  { path: '/about', pageKey: 'about', outPath: 'about/index.html' },
  { path: '/keynotes', pageKey: 'keynotes', outPath: 'keynotes/index.html' },
  { path: '/science', pageKey: 'science', outPath: 'science/index.html' },
  { path: '/mythology', pageKey: 'mythology', outPath: 'mythology/index.html' },
  { path: '/mirror-quiz', pageKey: 'quiz', outPath: 'mirror-quiz/index.html' },
  { path: '/speaker-kit', pageKey: 'speaker-kit', outPath: 'speaker-kit/index.html' },
  { path: '/waitlist', pageKey: 'waitlist', outPath: 'waitlist/index.html' },
];

async function prerender() {
  console.log('Starting multi-page static pre-rendering (SSG)...');
  
  const distPath = path.resolve(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html does not exist. Run vite build first.');
    process.exit(1);
  }

  // Read the base template index.html produced by Vite
  const templateHtml = fs.readFileSync(indexPath, 'utf-8');

  // Create a Vite dev server in SSR mode to safely load and transform image/css/tsx imports
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    // Dynamically load src/App.tsx through Vite SSR module loader
    const { default: App, ROUTE_METADATA } = await vite.ssrLoadModule('/src/App.tsx');

    for (const route of ROUTES) {
      console.log(`Pre-rendering route: ${route.path} -> dist/${route.outPath}`);

      // Render the App component with initialPath for this route
      const appHtml = renderToString(React.createElement(App, { initialPath: route.path }));

      let html = templateHtml;

      // Update route-specific head metadata
      const meta = ROUTE_METADATA ? ROUTE_METADATA[route.pageKey] : null;
      if (meta) {
        // Title
        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`);
        
        // Description
        html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${meta.description}"`);

        // Canonical URL
        if (html.includes('<link rel="canonical"')) {
          html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${meta.canonical}" />`);
        } else {
          html = html.replace('</head>', `  <link rel="canonical" href="${meta.canonical}" />\n</head>`);
        }

        // OpenGraph Title & Description & URL
        html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${meta.ogTitle}"`);
        html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${meta.ogDescription}"`);
        html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${meta.canonical}"`);
      }

      // Inject rendered app HTML into root div
      if (html.includes('<div id="root"></div>')) {
        html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
      } else if (html.includes('<div id="root">')) {
        html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${appHtml}</div>`);
      }

      // Write output file
      const targetFilePath = path.join(distPath, route.outPath);
      const targetDirPath = path.dirname(targetFilePath);

      if (!fs.existsSync(targetDirPath)) {
        fs.mkdirSync(targetDirPath, { recursive: true });
      }

      fs.writeFileSync(targetFilePath, html, 'utf-8');
      console.log(`✓ Wrote ${route.outPath} (${fs.statSync(targetFilePath).size} bytes)`);
    }

    console.log('Successfully pre-rendered all 7 static HTML routes!');
  } finally {
    await vite.close();
  }
  process.exit(0);
}

prerender().catch((err) => {
  console.error('Error during static pre-rendering:', err);
  process.exit(1);
});

