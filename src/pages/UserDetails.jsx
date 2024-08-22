import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../components/common/CustomButton";
import styles from "./UserDetails.module.css";
import {
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaCalendarAlt,
  FaGamepad,
  FaUsers,
  FaMoneyBillWave,
  FaFileDownload,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaBan,
  FaUnlock,
} from "react-icons/fa";
import UserTeamComponent from "../components/userDetails/UserTeamComponent";
import { userTeams } from "../utils/tempData";
import { changestatus, fetchuserdetail, verifyuser } from "../redux/userReducer/action";
import Skeleton from "../components/common/Skeleton";

const UserDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { userDetail } = useSelector((store) => store.users);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("teams");
  const [loading, setLoading] = useState(false);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const { user, bank_details, documents } = userDetail || {};
  useEffect(() => {
    const callbackAfter = () => setLoading(false);

    setLoading(true);
    dispatch(fetchuserdetail(id, callbackAfter));
  }, [dispatch]);

  const handleDownloadReport = () => {
    console.log("Downloading player report...");
  };

  const handleVerify = () => {
    const callbackAfter = () => {};
    dispatch(verifyuser(id, callbackAfter));
  };

  const handleUpdateStatus = () => {
    const callbackAfter = () => {};
    dispatch(changestatus(id, callbackAfter));
  };

  const handleViewDocument = (documentType, url) => {
    setCurrentDocument({
      title: "documentType",
      url: url,
    });
    setShowDocumentViewer(true);
  };

  return (
    <div className={styles.userDetailsContainer}>
      <div className={styles.header}>
        <h1>User Details</h1>
        <CustomButton type="secondary" onClick={() => navigate("/users")}>
          Back to Users
        </CustomButton>
      </div>

      <div className={styles.userProfile}>
        <div className={styles.profilePicture}>
          <img src={user && user.profile_picture} alt={ user && user.name} />
        </div>
        <div className={styles.profileInfo}>
          <h2>{user && user.name} {user && user.status === "ACTIVE" ? (
                  <>
                    <FaCheckCircle />
                  </>
                ) :""}</h2>

          <div className={styles.statusButtons}>
            {
             user && user.status === "VERIFICATIONPENDING" && (
                <CustomButton
                type={user.status === "ACTIVE" ? "success" : "danger"}
                onClick={handleVerify}
                alert={true}
                alertMessage={
                  user && user.verified
                    ? "Are you sure you want to unverify this user?"
                    : "Are you sure you want to verify this user?"
                }
              >
                {user && user.status === "ACTIVE" ? (
                  <>
                    <FaCheckCircle />
                    <span style={{ marginLeft: "0.5rem" }}>Verified</span>
                  </>
                ) : (
                  <>
                    <FaTimesCircle />
                    <span style={{ marginLeft: "0.5rem" }}>Unverified</span>
                  </>
                )}
              </CustomButton>
              )
            }

            <CustomButton

              type={user && user.status === "ACTIVE" ? "danger" : "warning"}
              onClick={handleUpdateStatus}
              alert={true}
              alertMessage={
                user && user.status === "ACTIVE"
                  ? "Are you sure you want to block this user?"
                  : "Are you sure you want to unblock this user?"
              }
            >
              {user && user.status === "ACTIVE" ? (
                <>
                  <FaBan />
                  <span style={{ marginLeft: "0.5rem" }}>Block</span>
                </>
              ) : (
                <>
                  <FaUnlock />
                  <span style={{ marginLeft: "0.5rem" }}>Activate</span>
                </>
              )}
            </CustomButton>
          </div>
        </div>
      </div>

      <div className={styles.infoGrid}>
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            <InfoCard icon={<FaEnvelope />} label="Email" value={user && user.email} />
            <InfoCard
              icon={<FaPhone />}
              label="Phone"
              value={user && user.mobile_number}
            />
            <InfoCard
              icon={<FaBirthdayCake />}
              label="Date of Birth"
              value={user && user.dob}
            />
            <InfoCard
              icon={<FaCalendarAlt />}
              label="Registered On"
              value={user && user.created_at.split("T")[0]}
            />
            <InfoCard
              icon={<FaGamepad />}
              label="Events Participated"
              value={user && user.events_participated ? user.events_participated : 0}
            />
            <InfoCard
              icon={<FaUsers />}
              label="Teams Created"
              value={user && user.teams_created_count ? user.teams_created_count : 0}
            />
            <InfoCard
              icon={<FaMoneyBillWave />}
              label="Amount Spent"
              value={`₹${user && user.amount_spent ? user.amount_spent : 0}`}
            />
          </>
        )}
      </div>
      <div className={styles.sectionTitle}>Bank Details</div>
      {loading ? (
        <Skeleton />
      ) : (
        <div className={styles.bankDetails}>
        <p>
          <strong>Account Name:</strong>{" "}
          {user && user.user_bank_details ? user.user_bank_details.account_name : "NA"}
        </p>
        <p>
          <strong>Account Number:</strong>{" "}
          {user && user.user_bank_details
            ? user.user_bank_details.account_number
            : "NA"}
        </p>
        <p>
          <strong>IFSC Code:</strong>{" "}
          {user && user.user_bank_details ? user.user_bank_details.ifsc_code : "NA"}
        </p>
      </div>
      )}



      <div className={styles.sectionTitle}>Documents</div>
      {
        loading ?(
          <>
             <Skeleton/>
             <Skeleton/>
          </>

        ):(
          <div className={styles.documents}>
          {user && documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.doc_type}
              filename={doc.doc_url}
              onView={() => handleViewDocument(doc.doc_type, doc.doc_url)}
            />
          ))}
        </div>
        )
      }


      <div className={styles.actions}>
        <CustomButton type="primary" onClick={handleDownloadReport}>
          <FaFileDownload /> Download Player Excel Report
        </CustomButton>
      </div>

      <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "teams" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("teams")}
          >
            Teams
          </button>
        </div>
        <div className={styles.tabContent}>
          {activeTab === "teams" && <UserTeamComponent teams={userTeams} />}
        </div>
      </div>

      {showDocumentViewer && (
        <DocumentViewer
          document={currentDocument}
          onClose={() => setShowDocumentViewer(false)}
        />
      )}
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className={styles.infoCard}>
    <div className={styles.infoIcon}>{icon}</div>
    <div className={styles.infoLabel}>{label}</div>
    <div className={styles.infoValue}>{value}</div>
  </div>
);

const DocumentCard = ({ title, filename, onView }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(filename, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Extract the filename from the URL
      const fileName = filename.split('/').pop();

      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {

    }
  };




  return (
    <div className={styles.documentCard}>
      <div className={styles.documentCardInner}>
        <div className={styles.documentIcon}>
          <FaFileDownload />
        </div>
        <div className={styles.documentInfo}>
          <div className={styles.documentTitle}>{title}</div>
        </div>
      </div>
      <div className={styles.documentActions}>
        <CustomButton type="outline" size="small" onClick={onView}>
          <FaEye />
          <span style={{ marginLeft: "0.5rem" }}>View</span>
        </CustomButton>
        <CustomButton type="outline" size="small" onClick={handleDownload}>
          <FaFileDownload />
          <span style={{ marginLeft: "0.5rem" }}>Download</span>
        </CustomButton>
      </div>
    </div>
  );
};

const DocumentViewer = ({ document, onClose }) => (
  <div className={styles.documentViewerOverlay}>
    <div className={styles.documentViewer}>
      <div className={styles.documentViewerHeader}>
        <h3>{document.title}</h3>
        <CustomButton type="danger" size="small" onClick={onClose}>
          Close
        </CustomButton>
      </div>
      <div className={styles.documentViewerContent}>
        <img src={document.url} alt={document.title} />
      </div>
    </div>
  </div>
);

export default UserDetails;
