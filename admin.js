// Admin Dashboard Logic
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

function loadData() {
    const admissions = JSON.parse(localStorage.getItem('oddbudAdmissions') || '[]');
    const tbody = document.getElementById('admissionsTableBody');
    const emptyState = document.getElementById('emptyState');
    
    // Stats elements
    const statStudents = document.getElementById('statStudents');
    const statRevenue = document.getElementById('statRevenue');
    const statRecent = document.getElementById('statRecent');

    tbody.innerHTML = '';
    
    if (admissions.length === 0) {
        emptyState.style.display = 'block';
        statStudents.innerText = '0';
        statRevenue.innerText = '₹0';
        statRecent.innerText = '0';
        return;
    }

    emptyState.style.display = 'none';
    
    let totalRev = 0;

    // Populate Table (Reverse to show newest first)
    [...admissions].reverse().forEach(record => {
        totalRev += record.amount;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${record.id}</strong></td>
            <td>${record.date}</td>
            <td>${record.childName}</td>
            <td>${record.program}</td>
            <td>${record.contact}</td>
            <td><strong>₹${record.amount.toLocaleString('en-IN')}</strong></td>
            <td><span class="status status-paid">${record.paymentStatus}</span></td>
        `;
        tbody.appendChild(tr);
    });

    // Update Stats
    statStudents.innerText = admissions.length;
    statRevenue.innerText = '₹' + totalRev.toLocaleString('en-IN');
    statRecent.innerText = admissions.length; // Simply all of them as 'recent' for this mock
}

function clearData() {
    if(confirm("Are you sure you want to delete all admission records? This cannot be undone.")) {
        localStorage.removeItem('oddbudAdmissions');
        loadData();
    }
}
