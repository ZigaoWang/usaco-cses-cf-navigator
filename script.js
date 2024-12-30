let currentPlatform = 'usaco';

// Platform button click handlers
document.querySelectorAll('.platform-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPlatform = btn.dataset.platform;
        updateInputVisibility();
        updateHintVisibility();
        focusRelevantInput();
    });
});

function updateHintVisibility() {
    document.querySelectorAll('.hint').forEach(hint => hint.style.display = 'none');
    document.getElementById(`${currentPlatform}Hint`).style.display = 'block';
}

function updateInputVisibility() {
    const cfInputs = document.querySelector('.cf-inputs');
    const mainInput = document.getElementById('questionId');
    
    if (currentPlatform === 'cf') {
        cfInputs.style.display = 'flex';
        mainInput.style.display = 'none';
    } else {
        cfInputs.style.display = 'none';
        mainInput.style.display = 'block';
    }
}

function focusRelevantInput() {
    if (currentPlatform === 'cf') {
        document.getElementById('contestId').focus();
    } else {
        document.getElementById('questionId').focus();
    }
}

function showError(element) {
    element.classList.add('error');
    setTimeout(() => element.classList.remove('error'), 820);
}

function navigateToQuestion() {
    if (currentPlatform === 'cf') {
        const contestId = document.getElementById('contestId').value.trim();
        const problemLetter = document.getElementById('problemLetter').value.trim().toUpperCase();
        
        if (!contestId || !problemLetter) {
            if (!contestId) showError(document.getElementById('contestId'));
            if (!problemLetter) showError(document.getElementById('problemLetter'));
            return;
        }
        
        if (!/^[A-Z]$/.test(problemLetter)) {
            showError(document.getElementById('problemLetter'));
            return;
        }
        
        window.location.href = `https://codeforces.com/contest/${contestId}/problem/${problemLetter}`;
        return;
    }
    
    const input = document.getElementById('questionId');
    const questionId = input.value.trim();
    
    if (!questionId) {
        showError(input);
        return;
    }
    
    const id = parseInt(questionId);
    if (isNaN(id) || id <= 0) {
        showError(input);
        return;
    }
    
    const urls = {
        usaco: `https://usaco.org/index.php?page=viewproblem2&cpid=${id}`,
        cses: `https://cses.fi/problemset/task/${id}/`
    };
    
    window.location.href = urls[currentPlatform];
}

// Focus input on page load
window.onload = () => {
    focusRelevantInput();
};

// Handle Enter key for all inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            if (currentPlatform === 'cf' && this.id === 'contestId') {
                document.getElementById('problemLetter').focus();
            } else {
                navigateToQuestion();
            }
        }
        this.classList.remove('error');
    });
});
