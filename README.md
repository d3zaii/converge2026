# CONVERGE '26

Public-facing 3D landing page for CONVERGE '26, India's Student Innovation Hackathon.

## Run locally

Use a local web server because the registration flow uses FormSubmit's AJAX endpoint.

For example:

```bash
python -m http.server 5500
```

Then open http://localhost:5500/

## Registration

Registration is built into the site. Every Register button opens the KYC-style registration modal.

- ₹49 solo · ₹99 for 2 · ₹149 for 3 · ₹199 for 4
- Team size: 1–4
- 20% early-bird discount through 29 September 2026
- FormSubmit AJAX endpoint sends submissions to dhairyadesai46@gmail.com
- The first live submission may trigger FormSubmit's email activation/confirmation flow.

The form collects full name, email, WhatsApp number, institution, team name, team lead, primary track, member count and calculated registration totals.

## Tracks

Six tracks are shown. DEZAI, Truvad and PranavX Labs are the core event tracks from the event brief. UNESCO, World Bank, UNDP, UNICEF and WHO are used only as thematic alignment references and are explicitly not represented as partners or endorsers.

Each track opens six problem statements; the sixth is an open brief within the same domain.

## Notes

The website does not process payments. It calculates and submits the registration amount to the organising email. A payment gateway can be connected later if required.
