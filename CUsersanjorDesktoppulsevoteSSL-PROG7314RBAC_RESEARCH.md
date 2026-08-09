# RBAC Research Summary

**Role-Based Access Control (RBAC)** is a security model that restricts system access based on a user's role within an organisation rather than individual permissions. Users are assigned roles (e.g., admin, manager, user), and each role has predefined permissions that determine what actions they can perform.

RBAC is critical in web applications because it enforces the principle of least privilege—users only access what they need for their job function. This reduces the attack surface, prevents accidental or malicious data exposure, and simplifies permission management as the system scales.

In PulseVote, three roles create a clear hierarchy: **Admins** have global access to create other admins/managers and oversee all organisations; **Managers** can create organisations, generate join codes, and manage polls within their organisations; **Users** can join organisations via codes and vote in polls. This separation ensures managers cannot elevate privileges, users cannot create polls, and only authorised individuals control organisational structure.

Without proper RBAC, a regular user could potentially create polls, access admin endpoints, or manipulate organisational data. A compromised low-privilege account could escalate to full system control, leading to data breaches, unauthorised poll manipulation, or complete system takeover.

A real-world example is the **2019 Capital One breach**, where a misconfigured firewall allowed a former AWS employee to access over 100 million customer records. The attacker exploited excessive permissions on a cloud role—essentially an RBAC failure where a role had far more access than necessary. Proper RBAC with least-privilege roles would have contained the damage significantly.
