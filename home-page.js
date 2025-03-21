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
        alert("Please enter your feelings.");
    } else {
        alert("Feelings have been entered:\n" + JSON.stringify(moodValues, null, 2));
    }
}