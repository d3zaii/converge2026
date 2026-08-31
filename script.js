(() => {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  const tracks = [
    {
      id:'dezai', no:'01', name:'DEZAI', title:'AI / EDTECH', subtitle:'AI AGENTS',
      desc:'AI agents, learning, assessment, productivity and human-centred education technology.',
      logo:'assets/dezai.png', align:'Core event track',
      problems:[
        'Build an AI tutor that adapts explanations and difficulty to a student’s learning pattern.',
        'Design an AI study agent that converts a syllabus into a realistic daily learning plan and keeps students accountable.',
        'Create an assessment system that gives useful formative feedback without simply revealing answers.',
        'Build an accessibility-first learning assistant for students who face language, reading or visual barriers.',
        'Create a multi-agent workflow that helps teachers reduce repetitive planning, content and classroom administration.',
        'OPEN BRIEF · Solve any meaningful AI / EdTech problem where responsible AI can improve learning, teaching or knowledge work.'
      ]
    },
    {
      id:'truvad', no:'02', name:'TRUVAD', title:'FINTECH / REGTECH', subtitle:'TRUST SYSTEMS',
      desc:'Financial access, compliance, fraud, KYC/AML, payments and trustworthy financial infrastructure.',
      logo:'assets/truvad.png', align:'Core event track',
      problems:[
        'Build a fraud-risk signal engine that helps a small merchant identify suspicious transactions in real time.',
        'Design a KYC workflow that reduces friction while keeping identity verification auditable and secure.',
        'Create a personal-finance tool that helps first-time earners understand spending, saving and risk.',
        'Build a compliance copilot that turns changing regulatory text into actionable checks for a small financial business.',
        'Design a financial inclusion product for people who are underserved by traditional credit or banking systems.',
        'OPEN BRIEF · Solve a real FinTech / RegTech problem involving trust, access, compliance, payments or financial resilience.'
      ]
    },
    {
      id:'pranavx', no:'03', name:'PRANAVX LABS', title:'HR / MARKETING', subtitle:'BUSINESS OPS',
      desc:'Talent, growth, employee experience, analytics and workflow automation.',
      logo:'assets/pranavx.png', align:'Core event track',
      problems:[
        'Build a candidate screening workflow that improves signal quality without introducing unfair filtering.',
        'Create an employee onboarding system that turns scattered information into a guided first-30-days experience.',
        'Build a marketing intelligence dashboard that turns campaign data into clear next actions.',
        'Design a workflow agent that automates a repetitive internal operations process from intake to completion.',
        'Create a talent-growth platform that helps students or early-career workers discover skills, projects and opportunities.',
        'OPEN BRIEF · Solve a meaningful HR, marketing or business-operations problem with measurable time, quality or decision gains.'
      ]
    },
    {
      id:'unesco', no:'04', name:'UNESCO-ALIGNED', title:'EDUCATION / SKILLS', subtitle:'INCLUSION',
      desc:'Thematic alignment with inclusive digital learning, skills, access and youth empowerment priorities.',
      align:'Thematic alignment · not a partnership',
      problems:[
        'Create an offline-first learning system for students with unreliable internet access.',
        'Build a digital-skills pathway that helps students move from learning to employability through measurable milestones.',
        'Design an assistive learning tool that makes digital content more accessible to learners with disabilities.',
        'Create a safe digital-citizenship companion that teaches privacy, misinformation awareness and responsible AI use.',
        'Build a youth-led platform that lets students surface local education problems and propose evidence-backed solutions.',
        'OPEN BRIEF · Build for equitable, inclusive and future-ready education, skills or youth participation.'
      ]
    },
    {
      id:'worldbank', no:'05', name:'WORLD BANK-ALIGNED', title:'DIGITAL INCLUSION', subtitle:'DEVELOPMENT',
      desc:'Thematic alignment with digital access, financial inclusion, jobs and development infrastructure.',
      align:'Thematic alignment · not a partnership',
      problems:[
        'Build a digital-access tool that helps underserved communities discover affordable connectivity and public digital services.',
        'Create a micro-entrepreneur toolkit that helps informal businesses manage customers, cash flow and basic records.',
        'Design a jobs-matching platform that connects young people to local, remote and skills-based opportunities.',
        'Build a digital public-service navigator that makes essential government services easier to discover and understand.',
        'Create a data-driven tool that helps communities identify barriers to financial or digital inclusion.',
        'OPEN BRIEF · Solve a development challenge involving digital inclusion, jobs, access, services or economic opportunity.'
      ]
    },
    {
      id:'undp', no:'06', name:'UNDP-ALIGNED', title:'CLIMATE / CITIES', subtitle:'COMMUNITY RESILIENCE',
      desc:'Thematic alignment with inclusive cities, climate resilience, digital public services and community innovation.',
      align:'Thematic alignment · not a partnership',
      problems:[
        'Build a neighbourhood-level heat-risk tool that turns local data into practical actions for residents.',
        'Create a waste or recycling coordination platform that improves collection, sorting or reuse at community scale.',
        'Design a resilient-city dashboard that helps communities track local risks and preparedness actions.',
        'Build an inclusive urban mobility tool for students, older adults or people with accessibility needs.',
        'Create a community platform that helps local organisations coordinate climate, health or resilience initiatives.',
        'OPEN BRIEF · Build a practical technology solution for greener, safer, more inclusive or more resilient communities.'
      ]
    }
  ];

  const loader = $('#loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (window.gsap) gsap.to(loader, { autoAlpha: 0, duration: .8, ease: 'power3.inOut' });
      else loader.style.display = 'none';
      initReveal();
    }, 700);
  });

  // Track cards
  const trackGrid = $('#trackGrid');
  trackGrid.innerHTML = tracks.map((t) => `
    <button class="track-card magnetic reveal" data-track="${t.id}">
      <span class="track-no">${t.no}</span>
      <span class="track-logo ${t.id === 'dezai' ? 'dezai-mini' : ''}">${t.logo ? `<img src="${t.logo}" alt="${t.name}">` : '<span class="alignment-symbol">◎</span>'}</span>
      <span class="track-align">${t.align}</span>
      <span class="track-card-title">${t.title}<i>${t.subtitle}</i></span>
      <span class="track-desc">${t.desc}</span>
      <span class="track-open">VIEW 6 PROBLEM STATEMENTS <b>↗</b></span>
    </button>
  `).join('');

  const trackSelect = $('#registrationTrack');
  trackSelect.innerHTML += tracks.map(t => `<option value="${t.name} · ${t.title} / ${t.subtitle}">${t.name} · ${t.title}</option>`).join('');

  const trackModal = $('#trackModal');
  const registerModal = $('#registerModal');
  const problemList = $('#problemList');

  function openModal(modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }
  function closeModal(modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }
  $$('[data-close]').forEach(btn => btn.addEventListener('click', () => closeModal($('#'+btn.dataset.close))));
  [trackModal, registerModal].forEach(m => m.addEventListener('click', e => { if(e.target === m) closeModal(m); }));
  window.addEventListener('keydown', e => { if(e.key === 'Escape'){ closeModal(trackModal); closeModal(registerModal); } });

  function showTrack(id){
    const t = tracks.find(x => x.id === id);
    if(!t) return;
    $('#trackModalKicker').textContent = `${t.no} / ${t.name}`;
    $('#trackModalTitle').innerHTML = `${t.title.replace(' / ',' /<br>')}<br><span>${t.subtitle}.</span>`;
    $('#trackModalSub').textContent = t.align + ' · Click a brief to see the full challenge statement.';
    problemList.innerHTML = t.problems.map((p,i) => `
      <button class="problem-row ${i===5 ? 'open-brief' : ''}" type="button">
        <span>${String(i+1).padStart(2,'0')}</span>
        <b>${i===5 ? 'OPEN TRACK' : 'PROBLEM STATEMENT'}</b>
        <p>${p}</p>
        <i>+</i>
      </button>
    `).join('');
    $$('.problem-row').forEach(row => row.addEventListener('click', () => row.classList.toggle('expanded')));
    openModal(trackModal);
  }
  $$('#trackGrid .track-card').forEach(card => card.addEventListener('click', () => showTrack(card.dataset.track)));

  // Registration pricing
  let members = 1;
  const TEAM_PRICES = {1:49, 2:99, 3:149, 4:199};
  const EARLY_BIRD = .20;
  const maxMembers = 4;
  const money = n => `₹${n.toFixed(2)}`;
  function updatePrice(){
    const base = TEAM_PRICES[members];
    const discount = base * EARLY_BIRD;
    const final = base - discount;
    $('#memberCount').textContent = members;
    $('#baseTotal').textContent = money(base);
    $('#discountAmount').textContent = `−${money(discount)}`;
    $('#finalTotal').textContent = money(final);
    $('#registrationTotalField').value = money(base);
    $('#discountedTotalField').value = money(final);
  }
  $('#plusMember').addEventListener('click', () => { if(members < maxMembers){ members++; updatePrice(); } });
  $('#minusMember').addEventListener('click', () => { if(members > 1){ members--; updatePrice(); } });
  updatePrice();

  $$('[data-register]').forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    $('#successState').hidden = true;
    $('#registrationForm').hidden = false;
    updatePrice();
    openModal(registerModal);
  }));

  // AJAX FormSubmit. FormSubmit emails submissions to the configured destination.
  const form = $('#registrationForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = $('#submitRegistration');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'SUBMITTING… <span>↗</span>';
    const data = Object.fromEntries(new FormData(form).entries());
    data.team_members = members;
    data.registration_pricing = '₹49 solo · ₹99 duo · ₹149 trio · ₹199 squad';
    data.early_bird_discount = '20%';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify(data)
      });
      if(!response.ok) throw new Error('Submission failed');
      form.hidden = true;
      $('#successState').hidden = false;
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'SUBMIT REGISTRATION <span>↗</span>';
      alert('We could not submit the registration right now. Please check your connection and try again.');
    }
  });

  // Cursor
  const ring = $('.cursor-ring'), dot = $('.cursor-dot');
  window.addEventListener('pointermove', e => {
    if (window.innerWidth < 900) return;
    if (window.gsap) {
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: .35, ease: 'power3.out' });
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: .04 });
    }
  });

  function bindMagnetic(){
    $$('.magnetic').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
        if (window.gsap) gsap.to(el, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.6)' });
      });
      el.addEventListener('mousemove', e => {
        if (innerWidth < 900 || !window.gsap) return;
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * .06, y: (e.clientY - r.top - r.height / 2) * .06, duration: .3 });
      });
    });
  }
  bindMagnetic();

  // Cinematic globe with India highlighted on the globe surface.
  if (window.THREE) {
    const canvas = $('#scene');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, .1, 100);
    camera.position.set(0, 0, 7.5);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const group = new THREE.Group(); scene.add(group);
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(2.35, 48, 36), new THREE.MeshBasicMaterial({color:0x15191d, wireframe:true, transparent:true, opacity:.17}));
    group.add(sphere);
    const core = new THREE.Mesh(new THREE.SphereGeometry(2.29, 48, 36), new THREE.MeshBasicMaterial({color:0x050607, transparent:true, opacity:.82}));
    group.add(core);

    // Equirectangular India texture: a stylised, recognizable outline, mapped directly to the globe.
    const mapCanvas = document.createElement('canvas'); mapCanvas.width = 2048; mapCanvas.height = 1024;
    const ctx = mapCanvas.getContext('2d');
    const india = [[68,23],[70,20],[72,20],[73,17],[74,14],[75,11],[77,8],[79,10],[80,13],[82,15],[84,18],[86,20],[88,22],[91,22],[94,26],[92,29],[88,28],[85,30],[82,30],[79,33],[76,34],[73,31],[71,27],[68,23]];
    const px = lon => (lon + 180) / 360 * mapCanvas.width;
    const py = lat => (90 - lat) / 180 * mapCanvas.height;
    ctx.beginPath();
    india.forEach(([lon,lat],i) => i ? ctx.lineTo(px(lon),py(lat)) : ctx.moveTo(px(lon),py(lat)));
    ctx.closePath();
    ctx.fillStyle = 'rgba(238,196,83,.78)'; ctx.shadowColor = 'rgba(238,196,83,.9)'; ctx.shadowBlur = 28; ctx.fill();
    ctx.shadowBlur = 0; ctx.strokeStyle = 'rgba(255,239,177,1)'; ctx.lineWidth = 6; ctx.stroke();
    ctx.font = '700 42px Inter'; ctx.fillStyle = 'rgba(255,242,188,.9)'; ctx.fillText('INDIA', px(77), py(22));
    const indiaTexture = new THREE.CanvasTexture(mapCanvas); indiaTexture.colorSpace = THREE.SRGBColorSpace;
    const indiaLayer = new THREE.Mesh(new THREE.SphereGeometry(2.365, 48, 36), new THREE.MeshBasicMaterial({map:indiaTexture, transparent:true, opacity:.9, depthWrite:false}));
    group.add(indiaLayer);

    const count=6500, positions=new Float32Array(count*3), colors=new Float32Array(count*3);
    const gold=new THREE.Color(0xd7a52c), steel=new THREE.Color(0x64798c);
    for(let i=0;i<count;i++){
      const u=Math.random(),v=Math.random(),theta=2*Math.PI*u,phi=Math.acos(2*v-1),r=2.35*(1.01+Math.random()*.055);
      positions[i*3]=r*Math.sin(phi)*Math.cos(theta); positions[i*3+1]=r*Math.cos(phi); positions[i*3+2]=r*Math.sin(phi)*Math.sin(theta);
      const c=gold.clone().lerp(steel,Math.random()*.8); colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
    }
    const pg=new THREE.BufferGeometry(); pg.setAttribute('position',new THREE.BufferAttribute(positions,3)); pg.setAttribute('color',new THREE.BufferAttribute(colors,3));
    const points=new THREE.Points(pg,new THREE.PointsMaterial({size:.018,vertexColors:true,transparent:true,opacity:.62,blending:THREE.AdditiveBlending})); group.add(points);
    const orbitA=new THREE.Mesh(new THREE.TorusGeometry(2.9,.006,8,220),new THREE.MeshBasicMaterial({color:0xd7a52c,transparent:true,opacity:.28})); orbitA.rotation.set(.8,.2,.3); group.add(orbitA);
    const orbitB=new THREE.Mesh(new THREE.TorusGeometry(3.2,.004,8,220),new THREE.MeshBasicMaterial({color:0x7d8c9b,transparent:true,opacity:.18})); orbitB.rotation.set(-.4,.9,.2); group.add(orbitB);
    const nodeGeo=new THREE.SphereGeometry(.055,12,8), nodeMat=new THREE.MeshBasicMaterial({color:0xf3d36f});
    const node1=new THREE.Mesh(nodeGeo,nodeMat); node1.position.set(-1.65,.65,1.55); group.add(node1);
    const node2=new THREE.Mesh(nodeGeo,nodeMat); node2.position.set(1.6,-.45,1.5); group.add(node2);
    const lineCurve=new THREE.QuadraticBezierCurve3(node1.position.clone(),new THREE.Vector3(0,1.4,2.8),node2.position.clone());
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(lineCurve.getPoints(80)),new THREE.LineBasicMaterial({color:0xd7a52c,transparent:true,opacity:.45})));

    let rx=0,ry=0,drag=false,lx=0,ly=0;
    canvas.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;ly=e.clientY;canvas.setPointerCapture?.(e.pointerId)});
    window.addEventListener('pointerup',()=>drag=false);
    window.addEventListener('pointermove',e=>{if(drag){ry+=(e.clientX-lx)*.004;rx+=(e.clientY-ly)*.003;lx=e.clientX;ly=e.clientY;}});
    function animate(t){requestAnimationFrame(animate);if(!drag)ry+=.00045;group.rotation.y+=(ry-group.rotation.y)*.035;group.rotation.x+=(rx-group.rotation.x)*.035;points.rotation.y+=.0003;const pulse=1+Math.sin(t*.004)*.13;node1.scale.setScalar(pulse);node2.scale.setScalar(1+Math.sin(t*.004+1.4)*.13);renderer.render(scene,camera)}
    requestAnimationFrame(animate);
    window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2))});
    window.addEventListener('scroll',()=>{const y=window.scrollY;group.position.y=Math.min(.55,y*.00035);group.scale.setScalar(Math.max(.72,1-y*.00013))},{passive:true});
  }

  function initReveal(){
    if(!window.gsap) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach((el,i)=>gsap.fromTo(el,{y:35,opacity:0},{y:0,opacity:1,duration:.9,delay:Math.min(i*.025,.25),ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
  }
})();
