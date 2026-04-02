// أسماء الصور المطلوبة
const imageKeys = [
    "img_subject",
    "img_objectives",
    "img_previous",
    "img_solution",
    "img_content",
    "img_guidance",
    "img_summary",
    "img_homework",
    "img_footer"
];

// فحص هل الإعداد الأول مكتمل
window.onload = function() {
    if (!localStorage.getItem("setupDone")) {
        showFirstSetup();
    } else {
        document.getElementById("weekSetup").classList.remove("hidden");
    }
};

// عرض شاشة الإعداد لأول مرة
function showFirstSetup() {
    let container = document.getElementById("setupImages");
    imageKeys.forEach(key => {
        let div = document.createElement("div");
        div.innerHTML = `
            <label>${key}</label>
            <input type="file" accept="image/*" onchange="saveImage('${key}', event)">
        `;
        container.appendChild(div);
    });
    document.getElementById("firstSetup").classList.remove("hidden");
}

// حفظ الصورة
function saveImage(key, event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function() {
        localStorage.setItem(key, reader.result);
    };
    reader.readAsDataURL(file);
}

// إنهاء الإعداد
function finishSetup() {
    localStorage.setItem("setupDone", "yes");
    document.getElementById("firstSetup").classList.add("hidden");
    document.getElementById("weekSetup").classList.remove("hidden");
}

// تحليل الأسبوع
function analyze() {
    let week = document.getElementById("week").value;
    let title = document.getElementById("title").value;

    let arabicWeeks = ["","الأول","الثاني","الثالث","الرابع","الخامس","السادس","السابع","الثامن","التاسع","العاشر"];
    let weekTitle = "الأسبوع " + arabicWeeks[week];

    // منشورات جاهزة
    window.posts = [
        {img:"img_subject", text:" "},
        {img:"img_subject", text:`🌟 *أهلاً بكم في حصة ${weekTitle}*\n📘 *العنوان:* ${title}`},
        {img:"img_subject", text:"(هنا سيتم إرفاق PDF لاحقاً)"},
        {img:"img_objectives", text:"🎯 أهداف الدرس:\n- سيتم استخراجه لاحقاً"},
        {img:"img_previous", text:"🧠 ما تعلمناه سابقًا:\n- سيتم توليده قريباً"},
        {img:"img_solution", text:"✅ حل النشاط البيتي:\n- سيتم توليده لاحقًا"},
        {img:"img_content", text:"📚 المحتوى العلمي:\n- سيتم استخراجه لاحقاً"},
        {img:"img_guidance", text:"📖 توجيه للطلبة:\nاقرأ البطاقة بتمعن ✏️"},
        {img:"img_summary", text:"📝 ما تعلمناه في هذه الحصة:\n- سيتم تلخيصه"},
        {img:"img_homework", text:"✏️ نشاط بيتي:\n- سيتم استخراجه"},
        {img:"img_footer", text:`🌟 نهاية حصة ${weekTitle}`},
        {img:"img_footer", text:"(PDF مُجاب هنا)"}
    ];

    renderPosts();
}

// عرض المنشورات
let current = 0;

function renderPosts() {
    let container = document.getElementById("carouselContainer");
    container.innerHTML = "";

    window.posts.forEach((p, index) => {
        let div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
            ${localStorage.getItem(p.img)}
            <pre class="post-text">${p.text}</pre>
            <button onclick="copyText(\`${p.text}\`)">نسخ</button>
            <button onclick="sendWhatsApp(\`${p.text}\`)">واتساب</button>
        `;
        container.appendChild(div);
    });

    document.getElementById("postsSection").classList.remove("hidden");
    updateCarousel();
}

function updateCarousel() {
    let posts = document.querySelectorAll(".post");
    posts.forEach((p, i) => {
        p.style.display = i === current ? "block" : "none";
    });
}

function nextPost() {
    if (current < posts.length - 1) current++;
    updateCarousel();
}

function prevPost() {
    if (current > 0) current--;
    updateCarousel();
}

function copyText(t) {
    navigator.clipboard.writeText(t);
    alert("تم النسخ ✅");
}

function sendWhatsApp(t) {
    window.open(`https://wa.me/?text=${encodeURIComponent(t)}`);
}
