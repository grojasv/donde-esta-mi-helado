# 🍦 Dónde Está Mi Helado?

**A beautiful, mobile-first ice cream flavor tracker with real-time multi-device synchronization**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/grojasv/donde-esta-mi-helado)

**🌐 [Live Demo](https://teal-figolla-f5928c.netlify.app/)**

> **📖 Full Development Story**: See [PROJECT_PLAN.md](PROJECT_PLAN.md) for the complete 8-phase development journey from foundation to PWA native app experience.

---

## ✨ Features & What Makes This Special

🔄 **Real-Time Multi-Device Sync**
- Changes appear instantly across all connected devices
- Fun session sharing with memorable URLs like `creamy-sundae-42`
- Works offline with automatic sync when reconnected

🎨 **Smart Flavor-Based Colors**
- Ice cream colors match your flavors! "Chocolate" = brown, "Strawberry" = pink
- 25+ flavor mappings (English & Spanish): Mint, Vainilla, Mango, etc.
- Same flavor always produces the same color (case-insensitive)

🍦 **Interactive Ice Cream Experience**
- 7 labeled containers (A-G) with beautiful letter badges
- Click containers to toggle between full/half/empty states
- Fun eating animation with 😋 button and haptic feedback
- Professional glass-morphism design with smooth animations

📱 **Native App Experience**
- PWA installable on mobile home screens
- Touch gestures: pull-to-refresh, long press menus, double tap
- Offline-first with smart persistence
- Mobile-optimized with WCAG accessibility compliance

## 🚀 Quick Start

### Deploy Your Own (1-click)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/grojasv/donde-esta-mi-helado)

### Local Development
```bash
git clone https://github.com/grojasv/donde-esta-mi-helado.git
cd donde-esta-mi-helado
npm install && npm run dev
```

> **📝 Note**: Works perfectly without setup! For real-time sync, see [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

## 🎯 How to Use

1. **Type flavors** in any container (A-G) - auto-saves as you type!
2. **Watch smart colors** - "Chocolate" → brown, "Mint" → green, etc.
3. **Click containers** to toggle fill levels (full/half/empty)
4. **Share sessions** - get fun URLs like `creamy-sundae-42` for real-time sync
5. **Install as app** - works offline like a native mobile app

## 🛠️ Technical Stack

- **Framework**: [Astro](https://astro.build/) + [TailwindCSS](https://tailwindcss.com/)
- **Real-time**: [Firebase](https://firebase.google.com/) Realtime Database  
- **PWA**: Service Worker + App Manifest
- **Deployment**: [Netlify](https://netlify.com/) with auto-deploy

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Built with ❤️ using [Astro](https://astro.build/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Deployed on [Netlify](https://netlify.com/)
- Icons from [Heroicons](https://heroicons.com/)

---

**Made with 🍦 for ice cream lovers everywhere!** 