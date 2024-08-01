import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("teams");
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);

  useEffect(() => {
    const mockUser = {
      id: id,
      name: "John Doe",
      dateRegistered: "2023-01-15",
      email: "john.doe@example.com",
      phone: "+1 123-456-7890",
      dob: "1990-05-20",
      displayPicture: "https://picsum.photos/200/300/?random=1",
      verified: true,
      blocked: false,
      eventsParticipated: 2,
      teamsCreated: 3,
      amountSpent: 900,
      bankDetails: {
        accountName: "John Doe",
        accountNumber: "1234567890",
        ifscCode: "ABCD0001234",
      },
      documents: {
        aadharFront: "https://picsum.photos/800/600/?random=2",
        aadharBack: "https://picsum.photos/800/600/?random=3",
        pancard: "https://picsum.photos/800/600/?random=4",
      },
    };
    setUser(mockUser);
  }, [id]);

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const handleDownloadReport = () => {
    console.log("Downloading player report...");
  };

  const handleVerify = () => {
    setUser({ ...user, verified: !user.verified });
  };

  const handleBlock = () => {
    setUser({ ...user, blocked: !user.blocked });
  };

  const handleViewDocument = (documentType) => {
    setCurrentDocument({
      title: documentType,
      url: user.documents[documentType],
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
          <img src={user.displayPicture} alt={user.name} />
        </div>
        <div className={styles.profileInfo}>
          <h2>{user.name}</h2>
          <div className={styles.statusButtons}>
            <CustomButton
              type={user.verified ? "success" : "danger"}
              onClick={handleVerify}
              alert={true}
              alertMessage={
                user.verified
                  ? "Are you sure you want to unverify this user?"
                  : "Are you sure you want to verify this user?"
              }
            >
              {user.verified ? (
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
            <CustomButton
              type={user.blocked ? "danger" : "warning"}
              onClick={handleBlock}
              alert={true}
              alertMessage={
                user.blocked
                  ? "Are you sure you want to unblock this user?"
                  : "Are you sure you want to block this user?"
              }
            >
              {user.blocked ? (
                <>
                  <FaBan />
                  <span style={{ marginLeft: "0.5rem" }}>Blocked</span>
                </>
              ) : (
                <>
                  <FaUnlock />
                  <span style={{ marginLeft: "0.5rem" }}>Active</span>
                </>
              )}
            </CustomButton>
          </div>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <InfoCard icon={<FaEnvelope />} label="Email" value={user.email} />
        <InfoCard icon={<FaPhone />} label="Phone" value={user.phone} />
        <InfoCard
          icon={<FaBirthdayCake />}
          label="Date of Birth"
          value={user.dob}
        />
        <InfoCard
          icon={<FaCalendarAlt />}
          label="Registered On"
          value={user.dateRegistered}
        />
        <InfoCard
          icon={<FaGamepad />}
          label="Events Participated"
          value={user.eventsParticipated}
        />
        <InfoCard
          icon={<FaUsers />}
          label="Teams Created"
          value={user.teamsCreated}
        />
        <InfoCard
          icon={<FaMoneyBillWave />}
          label="Amount Spent"
          value={`₹${user.amountSpent}`}
        />
      </div>

      <div className={styles.sectionTitle}>Bank Details</div>
      <div className={styles.bankDetails}>
        <p>
          <strong>Account Name:</strong> {user.bankDetails.accountName}
        </p>
        <p>
          <strong>Account Number:</strong> {user.bankDetails.accountNumber}
        </p>
        <p>
          <strong>IFSC Code:</strong> {user.bankDetails.ifscCode}
        </p>
      </div>

      <div className={styles.sectionTitle}>Documents</div>
      <div className={styles.documents}>
        <DocumentCard
          title="Aadhar Front"
          filename={user.documents.aadharFront}
          onView={() => handleViewDocument("aadharFront")}
        />
        <DocumentCard
          title="Aadhar Back"
          filename={user.documents.aadharBack}
          onView={() => handleViewDocument("aadharBack")}
        />
        <DocumentCard
          title="PAN Card"
          filename={user.documents.pancard}
          onView={() => handleViewDocument("pancard")}
        />
      </div>

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

const DocumentCard = ({ title, filename, onView }) => (
  <div className={styles.documentCard}>
    <div className={styles.documentCardInner}>
      <div className={styles.documentIcon}>
        <FaFileDownload />
      </div>
      <div className={styles.documentInfo}>
        <div className={styles.documentTitle}>{title}</div>
        {/* <div className={styles.documentFilename}>{filename}</div> */}
      </div>
    </div>
    <div className={styles.documentActions}>
      <CustomButton type="outline" size="small" onClick={onView}>
        <FaEye />
        <span style={{ marginLeft: "0.5rem" }}>View</span>
      </CustomButton>
      <CustomButton type="outline" size="small">
        <FaFileDownload />
        <span style={{ marginLeft: "0.5rem" }}>Download</span>
      </CustomButton>
    </div>
  </div>
);

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
