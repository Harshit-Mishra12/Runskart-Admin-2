import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import styles from "./FAQ.module.css";

const initialFaqs = [
  {
    id: 1,
    createdDate: "2023-07-15",
    question: "How do I create an account?",
    answer:
      "To create an account, click on the 'Sign Up' button on the top right corner of the homepage and follow the instructions.",
  },
  {
    id: 2,
    createdDate: "2023-07-16",
    question: "What payment methods do you accept?",
    answer:
      "We accept credit cards, debit cards, and PayPal for all transactions.",
  },
  // Add more FAQ objects as needed
];

const FAQ = () => {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleCreateFAQ = () => {
    if (newQuestion && newAnswer) {
      const newFaq = {
        id: faqs.length + 1,
        createdDate: new Date().toISOString().slice(0, 10),
        question: newQuestion,
        answer: newAnswer,
      };
      setFaqs([...faqs, newFaq]);
      setNewQuestion("");
      setNewAnswer("");
      setShowCreateModal(false);
    }
  };

  const handleDeleteFAQ = (id) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  return (
    <div className={styles.faqContainer}>
      <div className={styles.header}>
        <h1>Frequently Asked Questions</h1>
        <CustomButton type="primary" onClick={() => setShowCreateModal(true)}>
          Create FAQ
        </CustomButton>
      </div>
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{faqs.length}</span>
          <span className={styles.statLabel}>Total FAQs</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.faqTable}>
          <thead>
            <tr>
              <th>Created Date</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td>{faq.createdDate}</td>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td>
                  <CustomButton
                    type="danger"
                    size="small"
                    onClick={() => handleDeleteFAQ(faq.id)}
                  >
                    Delete
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Create New FAQ</h2>
            <input
              type="text"
              placeholder="Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className={styles.input}
            />
            <textarea
              placeholder="Answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className={styles.textarea}
            ></textarea>
            <div className={styles.modalButtons}>
              <CustomButton type="primary" onClick={handleCreateFAQ}>
                Submit
              </CustomButton>
              <CustomButton
                type="secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;
