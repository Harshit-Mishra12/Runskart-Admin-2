import React, { useState, useEffect } from "react";
import CustomButton from "../components/common/CustomButton";
import styles from "./FAQ.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createfaq, deletefaq, fetchfaq, updatefaq } from "../redux/faqReducer/action";
import TableSkeleton from "../components/common/TableSkeleton";

const FAQ = () => {
  const { faqList } = useSelector((store) => store.faqs);
  const dispatch = useDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ question: "", answer: "" });

  useEffect(() => {
    const callbackAfterLoginSuccess = (result) => {
      setLoading(false);
    };
    setLoading(true);
    dispatch(fetchfaq(callbackAfterLoginSuccess)); // Fetch dashboard data
  }, [dispatch]);

  useEffect(() => {
    setFaqData(faqList);
  }, [faqList]);

  const handleCreateFAQ = () => {
    let hasError = false;
    const newErrors = { question: "", answer: "" };

    if (!newQuestion.trim()) {
      newErrors.question = "Question is required.";
      hasError = true;
    }

    if (!newAnswer.trim()) {
      newErrors.answer = "Answer is required.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const callbackAfter = () => {
      setLoading(false);
    };
    if (newQuestion && newAnswer) {
      const params = {
        question: newQuestion,
        answer: newAnswer,
      };
      dispatch(createfaq(params, callbackAfter));
      setNewQuestion("");
      setNewAnswer("");
      setErrors({ question: "", answer: "" });
      setShowCreateModal(false);
    }
  };
  const handleSubmitUpdateFAQ = () => {
    let hasError = false;
    const newErrors = { question: "", answer: "" };

    if (!newQuestion.trim()) {
      newErrors.question = "Question is required.";
      hasError = true;
    }

    if (!newAnswer.trim()) {
      newErrors.answer = "Answer is required.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const callbackAfter = () => {
      setLoading(false);
    };
    if (newQuestion && newAnswer) {
      const params = {
        id:selectedId,
        question: newQuestion,
        answer: newAnswer,
      };
      dispatch(updatefaq(params, callbackAfter));
      setNewQuestion("");
      setNewAnswer("");
      setErrors({ question: "", answer: "" });
      setShowEditModal(false);
    }
  };
  const handleUpdateFAQ = (faq) => {
    setShowEditModal(true);
    // setLoading(true);
    setNewQuestion(faq.question);
    setNewAnswer(faq.answer);
    setSelectedId(faq.id)
  };

  const handleDeleteFAQ = (id) => {
    setLoading(true);
    const callbackAfter = (result) => {
      if(result.statusCode === 1)
      {
        setLoading(false);
      }

    };
    dispatch(deletefaq(id, callbackAfter));
  };

  return (
    <div className={styles.faqContainer}>
      <div className={styles.header}>
        {/* <h1>Frequently Asked Questions</h1> */}

      </div>
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{faqData.length}</span>
          <span className={styles.statLabel}>Total FAQs</span>
        </div>
        <div className={styles.actionsection}>
        <CustomButton type="primary" onClick={() => setShowCreateModal(true)}>
          Create FAQ
        </CustomButton>
        </div>

      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <TableSkeleton />
        ) : (
          <table className={styles.faqTable}>
            <thead>
              <tr>
                <th>Created Date</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {faqData.map((faq) => (
                <tr key={faq.id}>
                  <td>{faq.created_at.split("T")[0]}</td>
                  <td>{faq.question}</td>
                  <td>{faq.answer}</td>
                  <td>
                    <CustomButton
                      type="primary"
                      size="small"
                      onClick={() => handleUpdateFAQ(faq)}

                    >
                      Edit
                    </CustomButton>
                  </td>
                  <td>
                    <CustomButton
                      type="danger"
                      size="small"
                      onClick={() => handleDeleteFAQ(faq.id)}
                      alert={true}
                      alertMessage={"Are you sure you want to delete?"}
                    >
                      Delete
                    </CustomButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
              className={`${styles.input} ${errors.question ? styles.errorInput : ''}`}
            />
            {errors.question && (
              <div className={styles.errorMessage}>{errors.question}</div>
            )}
            <textarea
              placeholder="Answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className={`${styles.textarea} ${errors.answer ? styles.errorInput : ''}`}
            ></textarea>
            {errors.answer && (
              <div className={styles.errorMessage}>{errors.answer}</div>
            )}
            <div className={styles.modalButtons}>
              <CustomButton type="primary" isLoading={loading} onClick={handleCreateFAQ}>
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
       {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Create New FAQ</h2>
            <input
              type="text"
              placeholder="Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className={`${styles.input} ${errors.question ? styles.errorInput : ''}`}
            />
            {errors.question && (
              <div className={styles.errorMessage}>{errors.question}</div>
            )}
            <textarea
              placeholder="Answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className={`${styles.textarea} ${errors.answer ? styles.errorInput : ''}`}
            ></textarea>
            {errors.answer && (
              <div className={styles.errorMessage}>{errors.answer}</div>
            )}
            <div className={styles.modalButtons}>
              <CustomButton type="primary" isLoading={loading} onClick={handleSubmitUpdateFAQ}>
                Submit
              </CustomButton>
              <CustomButton
                type="secondary"
                onClick={() => setShowEditModal(false)}
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
