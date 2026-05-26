const availabilityStatus = "available";
// available = Tillgänglig för nya uppdrag
// limited = Begränsad tillgänglighet
// busy = Fullbokad just nu


const statusMap = {
    available: {
        text: "Tillgänglig för nya uppdrag",
        className: "status-available"
    },

    limited: {
        text: "Begränsad tillgänglighet",
        className: "status-limited"
    },

    busy: {
        text: "Fullbokad just nu",
        className: "status-busy"
    }
};


document.addEventListener("DOMContentLoaded", () => {
    const statusElement = document.querySelectorAll(".availability-status");

    statusElement.forEach(el => {
        const current = statusMap[availabilityStatus];

        el.innerHTML = `
            <span class="status-dot ${current.className}"></span>
            ${current.text}
        `;
    });
});