/**
 * Nepali Font Converter - Text Conversion Functions
 * Handles Preeti to Unicode conversion, Unicode to Preeti conversion,
 * and Devanagari to Roman transliteration
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======== PREETI-UNICODE CONVERSION ========
    
    // Elements
    const preetiInput = document.getElementById('preeti-input');
    const unicodeOutput = document.getElementById('unicode-output');
    const preetiToUnicodeBtn = document.getElementById('preeti-to-unicode-btn');
    const unicodeToPreetiBtn = document.getElementById('unicode-to-preeti-btn');
    
    // Preeti to Unicode conversion button handler
    if (preetiToUnicodeBtn && preetiInput && unicodeOutput) {
        preetiToUnicodeBtn.addEventListener('click', function() {
            const text = preetiInput.value.trim();
            
            if (!text) {
                showNotification('Please enter some Preeti text', 'error');
                return;
            }
            
            try {
                const unicode = convertPreetiToUnicode(text);
                unicodeOutput.value = unicode;
                
                // Update word count
                const wordCount = unicode.trim().split(/\s+/).filter(Boolean).length;
                const preetiWordCount = document.getElementById('preeti-word-count');
                if (preetiWordCount) {
                    preetiWordCount.textContent = wordCount;
                }
                
                showNotification('Text converted to Unicode successfully');
            } catch (error) {
                console.error('Conversion error:', error);
                unicodeOutput.value = 'Error: Could not convert text. Please check your input.';
                showNotification('Conversion failed', 'error');
            }
        });
    }
    
    // Unicode to Preeti conversion button handler
    if (unicodeToPreetiBtn && unicodeOutput && preetiInput) {
        unicodeToPreetiBtn.addEventListener('click', function() {
            const text = unicodeOutput.value.trim();
            
            if (!text) {
                showNotification('Please enter some Unicode text', 'error');
                return;
            }
            
            try {
                const preeti = convertUnicodeToPreeti(text);
                preetiInput.value = preeti;
                
                // Update word count
                const wordCount = preeti.trim().split(/\s+/).filter(Boolean).length;
                const preetiWordCount = document.getElementById('preeti-word-count');
                if (preetiWordCount) {
                    preetiWordCount.textContent = wordCount;
                }
                
                showNotification('Text converted to Preeti successfully');
            } catch (error) {
                console.error('Conversion error:', error);
                preetiInput.value = 'Error: Could not convert text. Please check your input.';
                showNotification('Conversion failed', 'error');
            }
        });
    }
    
    // Copy Preeti-Unicode buttons
    const copyUnicodeBtn = document.getElementById('copy-unicode-btn');
    if (copyUnicodeBtn && unicodeOutput) {
        copyUnicodeBtn.addEventListener('click', function() {
            if (!unicodeOutput.value.trim()) {
                showNotification('No content to copy', 'error');
                return;
            }
            
            unicodeOutput.select();
            document.execCommand('copy');
            showNotification('Copied to clipboard');
        });
    }
    
    // Clear Preeti-Unicode buttons
    const clearPreetiBtn = document.getElementById('clear-preeti-btn');
    if (clearPreetiBtn && preetiInput && unicodeOutput) {
        clearPreetiBtn.addEventListener('click', function() {
            preetiInput.value = '';
            unicodeOutput.value = '';
            const preetiWordCount = document.getElementById('preeti-word-count');
            if (preetiWordCount) {
                preetiWordCount.textContent = '0';
            }
            showNotification('Content cleared');
        });
    }
    
    // ======== ROMANIZE FUNCTIONALITY ========
    
    const romanizeBtn = document.getElementById('romanize-btn');
    const devanagariInput = document.getElementById('devanagari-input');
    const romanOutput = document.getElementById('roman-output');
    
    if (romanizeBtn && devanagariInput && romanOutput) {
        romanizeBtn.addEventListener('click', function() {
            const text = devanagariInput.value.trim();
            
            if (!text) {
                showNotification('Please enter some Devanagari text', 'error');
                return;
            }
            
            try {
                // Use the ITRANS scheme instead of HK which might be causing issues
                const romanized = Sanscript.t(text, 'devanagari', 'itrans');
                romanOutput.textContent = romanized;
                
                // Update word count
                const wordCount = romanized.trim().split(/\s+/).filter(Boolean).length;
                const romanWordCount = document.getElementById('roman-word-count');
                if (romanWordCount) {
                    romanWordCount.textContent = wordCount;
                }
                
                showNotification('Text romanized successfully');
            } catch (error) {
                console.error('Romanization error:', error);
                romanOutput.textContent = 'Error: Could not romanize text. Check your input.';
                showNotification('Romanization failed', 'error');
            }
        });
    }
    
    // Copy romanized text
    const copyRomanBtn = document.getElementById('copy-roman-btn');
    if (copyRomanBtn && romanOutput) {
        copyRomanBtn.addEventListener('click', function() {
            if (!romanOutput.textContent.trim()) {
                showNotification('No content to copy', 'error');
                return;
            }
            
            // Create a temporary textarea to copy from
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = romanOutput.textContent;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextarea);
            
            showNotification('Copied to clipboard');
        });
    }
    
    // Clear romanized text
    const clearRomanBtn = document.getElementById('clear-roman-btn');
    if (clearRomanBtn && devanagariInput && romanOutput) {
        clearRomanBtn.addEventListener('click', function() {
            devanagariInput.value = '';
            romanOutput.textContent = '';
            const romanWordCount = document.getElementById('roman-word-count');
            if (romanWordCount) {
                romanWordCount.textContent = '0';
            }
            showNotification('Content cleared');
        });
    }
    
    // ======== UPDATE WORD COUNT ON INPUT ========
    
    if (preetiInput) {
        preetiInput.addEventListener('input', function() {
            const wordCount = this.value.trim().split(/\s+/).filter(Boolean).length;
            const preetiWordCount = document.getElementById('preeti-word-count');
            if (preetiWordCount) {
                preetiWordCount.textContent = wordCount;
            }
        });
    }
    
    if (devanagariInput) {
        devanagariInput.addEventListener('input', function() {
            const wordCount = this.value.trim().split(/\s+/).filter(Boolean).length;
            const romanWordCount = document.getElementById('roman-word-count');
            if (romanWordCount) {
                romanWordCount.textContent = wordCount;
            }
        });
    }
    
    // ======== CONVERSION FUNCTIONS ========
    
    // Preeti to Unicode conversion function
    function convertPreetiToUnicode(preeti) {
        // Comprehensive mapping for Preeti to Unicode
        const preetiMap = {
            // Vowels
            "c": "अ", "cf": "आ", "O{": "ई", "O": "इ", "pm": "ऊ", "p": "उ", "C": "ऋ", "P]": "ऐ", "P": "ए", 
            "cf]": "ओ", "cf}": "औ", "cM": "अं", "cF": "अँ", "c\\": "अ्",
            
            // Consonants
            "s": "क", "v": "ख", "u": "ग", "3": "घ", "ª": "ङ", "r": "च", "5": "छ", "h": "ज", "em": "झ", "`": "ञ", 
            "6": "ट", "7": "ठ", "8": "ड", "9": "ढ", "0f": "ण", "t": "त", "y": "थ", "b": "द", "w": "ध", "g": "न", 
            "k": "प", "km": "फ", "a": "ब", "e": "भ", "d": "म", "o": "य", "/": "र", "n": "ल", "j": "व", "z": "श", 
            "if": "ष", ";": "स", "x": "ह", "I": "क्ष", "q": "त्र", "1": "ज्ञ", "5\\": "छ्य", "¿": "रू",
            
            // Matras
            "f": "ा", "L": "ी", "l": "ि", "'": "ु", '"': "ू", "[": "े", "{": "ै", "]": "ो", "}": "ौ", "F": "ृ", "\\": "्र",
            
            // Half forms
            "\\": "्र", "|": "्", "~": "्", "÷": "्",
            
            // Complex combinations
            "k|m": "फ्र", "kmf": "फा", "0f": "णा", "0": "ण", "k": "प",
            
            // Symbols
            "«": "«", "=": ".", "+": "ं", "^": "!", "&": "%", "ç": "", "å": "ङ्क", "±": "ङ्ख", "³": "ङ्ग", 
            "µ": "ङ्घ", "¤": "ञ्च", "¥": "ञ्छ", "¦": "ञ्ज", "§": "ञ्झ", "°": "ड्ड", "¨": "क्त", 
            "©": "द्म", "®": "य्र", "£": "द्य", "¢": "द्व", "¡": "ठ्ठ", "M": "ः", "<": "ॐ", ">": "ऽ", "•": "ऽ"
        };
        
        // Sort keys by length (longer first) to handle composite characters correctly
        const keys = Object.keys(preetiMap).sort((a, b) => b.length - a.length);
        
        let unicode = preeti;
        
        // Replace each Preeti character or character combination with its Unicode equivalent
        for (const preeti_char of keys) {
            const unicode_char = preetiMap[preeti_char];
            const regex = new RegExp(escapeRegExp(preeti_char), 'g');
            unicode = unicode.replace(regex, unicode_char);
        }
        
        return unicode;
    }
    
    // Unicode to Preeti conversion function
    function convertUnicodeToPreeti(unicode) {
        // Mapping for Unicode to Preeti
        const unicodeMap = {
            "अ": "c", "आ": "cf", "इ": "O", "ई": "O{", "उ": "p", "ऊ": "pm", "ए": "P", "ऐ": "P]", "ओ": "cf]", "औ": "cf}",
            "क": "s", "ख": "v", "ग": "u", "घ": "3", "ङ": "ª", "च": "r", "छ": "5", "ज": "h", "झ": "em", "ञ": "`",
            "ट": "6", "ठ": "7", "ड": "8", "ढ": "9", "ण": "0f", "त": "t", "थ": "y", "द": "b", "ध": "w", "न": "g",
            "प": "k", "फ": "km", "ब": "a", "भ": "e", "म": "d", "य": "o", "र": "/", "ल": "n", "व": "j", "श": "z",
            "ष": "if", "स": ";", "ह": "x", "क्ष": "If", "त्र": "q", "ज्ञ": "1", "रू": "¿",
            "ा": "f", "ी": "L", "ि": "l", "ु": "'", "ू": "\"", "े": "[", "ै": "{", "ो": "]", "ौ": "}", "ृ": "F",
            "ं": "+", "ँ": "F", "ः": "M", "ऽ": ">", "।": "."
        };
        
        // Sort keys by length (longer first) to handle composite characters correctly
        const keys = Object.keys(unicodeMap).sort((a, b) => b.length - a.length);
        
        let preeti = unicode;
        
        // Replace each Unicode character with its Preeti equivalent
        for (const uni of keys) {
            const pree = unicodeMap[uni];
            const regex = new RegExp(escapeRegExp(uni), 'g');
            preeti = preeti.replace(regex, pree);
        }
        
        return preeti;
    }
    
    // Helper function to escape special characters in regex
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Function to show notifications
    function showNotification(message, type = 'success') {
        // Check if custom notification function exists
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
            return;
        }
        
        let notificationContainer = document.querySelector('.saas-notifications');
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'saas-notifications';
            document.body.appendChild(notificationContainer);
        }
        
        const notification = document.createElement('div');
        notification.className = `saas-notification saas-${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        
        const text = document.createElement('span');
        text.textContent = message;
        
        notification.appendChild(icon);
        notification.appendChild(text);
        notificationContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('saas-show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('saas-show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});