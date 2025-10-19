# 🤖 AI Context Injector

A Chrome extension to save and inject custom contexts into AI chat platforms (ChatGPT, Claude, Gemini) with one click.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📋 **Save unlimited contexts** with custom names
- ⚡ **One-click injection** into AI chats
- ✏️ **Edit and manage** your contexts easily
- 🎯 **Multi-platform support**: ChatGPT, Claude.ai, and Gemini
- 🎨 **Clean formatting**: Contexts appear formatted with visual separators
- 🔒 **Privacy-first**: All data stored locally

## 🚀 Installation

### From Chrome Web Store
[Coming soon]

### Manual Installation (Development)

1. Clone this repository:
```bash
git clone https://github.com/Nexh1/ai-context-injector.git
```

2. Open Chrome and go to `chrome://extensions/`

3. Enable **Developer mode** (top right)

4. Click **Load unpacked** and select the extension folder

5. The extension icon should appear in your toolbar!

## 📖 Usage

1. **Create a context:**
   - Click the extension icon
   - Enter a name and your context text
   - Click "Save Context"

2. **Inject a context:**
   - Open ChatGPT, Claude, or Gemini
   - Click the extension icon
   - Click the 👁️ button to view/edit a context
   - Click "Inject" to insert it into the chat

3. **Edit or delete:**
   - Click 👁️ to edit a context
   - Click 🗑️ to delete a context

## 🛠️ Tech Stack

- **Manifest V3** (latest Chrome extension standard)
- **Vanilla JavaScript** (no frameworks)
- **Chrome Storage API** for local data persistence
- **Content Scripts** for AI platform integration

## 📋 Roadmap

- [ ] Export/Import contexts
- [ ] Context categories/folders
- [ ] Keyboard shortcuts
- [ ] Support for more AI platforms (Perplexity, etc.)
- [ ] Context templates library
- [ ] Cloud sync (optional)
- [ ] Context generator

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.