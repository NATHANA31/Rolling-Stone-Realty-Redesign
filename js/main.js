const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const N=n=>"₦"+Math.round(n).toLocaleString("en-NG"),M=n=>"₦"+n.toLocaleString("en-NG")+"M";
const fill=(id,h)=>{const x=$(id);if(x)x.innerHTML=h};
const opts=ESTATES.map(e=>`<option>${e.name}</option>`).join("");
const fld=(x="")=>`<label>Full name<input name="name" required></label><label>Phone<input name="phone" type="tel" required></label><label>Email<input name="email" type="email" required></label>${x}<button class="btn" style="margin-top:16px">Send request</button><p class="msg" role="status"></p>`;
// Shared header, footer and booking dialog
$("#h").innerHTML = `<div class="banner">Unofficial redesign concept by Nathan Aguele. Not affiliated with Rolling Stone Realty Ltd.</div><div class="wrap bar"><a class="logo" href="index.html">ROLLING <span>STONE REALTY</span></a><nav>${[["Home", ""], ["About", "#about"], ["Services", "#services"], ["Properties", "#properties"], ["Team", "#team"]].map(([t, h]) => `<a class="hide" href="index.html${h}">${t}</a>`).join("")}<a class="btn" href="earn.html">Earn With Us</a></nav></div>`;

$("#f").innerHTML = `<div class="wrap"><div class="fg"><div><h4>Rolling Stone Realty Ltd</h4><p>Building Your Vision, Creating Reality.</p><p><a href="https://facebook.com/RollingStoneRealtyLtd">Facebook</a> · <a href="https://instagram.com/rollingstonerealtyltd_official">Instagram</a> · <a href="https://tiktok.com/@rollingstonerealtyltd">TikTok</a></p></div><div><h4>Quick links</h4><p><a href="index.html#properties">Properties</a></p><p><a href="listings.html">All listings</a></p><p><a href="team.html">Agents</a></p></div><div><h4>Contact</h4><p>No 17, Zaria Street, Garki 2, Abuja, Nigeria</p><p><a href="tel:+2348067723726">${CONFIG.phone}</a></p><p><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></p></div></div><div class="help">Need help? <a href="https://wa.me/2348067723726">WhatsApp</a> · <a href="tel:+2348067723726">Call us</a><br>Concept only. Estate details and reviews are sample content from the live site, for portfolio purposes.</div></div>`;

document.body.insertAdjacentHTML("beforeend",`<dialog id="bk"><button class="x" aria-label="Close" onclick="this.closest('dialog').close()">×</button><form data-form data-subject="Inspection request"><h2>Book a free inspection</h2>${fld(`<label>Estate<select name="estate">${opts}</select></label><label>Preferred date<input name="date" type="date"></label>`)}</form></dialog>`);
document.addEventListener("click", e => { if (e.target.closest("[data-book]")) $("#bk").showModal() });

// Forms: posts JSON to CONFIG.formEndpoint (e.g. Formspree). Without one it runs in demo mode.
document.addEventListener("submit",async e=>{const f=e.target;if(!f.dataset.form)return;e.preventDefault();const d=Object.fromEntries(new FormData(f)),m=$(".msg",f);d._subject=f.dataset.subject;
try{if(CONFIG.formEndpoint){const r=await fetch(CONFIG.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(d)});if(!r.ok)throw 0}
m.textContent=CONFIG.formEndpoint?"Thank you. We will be in touch shortly.":"Demo mode: add a form endpoint in js/data.js to receive these by email.";f.reset()}catch{m.textContent="Something went wrong. Please call or WhatsApp us."}});
const card = e => `<article class="card"><span class="tag">${e.title}</span><h3>${e.name}</h3><div class="loc">${e.loc}</div><div class="from"><span>From <b>${M(Math.min(...e.sizes.map(s => s[2])))}</b></span><a href="property.html?estate=${e.slug}">View details</a></div></article>`;

const team = big => TEAM.map(([n, r, w]) => `<article class="card"><div class="av" aria-hidden="true">${n.split(" ").map(x => x[0]).slice(0, 2).join("")}</div><h3 style="font-size:20px">${n}</h3><div class="loc">${r}</div>${big ? "<p>[Short bio for the company to confirm.]</p>" : ""}<a class="btn" href="https://wa.me/${w}?text=${encodeURIComponent("Hi, I found you on the Rolling Stone Realty website.")}">WhatsApp</a></article>`).join("");

fill("#svcs",SERVICES.map((s,i)=>`<article class="card"><span class="tag">0${i+1}</span><h3>${s.title}</h3><p>${s.desc}</p><a class="more" href="services.html?service=${s.id}">Learn more →</a></article>`).join(""));
fill("#estates", ESTATES.map(card).join(""));

fill("#ins", INSIGHTS.map(([t, h, p, d]) => `<article class="card"><div class="av" style="width:100%;height:120px;border-radius:8px;font-size:16px">Image</div><span class="tag">${t}</span><h3 style="font:700 19px var(--hf);text-transform:none">${h}</h3><p>${p}</p><div class="loc">${d}</div></article>`).join(""));

fill("#team",team(false));fill("#teamfull",team(true));
fill("#rev",REVIEWS.map(([t,n,r])=>`<article class="card"><div aria-label="5 stars" style="color:var(--am)">★★★★★</div><blockquote>“${t}”</blockquote><div class="who">${n}, ${r}</div></article>`).join(""));
fill("#faq", FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join(""));

// Hero slider: drop MP4s named after each estate slug into assets/videos/
if ($("#sl"))
{
    const S = ESTATES.slice(0, 4); $("#sl").innerHTML = S.map((e, i) =>
    {
        const T = i ? "div" : "h1"; return `<div class="slide${i ? "" : " on"}"><video muted loop playsinline preload="none" src="assets/videos/${e.slug}.mp4" aria-hidden="true"></video><div class="cap"><${T} class="ttl">Find your dream property in Nigeria</${T}><p>${e.name}, ${e.loc}. Invest, buy and build with ease.</p><button class="btn" data-book>Book inspection</button></div></div>`
    }).join("") + `<div class="arrows"><button aria-label="Previous slide">‹</button><button aria-label="Next slide">›</button></div>`;

    const sl = $$(".slide"); let c = 0; const go = n =>
    {
        const v = sl[c].firstChild; sl[c].classList.remove("on"); v.pause(); c = (n + sl.length) % sl.length; sl[c].classList.add("on"); sl[c].firstChild.play().catch(() => { })
    };
    const [pv, nx] = $$(".arrows button"); pv.onclick = () => go(c - 1); nx.onclick = () => go(c + 1); sl[0].firstChild.play().catch(() => { });
    
if(!matchMedia("(prefers-reduced-motion:reduce)").matches)setInterval(()=>go(c+1),7000)}
// Estate detail page
if($("#prop")){const e=ESTATES.find(x=>x.slug==new URLSearchParams(location.search).get("estate"))||ESTATES[0];let i=0;
document.title=e.name+" | Rolling Stone Realty (concept)";$("#pn").textContent=e.name;$("#pl").textContent=e.loc+" · Title: "+e.title;
const q=encodeURIComponent(e.loc+", Abuja");$("#map").src="https://www.google.com/maps?q="+q+"&output=embed";$("#dir").href="https://www.google.com/maps/search/?api=1&query="+q;$("#pc").hidden=!!e.plan;
const draw=()=>{const [l,sq,p]=e.sizes[i],r=p*.7,t=x=>M(+x.toFixed(2));
$("#sz").innerHTML=e.sizes.map((s,j)=>`<button class="chip" aria-pressed="${j==i}" data-i="${j}">${s[0]}</button>`).join("");
$("#pp").textContent=M(p);$("#pm").textContent="About "+N(p*1e6/sq)+" per sqm";
$("#pi").textContent=`Installments: ${t(p*.3)} deposit, then ${t(r/6)} to ${t(r/3)} a month over 3 to 6 months.`;
$("#pb").textContent=e.build&&e.build[sq]?"Building prototype: "+e.build[sq]:""};
$("#sz").onclick=ev=>{const b=ev.target.closest("[data-i]");if(b){i=+b.dataset.i;draw()}};draw()}
// Services flow

if($("#flow")){const sel=$("#svc"),qs=$("#qs");SERVICES.forEach(s=>sel.add(new Option(s.title,s.id)));const p=new URLSearchParams(location.search).get("service");if(p)sel.value=p;
    const ask = (s, n, ans) =>
    {
        const st = s.steps[n]; if (!st)
        {
            qs.insertAdjacentHTML("beforeend", `<form data-form data-subject="Service enquiry: ${s.title}" class="box">${fld()}<input type="hidden" name="summary"></form>`); $("[name=summary]", qs).value = ans.join(" | "); return
        }
        const d=document.createElement("fieldset");d.innerHTML=`<legend>${st[0]} <small style="color:var(--mu);font-weight:400">(${n+1} of ${s.steps.length})</small></legend><div class="chips"></div>`;
    st[1].forEach(o =>
    {
        const l = [].concat(o)[0], b = document.createElement(Array.isArray(o) ? "a" : "button"); b.className = "chip"; b.textContent = l; if (Array.isArray(o)) b.href = o[1]; else { b.type = "button"; b.onclick = () => { $$(".chip", d).forEach(x => x.setAttribute("aria-pressed", x == b)); while (d.nextSibling) d.nextSibling.remove(); ask(s, n + 1, [...ans.slice(0, n), st[0] + ": " + l]) } } $(".chips", d).append(b)
    });
    qs.append(d)
    };
    const run = () => { const s = SERVICES.find(x => x.id == sel.value); $("#sd").textContent = s.desc; qs.innerHTML = ""; ask(s, 0, []) }; sel.onchange = run; run()
}
// Earn page calculator and form
if ($("#calc"))
{
    const es = $("#ce"), ss = $("#cs"); es.innerHTML = opts; const c = () => { $("#co").textContent = N(ESTATES[es.selectedIndex].sizes[ss.value || 0][2] * 1e6 * .05) }, u = () => { ss.innerHTML = ESTATES[es.selectedIndex].sizes.map((s, i) => `<option value="${i}">${s[0]}</option>`).join(""); c() }; es.onchange = u; ss.onchange = c; u()
}
// Listings page: every plot size from every estate, filterable
if ($("#lst"))
{
    const R = ESTATES.flatMap(e => e.sizes.map(s => ({ e, l: s[0], q: s[1], p: s[2] }))), u = a => [...new Set(a)], fl = $("#fl"), ft = $("#ft"), fp = $("#fp"), fs = $("#fs");

fl.innerHTML='<option value="">All locations</option>'+u(ESTATES.map(e=>e.loc)).map(x=>`<option>${x}</option>`).join("");
ft.innerHTML='<option value="">All title types</option>'+u(ESTATES.map(e=>e.title)).map(x=>`<option>${x}</option>`).join("");
fp.innerHTML='<option value="">Any price</option>'+[10,20,50,100].map(x=>`<option value="${x}">Up to ₦${x}M</option>`).join("");
    const draw = () =>
    {
        const r = R.filter(x => (!fl.value || x.e.loc == fl.value) && (!ft.value || x.e.title == ft.value) && (!fp.value || x.p <= +fp.value)).sort(fs.value == "d" ? (a, b) => b.p - a.p : (a, b) => a.p - b.p);

$("#cnt").textContent=r.length+(r.length==1?" plot found":" plots found");
        $("#res").innerHTML = r.map(x => `<article class="card"><span class="tag">${x.e.title}</span><h3>${x.e.name}</h3><div class="loc">${x.e.loc} · ${x.l}</div><div class="price" style="font-size:26px">${M(x.p)}</div><div class="loc">About ${N(x.p * 1e6 / x.q)} per sqm</div><div class="from"><a href="property.html?estate=${x.e.slug}">Details</a><button class="btn" data-book style="padding:8px 16px">Book inspection</button></div></article>`).join("") || "<p>No plots match. Try widening the filters.</p>"
    };
    [fl, ft, fp, fs].forEach(x => x.onchange = draw); draw()
}
