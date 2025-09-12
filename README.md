🏠 Household Labor & Handyman Management System

A full-stack service management platform that connects customers, workers (handymen), and vendors, with admin oversight.
The system streamlines job requests, worker availability, payments (prototype), loyalty tracking, and vendor product management — all under one unified platform.

🚀 Features
🔧 Worker Management

Secure registration & JWT-based login (role = worker).

Manage profile (skills, rates, service radius, availability).

Multi-skill support (e.g., electrician + plumber).

Availability calendar with drag/drop scheduling.

Job inbox: accept/reject requests in real-time.

Job history, ratings, and performance metrics.

Document uploads (certificates, ID verification).

Export reports (Excel/PDF/PNG worker card).

👤 Customer Management

Secure signup/login (role = customer).

Search & filter workers by skills, rating, price, or location.

Post/manage job requests with media attachments.

Track job status (pending → in-progress → completed).

Rate & review workers (with optional photo).

Job/payment history (exportable).

Complaint submission to admin.

🏪 Vendor / Third-Party Management

Vendor login & profile management (role = vendor).

Add/manage product or service listings.

Accept/reject customer/vendor service requests.

Order history with export options.

Vendor ratings & reviews.

💳 Payment & Scheduling (Prototype)

Smart job scheduling (conflict detection with worker availability).

Prototype payment gateway integration (e.g., PayHere).

Notifications via email/SMS for job confirmations.

Automated job reminders.

Downloadable receipts & payment summaries.

🎁 Additional Services

Loyalty points for completed jobs (redeemable for discounts).

Loyalty reports (Excel/PDF).

Virtual store for household products & tools.

Advanced search & filtering across workers/vendors.

🛠️ Admin Subsystem

Approve/ban users (workers, customers, vendors).

Monitor complaints, reports, and suspicious activity.

System-wide analytics (jobs, revenue, user stats).

Announcements/notifications to all users.

Cross-system governance & verification workflows.

📊 System Highlights

✔️ CRUD operations across all entities (profiles, jobs, products, reviews).
✔️ Reporting everywhere: PDF/Excel exports for users, jobs, vendors, and admin dashboards.
✔️ File uploads: profile images, job media, certificates, receipts.
✔️ Role-based access control (customer, worker, vendor, admin).
✔️ Admin-first design — every subsystem includes an admin oversight view.

🏗️ Tech Stack (Suggested)

Frontend: React (Vite) + Tailwind CSS

Backend: Node.js + Express.js

Database: MongoDB

Authentication: JWT + bcrypt

File Storage: Multer / Cloudinary / AWS S3

Reports: jsPDF, ExcelJS

Notifications: Nodemailer (email), Twilio (SMS prototype)
