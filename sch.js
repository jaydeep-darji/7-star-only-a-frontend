document.addEventListener("DOMContentLoaded", function() {
    initializeSchedule();
    xmppConnection.connect();

    document.querySelector(".close-sch").addEventListener("click", function() {
        document.getElementById("bookingModal").style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === document.getElementById("bookingModal")) {
            document.getElementById("bookingModal").style.display = "none";
        }
    });

    document.getElementById("bookingForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const team = document.getElementById("teamSelect").value;
        if (!team) {
            alert("Please select a team");
            return;
        }
        const day = parseInt(this.dataset.day);
        const timeSlot = parseInt(this.dataset.timeSlot);
        xmppConnection.sendBookingRequest({
            day: day,
            timeSlot: timeSlot,
            team: document.getElementById("teamSelect").options[document.getElementById("teamSelect").selectedIndex].text
        });
        document.getElementById("bookingModal").style.display = "none";
    });

    document.getElementById("prevWeek").addEventListener("click", function() {
        initializeSchedule();
        showToast("Previous week loaded");
    });
    
    document.getElementById("nextWeek").addEventListener("click", function() {
        initializeSchedule();
        showToast("Next week loaded");
    });

    document.getElementById("applyFilters").addEventListener("click", function() {
        initializeSchedule();
        showToast("Filters applied");
    });
});

const xmppConnection = {
    connected: false,
    connect: function() {
        setTimeout(() => {
            this.connected = true;
            this.subscribeToUpdates();
        }, 1000);
    },
    subscribeToUpdates: function() {
        setInterval(() => {
            if (Math.random() > 0.7) {
                const randomDay = Math.floor(Math.random() * 7);
                const randomTime = Math.floor(Math.random() * 12);
                const randomStatus = Math.random() > 0.5 ? 'booked' : 'available';
                this.onUpdate({ day: randomDay, timeSlot: randomTime, status: randomStatus });
            }
        }, 10000);
    },
    onUpdate: function(data) {
        const slot = document.getElementById(`slot-${data.day}-${data.timeSlot}`);
        if (slot) {
            slot.classList.remove('available', 'booked', 'pending');
            slot.classList.add(data.status);
            slot.textContent = data.status === 'booked' ? 'Booked' : 'Available';
            showToast(`Slot ${data.day + 1}/${data.timeSlot + 8}:00 is now ${data.status}`);
        }
    },
    sendBookingRequest: function(bookingData) {
        setTimeout(() => {
            if (Math.random() < 0.9) {
                const slot = document.getElementById(`slot-${bookingData.day}-${bookingData.timeSlot}`);
                if (slot) {
                    slot.classList.remove('available', 'booked', 'pending');
                    slot.classList.add('booked');
                    slot.textContent = bookingData.team;
                    showToast("Booking confirmed successfully!");
                }
            } else {
                showToast("Booking failed. Please try again.");
            }
        }, 1500);
    }
};

function initializeSchedule() {
    const timeSlots = document.getElementById('timeSlots');
    const daySlots = document.getElementById('daySlots');
    timeSlots.innerHTML = '';
    daySlots.innerHTML = '';
    for (let i = 8; i <= 20; i++) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = `${i}:00`;
        timeSlots.appendChild(timeSlot);
        for (let j = 0; j < 7; j++) {
            const slot = document.createElement('div');
            slot.className = 'slot available';
            slot.id = `slot-${j}-${i-8}`;
            slot.textContent = 'Available';
            slot.addEventListener('click', () => openBookingModal(j, i));
            daySlots.appendChild(slot);
        }
    }
}

function openBookingModal(day, time) {
    const modal = document.getElementById('bookingModal');
    const slotDate = document.getElementById('slotDate');
    const slotTime = document.getElementById('slotTime');
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const bookingDate = new Date(startOfWeek.setDate(startOfWeek.getDate() + day));
    slotDate.value = bookingDate.toDateString();
    slotTime.value = `${time}:00 - ${time+1}:00`;
    document.getElementById('bookingForm').dataset.day = day;
    document.getElementById('bookingForm').dataset.timeSlot = time - 8;
    modal.style.display = 'block';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
