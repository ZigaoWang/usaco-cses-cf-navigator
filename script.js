function navigateToQuestion() {
    const input = document.getElementById('questionId');
    const questionId = input.value.trim();
    
    // Basic validation
    if (!questionId) {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 820);
        return;
    }
    
    // Ensure it's a positive number
    const id = parseInt(questionId);
    if (isNaN(id) || id <= 0) {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 820);
        return;
    }
    
    const url = `https://usaco.org/index.php?page=viewproblem2&cpid=${id}`;
    window.location.href = url;
}

// Focus input on page load
window.onload = () => {
    const input = document.getElementById('questionId');
    input.focus();
};

// Handle Enter key and remove error class on input
document.getElementById('questionId').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        navigateToQuestion();
    }
    this.classList.remove('error');
});
