function getSelectedValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : null;
}

function feelings() {
    const moods = ["happy", "sad", "tired", "energy", "stress", "anger"]; 
    const moodValues = {};

    moods.forEach(mood => {
        moodValues[mood] = getSelectedValue(mood);
    });

    const allZero = Object.values(moodValues).every(value => value === "0" || value === null);

    if (allZero) {
        const modal = document.getElementById("modal");
        const closeButton = document.getElementById("closeModal");
        
        modal.classList.add("open");

        closeButton.addEventListener("click", () => {
            modal.classList.remove("open");
        });
    } else {
        fetch("/feelings", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(moodValues)
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById("result").innerText = data;
        })

    }
}