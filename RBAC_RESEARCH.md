# RBAC Research Summary

## What is RBAC?

Role-Based Access Control (RBAC) is an authorization model that assigns permissions to **roles** rather than individual users. Users are then assigned roles, inheriting the permissions associated with those roles. In web applications, this typically maps to roles like "admin", "manager", "user" where each role has predefined capabilities.

## Why is RBAC Important in Web Applications?

RBAC directly addresses **Broken Access Control (A01)** — the #1 vulnerability in the OWASP Top 10. It enforces the **Principle of Least Privilege** by ensuring users only have the minimum permissions needed for their role. This reduces the attack surface, prevents privilege escalation (both horizontal — accessing other users' data — and vertical — gaining admin capabilities), and helps meet compliance requirements like PCI-DSS 4.0, NIST AC-2, and CWE-285.

## How Different Roles Affect Access in PulseVote

- **Admin**: Global system access — can create other admins, managers, and users; manages all organisations and polls
- **Manager**: Organisation-scoped — can create organisations, generate join codes, create/close/open polls within their organisations
- **User**: Organisation member — can join organisations via join code, vote in polls (one vote per user per poll), view poll results

Each role's permissions are enforced at the **middleware layer** (route-level) and should also be enforced at the **data layer** (query scoping) to prevent IDOR (Insecure Direct Object Reference) vulnerabilities.

## What Could Go Wrong If RBAC Is Not Implemented Correctly

1. **Privilege Escalation**: A regular user could access admin endpoints by guessing URLs or manipulating request parameters
2. **IDOR Vulnerabilities**: Users could access polls, organisations, or results they're not members of by manipulating IDs
3. **Data Leakage**: Poll results or organisation member lists exposed to unauthorized users
4. **Vote Manipulation**: Users could vote multiple times or vote in polls they don't belong to
5. **Compliance Violations**: Failure to meet regulatory access control requirements

## Real-World Example: Capital One Data Breach (2019)

A misconfigured **Web Application Firewall (WAF)** combined with **excessive IAM permissions** allowed a former AWS employee to exploit a Server-Side Request Forgery (SSRF) vulnerability. The attacker accessed over 100 million credit applications because the compromised role had **broad S3 read permissions** far beyond what was needed — a classic failure of least privilege and RBAC. Proper role scoping would have limited the blast radius significantly.

## Summary (4-6 Sentences)

RBAC assigns permissions to roles rather than individuals, enforcing least privilege and directly mitigating Broken Access Control — the OWASP #1 vulnerability. In PulseVote, admins manage the system globally, managers control organisations and polls, and users participate within their organisations. Without proper RBAC at both middleware and data layers, users could escalate privileges, access unauthorized polls, manipulate votes, or leak sensitive data. The 2019 Capital One breach demonstrated how excessive permissions on a compromised role exposed 100M+ records — proper RBAC scoping would have contained the damage. Implementing RBAC is not optional for production applications; it's a fundamental security requirement.

## Sources
- [Auth0 RBAC Documentation](https://auth0.com/docs/manage-users/access-control/rbac)
- [OWASP Top 10 2021 - Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
- [Capital One Breach Analysis](https://www.nist.gov/publications/capital-one-breach-lessons-learned)
- [NIST AC-2 Access Control Policy](https://csrc.nist.gov/projects/role-based-access-control)