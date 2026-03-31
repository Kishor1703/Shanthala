import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { apiFetch, clearAuthToken, getAuthHeaders, getAuthToken } from '../lib/api'
import { siteAssets } from '../siteAssets'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500&display=swap');

  .ad-shell {
    min-height: 100vh;
    background: #f5ead8;
    font-family: 'Cormorant Garamond', serif;
    color: #2c1810;
  }

  /* ── TOPBAR ── */
  .ad-topbar {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(253,246,238,0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(201,151,58,0.22);
    padding: 0.85rem 2.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    animation: adFadeDown 0.5s ease both;
  }
  .ad-topbar-brand { display: flex; align-items: center; gap: 0.9rem; }
  .ad-topbar-logo  { width: 44px; height: 44px; object-fit: contain; }
  .ad-topbar-text  { font-family: 'Cinzel', serif; }
  .ad-topbar-text h1 {
    font-size: 0.88rem; font-weight: 500; color: #6b1020;
    letter-spacing: 0.06em; text-transform: uppercase; line-height: 1.1;
  }
  .ad-topbar-text span {
    font-size: 0.56rem; letter-spacing: 0.26em;
    text-transform: uppercase; color: #c9973a;
  }
  .ad-topbar-right { display: flex; align-items: center; gap: 1.2rem; }
  .ad-unread-pill {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.32rem 0.85rem;
    background: rgba(139,26,43,0.08); border: 1px solid rgba(139,26,43,0.18);
    border-radius: 20px; font-family: 'Cinzel', serif; font-size: 0.6rem;
    letter-spacing: 0.14em; text-transform: uppercase; color: #8b1a2b;
  }
  .ad-unread-dot {
    width: 7px; height: 7px; background: #8b1a2b;
    border-radius: 50%; animation: adPulse 1.8s ease infinite;
  }
  .ad-logout-btn {
    display: flex; align-items: center; gap: 0.45rem;
    padding: 0.5rem 1.2rem; background: transparent;
    border: 1.5px solid rgba(139,26,43,0.3); color: #8b1a2b;
    font-family: 'Cinzel', serif; font-size: 0.6rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    cursor: pointer; border-radius: 3px; transition: all 0.3s ease;
  }
  .ad-logout-btn:hover { background: #8b1a2b; color: #fff; border-color: #8b1a2b; }

  /* ── HERO ── */
  .ad-hero {
    position: relative;
    background: linear-gradient(135deg, #5a0c1c 0%, #7a1428 55%, #4a0a18 100%);
    overflow: hidden; padding: 2.8rem 2.8rem 3rem;
    animation: adFadeUp 0.7s ease 0.1s both;
  }
  .ad-hero::before {
    content: ''; position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 80% 50%, rgba(201,151,58,0.14) 0%, transparent 55%),
      radial-gradient(circle at 10% 80%, rgba(201,151,58,0.08) 0%, transparent 45%);
    pointer-events: none;
  }
  .ad-hero::after {
    content: ''; position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; opacity: 0.5;
  }
  .ad-hero-inner {
    position: relative; z-index: 1;
    display: grid; grid-template-columns: 1fr auto;
    gap: 3rem; align-items: center;
    max-width: 1280px; margin: 0 auto;
  }
  .ad-hero-eyebrow {
    font-family: 'Cinzel', serif; font-size: 0.58rem;
    letter-spacing: 0.3em; text-transform: uppercase; color: #c9973a;
    margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.7rem;
  }
  .ad-hero-eyebrow::before {
    content: ''; display: inline-block; width: 24px; height: 1.5px; background: #c9973a;
  }
  .ad-hero-heading {
    font-size: clamp(1.5rem, 2.2vw, 2.2rem); font-weight: 300; color: #fff;
    line-height: 1.25; font-style: italic; margin-bottom: 0.7rem; max-width: 560px;
  }
  .ad-hero-heading em { font-style: normal; color: #e8b84b; }
  .ad-hero-sub { font-size: 0.88rem; color: rgba(255,255,255,0.58); line-height: 1.75; max-width: 440px; }
  .ad-hero-images { display: flex; gap: 0.75rem; flex-shrink: 0; }
  .ad-hero-img-main {
    width: 140px; height: 175px; object-fit: cover; object-position: top;
    border-radius: 3px; border: 1.5px solid rgba(201,151,58,0.3);
    filter: saturate(0.75) brightness(0.85);
  }
  .ad-hero-img-accent {
    width: 90px; height: 120px; object-fit: cover; object-position: top;
    border-radius: 3px; border: 1.5px solid rgba(201,151,58,0.25);
    filter: saturate(0.65) brightness(0.75); align-self: flex-end;
  }

  /* ── STATS ── */
  .ad-stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid rgba(201,151,58,0.2);
    animation: adFadeUp 0.6s ease 0.2s both;
  }
  .ad-stat {
    padding: 1.4rem 2.8rem; border-right: 1px solid rgba(201,151,58,0.2);
    background: #fdf6ee; transition: background 0.3s ease;
  }
  .ad-stat:last-child { border-right: none; }
  .ad-stat:hover { background: #fff; }
  .ad-stat-label {
    font-family: 'Cinzel', serif; font-size: 0.56rem;
    letter-spacing: 0.26em; text-transform: uppercase; color: #c9973a; margin-bottom: 0.3rem;
  }
  .ad-stat-value {
    font-family: 'Cinzel', serif; font-size: 2.2rem;
    font-weight: 400; color: #6b1020; line-height: 1;
  }
  .ad-stat-sub { font-size: 0.76rem; color: #9c7b6e; margin-top: 0.25rem; }

  /* ── TAB NAV ── */
  .ad-tab-nav {
    background: #fdf6ee;
    border-bottom: 2px solid rgba(201,151,58,0.2);
    padding: 0 2.8rem; display: flex; align-items: flex-end;
    animation: adFadeUp 0.5s ease 0.28s both;
  }
  .ad-tab {
    position: relative; display: flex; align-items: center; gap: 0.55rem;
    padding: 1rem 1.8rem 0.9rem; background: transparent; border: none;
    border-bottom: 2.5px solid transparent; margin-bottom: -2px;
    font-family: 'Cinzel', serif; font-size: 0.72rem;
    letter-spacing: 0.18em; text-transform: uppercase; color: #9c7b6e;
    cursor: pointer; transition: color 0.28s ease, border-color 0.28s ease, background 0.28s ease;
    white-space: nowrap;
  }
  .ad-tab:hover { color: #6b1020; background: rgba(201,151,58,0.04); }
  .ad-tab.active { color: #6b1020; border-bottom-color: #8b1a2b; }
  .ad-tab-icon { width: 15px; height: 15px; opacity: 0.7; flex-shrink: 0; }
  .ad-tab.active .ad-tab-icon { opacity: 1; }
  .ad-tab-count {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 18px; height: 18px; padding: 0 5px;
    background: rgba(139,26,43,0.1); border: 1px solid rgba(139,26,43,0.18);
    border-radius: 10px; font-size: 0.58rem; color: #8b1a2b; font-weight: 500;
  }
  .ad-tab.active .ad-tab-count { background: #8b1a2b; color: #fff; border-color: #8b1a2b; }

  /* ── PAGE WRAPPER ── */
  .ad-page {
    max-width: 1280px; margin: 0 auto;
    padding: 2.2rem 2.8rem 4rem;
    animation: adPageIn 0.38s ease both;
  }
  @keyframes adPageIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ad-global-error {
    display: flex; align-items: center; gap: 0.6rem;
    padding: 0.85rem 1.2rem;
    background: rgba(139,26,43,0.06); border: 1px solid rgba(139,26,43,0.2);
    border-left: 3px solid #8b1a2b; border-radius: 4px;
    font-size: 0.86rem; color: #8b1a2b; margin-bottom: 1.5rem;
  }
  .ad-loading {
    text-align: center; padding: 4rem; color: #9c7b6e;
    font-style: italic; font-size: 0.96rem; letter-spacing: 0.04em;
  }

  /* ── PANEL ── */
  .ad-panel {
    background: #fff; border: 1px solid rgba(201,151,58,0.18);
    border-radius: 4px; overflow: hidden;
  }
  .ad-panel-head {
    padding: 1.4rem 1.8rem; border-bottom: 1px solid rgba(201,151,58,0.18);
    background: linear-gradient(to right, #fdf6ee, #fff);
    display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem;
  }
  .ad-panel-head h2 {
    font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 500;
    color: #6b1020; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.2rem;
  }
  .ad-panel-head p { font-size: 0.82rem; color: #9c7b6e; }
  .ad-panel-badge {
    flex-shrink: 0; padding: 0.22rem 0.7rem;
    background: rgba(139,26,43,0.08); border: 1px solid rgba(139,26,43,0.15);
    border-radius: 12px; font-family: 'Cinzel', serif;
    font-size: 0.6rem; letter-spacing: 0.12em; color: #8b1a2b;
  }

  /* ══════════════════
     QUERIES PAGE
  ══════════════════ */
  .ad-queries-wrap { max-width: 860px; margin: 0 auto; }

  .ad-filter-bar {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.9rem 1.8rem; border-bottom: 1px solid rgba(201,151,58,0.12);
    background: #fdfaf5; flex-wrap: wrap;
  }
  .ad-filter-label {
    font-family: 'Cinzel', serif; font-size: 0.58rem;
    letter-spacing: 0.2em; text-transform: uppercase; color: #9c7b6e; margin-right: 0.3rem;
  }
  .ad-filter-btn {
    padding: 0.24rem 0.8rem; background: transparent;
    border: 1px solid rgba(201,151,58,0.3); border-radius: 12px;
    font-family: 'Cinzel', serif; font-size: 0.58rem;
    letter-spacing: 0.1em; text-transform: uppercase; color: #9c7b6e;
    cursor: pointer; transition: all 0.2s ease;
  }
  .ad-filter-btn:hover { border-color: #c9973a; color: #7a5c2e; }
  .ad-filter-btn.active { background: #8b1a2b; border-color: #8b1a2b; color: #fff; }

  .ad-query-list { overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(201,151,58,0.3) transparent; }
  .ad-empty { padding: 3.5rem 2rem; text-align: center; color: #9c7b6e; font-style: italic; font-size: 0.94rem; }

  .ad-query-card {
    padding: 1.5rem 1.8rem; border-bottom: 1px solid rgba(201,151,58,0.12);
    transition: background 0.25s ease;
  }
  .ad-query-card:last-child { border-bottom: none; }
  .ad-query-card:hover { background: #fdf8f2; }
  .ad-query-top {
    display: flex; align-items: flex-start;
    justify-content: space-between; gap: 1rem; margin-bottom: 0.75rem;
  }
  .ad-query-name {
    font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 500;
    color: #2c1810; margin-bottom: 0.2rem;
  }
  .ad-query-contact { font-size: 0.8rem; color: #9c7b6e; line-height: 1.5; }
  .ad-badge {
    flex-shrink: 0; padding: 0.2rem 0.75rem; border-radius: 12px;
    font-family: 'Cinzel', serif; font-size: 0.55rem;
    letter-spacing: 0.14em; text-transform: uppercase; font-weight: 500;
  }
  .ad-badge--new     { background: rgba(139,26,43,0.1); color: #8b1a2b; border: 1px solid rgba(139,26,43,0.2); }
  .ad-badge--read    { background: rgba(201,151,58,0.1); color: #8b6520; border: 1px solid rgba(201,151,58,0.25); }
  .ad-badge--replied { background: rgba(34,100,54,0.08); color: #1a6034; border: 1px solid rgba(34,100,54,0.2); }
  .ad-query-msg {
    font-size: 0.88rem; color: #5c3d2e; line-height: 1.75; margin-bottom: 0.6rem;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  }
  .ad-query-date { font-size: 0.72rem; color: #b8957a; margin-bottom: 0.85rem; font-style: italic; }
  .ad-query-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .ad-action-btn {
    padding: 0.3rem 0.9rem; background: transparent;
    border: 1px solid rgba(201,151,58,0.4); color: #7a5c2e;
    font-family: 'Cinzel', serif; font-size: 0.58rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    cursor: pointer; border-radius: 2px; transition: all 0.25s ease;
  }
  .ad-action-btn:hover { background: rgba(201,151,58,0.1); border-color: #c9973a; color: #5a3d10; }
  .ad-action-btn--danger { border-color: rgba(139,26,43,0.3); color: #8b1a2b; }
  .ad-action-btn--danger:hover { background: rgba(139,26,43,0.08); border-color: #8b1a2b; }

  /* ══════════════════
     GALLERY PAGE
  ══════════════════ */
  .ad-gallery-layout {
    display: grid; grid-template-columns: 360px 1fr;
    gap: 2rem; align-items: start;
  }

  /* Upload card — sticky */
  .ad-upload-card {
    background: #fff; border: 1px solid rgba(201,151,58,0.18);
    border-radius: 4px; overflow: hidden;
    position: sticky; top: calc(58px + 2.2rem);
  }
  .ad-gallery-preview { position: relative; height: 160px; overflow: hidden; }
  .ad-gallery-preview img {
    width: 100%; height: 100%; object-fit: cover; object-position: center;
    filter: saturate(0.7) brightness(0.82); transition: transform 6s ease;
  }
  .ad-upload-card:hover .ad-gallery-preview img { transform: scale(1.05); }
  .ad-gallery-preview-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(90,12,28,0.72), transparent 55%);
  }
  .ad-gallery-preview-label {
    position: absolute; bottom: 0.9rem; left: 1.2rem;
    font-family: 'Cinzel', serif; font-size: 0.62rem;
    letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.9);
  }

  .ad-form { padding: 1.5rem 1.6rem; display: flex; flex-direction: column; gap: 0.95rem; }
  .ad-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .ad-field { display: flex; flex-direction: column; gap: 0.32rem; }
  .ad-field label {
    font-family: 'Cinzel', serif; font-size: 0.56rem;
    letter-spacing: 0.22em; text-transform: uppercase; color: #8b1a2b;
  }
  .ad-field input[type="text"],
  .ad-field input[type="file"] {
    padding: 0.58rem 0.85rem; border: 1.5px solid rgba(201,151,58,0.28);
    background: #fdf8f2; font-family: 'Cormorant Garamond', serif;
    font-size: 0.92rem; color: #2c1810; outline: none; border-radius: 3px;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
    width: 100%;
  }
  .ad-field input[type="file"] { font-size: 0.78rem; cursor: pointer; padding: 0.42rem 0.75rem; }
  .ad-field input:focus { border-color: #c9973a; box-shadow: 0 0 0 3px rgba(201,151,58,0.1); background: #fff; }
  .ad-field input::placeholder { color: #b8957a; font-style: italic; }

  .ad-checkbox-row { display: flex; align-items: center; gap: 0.6rem; cursor: pointer; }
  .ad-checkbox-row input[type="checkbox"] { width: 15px; height: 15px; accent-color: #8b1a2b; cursor: pointer; }
  .ad-checkbox-row span { font-size: 0.84rem; color: #5c3d2e; }

  .ad-form-msg { padding: 0.6rem 0.9rem; border-radius: 3px; font-size: 0.82rem; line-height: 1.5; }
  .ad-form-msg--error   { background: rgba(139,26,43,0.06); border: 1px solid rgba(139,26,43,0.18); color: #8b1a2b; }
  .ad-form-msg--success { background: rgba(34,100,54,0.06); border: 1px solid rgba(34,100,54,0.18); color: #1a6034; }

  .ad-upload-btn {
    padding: 0.78rem 1.6rem; background: #8b1a2b; color: #fff;
    font-family: 'Cinzel', serif; font-size: 0.65rem;
    letter-spacing: 0.2em; text-transform: uppercase; border: none;
    border-radius: 3px; cursor: pointer; width: 100%;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  }
  .ad-upload-btn:hover:not(:disabled) { background: #a8213a; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(139,26,43,0.25); }
  .ad-upload-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  /* Photo grid panel */
  .ad-photo-panel {
    background: #fff; border: 1px solid rgba(201,151,58,0.18); border-radius: 4px; overflow: hidden;
  }
  .ad-photo-panel-head {
    padding: 1.2rem 1.6rem; border-bottom: 1px solid rgba(201,151,58,0.15);
    background: linear-gradient(to right, #fdf6ee, #fff);
    display: flex; align-items: center; justify-content: space-between;
  }
  .ad-photo-panel-head h3 {
    font-family: 'Cinzel', serif; font-size: 0.82rem; font-weight: 500;
    color: #6b1020; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .ad-photo-panel-head span { font-family: 'Cinzel', serif; font-size: 0.6rem; letter-spacing: 0.14em; color: #9c7b6e; }

  .ad-photo-grid {
    padding: 1.4rem 1.6rem;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 0.8rem;
  }
  .ad-photo-item {
    position: relative; aspect-ratio: 3/4;
    overflow: hidden; border-radius: 3px; border: 1px solid rgba(201,151,58,0.2);
  }
  .ad-photo-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.45s ease, filter 0.45s ease; }
  .ad-photo-item:hover img { transform: scale(1.07); filter: brightness(0.65); }
  .ad-photo-item-overlay {
    position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0.75rem; background: linear-gradient(to top, rgba(10,3,5,0.78) 0%, transparent 52%);
    opacity: 0; transition: opacity 0.32s ease;
  }
  .ad-photo-item:hover .ad-photo-item-overlay { opacity: 1; }
  .ad-photo-item-cat { font-family: 'Cinzel', serif; font-size: 0.5rem; letter-spacing: 0.16em; color: rgba(201,151,58,0.85); text-transform: uppercase; margin-bottom: 0.22rem; }
  .ad-photo-item-title { font-size: 0.72rem; color: rgba(255,255,255,0.92); line-height: 1.3; margin-bottom: 0.4rem; font-style: italic; }
  .ad-photo-delete {
    padding: 0.24rem 0.65rem; background: rgba(139,26,43,0.88); color: #fff;
    border: none; border-radius: 2px; font-family: 'Cinzel', serif;
    font-size: 0.52rem; letter-spacing: 0.14em; cursor: pointer; align-self: flex-start;
    transition: background 0.2s ease;
  }
  .ad-photo-delete:hover { background: #8b1a2b; }
  .ad-featured-badge {
    position: absolute; top: 0.45rem; right: 0.45rem;
    padding: 0.18rem 0.55rem; background: rgba(201,151,58,0.92); color: #fff;
    font-family: 'Cinzel', serif; font-size: 0.5rem; letter-spacing: 0.14em; border-radius: 2px;
  }

  /* ── ANIMATIONS ── */
  @keyframes adFadeDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes adFadeUp   { from { opacity: 0; transform: translateY(20px);  } to { opacity: 1; transform: translateY(0); } }
  @keyframes adPulse    { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
  @keyframes adSpin     { to { transform: rotate(360deg); } }
  .ad-spinner { width: 12px; height: 12px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: adSpin 0.7s linear infinite; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1100px) { .ad-gallery-layout { grid-template-columns: 300px 1fr; } }
  @media (max-width: 900px) {
    .ad-gallery-layout { grid-template-columns: 1fr; }
    .ad-upload-card { position: static; }
    .ad-hero-images { display: none; }
    .ad-hero-inner { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .ad-topbar { padding: 0.7rem 1.2rem; }
    .ad-hero { padding: 2rem 1.4rem 2.2rem; }
    .ad-stats { grid-template-columns: 1fr; }
    .ad-stat { border-right: none; border-bottom: 1px solid rgba(201,151,58,0.2); padding: 1rem 1.4rem; }
    .ad-tab-nav { padding: 0 1.2rem; }
    .ad-tab { padding: 0.85rem 1rem 0.8rem; font-size: 0.65rem; }
    .ad-page { padding: 1.6rem 1.2rem 3rem; }
    .ad-form-row { grid-template-columns: 1fr; }
    .ad-photo-grid { grid-template-columns: repeat(2, 1fr); padding: 1rem; }
    .ad-queries-wrap { max-width: 100%; }
    .ad-topbar-text span { display: none; }
  }
  @media (max-width: 480px) {
    .ad-tab { letter-spacing: 0.08em; padding: 0.8rem 0.75rem; }
    .ad-photo-grid { grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
  }
`

const defaultPhotoForm = { title: '', category: 'Performance', altText: '', featured: false, photo: null }
const FILTERS = ['all', 'new', 'read', 'replied']

export default function AdminDashboard() {
  const navigate = useNavigate()
  const token = getAuthToken()

  const [activePage, setActivePage] = useState('queries')
  const [pageKey, setPageKey] = useState(0)
  const [queryFilter, setQueryFilter] = useState('all')

  const [queries, setQueries] = useState([])
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [photoForm, setPhotoForm] = useState(defaultPhotoForm)
  const [photoStatus, setPhotoStatus] = useState({ loading: false, error: '', success: '' })

  const unreadCount = useMemo(() => queries.filter((q) => q.status === 'new').length, [queries])
  const filteredQueries = useMemo(
    () => queryFilter === 'all' ? queries : queries.filter((q) => q.status === queryFilter),
    [queries, queryFilter]
  )

  useEffect(() => {
    if (!token) return
    let ignore = false
    async function load() {
      try {
        const headers = getAuthHeaders()
        const [qData, pData] = await Promise.all([apiFetch('/api/queries', { headers }), apiFetch('/api/photos')])
        if (ignore) return
        setQueries(qData); setPhotos(pData)
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Unable to load admin data')
          if ((err.message || '').toLowerCase().includes('token')) { clearAuthToken(); navigate('/admin/login', { replace: true }) }
        }
      } finally { if (!ignore) setLoading(false) }
    }
    load()
    return () => { ignore = true }
  }, [navigate, token])

  if (!token) return <Navigate to="/admin/login" replace />

  const handleLogout = () => { clearAuthToken(); navigate('/admin/login', { replace: true }) }

  const updateQueryStatus = async (id, status) => {
    try {
      const updated = await apiFetch(`/api/queries/${id}/status`, { method: 'PATCH', headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      setQueries((c) => c.map((q) => (q._id === id ? updated : q)))
    } catch (err) { setError(err.message || 'Unable to update') }
  }

  const deleteQuery = async (id) => {
    try {
      await apiFetch(`/api/queries/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
      setQueries((c) => c.filter((q) => q._id !== id))
    } catch (err) { setError(err.message || 'Unable to delete') }
  }

  const handlePhotoChange = ({ target }) => {
    const { name, value, type, checked, files } = target
    setPhotoForm((c) => ({ ...c, [name]: type === 'checkbox' ? checked : files ? files[0] || null : value }))
  }

  const handlePhotoSubmit = async (e) => {
    e.preventDefault()
    setPhotoStatus({ loading: true, error: '', success: '' })
    if (!photoForm.photo) { setPhotoStatus({ loading: false, error: 'Please choose an image.', success: '' }); return }
    try {
      const fd = new FormData()
      fd.append('title', photoForm.title); fd.append('category', photoForm.category)
      fd.append('altText', photoForm.altText); fd.append('featured', String(photoForm.featured)); fd.append('photo', photoForm.photo)
      const created = await apiFetch('/api/photos', { method: 'POST', headers: getAuthHeaders(), body: fd })
      setPhotos((c) => [created, ...c]); setPhotoForm(defaultPhotoForm)
      setPhotoStatus({ loading: false, error: '', success: 'Image uploaded successfully.' })
    } catch (err) { setPhotoStatus({ loading: false, error: err.message || 'Upload failed', success: '' }) }
  }

  const deletePhoto = async (id) => {
    try {
      await apiFetch(`/api/photos/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
      setPhotos((c) => c.filter((p) => p._id !== id))
    } catch (err) { setError(err.message || 'Unable to delete') }
  }

  const switchPage = (page) => {
    if (page === activePage) return
    setActivePage(page); setPageKey((k) => k + 1)
  }

  return (
    <>
      <style>{styles}</style>
      <div className="ad-shell">

        {/* TOPBAR */}
        <header className="ad-topbar">
          <div className="ad-topbar-brand">
            <img src={siteAssets.logo} alt="Logo" className="ad-topbar-logo" />
            <div className="ad-topbar-text">
              <h1>Admin Dashboard</h1>
              <span>Shanthala Nritya Angala</span>
            </div>
          </div>
          <div className="ad-topbar-right">
            {unreadCount > 0 && (
              <span className="ad-unread-pill"><span className="ad-unread-dot" />{unreadCount} unread</span>
            )}
            <button className="ad-logout-btn" type="button" onClick={handleLogout}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* HERO */}
        <div className="ad-hero">
          <div className="ad-hero-inner">
            <div>
              <p className="ad-hero-eyebrow">Dashboard Overview</p>
              <h2 className="ad-hero-heading">Keep every enquiry warm, every image curated,<br />and every update <em>stage-ready.</em></h2>
              <p className="ad-hero-sub">Classical, expressive, and image-led — the same identity as the public site.</p>
            </div>
            <div className="ad-hero-images">
              <img src={siteAssets.groupStage} alt="Stage" className="ad-hero-img-main" />
              <img src={siteAssets.guruPortrait} alt="Guru" className="ad-hero-img-accent" />
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="ad-stats">
          <div className="ad-stat">
            <p className="ad-stat-label">Total Queries</p>
            <p className="ad-stat-value">{loading ? '—' : queries.length}</p>
            <p className="ad-stat-sub">Contact form submissions</p>
          </div>
          <div className="ad-stat">
            <p className="ad-stat-label">Unread Queries</p>
            <p className="ad-stat-value" style={{ color: unreadCount > 0 ? '#8b1a2b' : '#6b1020' }}>{loading ? '—' : unreadCount}</p>
            <p className="ad-stat-sub">Awaiting your response</p>
          </div>
          <div className="ad-stat">
            <p className="ad-stat-label">Gallery Images</p>
            <p className="ad-stat-value">{loading ? '—' : photos.length}</p>
            <p className="ad-stat-sub">Published to public gallery</p>
          </div>
        </div>

        {/* TAB NAV */}
        <nav className="ad-tab-nav">
          <button className={`ad-tab ${activePage === 'queries' ? 'active' : ''}`} onClick={() => switchPage('queries')} type="button">
            <svg className="ad-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Queries
            {queries.length > 0 && <span className="ad-tab-count">{queries.length}</span>}
          </button>
          <button className={`ad-tab ${activePage === 'gallery' ? 'active' : ''}`} onClick={() => switchPage('gallery')} type="button">
            <svg className="ad-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
            Gallery
            {photos.length > 0 && <span className="ad-tab-count">{photos.length}</span>}
          </button>
        </nav>

        {/* PAGES */}
        <div key={pageKey}>
          {loading && <p className="ad-loading">Loading admin data…</p>}
          {error  && <p className="ad-global-error" style={{ margin: '1.5rem 2.8rem 0' }}>{error}</p>}

          {/* ── PAGE 1: QUERIES ── */}
          {activePage === 'queries' && !loading && (
            <div className="ad-page">
              <div className="ad-queries-wrap">
                <div className="ad-panel">
                  <div className="ad-panel-head">
                    <div>
                      <h2>Frontend Queries</h2>
                      <p>{filteredQueries.length} of {queries.length} messages shown</p>
                    </div>
                    {unreadCount > 0 && <span className="ad-panel-badge">{unreadCount} new</span>}
                  </div>
                  <div className="ad-filter-bar">
                    <span className="ad-filter-label">Filter:</span>
                    {FILTERS.map((f) => (
                      <button key={f} type="button" className={`ad-filter-btn ${queryFilter === f ? 'active' : ''}`} onClick={() => setQueryFilter(f)}>{f}</button>
                    ))}
                  </div>
                  <div className="ad-query-list">
                    {filteredQueries.length === 0 && (
                      <p className="ad-empty">{queryFilter === 'all' ? 'No queries yet.' : `No ${queryFilter} queries found.`}</p>
                    )}
                    {filteredQueries.map((query) => (
                      <article key={query._id} className="ad-query-card">
                        <div className="ad-query-top">
                          <div>
                            <p className="ad-query-name">{query.name}</p>
                            <p className="ad-query-contact">{query.email}{query.phone ? ` · ${query.phone}` : ''}</p>
                          </div>
                          <span className={`ad-badge ad-badge--${query.status}`}>{query.status}</span>
                        </div>
                        <p className="ad-query-msg">{query.message}</p>
                        <p className="ad-query-date">{new Date(query.createdAt).toLocaleString()}</p>
                        <div className="ad-query-actions">
                          <button className="ad-action-btn" type="button" onClick={() => updateQueryStatus(query._id, 'read')}>Mark Read</button>
                          <button className="ad-action-btn" type="button" onClick={() => updateQueryStatus(query._id, 'replied')}>Mark Replied</button>
                          <button className="ad-action-btn ad-action-btn--danger" type="button" onClick={() => deleteQuery(query._id)}>Delete</button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PAGE 2: GALLERY ── */}
          {activePage === 'gallery' && !loading && (
            <div className="ad-page">
              <div className="ad-gallery-layout">

                {/* Left: upload form */}
                <div className="ad-upload-card">
                  <div className="ad-gallery-preview">
                    <img src={siteAssets.redBlack} alt="Dance still" />
                    <div className="ad-gallery-preview-overlay" />
                    <span className="ad-gallery-preview-label">Upload New Image</span>
                  </div>
                  <div className="ad-panel-head">
                    <div><h2>Gallery Uploads</h2><p>Add images to the public gallery</p></div>
                  </div>
                  <form className="ad-form" onSubmit={handlePhotoSubmit}>
                    <div className="ad-form-row">
                      <div className="ad-field">
                        <label>Title</label>
                        <input type="text" name="title" value={photoForm.title} onChange={handlePhotoChange} placeholder="Photo title" required />
                      </div>
                      <div className="ad-field">
                        <label>Category</label>
                        <input type="text" name="category" value={photoForm.category} onChange={handlePhotoChange} placeholder="e.g. Performance" required />
                      </div>
                    </div>
                    <div className="ad-field">
                      <label>Alt Text</label>
                      <input type="text" name="altText" value={photoForm.altText} onChange={handlePhotoChange} placeholder="Describe for accessibility" />
                    </div>
                    <div className="ad-field">
                      <label>Image File</label>
                      <input type="file" name="photo" accept="image/*" onChange={handlePhotoChange} required />
                    </div>
                    <label className="ad-checkbox-row">
                      <input type="checkbox" name="featured" checked={photoForm.featured} onChange={handlePhotoChange} />
                      <span>Mark as featured on homepage</span>
                    </label>
                    {photoStatus.error   && <p className="ad-form-msg ad-form-msg--error">{photoStatus.error}</p>}
                    {photoStatus.success && <p className="ad-form-msg ad-form-msg--success">{photoStatus.success}</p>}
                    <button className="ad-upload-btn" type="submit" disabled={photoStatus.loading}>
                      {photoStatus.loading && <span className="ad-spinner" />}
                      {photoStatus.loading ? 'Uploading…' : 'Upload to Gallery'}
                    </button>
                  </form>
                </div>

                {/* Right: photo grid */}
                <div className="ad-photo-panel">
                  <div className="ad-photo-panel-head">
                    <h3>Published Images</h3>
                    <span>{photos.length} image{photos.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="ad-photo-grid">
                    {photos.length === 0 && <p className="ad-empty" style={{ gridColumn: '1/-1' }}>No images uploaded yet.</p>}
                    {photos.map((photo) => (
                      <div key={photo._id} className="ad-photo-item">
                        <img src={photo.url} alt={photo.altText || photo.title} />
                        {photo.featured && <span className="ad-featured-badge">Featured</span>}
                        <div className="ad-photo-item-overlay">
                          <p className="ad-photo-item-cat">{photo.category}</p>
                          <p className="ad-photo-item-title">{photo.title}</p>
                          <button className="ad-photo-delete" type="button" onClick={() => deletePhoto(photo._id)}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </>
  )
}