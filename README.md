# Guarented Rentals - Salesforce Case Management POC

Proof of Concept (POC) demonstrating an end-to-end Rental Case Management & Security Deposit Refund workflow in Salesforce Service Cloud.

## Features & Implementation
- **Customized Standard Objects**: Configured `Account`, `Contact`, `Product2`, `Order`, `OrderItem`, and `Case` to support rental lifecycles.
- **Web-to-Case Intake**: Custom frontend support portal (`index.html`) capturing customer returns/refund requests and routing them to Salesforce.
- **Order Linking Automation**: Built logic to associate incoming Web-to-Case requests with existing rental orders (`Rental_Order__c`).
- **Security Deposit Refund Logic**: Fields and status tracking to handle deposit calculations, deduction fees (damage, dues), and approval stages.

## Files
- `index.html`: Web-to-Case customer support intake form.
- `style.css`: Styling for the intake portal.
- `script.js`: Client-side validation and form handling.
