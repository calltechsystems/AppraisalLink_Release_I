// pages/user-guide.js
import { useState } from 'react';
import { FaSearch, FaQuestionCircle, FaVideo, FaPhoneAlt } from 'react-icons/fa';

export default function UserGuide() {
  // Dummy data for FAQ section
  const faqs = [
    { question: "How do I get started?", answer: "To get started, click on the 'Sign Up' button on the homepage..." },
    { question: "How can I reset my password?", answer: "Go to 'Settings' > 'Account' > 'Reset Password'..." },
    { question: "What should I do if I encounter an error?", answer: "Check our Troubleshooting guide below or contact support." }
  ];

  return (
    <div className="container">
      <h1>User Guide</h1>

      {/* Introduction */}
      <section className="section">
        <h2>Introduction</h2>
        <p>Welcome to our User Guide! Here you’ll find everything you need to get started and make the most of our service.</p>
      </section>

      {/* Search Bar */}
      <section className="section search">
        <FaSearch />
        <input type="text" placeholder="Search for help topics..." />
      </section>

      {/* Quick Start Guide */}
      <section className="section">
        <h2>Quick Start Guide</h2>
        <p>Follow these steps to set up your account and start using our platform.</p>
        <ul>
          <li>Step 1: Sign up or log in</li>
          <li>Step 2: Complete your profile</li>
          <li>Step 3: Explore the main features</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq">
            <FaQuestionCircle />
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>

      {/* Video Tutorials */}
      <section className="section">
        <h2>Video Tutorials</h2>
        <div className="video-tutorials">
          <FaVideo />
          <p>Watch our video tutorials to get hands-on guidance on using the platform effectively.</p>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section">
        <h2>Need Further Help?</h2>
        <div className="contact-support">
          <FaPhoneAlt />
          <p>Contact our support team at <strong>support@example.com</strong> or call us at <strong>(123) 456-7890</strong>.</p>
        </div>
      </section>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
        .section {
          margin: 20px 0;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fafafa;
        }
        .search {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 8px;
        }
        input {
          border: none;
          flex: 1;
          padding: 10px;
        }
        input:focus {
          outline: none;
        }
        .faq {
          margin-top: 10px;
        }
        .faq h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.1em;
        }
        .video-tutorials, .contact-support {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}
