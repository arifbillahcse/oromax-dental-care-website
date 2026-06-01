/* ============================================================
   appointment.js
   Collects the appointment form fields (name, phone, date, message)
   and opens WhatsApp with a pre-filled message to the clinic so the
   booking arrives as a WhatsApp notification.
   ============================================================ */
(function () {
  "use strict";

  // Clinic WhatsApp number (international format, no + or spaces)
  var CLINIC_WHATSAPP = "8801797539117";

  function init() {
    var form = document.getElementById("appointment-form");
    if (!form) return;

    // Prevent past dates from being selected.
    var dateInput = form.querySelector("#appt-date");
    if (dateInput) {
      var today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements["name"].value.trim();
      var phone = form.elements["phone"].value.trim();
      var date = form.elements["date"].value.trim();
      var message = form.elements["message"].value.trim();

      if (!name || !phone || !date) {
        showStatus("অনুগ্রহ করে আপনার নাম, ফোন ও পছন্দের তারিখ পূরণ করুন।", true);
        return;
      }

      var lines = [
        "*নতুন অ্যাপয়েন্টমেন্ট অনুরোধ — ওরো ম্যাক্স ডেন্টাল কেয়ার*",
        "",
        "👤 নাম: " + name,
        "📞 ফোন: " + phone,
        "📅 পছন্দের তারিখ: " + formatDate(date),
      ];
      if (message) lines.push("📝 বার্তা: " + message);

      var text = encodeURIComponent(lines.join("\n"));
      var url = "https://wa.me/" + CLINIC_WHATSAPP + "?text=" + text;

      showStatus("অ্যাপয়েন্টমেন্ট নিশ্চিত করতে হোয়াটসঅ্যাপ খোলা হচ্ছে…", false);
      window.open(url, "_blank", "noopener");
      form.reset();
    });
  }

  function formatDate(value) {
    var d = new Date(value + "T00:00:00");
    if (isNaN(d)) return value;
    return d.toLocaleDateString("bn-BD", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function showStatus(msg, isError) {
    var el = document.getElementById("form-status");
    if (!el) return;
    el.textContent = msg;
    el.style.color = isError ? "#d9534f" : "#0f6e7a";
  }

  // The form lives in static page markup (not a partial), so DOM-ready is enough.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
