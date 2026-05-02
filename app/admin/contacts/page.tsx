import { prisma } from "@/lib/prisma";
import { ContactsClient } from "@/components/admin/contacts-client";
export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--text)]">Contacts</h1>
        <p className="text-[var(--muted)] mt-1">{contacts.length} total submissions</p>
      </div>
      <ContactsClient data={contacts} />
    </div>
  );
}
