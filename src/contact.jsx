import React, { useState } from 'react'

export const Contact = () => {
    return (
        <div 
        id="contact-form">
            <input type="Text"  placeholder="Your Name" />
            <input type="Email" placeholder="Your Email Address" />
            <textarea placeholder="Your Message"></textarea>
            <button>Send Message</button>
            <span>Thank you for your message, we will be in touch soon!</span>
        
        </div>
    );
};

export default Contact;