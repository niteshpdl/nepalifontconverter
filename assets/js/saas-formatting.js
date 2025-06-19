document.addEventListener('DOMContentLoaded', function() {
    // Get formatting buttons
    const boldBtn = document.getElementById('saas-bold-btn');
    const italicBtn = document.getElementById('saas-italic-btn');
    const underlineBtn = document.getElementById('saas-underline-btn');
    const fontFamily = document.getElementById('saas-font-family');
    const fontSize = document.getElementById('saas-font-size');
    const textColor = document.getElementById('saas-text-color');
    const bgColor = document.getElementById('saas-bg-color');
    const alignLeft = document.getElementById('saas-align-left');
    const alignCenter = document.getElementById('saas-align-center');
    const alignRight = document.getElementById('saas-align-right');
    const alignJustify = document.getElementById('saas-align-justify');
    const listBullet = document.getElementById('saas-list-bullet');
    const listNumber = document.getElementById('saas-list-number');
    
    // Function to apply formatting
    function applyFormatting(command, value = null) {
        document.execCommand(command, false, value);
    }
    
    // Function to toggle active class
    function toggleActiveClass(element) {
        element.classList.toggle('saas-active');
    }
    
    // Add event listeners for formatting buttons
    if (boldBtn) {
        boldBtn.addEventListener('click', function() {
            applyFormatting('bold');
            toggleActiveClass(boldBtn);
        });
    }
    
    if (italicBtn) {
        italicBtn.addEventListener('click', function() {
            applyFormatting('italic');
            toggleActiveClass(italicBtn);
        });
    }
    
    if (underlineBtn) {
        underlineBtn.addEventListener('click', function() {
            applyFormatting('underline');
            toggleActiveClass(underlineBtn);
        });
    }
    
    if (fontFamily) {
        fontFamily.addEventListener('change', function() {
            applyFormatting('fontName', this.value);
        });
    }
    
    if (fontSize) {
        fontSize.addEventListener('change', function() {
            applyFormatting('fontSize', this.value);
        });
    }
    
    if (textColor) {
        textColor.addEventListener('input', function() {
            applyFormatting('foreColor', this.value);
        });
    }
    
    if (bgColor) {
        bgColor.addEventListener('input', function() {
            applyFormatting('hiliteColor', this.value);
        });
    }
    
    // Alignment buttons
    const alignmentButtons = [alignLeft, alignCenter, alignRight, alignJustify];
    const alignCommands = ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];
    
    alignmentButtons.forEach((button, index) => {
        if (button) {
            button.addEventListener('click', function() {
                applyFormatting(alignCommands[index]);
                
                // Remove active class from all alignment buttons
                alignmentButtons.forEach(btn => {
                    if (btn) btn.classList.remove('saas-active');
                });
                
                // Add active class to clicked button
                button.classList.add('saas-active');
            });
        }
    });
    
    // List buttons
    if (listBullet) {
        listBullet.addEventListener('click', function() {
            applyFormatting('insertUnorderedList');
            toggleActiveClass(listBullet);
        });
    }
    
    if (listNumber) {
        listNumber.addEventListener('click', function() {
            applyFormatting('insertOrderedList');
            toggleActiveClass(listNumber);
        });
    }
});