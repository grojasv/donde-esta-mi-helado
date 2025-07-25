# 🍦 Dónde Está Mi Helado?

**A beautiful, mobile-first ice cream flavor tracker with localStorage persistence**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/grojasv/donde-esta-mi-helado)

**🌐 [Live Demo](https://teal-figolla-f5928c.netlify.app/)**

---

## 🎯 Project Showcase

**"Dónde Está Mi Helado?"** is a complete, production-ready web application built following modern development practices through **6 comprehensive phases**:

### 🏗️ **Development Journey**
- **⚡ Phase 1**: Foundation Setup (Astro + TailwindCSS + Git)
- **📱 Phase 2**: Core UI Layout (7 custom ice cream containers + mobile-first design)  
- **💾 Phase 3**: Data Management (localStorage + auto-save + error handling)
- **🎨 Phase 4**: Visual Polish (glass-morphism + animations + accessibility)
- **🚀 Phase 5**: Deployment (GitHub + Netlify + automatic deployments)
- **🎁 Phase 6**: Final Enhancements (custom favicon + URL sharing + documentation)

### 🌟 **What Makes This Special**
- **🎨 Professional Design**: Modern glass-morphism with smooth animations
- **📱 Mobile-First**: Optimized for real-world mobile usage  
- **💾 Smart Persistence**: Never lose your data with intelligent auto-save
- **🔗 URL Sharing**: Share your ice cream flavors via simple links
- **♿ Accessibility**: WCAG compliant with excellent UX
- **🚀 Production-Ready**: Live, fast, and reliable worldwide

---

## ✨ Features

🎨 **Beautiful Design**
- Modern glass-morphism interface with backdrop blur
- Smooth animations and micro-interactions  
- Mobile-first responsive design
- Ice cream themed color palette

💾 **Smart Persistence**
- Automatic localStorage saving as you type
- Data persists across browser sessions
- Real-time save status with visual feedback
- Error handling and data recovery

📱 **Mobile Optimized**
- Touch-friendly input fields (48px minimum)
- Thumb-navigation friendly spacing
- Fast loading and smooth performance
- Works offline after first load

🔗 **URL Sharing**
- Share your ice cream flavors via simple links
- Copy shareable URLs to clipboard
- Recipients get flavors automatically loaded
- Clean URLs with smart parameter handling

♿ **Accessible**
- WCAG compliant color contrasts
- Screen reader friendly
- Keyboard navigation support
- Enhanced focus indicators

## 🚀 Quick Start

### Deploy Your Own (1-click)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/grojasv/donde-esta-mi-helado)

### Local Development

```bash
# Clone the repository
git clone https://github.com/grojasv/donde-esta-mi-helado.git
cd donde-esta-mi-helado

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 How to Use

1. **Open the app** in your browser
2. **Click on any input field** next to the ice cream containers
3. **Type your flavor** - it saves automatically as you type!
4. **Share with friends** - click "Compartir Sabores" to copy a shareable link
5. **Refresh the page** - your flavors are still there
6. **Use on mobile** - optimized for touch devices

### 🔗 **Sharing Example**
```
https://teal-figolla-f5928c.netlify.app/?flavors=%7B%22A%22%3A%22Chocolate%22%2C%22B%22%3A%22Vanilla%22%7D
```
When someone clicks this link, they'll see "Chocolate" in container A and "Vanilla" in container B!

## 🛠️ Technical Stack

- **Framework**: [Astro](https://astro.build/) v5.12.3
- **Styling**: [TailwindCSS](https://tailwindcss.com/) v4.1.11  
- **Storage**: Browser localStorage API
- **Deployment**: [Netlify](https://netlify.com/) with automatic deployments
- **Version Control**: Git + GitHub

## 📂 Project Structure

```
donde-esta-mi-helado/
├── src/
│   ├── pages/
│   │   └── index.astro          # Main application
│   └── styles/
│       └── global.css           # TailwindCSS imports
├── public/                      # Static assets
├── dist/                        # Production build
├── PROJECT_PLAN.md             # Development phases
└── package.json                # Dependencies
```

## 🎨 Container Design

- **Container A**: Grey cover with white letter "A"
- **Container B**: Grey cover with white letter "B"  
- **Container C**: Grey cover with white letter "C"
- **Container 4**: Plain green cover
- **Container 5**: Plain turquoise cover
- **Container 6**: Plain pink cover
- **Container 7**: Plain light grey cover

## 🔄 Auto-Save Behavior

- **Saves automatically** 300ms after you stop typing
- **Immediate save** when you click outside an input field
- **Backup save** before closing the browser
- **Visual confirmation** with animated checkmark
- **Error handling** with user-friendly messages

## 🌐 Browser Support

- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile browsers** (iOS Safari, Chrome Mobile)
- **localStorage required** (available in all modern browsers)
- **Graceful fallback** for older browsers

## 📱 Mobile Experience

Optimized for:
- **iPhone** (all sizes)
- **Android** phones and tablets
- **Touch interfaces** with proper target sizes
- **Portrait and landscape** orientations

## 🚀 Deployment

### Automatic Deployments
- **Netlify** automatically deploys from the `main` branch
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Built with ❤️ using [Astro](https://astro.build/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Deployed on [Netlify](https://netlify.com/)
- Icons from [Heroicons](https://heroicons.com/)

---

**Made with 🍦 for ice cream lovers everywhere!** 