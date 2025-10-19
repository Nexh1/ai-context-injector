document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("context-name");
    const textInput = document.getElementById("context-text");
    const saveBtn = document.getElementById("save-context");
    const listEl = document.getElementById("context-list");
    
    async function loadContexts() {
        const { contexts = [] } = await chrome.storage.local.get("contexts");
        renderList(contexts);
    }
    
    function renderList(contexts) {
        listEl.innerHTML = "";
        contexts.forEach((ctx, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
        <span>${ctx.name}</span>
        <div>
            <button data-index="${index}" class="view">👁️</button>
            <button data-index="${index}" class="inject">Inject</button>
            <button data-index="${index}" class="delete">🗑️</button>
        </div>
        `;
            listEl.appendChild(li);
        });
    }
    
    saveBtn.addEventListener("click", async () => {
        const name = nameInput.value.trim();
        const text = textInput.value.trim();
        if (!name || !text) return alert("Please fill in both fields.");
        
        const { contexts = [] } = await chrome.storage.local.get("contexts");
        
        if (editingIndex !== null) {
            contexts[editingIndex] = { name, text };
        } else {
            contexts.push({ name, text });
        }
        
        await chrome.storage.local.set({ contexts });
        enterCreateMode();
        loadContexts();
    });
    
    listEl.addEventListener("click", async (e) => {
        const index = e.target.dataset.index;
        
        if (e.target.classList.contains("view")) {
            enterEditMode(index);
        }
        else if (e.target.classList.contains("delete")) {
            const { contexts = [] } = await chrome.storage.local.get("contexts");
            contexts.splice(index, 1);
            await chrome.storage.local.set({ contexts });
            loadContexts();
        } else if (e.target.classList.contains("inject")) {
            const { contexts = [] } = await chrome.storage.local.get("contexts");
            const ctx = contexts[index];
            if (ctx) {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                
                // Send message pour injection du contexte
                chrome.tabs.sendMessage(tab.id, { action: "inject_context", text: ctx.text });
            }
        }
    });
    
    loadContexts();
    
    const formTitle = document.getElementById("form-title");
    const cancelBtn = document.getElementById("cancel-edit");
    let editingIndex = null;
    
    function enterEditMode(index) {
        chrome.storage.local.get("contexts").then(({ contexts = [] }) => {
            const ctx = contexts[index];
            editingIndex = index;
            nameInput.value = ctx.name;
            textInput.value = ctx.text;
            formTitle.textContent = "Edit Context";
            saveBtn.textContent = "Update Context";
            cancelBtn.style.display = "block";
            nameInput.focus();
        });
    }
    
    function enterCreateMode() {
        editingIndex = null;
        nameInput.value = "";
        textInput.value = "";
        formTitle.textContent = "Add Context";
        saveBtn.textContent = "Save Context";
        cancelBtn.style.display = "none";
    }
    
    cancelBtn.addEventListener("click", enterCreateMode);
});
