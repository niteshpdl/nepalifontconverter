document.addEventListener('DOMContentLoaded', function() {
    const translateBtn = document.getElementById('translate-btn');
    const translationInput = document.getElementById('translation-input');
    const translationOutput = document.getElementById('translation-output');
    const loadingIndicator = document.getElementById('translation-loading');
    
    const directionButtons = document.querySelectorAll('.direction-btn');
    let currentDirection = 'en-ne'; // Default: English to Nepali
    
    // Update direction based on user selection
    directionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            directionButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update direction
            currentDirection = this.getAttribute('data-direction');
            
            // Update labels
            const inputLabel = document.getElementById('input-language-label');
            const outputLabel = document.getElementById('output-language-label');
            
            if (currentDirection === 'en-ne') {
                inputLabel.textContent = 'English Text:';
                outputLabel.textContent = 'Nepali Translation:';
                translationInput.placeholder = 'Enter text to translate...';
            } else {
                inputLabel.textContent = 'Nepali Text:';
                outputLabel.textContent = 'English Translation:';
                translationInput.placeholder = 'नेपालीमा लेख्नुहोस्...';
            }
            
            // Clear fields
            translationInput.value = '';
            translationOutput.value = '';
            document.getElementById('translation-word-count').textContent = '0';
        });
    });
    
    // Translation function
    if (translateBtn && translationInput && translationOutput) {
        translateBtn.addEventListener('click', async function() {
            const text = translationInput.value.trim();
            
            if (!text) {
                showNotification('Please enter text to translate', 'error');
                return;
            }
            
            // Show loading indicator
            if (loadingIndicator) loadingIndicator.style.display = 'flex';
            
            try {
                const translation = await translateText(text, currentDirection);
                translationOutput.value = translation;
                
                // Update word count
                const wordCount = translation.split(/\s+/).filter(Boolean).length;
                document.getElementById('translation-word-count').textContent = wordCount;
                
                showNotification('Translation completed');
            } catch (error) {
                console.error('Translation error:', error);
                translationOutput.value = 'Translation service temporarily unavailable. Please try again later.';
                showNotification('Translation failed', 'error');
            } finally {
                // Hide loading indicator
                if (loadingIndicator) loadingIndicator.style.display = 'none';
            }
        });
    }
    
    // Copy translation
    const copyTranslationBtn = document.getElementById('copy-translation-btn');
    if (copyTranslationBtn && translationOutput) {
        copyTranslationBtn.addEventListener('click', function() {
            if (!translationOutput.value.trim()) {
                showNotification('No content to copy', 'error');
                return;
            }
            
            translationOutput.select();
            document.execCommand('copy');
            showNotification('Copied to clipboard');
        });
    }
    
    // Clear translation
    const clearTranslationBtn = document.getElementById('clear-translation-btn');
    if (clearTranslationBtn && translationInput && translationOutput) {
        clearTranslationBtn.addEventListener('click', function() {
            translationInput.value = '';
            translationOutput.value = '';
            document.getElementById('translation-word-count').textContent = '0';
            showNotification('Content cleared');
        });
    }
    
    // Listen to input for word count update
    if (translationInput) {
        translationInput.addEventListener('input', function() {
            const wordCount = this.value.trim().split(/\s+/).filter(Boolean).length;
            document.getElementById('translation-word-count').textContent = wordCount;
        });
    }
    
    // Translation API function
    async function translateText(text, direction) {
        // Using LibreTranslate API (free and public)
        const apiUrl = 'https://libretranslate.com/translate';
        
        const sourceLang = direction === 'ne-en' ? 'ne' : 'en';
        const targetLang = direction === 'ne-en' ? 'en' : 'ne';
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: text,
                    source: sourceLang,
                    target: targetLang
                })
            });
            
            if (!response.ok) {
                // If primary API fails, use a fallback solution
                return fallbackTranslation(text, direction);
            }
            
            const data = await response.json();
            return data.translatedText;
        } catch (error) {
            // API call failed, use fallback
            console.error('Primary API failed:', error);
            return fallbackTranslation(text, direction);
        }
    }
    
    // Fallback translation (simplified simulation for demo)
    function fallbackTranslation(text, direction) {
        // This is just a demo fallback - in production you would integrate with another API
        const demoTranslations = {
            'en-ne': {
                'hello': 'नमस्ते',
                'good morning': 'शुभ प्रभात',
                'thank you': 'धन्यवाद',
                'welcome': 'स्वागत छ',
                'how are you': 'तपाईं कस्तो हुनुहुन्छ'
            },
            'ne-en': {
                'नमस्ते': 'hello',
                'शुभ प्रभात': 'good morning',
                'धन्यवाद': 'thank you',
                'स्वागत छ': 'welcome',
                'तपाईं कस्तो हुनुहुन्छ': 'how are you'
            }
        };
        
        // Check if we have an exact match in our demo translations
        if (demoTranslations[direction][text.toLowerCase()]) {
            return demoTranslations[direction][text.toLowerCase()];
        }
        
        // If no match, return a message explaining the situation
        return `[Translation API unavailable - This is a simulated response for: "${text}"]`;
    }
    
    // Function to show notifications
    function showNotification(message, type = 'success') {
        const notificationContainer = document.getElementById('notification-container');
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        
        const text = document.createElement('span');
        text.textContent = message;
        
        notification.appendChild(icon);
        notification.appendChild(text);
        
        notificationContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});