(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const STORAGE_KEY = "sshTutorConversationsV3";
  const THEME_KEY = "sshTheme";
  const FENCE = String.fromCharCode(96).repeat(3);
  const messagesEl = $("messages");
  const welcome = $("welcomePanel");
  const historyList = $("historyList");
  const form = $("chatForm");
  const input = $("chatInput");
  const sendButton = $("sendButton");
  let conversations = loadConversations();
  let activeId = conversations[0]?.id || null;
  let isBusy = false;

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
  function loadConversations() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!Array.isArray(value)) return [];
      return value.filter(c => c && typeof c.id === "string" && Array.isArray(c.messages))
        .slice(0,50).map(c => ({
          id:c.id, title:String(c.title || "New chat").slice(0,90),
          updated:Number(c.updated)||Date.now(),
          messages:c.messages.slice(-100).filter(m => m && ["user","assistant"].includes(m.role) && typeof m.content === "string")
            .map(m=>({role:m.role,content:m.content.slice(0,12000)}))
        }));
    } catch (_) { return []; }
  }
  function saveConversations() {
    conversations.sort((a,b)=>b.updated-a.updated);
    conversations = conversations.slice(0,50);
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify(conversations)); }
    catch (_) { toast("Browser storage is full. Export and delete older chats."); }
    renderHistory();
  }
  function current() { return conversations.find(c=>c.id===activeId) || null; }
  function newConversation() {
    const item={id:uid(),title:"New chat",updated:Date.now(),messages:[]};
    conversations.unshift(item);activeId=item.id;saveConversations();renderConversation();closeSidebar();
    input.focus();
  }
  function toast(message) {
    const el=document.createElement("div");el.className="toast";el.textContent=message;
    document.body.append(el);setTimeout(()=>el.remove(),2800);
  }
  function renderHistory() {
    historyList.replaceChildren();
    $("historyCount").textContent=String(conversations.length);
    if(!conversations.length){const empty=document.createElement("p");empty.className="history-empty";empty.textContent="Your saved chats will appear here.";historyList.append(empty);return;}
    conversations.forEach(item=>{
      const row=document.createElement("div");row.className="history-item";
      const open=document.createElement("button");open.type="button";open.className="history-open"+(item.id===activeId?" active":"");
      open.textContent=item.title;open.title=item.title;open.addEventListener("click",()=>{activeId=item.id;renderHistory();renderConversation();closeSidebar();});
      const del=document.createElement("button");del.type="button";del.className="history-delete";del.textContent="×";del.title="Delete this chat";del.setAttribute("aria-label","Delete "+item.title);
      del.addEventListener("click",event=>{event.stopPropagation();deleteConversation(item.id);});
      row.append(open,del);historyList.append(row);
    });
  }
  function deleteConversation(id) {
    const target=conversations.find(c=>c.id===id);
    if(!target)return;
    if(!confirm('Delete "'+target.title+'" from this browser?'))return;
    conversations=conversations.filter(c=>c.id!==id);
    if(activeId===id)activeId=conversations[0]?.id||null;
    if(!activeId){
      saveConversations();
      const item={id:uid(),title:"New chat",updated:Date.now(),messages:[]};
      conversations.unshift(item);activeId=item.id;saveConversations();renderConversation();return;
    }
    saveConversations();renderConversation();
  }
  function renderConversation() {
    messagesEl.replaceChildren();
    const item=current();
    welcome.hidden=!!(item&&item.messages.length);
    if(item) item.messages.forEach(m=>appendMessage(m.role,m.content,m.role==="assistant"));
    scrollToBottom();
  }
  function appendMessage(role,content,actions=true) {
    welcome.hidden=true;
    const row=document.createElement("article");row.className="message-row "+role;
    const avatar=document.createElement("div");avatar.className="avatar";avatar.textContent=role==="assistant"?"✦":"Y";
    const contentBox=document.createElement("div");contentBox.className="message-content";
    const label=document.createElement("div");label.className="message-label";label.textContent=role==="assistant"?"AI TUTOR":"YOU";
    const body=document.createElement("div");body.className="message-body";
    renderMarkdown(body,content);
    contentBox.append(label,body);row.append(avatar,contentBox);messagesEl.append(row);
    if(actions&&role==="assistant"){
      const controls=document.createElement("div");controls.className="message-actions";
      const copy=document.createElement("button");copy.className="message-action";copy.type="button";copy.textContent="Copy answer";
      copy.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(content);toast("Answer copied.");}catch(_){toast("Copy was blocked by this browser.");}});
      const save=document.createElement("button");save.className="message-action";save.type="button";save.textContent="Save as text";
      save.addEventListener("click",()=>downloadText("saudi-student-hub-answer.txt",content));
      controls.append(copy,save);messagesEl.append(controls);
    }
    return row;
  }

  function formatLatex(value) {
    const sub={a:"ₐ",e:"ₑ",h:"ₕ",i:"ᵢ",j:"ⱼ",k:"ₖ",l:"ₗ",m:"ₘ",n:"ₙ",o:"ₒ",p:"ₚ",r:"ᵣ",s:"ₛ",t:"ₜ",u:"ᵤ",v:"ᵥ",x:"ₓ",0:"₀",1:"₁",2:"₂",3:"₃",4:"₄",5:"₅",6:"₆",7:"₇",8:"₈",9:"₉","+":"₊","-":"₋"};
    const sup={0:"⁰",1:"¹",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹","+":"⁺","-":"⁻",n:"ⁿ",i:"ⁱ"};
    let s=String(value);
    s=s.replace(/\\(?:dfrac|tfrac|frac)\{([^{}]+)\}\{([^{}]+)\}/g,"($1) / ($2)");
    s=s.replace(/\\text\{([^{}]+)\}|\\mathrm\{([^{}]+)\}/g,(_,a,b)=>a||b);
    s=s.replace(/\\left|\\right|\\displaystyle|\\,|\\!|\\;/g,"");
    const symbols={times:"×",cdot:"·",Delta:"Δ",delta:"δ",alpha:"α",beta:"β",gamma:"γ",theta:"θ",lambda:"λ",mu:"μ",pi:"π",sigma:"σ",Sigma:"Σ",omega:"ω",Omega:"Ω",infty:"∞",pm:"±",leq:"≤",geq:"≥",neq:"≠",approx:"≈",rightarrow:"→",Rightarrow:"⇒",degree:"°",sqrt:"√"};
    s=s.replace(/\\([A-Za-z]+)(?:\{\})?/g,(m,k)=>symbols[k]||k);
    s=s.replace(/_\{([^{}]+)\}|_([A-Za-z0-9])/g,(m,a,b)=>[...(a||b)].map(ch=>sub[ch]||ch).join(""));
    s=s.replace(/\^\{([^{}]+)\}|\^([A-Za-z0-9])/g,(m,a,b)=>[...(a||b)].map(ch=>sup[ch]||ch).join(""));
    s=s.replace(/[{}]/g,"").replace(/\\/g," ");
    return s;
  }
  function appendInline(parent,text) {
    const token=/\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([^\n]+?\\\)|\$[^$\n]+\$|\x60[^\x60]+\x60|\*\*[^*]+\*\*|__[^_]+__|\*[^*\n]+\*/g;
    let index=0,match;
    while((match=token.exec(text))){
      appendPlain(parent,text.slice(index,match.index));
      const value=match[0];
      if(value.startsWith("$$")||value.startsWith("\\[")||value.startsWith("\\(")||value.startsWith("$")){
        const span=document.createElement("span");span.className="math-inline";
        const raw=value.startsWith("$$")?value.slice(2,-2):value.startsWith("$")?value.slice(1,-1):value.slice(2,-2);
        span.textContent=formatLatex(raw);parent.append(span);
      }else if(value.charCodeAt(0)===96){
        const code=document.createElement("code");code.textContent=value.slice(1,-1);parent.append(code);
      }else if(value.startsWith("**")||value.startsWith("__")){
        const bold=document.createElement("strong");appendInline(bold,value.slice(2,-2));parent.append(bold);
      }else{
        const em=document.createElement("em");appendInline(em,value.slice(1,-1));parent.append(em);
      }
      index=token.lastIndex;
    }
    appendPlain(parent,text.slice(index));
  }
  function appendPlain(parent,text) {
    if(!text)return;
    if(/[\\_^]/.test(text)){
      const span=document.createElement("span");span.className="math-inline";span.textContent=formatLatex(text);parent.append(span);
    }else parent.append(document.createTextNode(text));
  }
  function renderMarkdown(root,markdown) {
    const lines=String(markdown||"").replace(/\r/g,"").split("\n");
    let i=0;
    while(i<lines.length){
      const line=lines[i].trim();
      if(!line){i++;continue;}
      if(line.startsWith(FENCE)){
        const codeLines=[];i++;
        while(i<lines.length&&!lines[i].trim().startsWith(FENCE)){codeLines.push(lines[i]);i++;}
        if(i<lines.length)i++;
        const pre=document.createElement("pre"),code=document.createElement("code");code.textContent=codeLines.join("\n");pre.append(code);root.append(pre);continue;
      }
      if(line.startsWith("\\[")||line.startsWith("$$")){
        const close=line.startsWith("\\[")?"\\]":"$$";
        let formula=line.slice(2);i++;
        if(formula.endsWith(close)){formula=formula.slice(0,-2);}
        else{
          const collected=[formula];
          while(i<lines.length&&!lines[i].trim().includes(close)){collected.push(lines[i]);i++;}
          if(i<lines.length){collected.push(lines[i].trim().replace(close,""));i++;}
          formula=collected.join(" ");
        }
        const eq=document.createElement("div");eq.className="math-block";eq.textContent=formatLatex(formula);root.append(eq);continue;
      }
      const heading=line.match(/^(#{1,4})\s+(.+)$/);
      if(heading){const el=document.createElement("h"+heading[1].length);appendInline(el,heading[2]);root.append(el);i++;continue;}
      if(/^([-*_])\1\1+$/.test(line)){root.append(document.createElement("hr"));i++;continue;}
      if(/^>\s?/.test(line)){const quote=document.createElement("blockquote");appendInline(quote,line.replace(/^>\s?/,""));root.append(quote);i++;continue;}
      const unordered=line.match(/^[-*+]\s+(.+)$/),ordered=line.match(/^\d+[.)]\s+(.+)$/);
      if(unordered||ordered){
        const list=document.createElement(unordered?"ul":"ol");
        while(i<lines.length){
          const current=lines[i].trim(),m=unordered?current.match(/^[-*+]\s+(.+)$/):current.match(/^\d+[.)]\s+(.+)$/);
          if(!m)break;
          const li=document.createElement("li");appendInline(li,m[1]);list.append(li);i++;
        }
        root.append(list);continue;
      }
      const para=[];
      while(i<lines.length){
        const next=lines[i].trim();
        if(!next||next.startsWith(FENCE)||next.startsWith("\\[")||next.startsWith("$$")||/^(#{1,4})\s+/.test(next)||/^[-*+]\s+/.test(next)||/^\d+[.)]\s+/.test(next))break;
        para.push(next);i++;
      }
      const p=document.createElement("p");appendInline(p,para.join(" "));root.append(p);
    }
  }
  function titleFromQuestion(q) {
    const cleaned=q.replace(/\s+/g," ").trim();
    return cleaned.length>44?cleaned.slice(0,41)+"…":cleaned||"New chat";
  }
  function downloadText(filename,text) {
    const blob=new Blob([text],{type:"text/plain;charset=utf-8"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
  }
  function currentExportText() {
    const item=current();if(!item)return "";
    return item.messages.map(m=>(m.role==="user"?"YOU":"AI TUTOR")+"\n"+m.content).join("\n\n");
  }
  function closeSidebar(){document.body.classList.remove("sidebar-open");}
  function scrollToBottom(){requestAnimationFrame(()=>{$("conversationArea").scrollTop=$("conversationArea").scrollHeight;});}
  function appendSavedMessage(role,content) {
    const item=current();if(!item)return;
    item.messages.push({role,content});item.updated=Date.now();
    if(role==="user"&&item.title==="New chat")item.title=titleFromQuestion(content);
    saveConversations();
  }
  function showThinking(){
    const row=document.createElement("article");row.id="thinkingRow";row.className="message-row assistant";
    const avatar=document.createElement("div");avatar.className="avatar";avatar.textContent="✦";
    const box=document.createElement("div");box.className="message-content";
    const label=document.createElement("div");label.className="message-label";label.textContent="AI TUTOR";
    const text=document.createElement("div");text.className="typing-indicator";text.textContent="Thinking";
    for(let n=0;n<3;n++){const dot=document.createElement("i");text.append(dot);}
    box.append(label,text);row.append(avatar,box);messagesEl.append(row);scrollToBottom();return row;
  }
  async function sendMessage(question) {
    if(isBusy)return;
    const q=question.trim();if(q.length<2)return;
    if(q.length>3000){toast("Please keep each message under 3,000 characters.");return;}
    if(!current())newConversation();
    const item=current();
    appendSavedMessage("user",q);
    renderConversation();
    isBusy=true;input.disabled=true;sendButton.disabled=true;
    const thinking=showThinking();
    try{
      const history=item.messages.slice(0,-1).slice(-12).map(m=>({role:m.role,content:m.content}));
      const response=await fetch("/api/study-tutor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        question:q,grade:Number($("tutorGrade").value),curriculum:$("tutorCurriculum").value,
        subject:$("tutorSubject").value,chapter:"",language:$("answerLanguage").value,history
      })});
      const data=await response.json().catch(()=>({}));
      thinking.remove();
      if(!response.ok)throw new Error(data.error||"The AI Tutor could not answer right now.");
      const reply=String(data.reply||"").trim();
      if(!reply)throw new Error("The AI Tutor returned an empty answer. Please try again.");
      appendSavedMessage("assistant",reply);renderConversation();
    }catch(error){
      thinking.remove();
      const message=error.message||"The connection failed. Please try again.";
      appendMessage("assistant","**I couldn't complete that request.**\n\n"+message);
    }finally{
      isBusy=false;input.disabled=false;sendButton.disabled=false;input.focus();scrollToBottom();
    }
  }

  $("newChat").addEventListener("click",newConversation);
  $("openSidebar").addEventListener("click",()=>document.body.classList.add("sidebar-open"));
  $("closeSidebar").addEventListener("click",closeSidebar);
  $("mobileScrim").addEventListener("click",closeSidebar);
  $("clearHistory").addEventListener("click",()=>{
    if(!conversations.length){toast("There is no saved history to delete.");return;}
    if(!confirm("Delete all saved conversations from this browser? This cannot be undone."))return;
    conversations=[];activeId=null;saveConversations();newConversation();toast("Saved history deleted.");
  });
  $("exportChat").addEventListener("click",()=>{
    const data=currentExportText();if(!data){toast("There is no conversation to export yet.");return;}
    downloadText("saudi-student-hub-chat.txt",data);
  });
  $("themeToggle").addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    try{localStorage.setItem(THEME_KEY,document.body.classList.contains("dark")?"dark":"light");}catch(_){}
  });
  if(localStorage.getItem(THEME_KEY)==="dark")document.body.classList.add("dark");

  form.addEventListener("submit",event=>{event.preventDefault();const q=input.value;input.value="";resizeInput();sendMessage(q);});
  input.addEventListener("keydown",event=>{
    if(event.key==="Enter"&&!event.shiftKey&&!event.isComposing){event.preventDefault();form.requestSubmit();}
  });
  input.addEventListener("input",resizeInput);
  function resizeInput(){input.style.height="auto";input.style.height=Math.min(input.scrollHeight,180)+"px";}
  document.querySelectorAll("[data-prompt]").forEach(button=>button.addEventListener("click",()=>sendMessage(button.dataset.prompt)));

  if(!activeId){
    const item={id:uid(),title:"New chat",updated:Date.now(),messages:[]};
    conversations.unshift(item);activeId=item.id;saveConversations();renderConversation();
  } else {
    renderHistory();renderConversation();
  }
})();