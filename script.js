// Münreader Four-Container Ritual System
class MunPortal {
    constructor() {
        this.init();
    }

    init() {
        // Get containers
        this.noiseScreen = document.getElementById('noise-screen');
        this.threshold = document.getElementById('threshold');
        this.readingScreen = document.getElementById('reading-screen');
        this.afterglow = document.getElementById('afterglow');
        this.neutralInterface = document.getElementById('neutralInterface');
        
        // Get buttons
        this.startButton = document.getElementById('startRitual');
        this.requestAccessButton = document.getElementById('requestAccess');
        
        // Event listeners
        this.startButton.addEventListener('click', () => this.beginRitual());
        this.requestAccessButton.addEventListener('click', () => this.showDataGateForm());
        
        // Initialize all containers as hidden
        this.hideAllContainers();
    }

    hideAllContainers() {
        this.noiseScreen.classList.add('hidden');
        this.threshold.classList.add('hidden');
        this.readingScreen.classList.add('hidden');
        this.afterglow.classList.add('hidden');
    }

    showContainer(container) {
        container.classList.remove('hidden');
    }

    hideContainer(container) {
        container.classList.add('hidden');
    }

    beginRitual() {
        // Hide neutral interface
        this.neutralInterface.classList.add('hidden');
        
        // 1.5s noise screen
        this.showContainer(this.noiseScreen);
        
        setTimeout(() => {
            // 3s threshold
            this.hideContainer(this.noiseScreen);
            this.showContainer(this.threshold);
            
            setTimeout(() => {
                // 4s reading screen
                this.hideContainer(this.threshold);
                this.showContainer(this.readingScreen);
                
                setTimeout(() => {
                    // 1.5s afterglow
                    this.hideContainer(this.readingScreen);
                    this.showContainer(this.afterglow);
                    
                    setTimeout(() => {
                        // Return to neutral
                        this.hideContainer(this.afterglow);
                        this.neutralInterface.classList.remove('hidden');
                    }, 1500);
                }, 4000);
            }, 3000);
        }, 1500);
    }

    showDataGateForm() {
        const dataGateForm = document.getElementById('dataGateForm');
        dataGateForm.classList.remove('hidden');
        
        // Smooth scroll to form
        dataGateForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Data-Gate Form Functions
function nextGate(currentGate) {
    // Hide current gate
    document.getElementById(`gate${currentGate}`).classList.add('hidden');
    
    // Show next gate
    document.getElementById(`gate${currentGate + 1}`).classList.remove('hidden');
}

function submitForm() {
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        location: document.getElementById('location').value,
        email: document.getElementById('email1').value,
        intent: document.querySelector('input[name="intent"]:checked')?.value,
        otherText: document.getElementById('otherText').value,
        value: document.querySelector('input[name="value"]:checked')?.value,
        ritual: document.querySelector('input[name="ritual"]:checked')?.value,
        timeline: document.querySelector('input[name="timeline"]:checked')?.value
    };
    
    // Validate required fields
    if (!formData.name || !formData.location || !formData.email) {
        alert('Please complete all required fields in Step 1.');
        return;
    }
    
    if (formData.email !== document.getElementById('email2').value) {
        alert('Email addresses do not match. Please confirm your email.');
        return;
    }
    
    // In production, send to backend service
    console.log('Form submitted:', formData);
    alert('Thank you for stepping into the ledger. Your request for access has been received. We will be in touch if the resonance aligns.');
    
    // Hide form
    document.getElementById('dataGateForm').classList.add('hidden');
    
    // Reset form
    document.querySelectorAll('.gate').forEach(gate => gate.classList.add('hidden'));
    document.getElementById('gate1').classList.remove('hidden');
    document.querySelectorAll('input').forEach(input => input.value = '');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const munPortal = new MunPortal();
    
    // Handle "Other" option in intent field
    const otherRadio = document.querySelector('input[name="intent"][value="other"]');
    const otherTextGroup = document.getElementById('otherTextGroup');
    
    if (otherRadio && otherTextGroup) {
        otherRadio.addEventListener('change', function() {
            if (this.checked) {
                otherTextGroup.style.display = 'block';
            } else {
                otherTextGroup.style.display = 'none';
            }
        });
    }
});
