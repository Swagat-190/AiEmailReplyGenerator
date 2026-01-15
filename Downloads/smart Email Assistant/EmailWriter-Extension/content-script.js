console.log("✨ AI Email Assistant Extension Loaded");

let generatedReplyText = '';
let buttonInjected = false;

// Function to inject AI Email Writer button near Reply button
function injectButtonToEmailView() {
  console.log("Starting button injection observer...");
  
  const observer = new MutationObserver((mutations) => {
    // Find the Reply button first
    const replyButton = document.querySelector('[role="button"][aria-label*="Reply"]') ||
                       document.querySelector('[aria-label*="Reply"][role="button"]') ||
                       document.querySelector('.btC [role="button"]');
    
    if (replyButton && !document.getElementById('ai-email-generate-button')) {
      console.log("Found Reply button:", replyButton);
      
      // Get email content to verify there's an email open
      const emailContent = getEmailContent();
      
      if (emailContent && emailContent.length > 10) {
        console.log("Found email content, injecting button near Reply button");
        buttonInjected = true;
        
        // Create AI button with Gmail-like styling
        const aiButton = document.createElement('button');
        aiButton.id = 'ai-email-generate-button';
        aiButton.innerHTML = 'Generate with AI';
        aiButton.style.cssText = `
          background-color: #1a73e8 !important;
          color: #fff !important;
          border: none !important;
          padding: 8px 24px !important;
          border-radius: 4px !important;
          cursor: pointer !important;
          font-weight: 500 !important;
          font-size: 14px !important;
          font-family: 'Google Sans', Roboto, Arial, sans-serif !important;
          box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15) !important;
          margin-left: 12px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          height: auto !important;
          min-width: auto !important;
          letter-spacing: .25px !important;
          line-height: 1 !important;
          white-space: nowrap !important;
        `;
        
        
        
        aiButton.onclick = async (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("Generate AI button clicked!");
          const emailText = getEmailContent();
          console.log("Email text:", emailText.substring(0, 100));
          if (emailText) {
            await generateReply(emailText, aiButton);
          } else {
            showNotification('❌ Could not find email content', 'error');
          }
        };
        
        // Insert button to the LEFT of Reply button without modifying it
        const replyButtonContainer = replyButton.parentElement;
        if (replyButtonContainer) {
          // Create a wrapper to ensure proper spacing
          const buttonWrapper = document.createElement('span');
          buttonWrapper.style.cssText = `
            display: inline-flex;
            align-items: center;
            margin-right: 8px;
          `;
          buttonWrapper.appendChild(aiButton);
          
          // Insert BEFORE reply button (to the left)
          replyButtonContainer.insertBefore(buttonWrapper, replyButton);
          console.log("✅ AI Button successfully injected to the LEFT of Reply button!");
        } else {
          console.log("Could not find suitable container for button");
        }
      }
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
  });
}

// Function to get the email content from the sender
function getEmailContent() {
  console.log("Getting email content...");
  
  // Try different selectors for Gmail email body
  const selectors = [
    '[data-message-id] .a3s.aiL',
    '[data-message-id] .a3s',
    '.a3s.aiL',
    '.gs div[dir="ltr"]',
    '[role="article"] .a3s',
    '[data-message-id] div[dir="ltr"]'
  ];
  
  for (const selector of selectors) {
    const emailBody = document.querySelector(selector);
    if (emailBody && emailBody.innerText) {
      console.log("Found email with selector:", selector);
      console.log("Content preview:", emailBody.innerText.substring(0, 100));
      return emailBody.innerText || emailBody.textContent;
    }
  }
  
  console.log("Could not find email content with any selector");
  return '';
}

// Function to generate reply from backend
async function generateReply(emailText, button) {
  console.log("Generating reply for email:", emailText.substring(0, 100));
  
  const originalText = button.innerHTML;
  button.innerHTML = '⏳ Generating...';
  button.disabled = true;
  button.style.cursor = 'wait';
  
  try {
    const response = await fetch('http://localhost:8080/api/email/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: emailText,
        type: 'professional'
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const generatedEmail = await response.text();
    generatedReplyText = generatedEmail;
    
    console.log("✅ Reply generated successfully!");
    console.log("Generated reply:", generatedEmail.substring(0, 100));
    
    showNotification('✅ Reply generated! Click Reply button to use it.', 'success');
    
    // Try to auto-click reply button
    setTimeout(() => {
      const replyBtn = document.querySelector('[role="button"][aria-label*="Reply"]');
      if (replyBtn) {
        console.log("Found reply button, will insert text when compose opens");
      }
    }, 500);
    
  } catch (error) {
    console.error('Error generating email:', error);
    showNotification('❌ Failed to generate reply. Make sure backend is running on port 8080.', 'error');
  } finally {
    button.innerHTML = originalText;
    button.disabled = false;
    button.style.cursor = 'pointer';
  }
}

// Function to inject generated text into reply compose box
function injectReplyIntoCompose() {
  console.log("Setting up compose observer...");
  
  const composeObserver = new MutationObserver(() => {
    if (generatedReplyText) {
      console.log("Looking for compose area...");
      
      // Look for compose textarea in reply
      const composeArea = document.querySelector('[role="textbox"][g_editable="true"]') ||
                         document.querySelector('[role="textbox"][aria-label*="Message"]') ||
                         document.querySelector('div[contenteditable="true"][aria-label*="Message"]') ||
                         document.querySelector('.editable[contenteditable="true"]');
      
      if (composeArea) {
        console.log("Found compose area, inserting reply...");
        
        // Insert the generated reply
        composeArea.focus();
        composeArea.innerHTML = generatedReplyText.replace(/\n/g, '<br>');
        composeArea.innerText = generatedReplyText;
        
        // Trigger events
        composeArea.dispatchEvent(new Event('input', { bubbles: true }));
        composeArea.dispatchEvent(new Event('change', { bubbles: true }));
        composeArea.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
        
        const tempText = generatedReplyText;
        generatedReplyText = ''; // Clear after use
        
        showNotification('✅ Reply inserted into compose box!', 'success');
        console.log("✅ Reply inserted successfully!");
        
        // Stop observing once reply is inserted
        setTimeout(() => composeObserver.disconnect(), 1000);
      }
    }
  });
  
  composeObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['contenteditable', 'role']
  });
}

// Function to show notifications
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 4px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    background: ${type === 'success' ? '#4caf50' : '#f44336'};
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  #ai-email-generate-button {
    all: unset !important;
    background-color: #1a73e8 !important;
    color: #fff !important;
    border: none !important;
    padding: 8px 24px !important;
    border-radius: 4px !important;
    cursor: pointer !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    font-family: 'Google Sans', Roboto, Arial, sans-serif !important;
    box-shadow: none !important;
    margin-left: 12px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    height: auto !important;
    min-width: auto !important;
    letter-spacing: .25px !important;
    line-height: 1 !important;
    white-space: nowrap !important;
  }
  
  #ai-email-generate-button:hover {
    background-color: #1a73e8 !important;
    transform: none !important;
    padding: 8px 24px !important;
    margin-left: 12px !important;
    width: auto !important;
    height: auto !important;
  }
  
  #ai-email-generate-button:active {
    background-color: #1a73e8 !important;
  }
`;
document.head.appendChild(style);

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectButtonToEmailView();
    injectReplyIntoCompose();
  });
} else {
  injectButtonToEmailView();
  injectReplyIntoCompose();
}   