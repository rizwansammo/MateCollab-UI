import {readFile, writeFile, readdir} from 'node:fs/promises';
import {resolve} from 'node:path';

// Build an offline review file with no external scripts, styles or fonts.
const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'prototype-dist');
let html = await readFile(resolve(out, 'preview.html'), 'utf8');
const font = await readFile(resolve(root, 'public/fonts/HemiHead-Bold.otf'));
const favicon = await readFile(resolve(root, 'public/favicon.svg'));
const assets = await readdir(resolve(out, 'assets'));
const cssFile = assets.find(name => name.endsWith('.css'));
const jsFile = assets.find(name => name.endsWith('.js'));
if (!cssFile || !jsFile) throw new Error('Build assets are missing. Run Vite first.');
let css = await readFile(resolve(out, 'assets', cssFile), 'utf8');
css = css.replace(/url\(["']?[^)"']*HemiHead-Bold\.otf["']?\)/g,
  `url("data:font/otf;base64,${font.toString('base64')}")`);
const js = await readFile(resolve(out, 'assets', jsFile), 'utf8');
html = html.replace(/<link[^>]+rel="stylesheet"[^>]*>/g,
  () => `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>`);
html = html.replace(/<script[^>]+src="[^"\n]+"[^>]*><\/script>/g,
  () => `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>`);
html = html.replace(/href="[^"]*favicon\.svg"/,
  `href="data:image/svg+xml;base64,${favicon.toString('base64')}"`);
if (!html.includes('data:font/otf;base64,')) throw new Error('Official wordmark font was not embedded.');
const target = resolve(out, 'MateCollab-Prototype.html');
await writeFile(target, html);
console.log(`Created ${target} (${Buffer.byteLength(html)} bytes)`);
