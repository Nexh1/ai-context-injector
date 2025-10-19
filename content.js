if (window.aiContextInjectorLoaded) {
    console.log("AI Context Injector already loaded, skipping...");
} else {
    window.aiContextInjectorLoaded = true;
    
    function insertFormattedContext(editable, text) {
        editable.focus();
        editable.textContent = "";
        
        const header = document.createElement("p");
        header.textContent = "📋 CONTEXT";
        editable.appendChild(header);
        
        const emptyLine = document.createElement("p");
        const br1 = document.createElement("br");
        emptyLine.appendChild(br1);
        editable.appendChild(emptyLine);
        
        const contextText = document.createElement("p");
        contextText.textContent = text;
        editable.appendChild(contextText);
        
        const separator = document.createElement("p");
        separator.textContent = "─────────────── ✍️ ───────────────";
        editable.appendChild(separator);
        
        const emptyP1 = document.createElement("p");
        const br2 = document.createElement("br");
        emptyP1.appendChild(br2);
        editable.appendChild(emptyP1);
        
        const emptyP2 = document.createElement("p");
        const br3 = document.createElement("br");
        emptyP2.appendChild(br3);
        editable.appendChild(emptyP2);
        
        const range = document.createRange();
        range.setStart(emptyP2, 0);
        range.collapse(true);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
    
    // Platforms configuration
    const platforms = {
        chatgpt: {
            name: "ChatGPT",
            match: (host) => host.includes("chatgpt.com") || host.includes("openai.com"),
            insertContext: (text) => {
                const editable = document.querySelector(".ProseMirror[contenteditable='true']");
                if (!editable) {
                    alert("ChatGPT input field not found!");
                    return;
                }
                
                insertFormattedContext(editable, text);
                
                const event = new InputEvent("input", { bubbles: true });
                editable.dispatchEvent(event);
            }
        },
        claude: {
            name: "Claude",
            match: (host) => host.includes("claude.ai"),
            insertContext: (text) => {
                const editable = document.querySelector('.ProseMirror[contenteditable="true"][role="textbox"]');
                if (!editable) {
                    alert("Claude input not found!");
                    return;
                }
                
                insertFormattedContext(editable, text);
                
                const event = new InputEvent("input", { bubbles: true });
                editable.dispatchEvent(event);
            }
        },
        gemini: {
            name: "Gemini",
            match: (host) => host.includes("gemini.google.com"),
            insertContext: (text) => {
                const editable = document.querySelector('.ql-editor[contenteditable="true"]');
                if (!editable) {
                    alert("Gemini input not found!");
                    return;
                }
                
                insertFormattedContext(editable, text);
                
                const inputEvent = new InputEvent("input", { bubbles: true });
                editable.dispatchEvent(inputEvent);
                const changeEvent = new Event("text-change", { bubbles: true });
                editable.dispatchEvent(changeEvent);
            }
        }
    };
    
    // Detect current platform
    function detectPlatform() {
        const host = window.location.hostname;
        for (const key in platforms) {
            if (platforms[key].match(host)) {
                return platforms[key];
            }
        }
        return null;
    }
    
    const platform = detectPlatform();
    
    if (!platform) {
        console.log("No matching AI platform detected for this site.");
    } else {
        console.log("Detected platform:", platform.name);
    }
    
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((msg) => {
        if (msg.action === "inject_context") {
            if (!platform) {
                alert("No platform detected to inject context.");
                return;
            }
            platform.insertContext(msg.text);
        }
    });
    
}