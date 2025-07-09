Perfect. Here's the expanded **GitHub Security Policy** with both a `security.txt` and a **Bug Bounty Disclaimer** added for clarity and professionalism.

---

## 🔐 AZYGO Security Policy (`SECURITY.md`)

Welcome to the AZYGO GitHub Security Policy. We are committed to protecting our platform, users, and developers from security risks by promoting transparency and responsible disclosure.

---

### ✅ Supported Versions

We currently provide security support for the latest release of:

* `driver-app`: ✅ v1.x
* `customer-app`: ✅ v1.x
* `admin-dashboard`: ✅ v1.x

Older versions may not receive security patches unless specified in a tagged release.

---

### 📣 Reporting a Vulnerability

If you discover a vulnerability, we ask that you report it responsibly by emailing us directly.

**📧 Contact:**

```
security@azygo.app
```

**Include:**

* Vulnerability description
* Affected repo/component
* Steps to reproduce
* Optional: mitigation suggestions

We will respond within **72 hours**, investigate the report, and keep you updated throughout the process.

---

### 👥 Contributor Security Guidelines

If you contribute to any AZYGO project:

1. **Do not expose credentials or tokens** in code.
2. Use `.env` files for all secrets and add them to `.gitignore`.
3. Vet third-party dependencies for known vulnerabilities.
4. Use HTTPS/SSL and encryption where applicable.
5. Report suspicious activity or pull requests to project maintainers.

---

### 🔍 Platform Security Practices

* GitHub Dependabot (automated CVE alerts)
* Firebase Rules for DB access control
* OAuth 2.0 / JWT token-based authentication
* TLS/SSL enforced across endpoints
* Role-based access in Admin Dashboard
* Activity logging and audit trail (v2+)

---

## 💰 Bug Bounty Disclaimer

At this time, **AZYGO does not offer a paid bug bounty**. However, we deeply appreciate your responsible disclosures and will publicly acknowledge valid, critical findings if permitted.

We may offer:

* **LinkedIn/Resume credit**
* **Recognition on our security hall of fame (coming soon)**
* Early access to private betas

---

## 📄 security.txt (for external use)

Place this at: `.well-known/security.txt` (on your site)

```
Contact: mailto:security@azygo.app
Expires: 2026-12-31T23:59:59.000Z
Policy: https://github.com/azygo/.github/SECURITY.md
Preferred-Languages: en
Acknowledgements: https://azygo.app/security/hall-of-fame
```

---

Let me know if you want me to:

* Write a Hall of Fame webpage stub
* Generate `.env.example` templates
* Draft `CONTRIBUTING.md` or `CODE_OF_CONDUCT.md` files

I'll package it all for you.
