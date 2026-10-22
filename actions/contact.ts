"use server";

export interface ContactFormState {
    status: "idle" | "success" | "error";
    message?: string;
}

export async function submitContactForm(
    _prevState: ContactFormState,
    formData: FormData,
): Promise<ContactFormState> {
    const name = formData.get("name")?.toString().trim() ?? "";
    const company = formData.get("company")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";

    if (!name || !email || !message) {
        return { status: "error", message: "Name, email, and message are required." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { status: "error", message: "Please enter a valid email address." };
    }

    // Forward to owner email via mailto-compatible fetch or a simple fetch to a
    // transactional email service. Using a Formspree-compatible endpoint here;
    // replace FORMSPREE_ENDPOINT env var with your actual endpoint.
    const endpoint = process.env.FORMSPREE_ENDPOINT;
    if (!endpoint) {
        // Graceful no-op in dev — log payload and succeed
        console.log("[contact-form]", { name, company, email, message });
        return { status: "success", message: "Message received. I'll get back to you shortly." };
    }

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ name, company, email, message }),
        });

        if (!res.ok) {
            return { status: "error", message: "Delivery failed. Please email me directly." };
        }

        return { status: "success", message: "Message received. I'll get back to you shortly." };
    } catch {
        return { status: "error", message: "Network error. Please try again later." };
    }
}
