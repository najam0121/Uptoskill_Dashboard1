import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
<<<<<<< HEAD
import {Shield,CheckCircle,Award,Calendar,User,ExternalLink,Download,Share2,X,} from "lucide-react";
import { useRef, useState, useEffect } from "react";
=======
import {
  Shield,
  CheckCircle,
  Award,
  Calendar,
  User,
  ExternalLink,
  Download,
  Share2,
} from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast"; // ✅ import shadcn toast

/* --------- Sample User Data -------- */
>>>>>>> 46c84376a5eb40cac925983af91977fdb4625b06
const sampleBadges = [
  {
    badgeId: "BDG-2024-001",
    title: "Advanced React Developer",
    issuer: "Tech Academy Pro",
    recipient: "John Doe",
    status: "Verified",
    type: "Professional",
    issueDate: "March 15, 2024",
    expiryDate: "March 15, 2027",
    description:
      "This badge validates advanced proficiency in React.js development, including hooks, context API, performance optimization, and modern React patterns.",
    skills: [
      "React.js",
      "TypeScript",
      "State Management",
      "Performance Optimization",
      "Testing",
      "Component Architecture",
    ],
    blockchainHash:
      "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    verificationDate: "March 15, 2024",
  },
  {
    badgeId: "BDG-2024-002",
    title: "Data Science Specialist",
    issuer: "DataCamp University",
    recipient: "Sarah Johnson",
    status: "Verified",
    type: "Academic",
    issueDate: "February 20, 2024",
    expiryDate: null,
    description:
      "Demonstrates comprehensive knowledge in data analysis, machine learning, and statistical modeling with practical project experience.",
    skills: [
      "Python",
      "Machine Learning",
      "Data Visualization",
      "Statistics",
      "Pandas",
      "Scikit-learn",
    ],
    blockchainHash:
      "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a",
    verificationDate: "February 20, 2024",
  },
  {
    badgeId: "BDG-2024-003",
    title: "UI/UX Design Excellence",
    issuer: "Design Institute",
    recipient: "Mike Chen",
    status: "Pending",
    type: "Skill",
    issueDate: "April 10, 2024",
    expiryDate: "April 10, 2026",
    description:
      "Recognition for outstanding user interface and user experience design capabilities with focus on accessibility and modern design principles.",
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Accessibility",
      "Design Systems",
      "Usability Testing",
    ],
    blockchainHash:
      "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b",
    verificationDate: "April 10, 2024",
  },
  {
    badgeId: "BDG-2024-004",
    title: "Cloud Architecture Mastery",
    issuer: "AWS Academy",
    recipient: "Emily Rodriguez",
    status: "Verified",
    type: "Professional",
    issueDate: "January 5, 2024",
    expiryDate: "January 5, 2025",
    description:
      "Advanced certification in cloud infrastructure design, implementation, and management using AWS services.",
<<<<<<< HEAD
    skills: ["AWS", "Cloud Architecture", "DevOps", "Kubernetes", "Terraform", "Microservices"],
=======
    skills: [
      "AWS",
      "Cloud Architecture",
      "DevOps",
      "Kubernetes",
      "Terraform",
      "Microservices",
    ],
>>>>>>> 46c84376a5eb40cac925983af91977fdb4625b06
    blockchainHash:
      "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c",
    verificationDate: "January 5, 2024",
  },
  {
    badgeId: "BDG-2024-005",
    title: "Cybersecurity Expert",
    issuer: "CyberSec Institute",
    recipient: "Alex Thompson",
    status: "Expired",
    type: "Professional",
    issueDate: "June 1, 2022",
    expiryDate: "June 1, 2024",
    description:
      "Comprehensive cybersecurity expertise covering threat analysis, incident response, and security architecture.",
    skills: [
      "Network Security",
      "Penetration Testing",
      "Incident Response",
      "Risk Assessment",
      "CISSP",
      "Ethical Hacking",
    ],
    blockchainHash:
      "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d",
    verificationDate: "June 1, 2022",
  },
  {
    badgeId: "BDG-2024-006",
    title: "Innovation Leadership",
    issuer: "Business School Excellence",
    recipient: "Lisa Wang",
    status: "Under Review",
    type: "Achievement",
    issueDate: "May 20, 2024",
    expiryDate: null,
    description:
      "Recognition for exceptional leadership in driving innovation initiatives and transformative business strategies.",
    skills: [
      "Strategic Planning",
      "Team Leadership",
      "Innovation Management",
      "Change Management",
      "Business Strategy",
    ],
    blockchainHash:
      "0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e",
    verificationDate: "May 20, 2024",
  },
];

/* --------- Utilities -------- */
const verificationStatusColors = {
  Verified: "bg-success text-success-foreground",
  Pending: "bg-warning text-warning-foreground",
  Expired: "bg-destructive text-destructive-foreground",
  "Under Review": "bg-primary text-primary-foreground",
};
  const badgeTypeColors = {
  Academic: "bg-blue-100 text-blue-800 border-blue-200",
  Professional: "bg-purple-100 text-purple-800 border-purple-200",
  Skill: "bg-green-100 text-green-800 border-green-200",
  Achievement: "bg-orange-100 text-orange-800 border-orange-200",
};

/* --------- Simple modal (no external libs) -------- */
function SimpleModal({ open, onClose, badge }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open || !badge) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* dialog box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-surface rounded-lg shadow-lg max-w-2xl w-full mx-4 overflow-auto"
        style={{ maxHeight: "85vh" }}
      >
        <div className="flex items-start justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">{badge.title}</h3>
            <p className="text-sm text-muted-foreground">Issued by {badge.issuer}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-2 p-2 rounded hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            <span className="font-medium text-success">{badge.status}</span>
            <span className="ml-2 text-xs px-2 py-1 rounded border">{badge.type}</span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Issued: {badge.issueDate}</span>
            </div>
            {badge.expiryDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Expires: {badge.expiryDate}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Awarded to: {badge.recipient}</span>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-3">
            <p>{badge.description}</p>
          </div>

          {badge.skills && badge.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {badge.skills.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 bg-gray-100 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gray-50 border rounded-lg p-3 text-xs">
            <p><strong>Badge ID:</strong> {badge.badgeId}</p>
            <p><strong>Blockchain Hash:</strong> {badge.blockchainHash}</p>
            <p><strong>Verified on:</strong> {badge.verificationDate}</p>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export function VerifiedBadgeCard({
  badge,
  onDownload,
  onShare,
  onViewDetails,
  delay = 0,
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
      setPosition((prev) => ({
      x: prev.x + (e.clientX - rect.left - prev.x) * 0.2,
      y: prev.y + (e.clientY - rect.top - prev.y) * 0.2,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
    >
      <Card
        ref={divRef}
        className="relative p-6 h-full flex flex-col hover:shadow-elegant transition-all duration-300 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setOpacity(0.6)}
        onMouseLeave={() => setOpacity(0)}
      >
          <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(0,102,255,0.18), transparent 80%)`,
            transition: "background 0.1s ease-out",
          }}
        />

          <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground">
              <Award className="w-8 h-8" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-xl text-foreground truncate">
                {badge.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-2">
                Issued by {badge.issuer}
              </p>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">
                  Blockchain Verified
                </span>
              </div>
            </div>
          </div>

            <div className="space-y-3 mb-4 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={verificationStatusColors[badge.status]}>
                <CheckCircle className="w-3 h-3 mr-1" />
                {badge.status}
              </Badge>
              <Badge variant="outline" className={badgeTypeColors[badge.type]}>
              <Badge
                variant="outline"
                className={badgeTypeColors[badge.type]}
              >
                {badge.type}
              </Badge>
            </div>

              <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Issued: {badge.issueDate}</span>
              </div>
              {badge.expiryDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Expires: {badge.expiryDate}</span>
                </div>
              )}
            </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Awarded to: {badge.recipient}</span>
            </div>

              <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>

              {badge.skills && badge.skills.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Skills Demonstrated:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {badge.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {badge.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{badge.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

              <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">Verification Details</span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Badge ID: {badge.badgeId}</p>
                <p>Blockchain Hash: {badge.blockchainHash?.slice(0, 20)}...</p>
                <p>Verified on: {badge.verificationDate}</p>
              </div>
            </div>
          </div>

            <div className="flex gap-2 pt-4 border-t border-border">
            {/* NOTE: keep signature as badgeId so we don't break existing callers */}
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onViewDetails(badge.badgeId)}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Details
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare(badge.badgeId)}
            >
              <Share2 className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              className="btn-primary"
              onClick={() => onDownload(badge.badgeId)}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
  export default function VerifiedBadgePage() {
  const [selectedBadgeId, setSelectedBadgeId] = useState(null);
    const handleDownload = (badgeId) => {

/* --------- Main Page Component -------- */
export default function VerifiedBadgePage() {
  const { toast } = useToast();

  const handleDownload = (badgeId) => {
    console.log("Downloading badge:", badgeId);
    const badge = sampleBadges.find((b) => b.badgeId === badgeId);
    if (!badge) return;
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF();
      // Title
      doc.setFontSize(18);
      doc.text(badge.title, 20, 20);
      // Issuer & Recipient
      doc.setFontSize(12);
      doc.text(`Issued by: ${badge.issuer}`, 20, 35);
      doc.text(`Awarded to: ${badge.recipient}`, 20, 45);
      // Status & Type
      doc.text(`Status: ${badge.status}`, 20, 60);
      doc.text(`Type: ${badge.type}`, 20, 70);
      // Dates
      doc.text(`Issued on: ${badge.issueDate}`, 20, 85);
      if (badge.expiryDate) {
        doc.text(`Expires on: ${badge.expiryDate}`, 20, 95);
      }
      // Description
      doc.text("Description:", 20, 115);
      doc.setFontSize(10);
      doc.text(badge.description, 20, 125, { maxWidth: 170 });
      // Skills
      if (badge.skills && badge.skills.length > 0) {
        doc.setFontSize(12);
        doc.text("Skills:", 20, 155);
        doc.setFontSize(10);
        badge.skills.forEach((skill, i) => {
          doc.text(`- ${skill}`, 25, 165 + i * 7);
        });
      }
      // Footer
      doc.setFontSize(10);
      doc.text(`Badge ID: ${badge.badgeId}`, 20, 260);
      doc.text(`Blockchain Hash: ${badge.blockchainHash}`, 20, 268);
      doc.text(`Verified on: ${badge.verificationDate}`, 20, 276);
      // Save file
      doc.save(`${badge.title.replace(/\s+/g, "_")}_${badge.badgeId}.pdf`);
    });
  };

  const handleShare = (badgeId) => {
    console.log("Sharing badge:", badgeId);
    // implement share logic

    const badge = sampleBadges.find((b) => b.badgeId === badgeId);
    if (!badge) return;

    const shareData = {
      title: badge.title,
      text: `I earned the "${badge.title}" badge from ${badge.issuer}!`,
      url: `${window.location.origin}/badges/${badge.badgeId}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          toast({
            title: "Shared!",
            description: `${badge.title} badge has been shared.`,
          });
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast({
        title: "Link copied",
        description: "Badge link copied to clipboard!",
      });
    }
  };

  const handleViewDetails = (badgeId) => {

    const found = sampleBadges.find((b) => b.badgeId === badgeId);
    if (found) setSelectedBadgeId(badgeId);
    else console.warn("Badge not found:", badgeId);
  };

  const selectedBadge = sampleBadges.find((b) => b.badgeId === selectedBadgeId) || null;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Verified Badges</h1>
        <p className="text-muted-foreground">
          Browse and manage your blockchain-verified digital badges and
          certifications.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleBadges.map((badge, index) => (
          <VerifiedBadgeCard
            key={badge.badgeId}
            badge={badge}
            onDownload={handleDownload}
            onShare={handleShare}
            onViewDetails={handleViewDetails}
            delay={index * 0.08}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {sampleBadges.filter((b) => b.status === "Verified").length}
          </div>
          <div className="text-sm text-muted-foreground">Verified Badges</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-warning">
            {sampleBadges.filter((b) => b.status === "Pending").length}
          </div>
          <div className="text-sm text-muted-foreground">Pending Review</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {sampleBadges.filter((b) => b.status === "Under Review").length}
          </div>
          <div className="text-sm text-muted-foreground">Under Review</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-destructive">
            {sampleBadges.filter((b) => b.status === "Expired").length}
          </div>
          <div className="text-sm text-muted-foreground">Expired</div>
        </Card>
      </div>
      <SimpleModal
        open={!!selectedBadgeId}
        onClose={() => setSelectedBadgeId(null)}
        badge={selectedBadge}
      />
    </div>
  );
}
