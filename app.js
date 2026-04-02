function analyze() {

    let week = document.getElementById("week").value;
    let title = document.getElementById("title").value;

    if (!week || !title) {
        alert("يرجى إدخال جميع البيانات");
        return;
    }

    // تحويل رقم الأسبوع إلى صيغة لغوية
    let weeksArabic = ["", "الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر"];
    let weekName = "الأسبوع " + weeksArabic[week];

    // القوالب الجاهزة للنشر
    let posts = [
        {title: "صورة المادة + اسم المعلم", text: " "},
        {title: "المقدمة", text: `🌟 *أعزائي الطلبة*\nنرحب بكم في *حصة ${weekName}*\n📚 *عنوان الدرس:* ${title}`},
        {title: "البطاقة PDF", text: " "},
        {title: "أهداف الدرس", text: `🎯 *أهداف الدرس:*\n- سيتم استخراجها لاحقًا`},
        {title: "ما تعلمناه سابقًا", text: "🧠 *ما تعلمناه في الحصة السابقة:*\n- سيتم استخراجه لاحقًا"},
        {title: "حل النشاط البيتي", text: "✅ *حل النشاط البيتي:*\n- سيتم توليده لاحقًا"},
        {title: "المحتوى العلمي", text: "📚 *المحتوى العلمي:*\n- سيتم استخراجه لاحقًا"},
        {title: "توجيه للطلبة", text: "📖 *توجيه للطلبة:*\nيرجى قراءة البطاقة بتمعن ومحاولة حل الأسئلة ✏️"},
        {title: "ما تعلمناه في هذه الحصة", text: "📝 *ما تعلمناه في هذه الحصة:*\n- سيتم تلخيصه لاحقًا"},
        {title: "نشاط بيتي", text: "✏️ *نشاط بيتي:*\n- سيتم استخراجه لاحقًا"},
        {title: "الخاتمة", text: `🌟 *أعزائي الطلبة*\nوصلنا إلى نهاية *حصة ${weekName}*`},
        {title: "البطاقة المجابة PDF", text: " "}
    ];

    generatePosts(posts);
}

function generatePosts(posts) {
    let container = document.getElementById("postsContainer");
    container.innerHTML = "";

    posts.forEach(p => {
        let div = document.createElement("div");
        div.className = "post-card";

        div.innerHTML = `
            <h3 class="post-title">${p.title}</h3>
            <pre>${p.text}</pre>
            <button class="copy-btn" onclick="copyText(\`${p.text}\`)">نسخ</button>
            <button class="whatsapp-btn" onclick="sendWhatsApp(\`${p.text}\`)">إرسال واتساب</button>
        `;
        container.appendChild(div);
    });

    document.getElementById("postsSection").classList.remove("hidden");
}

function copyText(text) {
    navigator.clipboard.writeText(text);
    alert("تم النسخ ✅");
}

function sendWhatsApp(text) {
    let url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
}
